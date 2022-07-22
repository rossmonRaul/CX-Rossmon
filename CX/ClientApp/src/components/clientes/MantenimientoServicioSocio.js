import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';


export class MantenimientoServicioSocio extends Component {
    static displayName = MantenimientoServicioSocio.name;


    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Servcio asociado al Socio </div>
                <Container>
                    <Row>
                        <Col md={3}>

                            <div className="item1">
                                <h6 className="heading4">Socio</h6>
                                <input type="text" name="codigo_socio" />
                            
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="item1">
                            <h6 className="heading4">Línea de Negocio </h6>
                                <input type="text" name="codigo_linea" />
                            </div>
                        </Col>

                            <Col md={3}>
                                <div className="item1">
                            <h6 className="heading4">Servicio </h6>
                                <input type="text" name="codigo_servicio" />
                            </div>
                        </Col>
                     </Row>

                  

                    <table className="table table-bordered table" name="table_servicio">
                        <thead className="titulo2">
                            <tr >
                                <th>Id socio</th>
                                <th>Id servicio</th>
                                <th>Id línea negocio</th>
                          

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