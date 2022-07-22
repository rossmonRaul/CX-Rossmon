import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class AdminHallazgosDireccion extends Component {
    static displayName = AdminHallazgosDireccion.name;


    render() {
        return (
            <main>

                <div class="row-full">Administración de hallazgo asociados a la Dirección </div>

                <Container>

                    <Row>
                        <Col md={4}>

                        </Col>

                        <Col md={4}>

                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Estado a visualizar</h5>
                                <select className="etiqueta" name="estado" >
                                </select>
                            </div>
                        </Col>
                    </Row>
                   

                    <table className="table table-bordered table" name="table_observaciones">
                        <thead className="titulo2">
                            <tr >
                                <th>Secuencia</th>
                                <th>Plazo (Días)</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Fin</th>
                                <th>Nro Oficio</th>
                                <th>% Avance</th>
                                <th>Aceptado</th>
                                <th>Anotaciones</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </Container>


                <div class="row-full">Información General del Hallazgo Consultado</div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Fases del Customer Journey </h6>
                                <input type="text" className="etiqueta" name="codigo_customer" />
                                <input type="text" name="descripcion_customer" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Taller de Co Creación</h6>
                                <input type="text" className="etiqueta" name="codigo_taller" />
                                <input type="text" name="descripcion_taller" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Solución</h6>
                                <input type="text" className="etiqueta" name="codigo_solucion" />
                                <input type="text" name="descripcion_solucion" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Servicio</h6>
                                <input type="text" className="etiqueta" name="codigo_servicio" />
                                <input type="text" name="descripcion_servicio" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Macro Actividad del Hallazgo</h6>
                                <input type="text" className="etiqueta" name="codigo_macro" />
                                <input type="text" name="descripcion_macro" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Nivel de Implacto</h6>
                                <input type="text" className="etiqueta" name="codigo_impacto" />
                                <input type="text" name="descripcion_impacto" />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Nivel de Esfuerzo</h6>
                                <input type="text" className="etiqueta" name="codigo_esfuerzo" />
                                <input type="text" name="descripcion_esfuerzo" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado de Aceptación</h6>
                                <input type="text" className="etiqueta" name="codigo_aceptacion" />
                                <input type="text" name="descripcion_aceptacion" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Nro. Oficio de Envio</h6>
                                <input type="text" className="etiqueta" name="codigo_oficio" />
                                <input type="text" name="descripcion_oficio" />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Otras direcciones asociadas</h6>
                                <input type="text" className="etiqueta" name="codigo_direccion" />
                                <input type="text" name="descripcion_direccion" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Detalle del Hallazgo</h6>
                                <textarea className="etiqueta" name="detalle_hallazgo"></textarea>
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>
                    <Row>
                        
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