import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerTipoInteraccion, ActualizarTipoInteraccion, AgregarTipoInteraccion, ObtenerTipoInteraccionPorId, InactivarTipoInteraccion } from '../../servicios/ServicioTipoInteraccion';

import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formTipoInteraccion';


export class CatalogoTipoInteraccion extends Component {
    static displayName = CatalogoTipoInteraccion.name;


    constructor(props) {
        super(props);
        this.state = {
            listaTipoInteraccion: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar tipo de interaccion",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["Id", "Tipo de Interaccion", "Estado", "Acciones"],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoTipoInteraccion();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoTipoInteraccion() {
        const respuesta = await ObtenerTipoInteraccion();
        this.setState({ listaTipoInteraccion: respuesta });
    }

    onClickNuevoTipoInteraccion = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Tipo de Interaccion" });
    }

    onClickInactivarTipoInteraccion = async (id) => {
        const respuesta = await InactivarTipoInteraccion(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaTipoInteraccion: await this.ObtenerListadoTipoInteraccion() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarTipoInteraccion = async (id) => {
        this.setState({ data: await ObtenerTipoInteraccionPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Tipo de Interaccion" });
    }

    onClickProcesarTipoInteraccion = async (data) => {

        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarTipoInteraccion(data);
        else {

            respuesta = await ActualizarTipoInteraccion(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoTipoInteraccion();

            setTimeout(() => {
                $('#example').DataTable(
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
        return this.state.listaTipoInteraccion.map((item, index) => (
            <tr key={index}>
                <td>{item.idTipoInteraccion}</td>
                <td>{item.tipoInteraccion}</td>


                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarTipoInteraccion(item.idTipoInteraccion)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarTipoInteraccion(item.idTipoInteraccion)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Catalogo de Tipo de Interaccion </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoTipoInteraccion()}>Insertar Tipo de Interaccion</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarTipoInteraccion={this.onClickProcesarTipoInteraccion} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
            </main>
        );
    }
}