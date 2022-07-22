import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class EvidenciaTalleres extends Component {
    static displayName = EvidenciaTalleres.name;


    render() {
        return (
            <main>

                <div class="row-full">Evidencia para los talleres de Co Creación por Dirección </div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Secuencia</h5>
                                <select className="etiqueta" name="secuencia_hallazgos" >
                                </select>

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
                                <h5 className="heading3">Fases</h5>
                                <input type="text" className="etiqueta" name="codigo_fase" />
                                <input type="text" name="descripcion_fase" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Etapas</h5>
                                <input type="text" className="etiqueta" name="codigo_etapa" />
                                <input type="text" name="desripcion_etapa" />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Comentarios Generales</h5>
                                <textarea className="etiqueta" name="coment_general"></textarea>
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>

                  
                    <div class="heading2">Observaciones </div>
                    <table className="table table-bordered table" name="table_observaciones">
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
                </Container >



               
            </main>
        );
    }
}