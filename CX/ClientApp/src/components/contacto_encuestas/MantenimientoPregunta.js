import React, { Component } from 'react';

import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class MantenimientoPregunta extends Component {
    static displayName = MantenimientoPregunta.name;


    render() {
        return (
            <main>
                <div class="row-full">Mantenimiento preguntas de Encuestas</div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading4">Secuencia </h6>
                                <input type="text" name="secuencia_pregunta" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading4">Pregunta </h6>
                                <textarea type="text" className="textarea2" name="pregunta" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Fase del CX </h6>
                                <input type="text" name="codigo_fase" />
                                <input type="text" name="descrip_fase" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Indicador </h6>
                                <input type="text" name="sigla_indicador" />
                                <input type="text" name="sigla_descripcion" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Métrica </h6>
                                <input type="text" name="codigo_metrica" />
                                <input type="text" name="descripcion_metrica" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Perspectiva </h6>
                                <input type="text" name="codigo_metrica" />
                                <input type="text" name="descripcion_metrica" />
                            </div>
                        </Col>
                    </Row>

                    <table className="table table-bordered table" name="table_pregunta">
                        <thead className="titulo2">
                            <tr >
                                <th>Secuencia</th>
                                <th>Pregunta</th>
                                <th>Fase del CX</th>
                                <th>Indicacdor</th>
                                <th>Métrica</th>
                                <th>Perspectiva</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                    <Row>
                        <Col md={4}>
                            
                                <div className="item1">
                                    <h6 className="heading3"> Adicionado por</h6>
                                    <input type="text" className="etiqueta" name="fecha_adicion" />
                                    <input type="text" placeholder="" name="usuario_adicion_pregunta" />

                                

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Modificado por</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion_pregunta" />
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

          

                </main>
            );
    }
}