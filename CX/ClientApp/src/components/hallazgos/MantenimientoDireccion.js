import React, { Component } from 'react';

import {
    Container, Form, Row, Col, Label, Input, Button, FormGroup,

    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import { ObtenerDirecciones, AgregarDirecciones, ActualizarDireccion, ObtenerDireccionPorID, InactivarDireccion } from '../../servicios/ServicioDirecciones';
import { Alert } from 'react-bootstrap'

import { Table } from '../Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formDirecciones';


export class MantenimientoDireccion extends Component {
    static displayName = MantenimientoDireccion.name;
    constructor(props) {
        super(props);
        this.state = {
            direcciones: [],
            cabeceras: [ "Código", "Dirección", "Estado", "Acciones"],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Dirección",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true


        }


    }

    async componentDidMount() {
        await this.ObtenerDirecciones();
        //initialize datatable
        setTimeout(() => {
            $('#tbl_table').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                }
            );
        }, 100);

    }
    async ObtenerDirecciones() {
        const respuesta = await ObtenerDirecciones();
        this.setState({ direcciones: respuesta });
    }

    onClickNuevaDireccion = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Direccion" });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickInactivarDireccion = async (id) => {
        const respuesta = await InactivarDireccion(id)
        if (respuesta.indicador === 0) {
            this.setState({ direccion: await this.ObtenerDirecciones() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }
    onClickActualizarDireccion = async (id) => {
        this.setState({ data: await ObtenerDireccionPorID(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Sector" });
    }



    onClickProcesarDirecciones = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarDirecciones(data);
        else {

            respuesta = await ActualizarDireccion(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });

            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#tbl_table').DataTable().destroy();

            await this.ObtenerDirecciones();

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

    body = () => {
        return this.state.direcciones.map((item, index) => {
            return <tr key={index}>
                <td>{item.idDireccion}</td>
                <td>{item.direccion}</td>

                {/* COLUMNAS DE ESTADO Y BOTONES CON ESTILO*/}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarDireccion(item.idDireccion)} style={{ marginRight: "1vw" }}>Editar
                                            </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarDireccion(item.idDireccion)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>

        })
    }


    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Direcciones </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevaDireccion()}>Insertar direccion</Button>
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
                    {/*<table id="example"*/}
                    {/*    class="display">*/}
                    {/*    <thead >*/}
                    {/*        <tr >*/}
                    {/*            <th>Id Direccion</th>*/}
                    {/*            <th>Código</th>*/}
                    {/*            <th>Direccion</th>*/}
                    {/*            <th>Estado</th>*/}
                    {/*            <th>Acciones</th>*/}
                    {/*        </tr >*/}
                    {/*    </thead>*/}
                    {/*    <tbody >*/}
                    {/*        {*/}
                    {/*            this.state.direcciones.map((item, index) => (*/}
                    {/*                <tr key={index}>*/}
                    {/*                    <td>{item.idDireccion}</td>*/}
                    {/*                    <td>{item.codigo}</td>*/}
                    {/*                    <td>{item.direccion}</td>*/}

                    {/*                    COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                    {/*                    <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>*/}
                    {/*                        {item.estado === true ? "Activo" : "Inactivo"}</td>*/}
                    {/*                    <td style={{ display: "flex", padding: "0.5vw" }}>*/}

                    {/*                        <Button color="primary" onClick={() => this.onClickActualizarDireccion(item.idDireccion)} style={{ marginRight: "1vw" }}>Editar*/}
                    {/*                        </Button>*/}

                    {/*                        <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarDireccion(item.idDireccion)}> {item.estado === true ? "Inactivar" : "Activar"}*/}
                    {/*                        </Button>*/}
                    {/*                    </td>*/}
                    {/*                </tr>*/}
                    {/*            ))*/}
                    {/*        }*/}
                    {/*    </tbody>*/}
                    {/*</table >*/}

                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarDirecciones={this.onClickProcesarDirecciones} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>


            </main>
        );
    }
}