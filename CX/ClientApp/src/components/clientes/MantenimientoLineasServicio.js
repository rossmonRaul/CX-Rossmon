import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerLineaNegocio, ActualizarLineaNegocio, AgregarLineaNegocio, ObtenerLineaNegocioPorId, InactivarLineaNegocio } from '../../servicios/ServicioLineaNegocio';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import  Formulario  from '../mantenimientos_forms/formNegocios';


export class MantenimientoLineasServicio extends Component {
    static displayName = MantenimientoLineasServicio.name;

    constructor(props) {
        super(props);
        this.state = {
            listaNegocios: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar línea de Negocio",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: [
                "Id Línea",
                "Línea Negocio",
                "Estado",
                "Acciones"
            ],
        };

    }

    async componentDidMount() {
         await this.ObtenerListadoLineaNegocio();

        setTimeout(() => {
            $('#example').DataTable(              
                {
                    "lengthMenu" : [[5,10,15,-1], [5,10,15,"All"]]
                });
        }, 100);
    }


    async ObtenerListadoLineaNegocio() {
        const respuesta = await ObtenerLineaNegocio();
        this.setState({ listaNegocios: respuesta });       
    }

    onClickNuevaLineaNegocio = async () => {
        this.setState({ proceso: 1});
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton : "Registrar"});
        this.setState({ modalTitulo: "Registrar Línea de Negocio" });
    }

    onClickInactivarLineaNegocio = async (id) => {
        const respuesta = await InactivarLineaNegocio(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaNegocios: await this.ObtenerListadoLineaNegocio() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });
       
    }

    onClickActualizarLineaNegocio = async (id) => {
        this.setState({ data: await ObtenerLineaNegocioPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Línea de Negocio" });
    }

    onClickProcesarLineaNegocio = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarLineaNegocio(data);
        else {

            respuesta = await ActualizarLineaNegocio(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            //this.setState({ lineaNegocios : await this.ObtenerListadoLineaNegocio() });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoLineaNegocio();

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
        this.setState({ mensajeFormulario: ""});
    }


    body = () => {
        return this.state.listaNegocios.map((item, index) => (
            <tr key={index}>
                <td>{item.idLinea}</td>
                <td>{item.lineaNegocio}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarLineaNegocio(item.idLinea)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarLineaNegocio(item.idLinea)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Lineas de Servicio </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevaLineaNegocio()}>Insertar línea de negocio</Button>
                    <hr />
                    <br />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />
                    {/*
                     * <table id="example"
                        class="display"  >
                        <thead >
                            <tr style={{ backgroundColor: "#126677", color: "white" }}>
                                <th>Id Línea</th>
                                <th>Línea de Negocio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr >
                        </thead>
                        <tbody >
                            {
                                this.state.listaNegocios.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.idLinea}</td>
                                        <td>{item.lineaNegocio}</td>

                    {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                    {/* <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                        {item.estado === true ? "Activo" : "Inactivo"}</td>
                    <td style={{ display: "flex", padding: "0.5vw" }}>

                        <Button color="primary" onClick={() => this.onClickActualizarLineaNegocio(item.idLinea)} style={{ marginRight: "1vw" }}>Editar
                        </Button>

                        <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarLineaNegocio(item.idLinea)}> {item.estado === true ? "Inactivar" : "Activar"}
                        </Button>
                    </td>
                                    </tr>
                ))
                            }
                        </tbody>
                    </table >*/}


                    <Table tableHeading={this.state.cabeceras} body={this.body()} />

                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarLineaNegocio={this.onClickProcesarLineaNegocio} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
            </main>
        );
    }
}