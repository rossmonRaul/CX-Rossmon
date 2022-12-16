import React, { Component } from 'react';

import {
    Container, Form, Row, Col, Label, Input, Button, FormGroup, 

    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { Table } from '../Table';

import { ObtenerSegmentos, AgregarSegmentos, ActualizarSegmento, ObtenerSegmentoPorId, InactivarSegmento } from '../../servicios/ServicioSegmentos';
import { Alert } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formSegmentos';



export class MantenimientoSegmentos extends Component {
    static displayName = MantenimientoSegmentos.name;

    constructor(props) {
        super(props);
        this.state = {
            segmentos: [],
            cabeceras: ["Id segmento", "Segmento", "Sector", "Estado", "Acciones"],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Segmento",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true
        }


    }

    async componentDidMount() {
        await this.ObtenerListaSegmentos();
        //initialize datatable
        setTimeout(() => {
            $('#tbl_table').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                }
            );
        }, 100);

    }



    async ObtenerListaSegmentos() {
        this.setState({ pendiente: true });
        const respuesta = await ObtenerSegmentos();
        this.setState({ segmentos: respuesta });
        console.log(respuesta);
        this.setState({ pendiente: false });

    }


    onClickNuevoSegmento = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Segmento" });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickActualizarSegmento = async (id) => {
        this.setState({ data: await ObtenerSegmentoPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Segmento" });
    }

    onClickInactivarSegmento = async (id) => {
        const respuesta = await InactivarSegmento(id)
        if (respuesta.indicador === 0) {
            this.setState({ segmento: await this.ObtenerListaSegmentos() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }



    onClickProcesarSegmento = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarSegmentos(data);
        else {

            respuesta = await ActualizarSegmento(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });

            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#tbl_table').DataTable().destroy();

            await this.ObtenerListaSegmentos();

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

        return this.state.segmentos.map((item, index) => (
            <tr key={index}>
                <td>{item.idSegmento}</td>
                <td>{item.segmento}</td>
                <td>{item.sector}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarSegmento(item.idSegmento)} style={{ marginRight: "1vw" }}>Editar
                                            </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarSegmento(item.idSegmento)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))


    }


    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Segmentos </div>
                <Container>

                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoSegmento()}>Insertar segmento</Button>
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
                </Container>


                <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                    <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarSegmento={this.onClickProcesarSegmento} mensaje={this.state.mensajeFormulario} />
                </FormularioModal>


            </main>
        );
    }
}