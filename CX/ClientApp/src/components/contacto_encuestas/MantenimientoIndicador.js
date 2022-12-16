import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerTiposIndicadores, ObtenerTipoIndicadorPorId, ObtenerValoresIndicadorPorID, ActualizarValorIndicador, InactivarTipoIndicador, ActualizarTipoIndicador, AgregarTipoIndicador } from '../../servicios/ServicioTipoIndicador';
import { InputTabla } from '../components_forms/inputs'
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formTipoIndicador';

export class MantenimientoIndicador extends Component {
    static displayName = MantenimientoIndicador.name;

    constructor(props) {
        super(props);
        this.state = {
            listaTiposIndicadores: [],
            listaValoresIndicador:[],
            pendiente: false,
            data: {},
            modal: false,
            modal2: false,
            proceso: 1,
            modalTitulo: "Registrar Tipo de Indicador",
            modalTitulo2: "Editar valores de Indicador",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeError:"",
            mensajeRespuesta: {},
            mensajeRespuesta2: {},
            show: false,//mostrar respuesta en editar indicadores
            show2: false,//Mostrar respuesta en editar valores
            show3:false,//Mostrar el error de validacion de minimos y maximos
            alerta: true,
            alerta2: true,
            alerta3:false,
            cabeceras: ["ID", "Sigla", "Descripción", "Mínimo", "Máximo", "Estado", "Acción"],
            cabeceras2: ["Valor", "Descripción"],
        };

    }


    async componentDidMount() {
        await this.ObtenerTiposIndicadores();
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerTiposIndicadores() {
        const respuesta = await ObtenerTiposIndicadores();
        this.setState({ listaTiposIndicadores: respuesta });
    }

    async ObtenerValoresIndicadorPorID(id) {
        const respuesta = await ObtenerValoresIndicadorPorID(id);
        this.setState({ listaValoresIndicador: respuesta });
    }

    onClickNuevoTipoIndicador = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Tipo de Indicador" });
    }

    onClickInactivarTipoIndicador = async (id) => {
        const respuesta = await InactivarTipoIndicador(id)
        if (respuesta.indicador === 0) {
            await this.ObtenerTiposIndicadores();
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });
    }

    onClickActualizarTipoIndicador = async (id) => {
        this.setState({ data: await ObtenerTipoIndicadorPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Tipo de Indicador" });
    }

    onClickActualizarValoresIndicador = async (id,indicador) => {
        await this.ObtenerValoresIndicadorPorID(id);
        this.setState({ proceso: 2 });
        this.setState({ modal2: !this.state.modal2 });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo2: "Actualizar valores del indicador "+indicador });
    }

    onClickProcesarTipoIndicador = async (data) => {
        let respuesta = {};
        if (data.minimo > data.maximo) {
            this.setState({ mensajeError: "El valor mínimo no puede ser mayor al valor máximo "});
            this.setState({ show3: true });
            return
        }
        if (data.maximo < 0) {
            this.setState({ mensajeError: "El valor máximo no puede ser mayor al valor máximo " });
            this.setState({ show3: true });
            return
        }
        if (data.minimo < 0) {
            this.setState({ mensajeError: "El valor mínimo no puede ser menor a 0" });
            this.setState({ show3: true });
            return
        }

        if (this.state.proceso === 1) {
            
                respuesta = await AgregarTipoIndicador(data);
                this.setState({ show3: false });
            
        }

            

        else {

            respuesta = await ActualizarTipoIndicador(data);

        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });
            this.setState({ show3: false });
            this.setState({ mensajeFormulario: "" });
            $('#example').DataTable().destroy();

            await this.ObtenerTiposIndicadores();

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

    onClickProcesarValoresIndicador = async (data) => {

        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarTipoIndicador(data);
        else {

            respuesta = await ActualizarValorIndicador(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ mensajeRespuesta2: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta2: true });

            

        } else {
            this.setState({ mensajeFormulario2: respuesta.mensaje });
            this.setState({ alerta2: false });

        }

        this.setState({ show2: true });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ show3: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickCerrarModal2 = () => {
        this.setState({ modal2: false });
        this.setState({ mensajeFormulario2: "" });
        this.setState({ show2: false });
    }

    onClickGuardarValores = () => {
        this.state.listaValoresIndicador.map((item, index) => (
            this.onClickProcesarValoresIndicador(item)
        ))
    }

    body = () => {
        return this.state.listaTiposIndicadores.map((item, index) => (
            <tr key={index}>
                <td>{item.idTipoIndicador}</td>
                <td>{item.sigla}</td>
                <td>{item.tipoIndicador}</td>
                <td>{item.minimo}</td>
                <td>{item.maximo}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarTipoIndicador(item.idTipoIndicador)} style={{ marginRight: "1vw" }}>Editar Indicador
                    </Button>

                    <Button color="secondary" onClick={() => this.onClickActualizarValoresIndicador(item.idTipoIndicador, item.sigla)} style={{ marginRight: "1vw" }}>Editar valores
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarTipoIndicador(item.idTipoIndicador)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }
    onChangeClasificacion(e,item,index) {
        let items = [...this.state.listaValoresIndicador];
        item.clasificacion = e.target.value;
        items[index] = item;
        this.setState({ listaValoresIndicador:items });
    }

    valores = () => {
        
        return this.state.listaValoresIndicador.map((item, index) => (
            <tr key={index}>
                <td>{item.valor}</td>
                <td>
                    <InputTabla onChange={e => this.onChangeClasificacion(e, item, index)} id='txt-descripcion' type='text' placeholder='Descripcion' value={item.clasificacion} mensajeValidacion="" />
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Tipos de Indicadores</div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoTipoIndicador()}>Insertar Tipo Indicador</Button>
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
                        {this.state.show3 ?
                            <Alert variant={this.state.alerta3 === true ? "success" : "danger"} onClose={() => this.setState({ show3: false })} dismissible>
                                {this.state.mensajeError}
                            </Alert>
                            : ""}
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarTipoIndicador={this.onClickProcesarTipoIndicador} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                    <FormularioModal show={this.state.modal2} handleClose={this.onClickCerrarModal2} titulo={this.state.modalTitulo2} className=''>
                        {this.state.show2 ?
                            <Alert variant={this.state.alerta2 === true ? "success" : "danger"} onClose={() => this.setState({ show2: false })} dismissible>
                                {this.state.mensajeRespuesta2.mensaje}
                            </Alert>
                            : ""}
                        <Table tableHeading={this.state.cabeceras2} body={this.valores()} />
                        <Button className="primary btn btn-primary btn-sm" onClick={() => this.onClickGuardarValores()} style={{ marginRight: "1vw" }}>Guardar
                        </Button>
                    </FormularioModal>
                </Container>
            </main>
        );
    }
}