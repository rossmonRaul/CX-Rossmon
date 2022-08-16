import React, { Component } from 'react';

import {
    Container, Form, Row, Col, Label, Input, Button, FormGroup, Table,

    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import { ObtenerGradosEsfuerzo, AgregarGradosEsfuerzo, ActualizarGradoEsfuerzo, ObtenerGradoEsfuerzoPorID, InactivarGradoEsfuerzo } from '../../servicios/ServicioGradosEsfuerzo';
import { Alert } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formGradosEsfuerzo';

export class MantenimientoEsfuerzo extends Component {
    static displayName = MantenimientoEsfuerzo.name;

    constructor(props) {
        super(props);
        this.state = {
            gradosEsfuerzo: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar grado esfuerzo",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true


        }


    }

    async componentDidMount() {
        await this.ObtenerGradosEsfuerzo();
        //initialize datatable
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                }
            );
        }, 100);

    }

    async ObtenerGradosEsfuerzo() {
        const respuesta = await ObtenerGradosEsfuerzo();
        this.setState({ gradosEsfuerzo: respuesta });
    }

    onClickNuevoGradoEsfuerzo = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Grado Esfuerzo" });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }


    onClickProcesarGradosEsfuerzo = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarGradosEsfuerzo(data);
        else {

            /*respuesta = await ActualizarGradoEsfuerzo(data);*/
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });

            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerGradosEsfuerzo();

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

    

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento del Grado de Esfuerzo </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoGradoEsfuerzo()}>Insertar grado esfuerzo</Button>
                    <hr />
                    <br />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />
                    <table id="example"
                        class="display">
                        <thead >
                            <tr >
                                <th>Id Grado Esfuerzo</th>
                                <th>Código</th>
                                <th>Grado Esfuerzo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr >
                        </thead>
                        <tbody >
                            {
                                this.state.gradosEsfuerzo.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.idGradoEsfuerzo}</td>
                                        <td>{item.codigo}</td>
                                        <td>{item.gradoEsfuerzo}</td>

                                        {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                                        <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                                            {item.estado === true ? "Activo" : "Inactivo"}</td>
                                        <td style={{ display: "flex", padding: "0.5vw" }}>

                                            <Button color="primary" style={{ marginRight: "1vw" }}>Editar
                                            </Button>

                                            <Button color={item.estado === true ? "danger" : "success"} > {item.estado === true ? "Inactivar" : "Activar"}
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table >

                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarGradosEsfuerzo={this.onClickProcesarGradosEsfuerzo} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>



            </main>
        );
    }
}