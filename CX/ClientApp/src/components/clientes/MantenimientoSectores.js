import React, { Component } from 'react';

import {
    Container, Form, Row, Col, Label, Input, Button, FormGroup,

    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

import { ObtenerSectores, AgregarSectores, ActualizarSector, ObtenerSectorPorId, InactivarSector } from '../../servicios/ServicioSectores';
import { Alert } from 'react-bootstrap'

import { Table } from '../Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formSectores';



export class MantenimientoSectores extends Component {
    static displayName = MantenimientoSectores.name;
    constructor(props) {
        super(props);
        this.state = {
            sectores: [],
            cabeceras: ["Id sector", "Sector", "Estado", "Acciones"],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Sector",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true


        }


    }


    async componentDidMount() {
        await this.ObtenerListaSectores();
        //initialize datatable
        setTimeout(() => {
            $('#tbl_table').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                }
            );
        }, 100);

    }



    async ObtenerListaSectores() {
        const respuesta = await ObtenerSectores();
        this.setState({ sectores: respuesta });
    }

    onClickNuevoSector = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Sector" });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickInactivarSector = async (id) => {
        const respuesta = await InactivarSector(id)
        if (respuesta.indicador === 0) {
            this.setState({ sector: await this.ObtenerListaSectores() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }
    onClickActualizarSector = async (id) => {
        this.setState({ data: await ObtenerSectorPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Sector" });
    }



    onClickProcesarSector = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarSectores(data);
        else {

            respuesta = await ActualizarSector(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });

            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#tbl_table').DataTable().destroy();

            await this.ObtenerListaSectores();

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
        return this.state.sectores.map((item, index) => (
            <tr key={index}>
                <td>{item.idSector}</td>
                <td>{item.sector}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarSector(item.idSector)} style={{ marginRight: "1vw" }}>Editar
                                            </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarSector(item.idSector)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))

    }

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Sectores </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoSector()}>Insertar sector</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarSectores={this.onClickProcesarSector} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>



            </main>
        );
    }
}