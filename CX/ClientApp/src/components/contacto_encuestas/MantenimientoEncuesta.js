import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerTipoIndicadorPorId, ObtenerValoresIndicadorPorID, ActualizarValorIndicador, InactivarTipoIndicador, ActualizarTipoIndicador, AgregarTipoIndicador } from '../../servicios/ServicioTipoIndicador';
import { ObtenerEncuestas, ObtenerEncuestaPorId, InactivarEncuesta, ActualizarEncuesta, AgregarEncuesta } from '../../servicios/ServicioEncuesta';
import { AsignarPregunta, ObtenerPreguntasPorIdEncuesta, DesasignarPregunta } from '../../servicios/ServicioPreguntasAsignadas';
import { ObtenerRespuestasPreguntaEncuestaPorId } from '../../servicios/ServicioRespuestasPreguntaEncuesta';
import { InputTabla } from '../components_forms/inputs'
import { BsClipboard,BsPlusCircle, BsFillFileEarmarkTextFill, BsFillEyeFill } from "react-icons/bs";
import { StylesManager, Model } from "survey-core";
import { Survey, PopupSurvey } from 'survey-react-ui';
import "survey-core/defaultV2.min.css";
import Modal from 'react-bootstrap/Modal';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table, Table2, Table3, Table4} from '../Table';
import {ObtenerPreguntas } from '../../servicios/ServicioPreguntasEncuestas'
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formEncuesta';

export class MantenimientoEncuesta extends Component {
    static displayName = MantenimientoEncuesta.name;

    constructor(props) {
        super(props);
        this.state = {
            listaRespuestasPregunta:[],
            listaEncuestas: [],
            listaPreguntasEncuesta: [],
            listaPreguntasTipoEncuesta: [],
            listaTodasPreguntas:[],
            pendiente: false,
            data: {},
            modal: false,
            modal2: false,
            proceso: 1,
            modalTitulo: "Registrar Encuesta",
            modalTitulo2: "Opciones",
            labelButton: "Registrar",
            labelButton2:"Salir",
            mensajeFormulario: "",
            mensajeError: "",
            mensajeRespuesta: {},
            mensajeRespuesta2: {},
            mensajeRespuesta3: {},
            show: false,
            show2: false,
            show3: false,
            showEncuesta:false,
            showModal:false,
            alerta: true,
            alerta2: true,
            alerta3: false,
            cabeceras: ["", "Id Encuesta", "Nombre de la Encuesta", "Descripción", "Tipo", "FaseCJ", "Tipo de Contacto", "Estado", "Acción"],
            cabecerasPreguntas: ["ID", "Pregunta", "Tipo Pregunta", "Sigla", "Métrica", "Tipo Encuesta", "Acciones"],
            showComponentePreguntas: false,
            showComponenteAsignarPreguntas: false,
            encuestaSeleccionada: '',
            encuestaSeleccionadaTitulo: ["ID", "Nombre", "Descripción", "Tipo", "FaseCJ", "Tipo de Contacto", "Estado"],
            cabeceras3: ["ID", "Opción"],
        };

    }


    async componentDidMount() {
        await this.ObtenerListaEncuestas();
        
        setTimeout(() => {
            $('#tbl_table_mantenimiento').DataTable(
                {
                    'columnDefs': [{
                        'targets': 0,
                        'orderable': false,
                    }],
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],


                });
        }, 100);
    }

    async ObtenerTodasLasPreguntas() {
        const respuesta = await ObtenerPreguntas();
        
        let preguntasFiltradas = respuesta.filter(pregunta => pregunta.tipoEncuesta === this.state.encuestaSeleccionada.tipoEncuesta);
        this.state.listaPreguntasEncuesta.forEach(function (e) {
            
            preguntasFiltradas = preguntasFiltradas.filter(pregunta => pregunta.idPreguntaEncuesta !== e.idPreguntaEncuesta);
            
        });
        this.setState({ listaTodasPreguntas: preguntasFiltradas });

    }

    async ObtenerListaEncuestas() {
        const respuesta = await ObtenerEncuestas();
        this.setState({ listaEncuestas: respuesta });
    }


    async ObtenerListaPreguntasEncuesta() {
        const respuesta = await ObtenerPreguntasPorIdEncuesta(this.state.encuestaSeleccionada.idEncuesta);
        this.setState({ listaPreguntasEncuesta: respuesta });
    }

    onClickNuevoTipoIndicador = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Crear Encuesta" });
    }

    onClickInactivarEncuesta = async (id) => {
        const respuesta = await InactivarEncuesta(id)
        if (respuesta.indicador === 0) {
            await this.ObtenerListaEncuestas();
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });
    }

    onClickDesasignarPregunta = async (id) => {
        const respuesta = await DesasignarPregunta(id)
        if (respuesta.indicador === 0) {
            await ObtenerPreguntasPorIdEncuesta(this.state.encuestaSeleccionada.idEncuesta);
            this.setState({ alerta2: true });
        } else {
            this.setState({ alerta2: false });
        }
        this.setState({ mensajeRespuesta2: respuesta });
        this.setState({ show2: true });

        $('#tbl_table_mantenimiento4').DataTable().destroy();
        await this.ObtenerTodasLasPreguntas();
        setTimeout(() => {
            $('#tbl_table_mantenimiento4').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "language": {
                        "emptyTable": "No hay más preguntas para asignar"
                    }
                });
        }, 100);
        
        $('#tbl_table_mantenimiento3').DataTable().destroy();
        await this.ObtenerListaPreguntasEncuesta();
        setTimeout(() => {
            $('#tbl_table_mantenimiento3').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "language": {
                        "emptyTable": "Esta encuesta no tiene preguntas aún"
                    }
                });
        }, 100);

    }
    ProcesarAsignarPregunta = async (idPregunta) => {
        const datos = {
            IdPreguntaEncuesta: parseInt(idPregunta),
            IdEncuesta: parseInt(this.state.encuestaSeleccionada.idEncuesta),
        };
        const respuesta = await AsignarPregunta(datos)
        if (respuesta.indicador === 0) {
            await ObtenerPreguntasPorIdEncuesta(this.state.encuestaSeleccionada.idEncuesta);
            this.setState({ alerta3: true });
        } else {
            this.setState({ alerta3: false });
        }
        this.setState({ mensajeRespuesta3: respuesta });
        this.setState({ show3: true });

        $('#tbl_table_mantenimiento3').DataTable().destroy();
        await this.ObtenerListaPreguntasEncuesta();
        setTimeout(() => {
            $('#tbl_table_mantenimiento3').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "language": {
                        "emptyTable": "Esta encuesta no tiene preguntas aún"
                    }
                });
        }, 100);

        $('#tbl_table_mantenimiento4').DataTable().destroy();
        await this.ObtenerTodasLasPreguntas();
        setTimeout(() => {
            $('#tbl_table_mantenimiento4').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "language": {
                        "emptyTable": "No hay más preguntas para asignar"
                    }
                });
        }, 100);

    }
    onClickActualizarTipoIndicador = async (id) => {
        this.setState({ data: await ObtenerEncuestaPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Encuesta" });
    }

    onClickAsignarPreguntas = async () => {
        await this.ObtenerTodasLasPreguntas();
        setTimeout(() => {
            $('#tbl_table_mantenimiento4').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "language": {
                        "emptyTable": "No hay más preguntas para asignar",
                         "search": "Buscar por id, pregunta, tipo de pregunta, etc..."
                    },

                });
        }, 100);
        this.setState({showModal:true})
        this.setState({showComponenteAsignarPreguntas:!this.state.showComponenteAsignarPreguntas})
    }

    onClickPreguntas = async (item) => {

 
        this.setState({ showComponentePreguntas: !this.state.showComponentePreguntas });
        this.state.encuestaSeleccionada = item;
        await this.ObtenerListaEncuestas();
        await this.ObtenerListaPreguntasEncuesta();
        
        setTimeout(() => {
            $('#tbl_table_mantenimiento2').DataTable(
                {
                    "searching": false,
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "bPaginate": false,
                    "bInfo": false,
                    "ordering": false,
                });
        }, 100);


        setTimeout(() => {

            $('#tbl_table_mantenimiento3').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                    "language": {
                        "emptyTable": "Esta encuesta no tiene preguntas aún"
                    }
                });
        }, 100);


    }
    onClickRegresar = async () => {
        this.setState({ showComponentePreguntas: false });
        
        this.setState({ showComponenteAsignarPreguntas: false });
        setTimeout(() => {
            $('#tbl_table_mantenimiento').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                                                 'columnDefs': [{
                        'targets': 0, /* column index */
                        'orderable': false, /* true or false */
                    }]
                });
        }, 100);
    }
    onClickCerrar = async () => {
        this.setState({ showModal: false });
    }

    onClickProcesarEncuesta = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1) {

            respuesta = await AgregarEncuesta(data);
            this.setState({ show3: false });

        }
        else {

            respuesta = await ActualizarEncuesta(data);

        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });
            this.setState({ show3: false });
            this.setState({ mensajeFormulario: "" });
            $('#tbl_table_mantenimiento').DataTable().destroy();

            await this.ObtenerListaEncuestas();

            setTimeout(() => {
                $('#tbl_table_mantenimiento').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                             'columnDefs': [{
                            'targets': 0, /* column index */
                            'orderable': false, /* true or false */
                        }]
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
        this.setState({ show3: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickOjo = (item) => {
        this.setState({ showEncuesta: true });
        console.log(item);
    }


    body = () => {
        return this.state.listaEncuestas.map((item, index) => (
            <tr  key={index}>
                <td> <div className="ojo"><BsFillEyeFill onClick={() => this.onClickOjo(item)} size={30} /></div></td>
                <td>{item.idEncuesta}</td>
                <td>{item.nombre}</td>
                <td>{item.descripcion}</td>
                <td>{item.tipoEncuesta}</td>
                <td>{item.faseCustomerJourney}</td>
                <td>{item.tipoContactoEncuesta}</td>
                
                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarTipoIndicador(item.idEncuesta)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color="secondary" onClick={() => this.onClickPreguntas(item)} style={{ marginRight: "1vw" }}>Preguntas
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarEncuesta(item.idEncuesta)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }

    bodyPreguntas = () => {
        return this.state.listaPreguntasEncuesta.map((item, index) => (
            <tr key={index}>
                <td>{item.idPreguntaEncuesta}</td>
                <td>{item.pregunta}</td>
                <td>{item.tipo}</td>
                <td>{item.sigla}</td>
                <td>{item.tipoMetrica}</td>
                <td>{item.tipoEncuesta}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}

                <td style={{ display: "flex", padding: "0.5vw" }}>
                    
                    <Button color="secondary" onClick={() => this.onClickMostrarOpcionesPregunta(item.idPreguntaEncuesta, item.pregunta)} style={{ marginRight: "1vw" }}>Opciones</Button>

                    <Button color={"danger"} onClick={() => this.onClickDesasignarPregunta(item.idAsignacion)}> {"Desasignar"}
                    </Button>

                    
                </td>
            </tr>
        ))
    }

    bodyAsignarPreguntas = () => {
        return this.state.listaTodasPreguntas.map((item, index) => (
            <tr key={index}>
                <td>{item.idPreguntaEncuesta}</td>
                <td>{item.pregunta}</td>
                <td>{item.tipo}</td>
                <td>{item.sigla}</td>
                <td>{item.metrica}</td>
                <td>{item.tipoEncuesta}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}

                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color={"success"} onClick={() => this.ProcesarAsignarPregunta(item.idPreguntaEncuesta)}> {"Asignar"}
                    </Button>
                    
                </td>
            </tr>
        ))
    }

    tituloEncuestaSeleccionada = () => {
        return (

            <tr key={ this.state.encuestaSeleccionada.idEncuesta}>
                <td>{this.state.encuestaSeleccionada.idEncuesta}</td>
                <td>{this.state.encuestaSeleccionada.nombre}</td>
                <td>{this.state.encuestaSeleccionada.descripcion}</td>
                <td>{this.state.encuestaSeleccionada.tipoEncuesta}</td>
                <td>{this.state.encuestaSeleccionada.faseCustomerJourney}</td>
                <td>{this.state.encuestaSeleccionada.tipoContactoEncuesta}</td>
                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={this.state.encuestaSeleccionada.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                        {this.state.encuestaSeleccionada.estado === true ? "Activo" : "Inactivo"}</td>
                </tr>)
        
    }
    onClickCerrarModal2 = () => {
        this.setState({ modal2: false });
        this.setState({ mensajeFormulario: "" });
    }

    async ObtenerRespuestasPreguntaEncuestaID(id) {
        const respuesta = await ObtenerRespuestasPreguntaEncuestaPorId(id);
        this.setState({ listaRespuestasPregunta: respuesta });
    }
    onClickMostrarOpcionesPregunta = async (id, respuesta) => {
        await this.ObtenerRespuestasPreguntaEncuestaID(id);
        this.setState({ modal2: !this.state.modal2 });
        this.setState({ modalTitulo2: "Opciones de: " + respuesta });
    }

    respuestas = () => {
        return this.state.listaRespuestasPregunta.map((item, index) => (
            <tr key={index}>
                <td>{item.idRespuesta}</td>
                <td>
                    <InputTabla id='txt-descripcion' type='text' placeholder='Descripcion' value={item.respuesta} disabled />
                </td>
            </tr>
        ))
    }
    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Encuestas</div>

                {!this.state.showComponentePreguntas ?
                    <Container>
                        <Button className="btn_insert" onClick={() => this.onClickNuevoTipoIndicador()}>Crear Encuesta  <BsPlusCircle /></Button>
                        <hr />

                        {/*ALERTA*/}

                        {this.state.show ?
                            <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                                {this.state.mensajeRespuesta.mensaje}
                            </Alert>
                            : ""}
                        <h1>Encuestas</h1>
                        <Table tableHeading={this.state.cabeceras} body={this.body()} />

                        <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                            {this.state.show3 ?
                                <Alert variant={this.state.alerta3 === true ? "success" : "danger"} onClose={() => this.setState({ show3: false })} dismissible>
                                    {this.state.mensajeError}
                                </Alert>
                                : ""}
                            <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarEncuesta={this.onClickProcesarEncuesta} mensaje={this.state.mensajeFormulario} />
                        </FormularioModal>

                    </Container>

                    : null}
                    
                {this.state.showComponentePreguntas ? 
                    <Container>
                        <button onClick={() => this.onClickRegresar()} type="button" className="btn btn-danger btn-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"></path>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"></path>
                        </svg> Regresar</button>
                        
                        <hr />
                        <h1>Encuesta Seleccionada</h1>
                        <Table2 tableHeading={this.state.encuestaSeleccionadaTitulo} body={this.tituloEncuestaSeleccionada()} />
                        <br></br>
                        <Button id="botonasignarpregunta" className="btn_insert" onClick={() => this.onClickAsignarPreguntas()}>Asignar Preguntas <BsPlusCircle /></Button>
                        <h2>Preguntas de la encuesta</h2>
                        
                        {/*ALERTA*/}



                        
                        {this.state.show2 ?
                            <Alert variant={this.state.alerta2 === true ? "success" : "danger"} onClose={() => this.setState({ show2: false })} dismissible>
                                {this.state.mensajeRespuesta2.mensaje}
                            </Alert>
                            : ""}

                        <br />
                        
                        <Table3 tableHeading={this.state.cabecerasPreguntas} body={this.bodyPreguntas()} />
                </Container>
                    : null}

                    
                        




                <FormularioModal show={this.state.modal2} handleClose={this.onClickCerrarModal2} titulo={this.state.modalTitulo2} className=''>

                    <Table tableHeading={this.state.cabeceras3} body={this.respuestas()} />

                    <Button id="botonasignarpregunta" className="btnbtn btn-danger" onClick={() => this.onClickCerrarModal2()} style={{ marginRight: "1vw" }}>Cerrar
                    </Button>

                </FormularioModal>
                

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.showEncuesta}
                    onHide={() => this.setState({ showEncuesta: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Encuesta
                        </Modal.Title>
               

                    </Modal.Header>

                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="secondary" onClick={() => this.setState({ showEncuesta: false })}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Asignar Preguntas
                        </Modal.Title>
                        {/*ALERTA*/}

                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            {this.state.show3 ?
                                <Alert variant={this.state.alerta3 === true ? "success" : "danger"} onClose={() => this.setState({ show3: false })} dismissible>
                                    {this.state.mensajeRespuesta3.mensaje}
                                </Alert>
                                : ""}
                        </div>

                        <Table4 tableHeading={this.state.cabecerasPreguntas} body={this.bodyAsignarPreguntas()} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="secondary" onClick={() => this.onClickCerrar()}>
                            Cerrar
                        </Button>
                        <Button color="primary" onClick={() => this.onClickCerrar()}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
                <br></br>
                <br></br>
            </main>
        );
    }
}