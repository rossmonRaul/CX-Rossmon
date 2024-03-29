﻿import React, { Component } from 'react';
import { Table } from '../Table';
import { ObtenerPreguntas, InactivarPreguntaEncuesta, InsertarPreguntaEncuesta, ActualizarPregunta, ObtenerPreguntaPorId } from '../../servicios/ServicioPreguntasEncuestas';
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formPreguntaEncuesta';
import { InputTabla } from '../components_forms/inputs'
import { Alert } from 'react-bootstrap'
import $ from 'jquery';
import {  ObtenerValoresIndicadorPorID} from '../../servicios/ServicioTipoIndicador';
import { ActualizarRespuestasPreguntaEncuesta, AgregarRespuestaPreguntaEncuesta, ObtenerRespuestasPreguntaEncuestaPorId } from '../../servicios/ServicioRespuestasPreguntaEncuesta';
import Swal from 'sweetalert2'
//COMPONENTE QUE SE ENCARGA DE IR MOSTRANDO CADA UNO DE LOS PASOS DEL FORMULARIO
import FormularioPasos from '../mantenimientos_forms/formPasos';


import { Container, Button} from 'reactstrap';
export class MantenimientoPregunta extends Component {
    static displayName = MantenimientoPregunta.name;


    constructor(props) {
        super(props);
        this.state = {
            listaPreguntas: [],
            listaRespuestasPregunta: [],
            modal: false,
            modal3: false,
            data: {},
            proceso: 1,
            alerta: true,
            alerta2: true,
            alerta3: true,
            mensajeRespuesta: {},
            mensajeRespuesta2: {},
            mensajeFormulario: "",
            mensajeFormulario2: "",
            show: false,
            show2: false, //Mostrar accion en editar respuestas
            show3: false,
            modalTitulo: "Parametrización de Pregunta",
            modalTitulo3: "Actualizar respuestas",
            labelButton: "Registrar",
            cabeceras: ["ID", "Pregunta", "Tipo Pregunta", "Sigla", "Métrica", "Tipo Encuesta","Fase CJ", "Estado", "Acciones"],
            cabeceras2: ["Pregunta"],
            cabeceras3: ["ID", "Respuesta"],  //PARA LA TABLA DE EDICIÓN DE RESPUESTAS
            cabeceras4: ["Valor", "Descripción"],
            listaValoresIndicador: [],
            preguntaIndicador: false,

        };

    }

    async ObtenerListaPreguntas() {
        const respuesta = await ObtenerPreguntas();
        this.setState({ listaPreguntas: respuesta });
    }
    async componentDidMount() {
        await this.ObtenerListaPreguntas();
        setTimeout(() => {
            $('#tbl_table_mantenimiento').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerRespuestasPreguntaEncuestaID(id) {
        const respuesta = await ObtenerRespuestasPreguntaEncuestaPorId(id);
        this.setState({ listaRespuestasPregunta: respuesta });
    }


    onClickProcesarPregunta = async (data) => {
        let respuesta = {};


        if (this.state.proceso === 1) {
            respuesta = await InsertarPreguntaEncuesta(data);
        }
           

        else {

            respuesta = await ActualizarPregunta(data);
        }

        if (respuesta.indicador === 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            Swal.fire({
                icon: 'success',
                title: respuesta.mensaje,
                showConfirmButton: false,
                timer: 1500
            });

            $('#tbl_table_mantenimiento').DataTable().destroy();


        } else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: respuesta.mensaje,
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }

        await this.ObtenerListaPreguntas();

        setTimeout(() => {
            $('#tbl_table_mantenimiento').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ show: true });
    }


    onClickInactivarPregunta = async (id) => {
        const respuesta = await InactivarPreguntaEncuesta(id)
        if (respuesta.indicador === 0) {
            await this.ObtenerListaPreguntas();
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });
    }


    onClickNuevaPregunta = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal2: !this.state.modal2 });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Crear Nueva Pregunta" });
    }



    onClickActualizarPregunta = async (id) => {
        this.setState({ data: await ObtenerPreguntaPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Pregunta ID: " + id });
    }

    async ObtenerValoresIndicador(id) {
        const respuesta = await ObtenerValoresIndicadorPorID(id);
        this.setState({ listaValoresIndicador: respuesta });
    }

    onClickActualizarRespuestasPregunta = async (id, respuesta, item) => {

        if (item.idTipoIndicador !== 0) {
            this.setState({ preguntaIndicador: true });
            this.ObtenerValoresIndicador(item.idTipoIndicador)
        }
        

        await this.ObtenerRespuestasPreguntaEncuestaID(id);
        this.setState({ proceso: 2 });
        this.setState({ modal3: !this.state.modal3 });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Respuesta de: " + respuesta });

    }



    onClickProcesarRespuestasPregunta = async (data) => {
        
        let respuesta = {};
        if (this.state.proceso === 1) {
            respuesta = await AgregarRespuestaPreguntaEncuesta(data);
        }
            
        else {

            respuesta = await ActualizarRespuestasPreguntaEncuesta(data);
            this.setState({ modal3: false });
        }
        
        if (respuesta.indicador === 0) {
            this.setState({ mensajeRespuesta2: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.onClickCerrarModal2();
            this.onClickCerrarModal3();
            this.setState({ modal: false });
            Swal.fire({
                icon: 'success',
                title: 'Respuestas guardadas',
                showConfirmButton: false,
                timer: 1500
            });



        } else {
            this.setState({ mensajeFormulario2: respuesta.mensaje });
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: respuesta.mensaje,
                footer: '<a href="">Why do I have this issue?</a>'
            });

        }

        this.setState({ show2: true });
    }




    onClickGuardarRespuestas = () => {
        this.state.listaRespuestasPregunta.map((item, index) => (
            this.onClickProcesarRespuestasPregunta(item)
        ));
        this.onClickCerrarModal3();
        Swal.fire({
            icon: 'success',
            title: 'Respuestas guardadas',
            showConfirmButton: false,
            timer: 1500
        });
    }


    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
        this.setState({ show:false });
    }

    onClickCerrarModal2 = () => {
        this.setState({ modal2: false });
        this.setState({ mensajeFormulario: "" });
        this.setState({ show2: false });

    }

    onClickCerrarModal3 = () => {
        this.setState({ modal3: false });
        this.setState({ mensajeFormulario: "" });
        this.setState({ show3: false });
        this.setState({ preguntaIndicador: false });
    }


    body = () => {
        return this.state.listaPreguntas.map((item, index) => (
            
            <tr key={index}>
                <td>{item.idPreguntaEncuesta}</td>
                <td>{item.pregunta}</td>
                <td>{item.tipo}</td>
                <td>{item.sigla ? item.sigla : "N/A" }</td>
                <td>{item.metrica}</td>
                <td>{item.tipoEncuesta}</td>
                <td>{item.faseCustomerJourney}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ padding: "0.5vw", width: "15vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarPregunta(item.idPreguntaEncuesta)} style={{ marginRight: "0.5vw" }}>Editar
                    </Button>

                    <Button color="secondary" onClick={() => this.onClickActualizarRespuestasPregunta(item.idPreguntaEncuesta, item.pregunta, item)} style={{ marginRight: "0.5vw" }}>Respuestas</Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarPregunta(item.idPreguntaEncuesta)} style={{ marginLeft: "0", marginTop: "0vw" }}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr >
        ))
    }

    onChangeClasificacion(e, item, index) {
        let items = [...this.state.listaRespuestasPregunta];
        item.respuesta = e.target.value;
        items[index] = item;
        this.setState({ listaRespuestasPregunta: items });
    }


    respuestas = () => {
        return this.state.listaRespuestasPregunta.map((item, index) => (
            <tr key={index}>
                <td>{item.idRespuesta}</td>
                <td>
                    <InputTabla onChange={e => this.onChangeClasificacion(e, item, index)} id='txt-descripcion' type='text' placeholder='Descripcion' value={item.respuesta} mensajeValidacion="" />
                </td>
            </tr>
        ))
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
                <div class="row-full">Mantenimiento Preguntas</div>
              
                <Container>

                    <Button className="btn_insert" onClick={() => this.onClickNuevaPregunta()}>Insertar Nueva Pregunta</Button>
                    <hr />

                    <Table tableHeading={this.state.cabeceras} body={this.body()} />


                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>

                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarPregunta={this.onClickProcesarPregunta} mensaje={this.state.mensajeFormulario} />

                    </FormularioModal>


                    {/*PARA FORM DE PASOS*/}
                    <FormularioModal show={this.state.modal2} handleClose={this.onClickCerrarModal2} titulo={this.state.modalTitulo} className=''>


                        {/*COMPONENTE QUE VA MOSTRANDO LOS PASOS (LOS DEMÁS COMPONENTES O FORMS)*/}
                        <FormularioPasos data={this.state.data} proceso={this.state.proceso} onClickProcesarPregunta={this.onClickProcesarPregunta} onClickProcesarRespuestasPregunta={this.onClickProcesarRespuestasPregunta} />

                    </FormularioModal>


                    <FormularioModal show={this.state.modal3} handleClose={this.onClickCerrarModal3} titulo={this.state.modalTitulo} className=''>
                        <div style={{overflowY: "auto", height: "498px" }} id="formOpciones">
                            <h4>Opciones</h4>
                            
                        
                        {

                            this.state.preguntaIndicador === true ? <Table tableHeading={this.state.cabeceras4} body={this.valores()} /> : <Table tableHeading={this.state.cabeceras3} body={this.respuestas()} />

                        }
                        </div>
                        
                        <Button className="primary btn btn-primary btn-sm" onClick={ () => this.onClickGuardarRespuestas()} style={{ marginRight: "1vw" }}>Guardar
                        </Button>
                    </FormularioModal>


                </Container >
                <Container className="cont">
                </Container>
            </main>
        );
    }
}