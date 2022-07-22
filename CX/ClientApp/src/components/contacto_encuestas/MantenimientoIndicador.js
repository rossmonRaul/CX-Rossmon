import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class MantenimientoIndicador extends Component {
    static displayName = MantenimientoIndicador.name;


    render() {
        return (
            <main>
                <div class="row-full">Mantenimiento Indicador </div>

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
                                <h6 className="heading4">Mínimo </h6>
                                <input type="text" name="minimo_indicador" />

                            </div>
                        </Col>
                    
                        <Col md={3}>
                            <div className="item1">
                                <h6 className="heading4">Máximo </h6>
                                <input type="text" name="maximo_indicador" />

                            </div>
                        </Col>

                       
                    </Row>

                    <table className="table table-bordered table" name="table_indicador">
                        <thead className="titulo2">
                            <tr >
                                <th>Sigla</th>
                                <th>Descripción</th>
                                <th>Mínimo</th>
                                <th>Máximo</th>


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