﻿import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerTipoIdentificacion, ActualizarTipoIdentificacion, AgregarTipoIdentificacion, ObtenerTipoIdentificacionPorId, InactivarTipoIdentificacion } from '../../servicios/ServicioTipoIdentificacion';

import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formTipoIdentificacion';


export class CatalogoTipoIdentificacion extends Component {
    static displayName = CatalogoTipoIdentificacion.name;


    constructor(props) {
        super(props);
        this.state = {
            listaTipoIdentificacion: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar tipo de identificacion",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["Id", "Tipo de identificacion", "Estado", "Acciones"],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoTipoIdentificacion();

        setTimeout(() => {
            $('#tbl_table_mantenimiento').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoTipoIdentificacion() {
        const respuesta = await ObtenerTipoIdentificacion();
        this.setState({ listaTipoIdentificacion: respuesta });
    }

    onClickNuevoTipoIdentificacion = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Tipo de Identificacion" });
    }

    onClickInactivarTipoIdentificacion = async (id) => {
        const respuesta = await InactivarTipoIdentificacion(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaTipoIdentificacion: await this.ObtenerListadoTipoIdentificacion() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarTipoIdentificacion = async (id) => {
        this.setState({ data: await ObtenerTipoIdentificacionPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Tipo de Identificacion" });
    }

    onClickProcesarTipoIdentificacion = async (data) => {

        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarTipoIdentificacion(data);
        else {

            respuesta = await ActualizarTipoIdentificacion(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#tbl_table_mantenimiento').DataTable().destroy();

            await this.ObtenerListadoTipoIdentificacion();

            setTimeout(() => {
                $('#tbl_table_mantenimiento').DataTable(
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
        return this.state.listaTipoIdentificacion.map((item, index) => (
            <tr key={index}>
                <td>{item.idTipoIdentificacion}</td>
                <td>{item.tipoIdentificacion}</td>


                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarTipoIdentificacion(item.idTipoIdentificacion)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarTipoIdentificacion(item.idTipoIdentificacion)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Catalogo de Tipo de Identificación </div>
                <Container>
                    <Button className="btn_insert" onClick={() => this.onClickNuevoTipoIdentificacion()}>Insertar Tipo de Identificación</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarTipoIdentificacion={this.onClickProcesarTipoIdentificacion} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
                <Container className="cont">
                </Container>
            </main>
        );
    }
}