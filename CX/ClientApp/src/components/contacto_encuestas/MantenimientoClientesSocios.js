import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class MantenimientoClientesSocios extends Component {
    static displayName = MantenimientoClientesSocios.name;


    render() {
        return (
            <main>
            <div class="row-full">Mantenimiento de Clientes por Socio</div>

            <Container>
                       <Row>
                        <Col md={3}>
                      
                            <div className="item1">
                                <h6 className="heading4">Clientes </h6>
                                <select name="cliente_socio" ></select>

                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="item1">
                                <h6 className="heading4">Servicios </h6>
                                <select name="servicio_socio" ></select>

                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="item1">
                                <h6 className="heading4">Fase Experiencia Cliente </h6>
                                <select name="fase_socio" ></select>

                            </div>
                        </Col>

                        <Col md={3}>

                            <div className="item1">
                                <h6 className="heading4">Estado servicio</h6>
                                <select name="estado_servicio" ></select>

                            </div>
                        </Col>

                    </Row>

                  

                   
                    <table className="table table-bordered table" name="table_equipo">
                        <thead className="titulo2">
                            <tr >
                                <th>Cliente</th>
                                <th>Servicio</th>
                                <th>Fase Experiencia Cliente</th>
                                <th>Nro. Fase Customer Journey</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </Container >

                </main>
        )
    }
}