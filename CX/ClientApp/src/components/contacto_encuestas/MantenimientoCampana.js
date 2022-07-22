import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';

export class MantenimientoCampana extends Component {
    static displayName = MantenimientoCampana.name;

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Campañas </div>


                <Container>
                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Campaña</h6>
                                <input type="text" name="codigo_campaña" />
                                <input type="text" name="descripcion_campaña" />

                            </div>
                        </Col>

                        <Col md={2}>
                            <div className="item1">
                                <h6 className="heading3">Encuesta</h6>
                                <input type="text" name="codigo_encuesta" />

                            </div>
                        </Col>

                        <Col md={2}>
                            <div className="item1">
                                <h6 className="heading3">Canal</h6>
                                <input type="text" name="codigo_canal" />

                            </div>
                        </Col>

                        <Col md={2}>
                            <div className="item1">
                                <h6 className="heading3">Estado</h6>
                                <input type="text" name="codigo_estado" />

                            </div>
                        </Col>
                    </Row>
                    <Row>
                       

                        <Col md={2}>
                            <div className="item1">
                                <h6 className="heading3">Fecha inicio</h6>
                                <input type="date" name="fecha_inicio" />

                            </div>
                        </Col>

                        <Col md={2}>
                            <div class="item1">
                                <h6 className="heading3">Fecha finalizacion</h6>

                                <input type="date" name="fecha_final" />

                            </div>
                        </Col>
                    
                 
                   
                        <Col md={2}>
                            <div className="item1">
                                <h6 className="heading3">Cantidad de días</h6>


                                <input type="text" name="dias" />

                            </div>
                        </Col>

                        <Col md={2}>
                            <div className="item1">
                                <h6 className="heading3">Dirección</h6>


                                <input type="text" name="direccion" />

                            </div>
                        </Col>

                        <Col md={2}>
                            <div className="item1">
                                <h6 className="heading3">Fase</h6>


                                <input type="text" name="fase" />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={2}>
                            <div className="item1">
                                <h6 className="heading3">Contacto</h6>

                                <select className="etiqueta" name="contacto" ></select>

                            </div>
                        </Col>
                        </Row>
                   
                    <div className="heading2">Lista campañas </div>
                    <table className="table table-bordered table" name="table_contacto">
                        <thead>
                            <tr className="titulo2">
                                <th>Código campaña</th>
                                <th>Fecha de aplicación</th>
                                <th>Descripción</th>
                                <th>Dirección</th>
                                <th>Fase CX</th>
                                <th>Contacto</th>
                                <th>Encuesta</th>
                                <th>Estado</th>
                             

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
