import React, { Component } from 'react';
import { Table } from '../Table';
import { ObtenerPreguntas, InactivarPreguntaEncuesta, InsertarPreguntaEncuesta, ActualizarPregunta, ObtenerPreguntaPorId } from '../../servicios/ServicioPreguntasEncuestas';
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formPreguntaEncuesta';
import { InputTabla } from '../components_forms/inputs'
import { Alert } from 'react-bootstrap'
import $ from 'jquery';
import { ActualizarRespuestasPreguntaEncuesta, AgregarRespuestaPreguntaEncuesta, ObtenerRespuestasPreguntaEncuestaPorId } from '../../servicios/ServicioRespuestasPreguntaEncuesta';

//COMPONENTE QUE SE ENCARGA DE IR MOSTRANDO CADA UNO DE LOS PASOS DEL FORMULARIO
import FormularioPasos from '../mantenimientos_forms/formPasos';


import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
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
            cabeceras: ["ID", "Pregunta", "Tipo Pregunta", "Sigla", "Métrica", "Tipo Encuesta","Estado", "Acciones"],
            cabeceras2: ["Pregunta"],
            cabeceras3: ["ID", "Respuesta"]  //PARA LA TABLA DE EDICIÓN DE RESPUESTAS
        };

    }

    async ObtenerListaPreguntas() {
        const respuesta = await ObtenerPreguntas();
        this.setState({ listaPreguntas: respuesta });
    }
    async componentDidMount() {
        await this.ObtenerListaPreguntas();
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerRespuestasPreguntaEncuestaID(id) {
        const respuesta = await ObtenerRespuestasPreguntaEncuestaPorId(id);
        this.setState({ listaRespuestasPregunta: respuesta });
        console.log(this.state.listaRespuestasPregunta);
    }


    onClickProcesarPregunta = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await InsertarPreguntaEncuesta(data);
        else {

            respuesta = await ActualizarPregunta(data);
        }
        
        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            
        } else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }

        await this.ObtenerListaPreguntas();

        setTimeout(() => {
            $('#example').DataTable(
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
        //console.log(this.state.data);
    }

 
    onClickActualizarRespuestasPregunta = async (id, respuesta) => {
        await this.ObtenerRespuestasPreguntaEncuestaID(id);
        this.setState({ proceso: 2 });
        this.setState({ modal3: !this.state.modal3 });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Respuesta de: " + respuesta });
    }



    onClickProcesarRespuestasPregunta = async (data) => {

        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarRespuestaPreguntaEncuesta(data);
        else {

            respuesta = await ActualizarRespuestasPreguntaEncuesta(data);
            this.setState({ modal3: false });
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



    onClickGuardarRespuestas = () => {
        this.state.listaRespuestasPregunta.map((item, index) => (
            this.onClickProcesarRespuestasPregunta(item)
        ))
    }


    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickCerrarModal2 = () => {
        this.setState({ modal2: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickCerrarModal3 = () => {
        this.setState({ modal3: false });
        this.setState({ mensajeFormulario: "" });
    }

    
    body = () => {
        return this.state.listaPreguntas.map((item, index) => (
            <tr key={index}>
                <td>{item.idPreguntaEncuesta}</td>
                <td>{item.pregunta}</td>
                <td>{item.tipo}</td>
                <td>{item.sigla}</td>
                <td>{item.metrica}</td>
                <td>{item.tipoEncuesta}</td>


                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === 0 ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === 1 ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarPregunta(item.idPreguntaEncuesta)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color="secondary" onClick={() => this.onClickActualizarRespuestasPregunta(item.idPreguntaEncuesta, item.pregunta)} style={{ marginRight: "1vw" }}>Respuestas</Button>

                    <Button color={item.estado === 1 ? "danger" : "success"} onClick={() => this.onClickInactivarPregunta(item.idPreguntaEncuesta)}> {item.estado === 1 ? "Inactivar" : "Activar"}
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

    render() {
        return (
            <main>
       
                <Container>

                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevaPregunta()}>Insertar Nueva Pregunta</Button>
                    <hr />

                    <br />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    {this.state.show2 ?
                        <Alert variant={this.state.alerta2 === true ? "success" : "danger"} onClose={() => this.setState({ show2: false })} dismissible>
                            {this.state.mensajeRespuesta2.mensaje}
                        </Alert>
                        : ""}
                    <br />


                    <Table tableHeading={this.state.cabeceras} body={this.body()} />


                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                       
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarPregunta={this.onClickProcesarPregunta} mensaje={this.state.mensajeFormulario} />                   

                    </FormularioModal>
                    

                    {/*PARA FORM DE PASOS*/}
                    <FormularioModal show={this.state.modal2} handleClose={this.onClickCerrarModal2} titulo={this.state.modalTitulo} className=''>
                        {this.state.show ?
                            <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                                {this.state.mensajeRespuesta.mensaje}
                            </Alert>
                            : ""}

                        {this.state.show2 ?
                            <Alert variant={this.state.alerta2 === true ? "success" : "danger"} onClose={() => this.setState({ show2: false })} dismissible>
                                {this.state.mensajeRespuesta2.mensaje}
                            </Alert>
                            : ""}

                        {/*COMPONENTE QUE VA MOSTRANDO LOS PASOS (LOS DEMÁS COMPONENTES O FORMS)*/}
                        <FormularioPasos data={this.state.data} proceso={this.state.proceso} onClickProcesarPregunta={this.onClickProcesarPregunta} onClickProcesarRespuestasPregunta={this.onClickProcesarRespuestasPregunta } />
                        
                    </FormularioModal>


                    <FormularioModal show={this.state.modal3} handleClose={this.onClickCerrarModal3} titulo={this.state.modalTitulo} className=''>
                       
                        <Table tableHeading={this.state.cabeceras3} body={this.respuestas()} />
                        <Button className="primary btn btn-primary btn-sm" onClick={() => this.onClickGuardarRespuestas()} style={{ marginRight: "1vw" }}>Guardar
                        </Button>
                    </FormularioModal>


                </Container >

                </main>
            );
    }
}