import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class MantenimientoAnotaciones extends Component {
    static displayName = MantenimientoAnotaciones.name;


    render() {
        return (
            <main>
                <div class="row-full">Historico de anotaciones </div>
                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Fecha</h5>
                                <input type="text" name="fecha_anotacion" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Dirección</h5>
                                <input type="text" name="codigo_direccion" />
                                <input type="text" name="descripcion_direccion" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Responsable</h5>
                                <input type="text" name="codigo_responsable" />
                                <input type="text" name="nombre_responsable" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="col-md-12">
                                <h5 className="heading3">Descripción de la anotación</h5>
                                <textarea className="etiqueta" name="descripcion_anotacion"></textarea>
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>
                    <table className="table table-bordered table" name="table_anotacion">
                        <thead className="titulo2">
                            <tr >
                                <th>Fecha</th>
                                <th>Dirección</th>
                                <th>Responsable</th>


                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

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