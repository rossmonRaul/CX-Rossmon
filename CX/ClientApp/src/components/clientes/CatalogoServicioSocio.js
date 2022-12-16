
import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerServicioSocio, ActualizarServicioSocio, AgregarServicioSocio, ObtenerServicioSocioPorId, InactivarServicioSocio } from '../../servicios/ServicioServicioSocio';

import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formServicioSocio';


export class CatalogoServicioSocio extends Component {
    static displayName = CatalogoServicioSocio.name;


    constructor(props) {
        super(props);
        this.state = {
            listaServicioSocios: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Servicio por Socios",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["id", "Cédula", "Socio", "Servicio", "Linea de Negocio", "Estado", "Acciones"],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoServicioSocios();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoServicioSocios() {
        const respuesta = await ObtenerServicioSocio();
        this.setState({ listaServicioSocios: respuesta });
    }

    onClickNuevoServicioSocios = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Servicio por Socio" });
    }

    onClickInactivarServicioSocios = async (id) => {
        const respuesta = await InactivarServicioSocio(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaServicioSocios: await this.ObtenerListadoServicioSocios() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarServiciosSocios = async (id) => {
        this.setState({ data: await ObtenerServicioSocioPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Servicio por Socio" });
    }

    onClickProcesarServiciosSocios = async (data) => {
       
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarServicioSocio(data);
        else {

            respuesta = await ActualizarServicioSocio(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoServicioSocios();

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
        return this.state.listaServicioSocios.map((item, index) => (
            <tr key={index}>
                <td>{item.idServicioSocio}</td>
                <td>{item.cedula}</td>
                <td>{item.nombre}</td>
                <td>{item.servicio}</td>
                <td>{item.lineaNegocio}</td>
                

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarServiciosSocios(item.idServicioSocio)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarServicioSocios(item.idServicioSocio)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Catalogo Servicio por Socio </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoServicioSocios()}>Insertar Servicio Socio</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarServiciosSocios={this.onClickProcesarServiciosSocios} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
            </main>
        );
    }
}