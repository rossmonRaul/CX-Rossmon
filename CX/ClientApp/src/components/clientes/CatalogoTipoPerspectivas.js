import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerTipoPerspectivas, ActualizarTipoPerspectivas, AgregarTipoPerspectivas, ObtenerTipoPerspectivasPorId, InactivarTipoPerspectivas } from '../../servicios/ServicioTipoPerspectivas';

import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formTipoPerspectivas';


export class CatalogoTipoPerspectivas extends Component {
    static displayName = CatalogoTipoPerspectivas.name;


    constructor(props) {
        super(props);
        this.state = {
            listaTipoPerspectivas: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar tipo de Perspectiva",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["Id", "Tipo de Perspectiva", "Estado", "Acciones"],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoTipoPerspectivas();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoTipoPerspectivas() {
        const respuesta = await ObtenerTipoPerspectivas();
        this.setState({ listaTipoPerspectivas: respuesta });
    }

    onClickNuevoTipoPerspectivas = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Tipo de Perspectiva" });
    }

    onClickInactivarTipoPerspectivas = async (id) => {
        const respuesta = await InactivarTipoPerspectivas(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaTipoPerspectivas: await this.ObtenerListadoTipoPerspectivas() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarTipoPerspectivas = async (id) => {
        this.setState({ data: await ObtenerTipoPerspectivasPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Tipo de Perspectiva" });
    }

    onClickProcesarTipoPerspectivas = async (data) => {

        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarTipoPerspectivas(data);
        else {

            respuesta = await ActualizarTipoPerspectivas(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoTipoPerspectivas();

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
        return this.state.listaTipoPerspectivas.map((item, index) => (
            <tr key={index}>
                <td>{item.idTipoPerspectiva}</td>
                <td>{item.tipoPerspectiva}</td>


                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarTipoPerspectivas(item.idTipoPerspectiva)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarTipoPerspectivas(item.idTipoPerspectiva)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Catalogo Tipos de Perspectivas </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoTipoPerspectivas()}>Insertar Tipo de Perspectiva</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarTipoPerspectivas={this.onClickProcesarTipoPerspectivas} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
            </main>
        );
    }
}