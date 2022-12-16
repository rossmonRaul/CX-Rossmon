import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerFaseServicio, ActualizarFaseServicio, InsertarFaseServicio, ObtenerFaseServicioPorId, InactivarFaseServicio } from '../../servicios/ServicioFaseServicio';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import { Table } from '../Table';

//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formFases';


export class MantenimientoFases extends Component {
    static displayName = MantenimientoFases.name;

    constructor(props) {
        super(props);
        this.state = {
            listaFases: [],
            cabeceras: ["Id Fase", "Fase Servicio", "Estado", "Acciones"],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar fase de servicio",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoFaseServicio();

        setTimeout(() => {
            $('#tbl_table').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoFaseServicio() {
        const respuesta = await ObtenerFaseServicio();
        this.setState({ listaFases: respuesta });
    }

    onClickNuevaFaseServicio = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Fase Servicio" });
    }

    onClickInactivarFaseServicio = async (id) => {
        const respuesta = await InactivarFaseServicio(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaFases: await this.ObtenerListadoFaseServicio() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarFaseServicio = async (id) => {
        this.setState({ data: await ObtenerFaseServicioPorId(id) })
        console.log(this.state.data);
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Fase Servicio" });
    }

    onClickProcesarFaseServicio = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await InsertarFaseServicio(data);
        else {

            respuesta = await ActualizarFaseServicio(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ faseServicio : await this.ObtenerListadoFaseServicio() });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#tbl_table').DataTable().destroy();

            await this.ObtenerListadoFaseServicio();

            setTimeout(() => {
                $('#tbl_table').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);
        } else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }

        this.setState({ show: true });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    body = () => {
      return  this.state.listaFases.map((item, index) => (
            <tr key={index}>
                <td>{item.idFase}</td>
                <td>{item.fase}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarFaseServicio(item.idFase)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarFaseServicio(item.idFase)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Fases de Servicio </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevaFaseServicio()}>Insertar fase de servicio</Button>
                    <hr />
                    <br />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />
                    <Table tableHeading={this.state.cabeceras} body={this.body()} />
                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarFaseServicio={this.onClickProcesarFaseServicio} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
            </main>
        );
    }
}