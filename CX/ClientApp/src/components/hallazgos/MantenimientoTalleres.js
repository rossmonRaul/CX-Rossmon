import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class MantenimientoTalleres extends Component {
    static displayName = MantenimientoTalleres.name;


    render() {
        return (
            <main>
                <div class="row-full">Talleres de Co Creación </div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Secuencia</h5>
                                <input type="text" className="etiqueta" name="secuencia_taller" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Tipo de taller</h5>
                                <input type="text" className="etiqueta" name="codigo_taller" />
                                <input type="text" name="descripcion_taller" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Solución</h5>
                                <input type="text" className="etiqueta" name="codigo_solucion" />
                                <input type="text" name="descripcion_solucion" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Servicio</h5>
                                <input type="text" className="etiqueta" name="codigo_servicio" />
                                <input type="text" name="descripcion_servicio" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Oficio Autoriza Talleres</h5>
                                <input type="text" className="etiqueta" name="oficio_taller" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Fecha</h5>
                                <input type="text" className="etiqueta" name="fecha_oficio" />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <div className="item1">
                                <h5 className="heading3">Descripción General</h5>
                                <textarea className="etiqueta" name="descripcion_anotacion"></textarea>
                            </div>
                        </Col>

                       
                    </Row>


                    <div class="heading2">Equipo de Trabajo </div>
                    <table className="table table-bordered table" name="table_equipo">
                        <thead className="titulo2">
                            <tr >
                                <th>Dirección</th>
                                <th>Participante</th>
                                <th>Asistencia</th>
                                <th>Nro. Fase Customer Journey</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
               


                <Row>
                    <Col md={4}>
                        <div className="item1">
                            <h5 className="heading3"> Adicionado por</h5>
                            <input type="text" className="etiqueta" name="fecha_adicion" />
                            <input type="text" placeholder="" name="usuario_adicion_taller" />

                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h5 className="heading3">Modificado por</h5>
                            <input type="text" className="etiqueta" name="fecha_modificacion" />
                            <input type="text" placeholder="" name="usuario_modificacion_taller" />
                        </div>
                    </Col>

                    <Col md={4}>

                    </Col>
                </Row>
               
                </Container >


                <div class="row-full">Observaciones </div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Etapa</h5>
                                <input type="text" className="etiqueta" name="codigo_etapa" />
                                <input type="text" placeholder="" name="udescripcion_etapa" />

                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>


                    <table className="table table-bordered table" name="table_observacion">
                        <thead className="titulo2">
                            <tr >
                                <th>Secuencia</th>
                                <th>Macro actividad</th>
                                <th>Observaciones</th>
                                <th>Anexos</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
              


                <Row>
                    <Col md={4}>
                        <div className="item1">
                            <h5 className="heading3"> Adicionado por</h5>
                            <input type="text" className="etiqueta" name="fecha_adicion" />
                            <input type="text" placeholder="" name="usuario_adicion_taller" />

                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h5 className="heading3">Modificado por</h5>
                            <input type="text" className="etiqueta" name="fecha_modificacion" />
                            <input type="text" placeholder="" name="usuario_modificacion_taller" />
                        </div>
                    </Col>

                    <Col md={4}>

                    </Col>
                </Row>
                

                </Container >
              
              
            </main>
        );
    }
}