import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';


export class MantenimientoEncuesta extends Component {
    static displayName = MantenimientoEncuesta.name;


    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Encuesta </div>
                <Container>
                    <Row>
                        <Col md={4}>

                            <div className="item1">
                                <h6 className="heading3">Encuesta</h6>
                                <input type="text" name="codigo_encuesta" />
                                <input type="text" name="descripcion_encuesta" />
                            </div>
                        </Col>

                        <Col md={4}>

                            <div className="item1">
                                <h6 className="heading3">Tipo encuesta </h6>
                                <input type="text" name="codigo_tipo" />
                                <input type="text" name="descripcion_tipo" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Fase CX</h6>
                                <input type="text" name="codigo_fase" />
                                <input type="text" name="descripcion_fase" />

                            </div>
                        </Col>
                     </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Interracción</h6>
                                <input type="text" name="codigo_interraccion" />
                                <input type="text" name="descripcion_interracion" />
                            </div>
                        </Col>
                    </Row>


                    <table className="table table-bordered table" name="table_encuesta">
                        <thead className="titulo2">
                            <tr >
                                <th>Secuencia</th>
                                <th>Descripción</th>
                                <th>Indicador</th>


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
                            <input type="text" placeholder="" name="usuario_adicion_taller" />

                        </div>

                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Modificado por</h6>
                            <input type="text" className="etiqueta" name="fecha_modificacion" />
                            <input type="text" placeholder="" name="usuario_modificacion_taller" />
                        </div>

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
                </Container>
               
          

                </main>
            );
    }
}