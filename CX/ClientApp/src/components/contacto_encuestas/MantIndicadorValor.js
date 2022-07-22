import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class MantIndicadorValor extends Component {
    static displayName = MantIndicadorValor.name;


    render() {
        return (
            <main>
                <div class="row-full">Clasificación por Valor del Indicador  </div>


                <Container>


                    <Row>
                        <Col md={3}>
                            <div className="item1">
                                <h6 className="heading4">Descripción indicador </h6>
                                <input type="text" name="descrip_indicador" />

                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="item1">
                                <h6 className="heading4">Siglas </h6>
                                <input type="text" name="sigla_indicador" />

                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="item1">
                                <h6 className="heading4">Descripción clasificación </h6>
                                <input type="text" name="descrip_clasificación" />

                            </div>
                        </Col>
                    </Row>

                    <table className="table table-bordered table" name="table_indicador_clasificacion">
                        <thead className="titulo2">
                            <tr>
                                <th>Código</th>
                                <th>Descripción clasificación</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                    <Row>
                        <Col md={4}>

                            <div className="item1">
                                <h6 className="heading3"> Adicionado por</h6>
                                <input type="text" className="etiqueta" name="fecha_adicion_" />
                                <input type="text" placeholder="" name="usuario_tipo_encuesta" />



                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Modificado por</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion_encuesta" />
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