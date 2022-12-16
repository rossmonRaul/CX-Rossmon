
import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerTipoContactoEncuesta, ActualizarTipoContactoEncuesta, AgregarTipoContactoEncuesta, ObtenerTipoContactoEncuestaPorId, InactivarTipoContactoEncuesta } from '../../servicios/ServicioTipoContactoEncuesta';

import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formTipoContactoEncuesta';


export class CatalogoTipoContactoEncuesta extends Component {
    static displayName = CatalogoTipoContactoEncuesta.name;


    constructor(props) {
        super(props);
        this.state = {
            listaTipoContactoEncuesta: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar tipo de contacto de encuesta",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["Id", "Tipo Contacto Encuesta", "Estado", "Acciones"],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoTipoContactoEncuesta();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoTipoContactoEncuesta() {
        const respuesta = await ObtenerTipoContactoEncuesta();
        this.setState({ listaTipoContactoEncuesta: respuesta });
    }

    onClickNuevoTipoContactoEncuesta = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Tipo de Contacto de Encuesta" });
    }

    onClickInactivarTipoContactoEncuesta = async (id) => {
        const respuesta = await InactivarTipoContactoEncuesta(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaTipoContactoEncuesta: await this.ObtenerListadoTipoContactoEncuesta() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarTipoContactoEncuesta = async (id) => {
        this.setState({ data: await ObtenerTipoContactoEncuestaPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Tipo de Contacto de Encuesta" });
    }

    onClickProcesarTipoContactoEncuesta = async (data) => {

        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarTipoContactoEncuesta(data);
        else {

            respuesta = await ActualizarTipoContactoEncuesta(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoTipoContactoEncuesta();

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
        return this.state.listaTipoContactoEncuesta.map((item, index) => (
            <tr key={index}>
                <td>{item.idTipoContactoEncuesta}</td>
                <td>{item.tipoContactoEncuesta}</td>


                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarTipoContactoEncuesta(item.idTipoContactoEncuesta)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarTipoContactoEncuesta(item.idTipoContactoEncuesta)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Catalogo de Tipo de Contacto de Encuesta </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoTipoContactoEncuesta()}>Insertar Tipo de Contacto de Encuesta</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarTipoContactoEncuesta={this.onClickProcesarTipoContactoEncuesta} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
            </main>
        );
    }
}