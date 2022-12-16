import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerEtapasTaller, ActualizarEtapasTaller, AgregarEtapasTaller, ObtenerEtapasTallerPorId, InactivarEtapasTaller } from '../../servicios/ServicioEtapasTaller';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formEtapas';


export class MantenimientoEtapas extends Component {
    static displayName = MantenimientoEtapas.name;


    constructor(props) {
        super(props);
        this.state = {
            listaEtapas: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Etapas de Tipo de Taller",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: [
                "Id",
                "Etapas de Tipo de Taller",
                "Tipo de Taller",
                "Estado",
                "Acciones"
            ],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoEtapasTaller();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoEtapasTaller() {
        const respuesta = await ObtenerEtapasTaller();
        this.setState({ listaEtapas: respuesta });
    }

    onClickNuevaEtapaTaller = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Etapas de Tipo de Taller" });
    }

    onClickInactivarEtapaTaller = async (id) => {
        const respuesta = await InactivarEtapasTaller(id)
        if (respuesta.indicador === 0) {
            this.setState({ listaEtapas: await ObtenerEtapasTaller() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizaEtapaTaller = async (id) => {
        this.setState({ data: await ObtenerEtapasTallerPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Etapas de Tipo de Taller" });
    }

    onClickProcesarEtapasTaller = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarEtapasTaller(data);
        else {

            respuesta = await ActualizarEtapasTaller(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoEtapasTaller();

            setTimeout(() => {
                $('#example').DataTable(
                    {
                        "lengthMenu": [[10, 15, 20, -1], [10, 15, 20, "All"]]
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
        return this.state.listaEtapas.map((item, index) => (
            <tr key={index}>
                <td>{item.idEtapaTaller}</td>
                <td>{item.etapaTaller}</td>
                <td>{item.tipoTaller}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizaEtapaTaller(item.idEtapaTaller)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarEtapaTaller(item.idEtapaTaller)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Etapas de Tipo de Taller</div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevaEtapaTaller()}>Insertar Etapa de Tipo de Taller</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarEtapasTaller={this.onClickProcesarEtapasTaller} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>

                <br />
                <br />
                <br />
            </main>
        );
    }
}