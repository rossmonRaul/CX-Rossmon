import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class MantenimientoTipoEncuesta extends Component {
    static displayName = MantenimientoTipoEncuesta.name;


    render() {
        return (
            <main>
                <div class="row-full">Mantenimiento Tipo de Encuesta </div>


                <Container>


                    <Row>
                        <Col md={3}>
                            <div className="item1">
                                <h6 className="heading4">Código encuesta </h6>
                                <input type="text" name="codigo_encuesta" />

                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="item1">
                                <h6 className="heading4">Descripción encuesta </h6>
                                <input type="text" name="descripcion_encuesta" />

                            </div>
                        </Col>

                        <Col md={3}>

                        </Col>
                        <Col md={3}>

                        </Col>
                    </Row>

                    <table className="table table-bordered table" name="table_tipo_encuesta">
                        <thead className="titulo2">
                            <tr >
                                <th>Código</th>
                                <th>Descripción</th>



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