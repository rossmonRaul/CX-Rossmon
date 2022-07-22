import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class ReportesHallazgos extends Component {
    static displayName = ReportesHallazgos.name;


    render() {
        return (
            <main>

                <div class="row-full">Información General de Definición del Hallazgo</div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Fases del Customer Journey </h6>
                                <select className="etiqueta" name="codigo_customer" ></select>
                                <input type="text" name="descripcion_customer" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Taller de Co Creación</h6>
                                <select className="etiqueta" name="codigo_taller" ></select>
                                <input type="text" name="descripcion_taller" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado del Hallazgo</h6>
                                <select className="etiqueta" name="codigo_estado" ></select>
                                <input type="text" name="descripcion_estado" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Solución</h6>
                                <select className="etiqueta" name="codigo_solucion" ></select>
                                <input type="text" name="descripcion_solucion" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Servicio</h6>
                                <select className="etiqueta" name="codigo_servicio" ></select>
                                <input type="text" name="descripcion_servicio" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Macro Actividad del Hallazgo</h6>
                                <select className="etiqueta" name="codigo_macro" ></select>
                                <input type="text" name="descripcion_macro" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Nivel de Implacto</h6>
                                <select className="etiqueta" name="codigo_impacto" ></select>
                                <input type="text" name="descripcion_impacto" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Nivel de Esfuerzo</h6>
                                <select className="etiqueta" name="codigo_esfuerzo" ></select>
                                <input type="text" name="descripcion_esfuerzo" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado de Aceptación</h6>
                                <select className="etiqueta" name="codigo_aceptacion" ></select>
                                <input type="text" name="descripcion_aceptacion" />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Formato de la impresión</h6>
                                <select className="etiqueta" name="codigo_formato" ></select>
                                <input type="text" name="descripcion_formato" />
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>

                        </Col>
                        <Col md={3}>
                            <button id="btnGuardar" type="button" className="btn  btn-block botones" >Resumen</button>
                        </Col>

                        <Col md={3}>
                            <button id="btnGuardar" type="button" className="btn  btn-block botones ">Detallado</button>
                        </Col>

                        <Col md={3}>

                        </Col>
                    </Row>

                </Container >

             
           
             
            </main>
        );
    }
}