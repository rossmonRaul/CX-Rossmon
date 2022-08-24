import React, { Component } from 'react';

import {
    Container, Form, Row, Col, Label, Input, Button, FormGroup, Table,

    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import { ObtenerServicioLineaNegocio, AgregarServicioLineaNegocio, ActualizarServicioLineaNegocio, ObtenerServicioLineaNegocioPorId, InactivarServicioLineaNegocio } from '../../servicios/ServicioServicioLineaNegocio';
import { Alert } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formServicioLineaNegocio';



export class MantenimientoServicioNegocio extends Component {
    static displayName = MantenimientoServicioNegocio.name;

    constructor(props) {
        super(props);
        this.state = {
            ServicioLineaNegocio: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Servicio",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true
        }


    }

    async componentDidMount() {
        await this.ObtenerListaServicioLineaNegocio();
        //initialize datatable
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                }
            );
        }, 100);

    }



    async ObtenerListaServicioLineaNegocio() {
        this.setState({ pendiente: true });
        const respuesta = await ObtenerServicioLineaNegocio();
        this.setState({ ServicioLineaNegocio: respuesta });
        console.log(respuesta);
        this.setState({ pendiente: false });

    }


    onClickNuevoServicioLineaNegocio = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Servicio" });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickActualizarServicioLineaNegocio = async (id) => {
        this.setState({ data: await ObtenerServicioLineaNegocioPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Servicio" });
    }

    onClickInactivarServicioLineaNegocio = async (id) => {
        const respuesta = await InactivarServicioLineaNegocio(id)
        if (respuesta.indicador === 0) {
            this.setState({ segmento: await this.ObtenerListaServicioLineaNegocio() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }



    onClickProcesarServicioLineaNegocio = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarServicioLineaNegocio(data);
        else {

            respuesta = await ActualizarServicioLineaNegocio(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });

            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListaServicioLineaNegocio();

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
                <div className="row-full">Mantenimiento de Servicios  </div>
                <Container>

                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoServicioLineaNegocio()}>Insertar Servicio</Button>
                    <hr />
                    <br />
                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />

                    <table id="example" className="display">
                        <thead>
                            <tr className="table1">
                                <th>Id Servico</th>
                                <th>Linea Negocio</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.ServicioLineaNegocio.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.idServicio}</td>
                                    <td>{item.servicio}</td>
                                    <td>{item.linea}</td>

                                    {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                                    <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                                        {item.estado === true ? "Activo" : "Inactivo"}</td>
                                    <td style={{ display: "flex", padding: "0.5vw" }}>

                                        <Button color="primary" onClick={() => this.onClickActualizarServicioLineaNegocio(item.idServicio)} style={{ marginRight: "1vw" }}>Editar
                                        </Button>

                                        <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarServicioLineaNegocio(item.idServicio)}> {item.estado === true ? "Inactivar" : "Activar"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Container>


                <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                    <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarServicioLineaNegocio={this.onClickProcesarServicioLineaNegocio} mensaje={this.state.mensajeFormulario} />
                </FormularioModal>


            </main>
        );
    }
}