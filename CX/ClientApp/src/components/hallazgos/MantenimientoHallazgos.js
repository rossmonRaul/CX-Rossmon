import React, { Component, useState } from 'react';
import { InputText, InputSelect } from '../components_forms/inputs'
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerGradosEsfuerzo } from '../../servicios/ServicioGradosEsfuerzo';
import { ObtenerGradoImpacto } from '../../servicios/ServicioGradoImpacto';

export class MantenimientoHallazgos extends Component {
    static displayName = MantenimientoHallazgos.name;
    constructor(props) {
        super(props);
        this.state = {
            gradosEsfuerzo: [],
            gradosImpacto: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            gradoEsfuerzo: '',
            idGradoEsfuerzo: '',
            gradoImpacto: '',
            idGradoImpacto: ''

        }
    }

    async ObtenerGradosEsfuerzo() {
        const respuesta = await ObtenerGradosEsfuerzo();
        this.setState({ gradosEsfuerzo: respuesta });
    }
    async ObtenerGradosImpacto() {
        const respuesta = await ObtenerGradoImpacto();
        console.log(respuesta);
        this.setState({ gradosImpacto: respuesta });
       
    }

    onChangeGradoEsfuerzo = (e) => this.setState({ gradoEsfuerzo: this.state.gradosEsfuerzo.find(obj => obj.idGradoEsfuerzo == e.target.value).gradoEsfuerzo });
    onChangeGradoImpacto = (e) => this.setState({ gradoImpacto: this.state.gradosImpacto.find(obj => obj.idGradoImpacto == e.target.value).gradoImpacto });

    async componentDidMount() {
        await this.ObtenerGradosEsfuerzo();
        await this.ObtenerGradosImpacto();

    }
    render() {
        return (
            <main>
                <div class="row-full">Información General de Definición del Hallazgo </div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3"> Secuencia del hallazgo</h6>
                                <select name="secuencia_hallazgos" >
                                </select>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Fase de Customer Journey</h6>
                                <select name="codigo_fase" >

                                </select>
                                <select name="descripcion_fase" ></select>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Taller de Co Creación</h6>
                                <select className="etiqueta" name="codigo_cocreacion" ></select>
                                <select name="descripcion_cocreacion" ></select>

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Solución Asociada al hallazgo</h6>

                                <select className="etiqueta" name="solucion_hallazgo" ></select>
                                <select name="descripcion_hallazgo" ></select>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Servicio Asociado al Hallazgo </h6>
                                <select className="etiqueta" name="servicio_hallazgo" ></select>
                                <select name="servicio_descripcion" ></select>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Macro Actividad Asociada al Hallazgo </h6>
                                <select className="etiqueta" name="codigo_actividad" ></select>
                                <select name="descripcion_actividad" ></select>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Nivel de Impacto del Hallazgo</h6>
                                <select onChange={this.onChangeGradoImpacto} className="etiqueta" name="codigo_impacto" >
                                    {this.state.gradosImpacto.map(fbb =>
                                        <option key={fbb.idGradoImpacto} value={fbb.idGradoImpacto}>{fbb.idGradoImpacto}</option>
                                    )};
                                </select>
                                <input name="descripcion_impacto" value={this.state.gradoImpacto}></input>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Grado de Esfuerzo del Hallazgo</h6>
                                <select onChange={this.onChangeGradoEsfuerzo} className="etiqueta" name="codigo_esfuerzo" >
                                    {this.state.gradosEsfuerzo.map(fbb =>
                                        <option key={fbb.idGradoEsfuerzo} value={fbb.idGradoEsfuerzo}>{fbb.idGradoEsfuerzo}</option>
                                    )};
                                </select>
                                <input readonly name="descripcion_grado" value={this.state.gradoEsfuerzo} ></input>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado de Aceptación</h6>
                                <select className="etiqueta" name="codigo_estado_aceptacion" ></select>
                                <select name="descripcion_estado_aceptacion" ></select>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado del Hallazgo </h6>
                                <select className="etiqueta" name="codigo_estado" ></select>
                                <select name="descripcion_estado" ></select>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Nro de Oficio del Envio</h6>
                                <select className="etiqueta" name="nro_oficio" ></select>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Porcentaje General</h6>

                                <input type="text" className="etiqueta" name="porcentaje_general" />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Periodicidad de Entrega de Avances</h6>
                                <select className="etiqueta" name="periocidad_avance" ></select>
                                <select name="descripcion_periocidad" ></select>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Detalle General del Hallazgo</h6>
                                <textarea className="etiqueta" name="Detalle_hallazgo"></textarea>

                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>

                        </Col>
                        <Col md={3}>
                            <button id="btnGuardar" type="button" className="btn  btn-block botones" >Guardar</button>
                        </Col>

                        <Col md={3}>
                            <button id="btnGuardar" type="button" className="btn  btn-block botones ">Salir</button>
                        </Col>

                        <Col md={3}>

                        </Col>
                    </Row>
                </Container >
                <div class="row-full">Direcciones y Responsables asignadas al Hallazgo </div>

                <Container>

                    <table className="table table-bordered table" name="table_hallazgo">
                        <thead className="titulo2">
                            <tr >
                                <th>Dirección</th>
                                <th>Responsable</th>
                                <th>Plazo (Días)</th>
                                <th>Fecha inicio</th>
                                <th>Nro. Oficio</th>
                                <th>% Avance</th>
                                <th>Aceptado</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>





                    <Row>
                        <Col md={12}>

                            <h6 className="heading3">Detalle General del Hallazgo</h6>
                            <textarea name="Detalle_direccion_resposable"></textarea>
                        </Col>


                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3"> Adicionado por</h6>
                                <input type="text" className="etiqueta" name="fecha_adicion" />
                                <input type="text" placeholder="" name="usuario_adicion" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Modificado por</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion" />
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>

                </Container >

                <div class="row-full">Fechas relacionadas al Registro</div>
                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3"> Adicionado por</h6>
                                <input type="text" className="etiqueta" name="fecha_adicion" />
                                <input type="text" placeholder="" name="usuario_adicion" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Modificado por</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Finalizado</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion" />
                            </div>
                        </Col>
                    </Row>

                </Container >




            </main>
        );
    }
}


