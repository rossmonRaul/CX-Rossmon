import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerFasesCJ, InactivarFasesCJ, ActualizarFasesCJ, AgregarFasesCJ, ObtenerFasesCJPorId } from '../../servicios/ServicioFasesCJ';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formFasesCJ';


export class MantenimientoFasesCJ extends Component {
    static displayName = MantenimientoFasesCJ.name;

    constructor(props) {
        super(props);
        this.state = {
            listaFasesCJ: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar FasesCJ",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["ID", "Fase Customer Journey","Estado","Acciones"],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoFasesCJ();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoFasesCJ() {
        const respuesta = await ObtenerFasesCJ();
        this.setState({ listaFasesCJ: respuesta });
    }

    onClickNuevoFasesCJ = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Fase Customer Journey" });
    }

    onClickInactivarFasesCJ = async (id) => {
        const respuesta = await InactivarFasesCJ(id)
        if (respuesta.indicador === 0) {
            await this.ObtenerListadoFasesCJ();
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });
    }

    onClickActualizarFasesCJ = async (id) => {
        this.setState({ data: await ObtenerFasesCJPorId(id) })
        console.log(this.state.data);
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Fase Customer Joruney" });
    }

    onClickProcesarFasesCJ = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarFasesCJ(data);
        else {

            respuesta = await ActualizarFasesCJ(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoFasesCJ();

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
        return this.state.listaFasesCJ.map((item, index) => (
            <tr key={index}>
                <td>{item.idFaseCJ}</td>
                <td>{item.faseCustomerJourney}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarFasesCJ(item.idFaseCJ)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarFasesCJ(item.idFaseCJ)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Catálogo de Fases de Customer Journey </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoFasesCJ()}>Insertar fase de costumer journey</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarFasesCJ={this.onClickProcesarFasesCJ} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
            </main>
        );
    }
}