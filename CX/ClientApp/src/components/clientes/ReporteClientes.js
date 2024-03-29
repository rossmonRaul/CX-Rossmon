﻿import React, { Component } from 'react';
import { ObtenerClientes, ObtenerClientePorId, InactivarCliente } from '../../servicios/ServicioCliente';
import Formulario from './FormularioCliente'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal';
import { Container, Button, } from 'reactstrap';
import { Table} from '../Table';
import Form from 'react-bootstrap/Form';
import  './ReporteCLiente.css';
export class Reporte extends Component {
    static displayName = Reporte.name;
    constructor(props) {
        super(props);
        this.state = {
            listaClientes: [],
            cabeceras: ["Id Cliente", "Fecha Ingreso", "Nombre Cliente", "Sector", "Fase de Servicio", "Servicio Solicitado", "Categoria Cliente", "Información de Contacto","Información del Socio", "Estado", "Acciones"],
            pendiente: false,
            data: {},
            info: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar ",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            showModalContacto: false,
            showModalSocio: false,
            showModalEditar: false,
            clienteSeleccionado: {},
        }
    };


    async componentDidMount() {
        await this.ObtenerListadoClientes();

        setTimeout(() => {
            $('#tbl_table_mantenimiento').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "language": {
                        "emptyTable": "No existen clientes aún"
                    }
                });
        }, 100);
    }
    onClickObtenerInformacionContacto = async (id) => {
        
        this.setState({ info: await ObtenerClientePorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Info Contacto" });
        this.setState({ showModalContacto: true });
    }
    onClickObtenerInformacion = async (id) => {
        
        this.setState({ info: await ObtenerClientePorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Info Socio" });
        this.setState({ showModalSocio: true });
    }
    onClickInactivarCliente = async (id) => {
        const respuesta = await InactivarCliente(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaFases: await this.ObtenerListadoClientes() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }
    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }
    onClickCerrar = async () => {
        this.setState({ showModalContacto: false });
        this.setState({ showModalSocio: false });
    }

    formatoFecha = (i) => {
        if (i != '') {
            var datePart = i.match(/\d+/g),
                year = datePart[0],
                month = datePart[1],
                day = datePart[2];
            return day + "/" + month + "/" + year;
        } else {
            return "No hay";
        }
    }
    async ObtenerListadoClientes() {
        const respuesta = await ObtenerClientes();
        this.setState({ listaClientes: respuesta });
    }

    onClickEditarCliente = async (item) => {
        this.setState({ clienteSeleccionado: item });
        this.setState({ showModalEditar: true });
    }

    onHideEditar = async () => {
        $('#tbl_table_mantenimiento').DataTable().destroy();
        await this.ObtenerListadoClientes();
        setTimeout(() => {
            $('#tbl_table_mantenimiento').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "language": {
                        "emptyTable": "No existen clientes aún"
                    }
                });
        }, 100);
        this.setState({ showModalEditar: false });
    }
   


    body = () => {
        return this.state.listaClientes.map((item, index) => (
            
            <tr key={index}>
                <td>{item.idClienteEncuesta}</td>
                <td>{this.formatoFecha(item.fechaIngreso)}</td>
                <td>{item.nombre}</td>
                <td>{item.sector}</td>
                <td>{item.faseCustomerJourney}</td>
                <td>{item.servicio}</td>
                <td>{item.categoria}</td>
                <td>  <Button color="primary" onClick={() => this.onClickObtenerInformacionContacto(item.idClienteEncuesta)}  style={{ marginRight: "1vw" }}>Contacto </Button></td>
                <td>  <Button color="primary" onClick={() => this.onClickObtenerInformacion(item.idClienteEncuesta)}  style={{ marginRight: "1vw" }}>Socio </Button></td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" /*onClick={() => this.onClickActualizarFaseServicio(item.idFase)} */ onClick={() => this.onClickEditarCliente(item)}  style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarCliente(item.idClienteEncuesta)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }
   
        render() {
            return (
                <main  >

                    <div class="row-full"  >Contactos</div>

                    <div class="containerTable" >
                    <Container >

                        <Table tableHeading={this.state.cabeceras} body={this.body()} />

                       
                            <Modal
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                show={this.state.showModalContacto}
                                onHide={() => this.setState({ showModalContacto: false })}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-custom-modal-styling-title">
                                        Información de Contacto
                                    </Modal.Title>
                                    {/*ALERTA*/}

                                </Modal.Header>

                                <Modal.Body>
                                    <label className="etiquetas">Nombre Contacto</label>
                                    <Form.Control value={this.state.info.nombre} type="text" readOnly disabled />
                                    <br></br>
                                    <label className="etiquetas">Canal de Encuestas</label>
                                    <Form.Control value={this.state.info.canal} type="text" readOnly disabled />
                                    <br></br>
                                    <label className="etiquetas">Telefono</label>
                                    <Form.Control value={this.state.info.telefono} type="text" readOnly disabled />
                                    <br></br>
                                    <label className="etiquetas">Correo</label>
                                    <Form.Control value={this.state.info.correoElectronico} type="email" readOnly disabled />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button color="secondary" onClick={() => this.onClickCerrar()}>
                                        Cerrar
                                    </Button>
                                </Modal.Footer>
                        </Modal>

                        <Modal
                            size="xl"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={this.state.showModalEditar}
                            onHide={() => { this.onHideEditar() }
                            }
                        >

                            <Modal.Body>
                                <Formulario cliente={this.state.clienteSeleccionado} proceso={2}></Formulario>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button color="secondary" onClick={() => this.onHideEditar()}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={this.state.showModalSocio}
                            onHide={() => this.setState({ showModalSocio: false })}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    Información del Socio
                                </Modal.Title>
                                {/*ALERTA*/}

                            </Modal.Header>

                            <Modal.Body>
                                <label className="etiquetas">Nombre del Socio</label>
                                <Form.Control value={this.state.info.socio} type="text" readOnly disabled />
                                <br></br>
                                <label className="etiquetas">Codigo del Socio</label>
                                <Form.Control value={this.state.info.idSocio} type="text" readOnly disabled />
                                <br></br>
                                <label className="etiquetas">Telefono del Socio</label>
                                <Form.Control value={this.state.info.telefonoSocio} type="text" readOnly disabled />
                                <br></br>
                                <label className="etiquetas">Correo Electronico del Socio</label>
                                <Form.Control value={this.state.info.correoSocio} type="email" readOnly disabled />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button color="secondary" onClick={() => this.onClickCerrar()}>
                                    Cerrar
                                </Button>
                            </Modal.Footer>
                        </Modal>


                       
                        </Container>
                    </div>
                </main>
            );
        }

}


