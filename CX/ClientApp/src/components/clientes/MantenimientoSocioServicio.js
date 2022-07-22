import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';


export class MantenimientoSocioServicio extends Component {
    static displayName = MantenimientoSocioServicio.name;


    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Socio asociado al Servicio </div>
                <Container>
                    <Row>
                        <Col md={4}>

                            <div className="item1">
                                <h6 className="heading3">Socio</h6>
                                <input type="text" name="codigo_socio" />
                                <input type="text" name="descripcion_servicio" />
                            </div>
                        </Col>

                        <Col md={3}>
                            <div className="item1">
                            <h6 className="heading4">Teléfono </h6>
                                <input type="text" name="telefono_socio" />
                            </div>
                        </Col>

                            <Col md={3}>
                                <div className="item1">
                            <h6 className="heading4">Correo electrónico </h6>
                                <input type="text" name="correo_socio" />
                            </div>
                        </Col>
                     </Row>

                    <Row>
                                <Col md={4}>
                                    <div className="item1">
                            <h6 className="heading4">Línea de negocio </h6>
                                <input type="text" name="codigo_linea_negocio" />
                            </div>
                        </Col>
                                    <Col md={3}>
                                        <div className="item1">
                            <h6 className="heading4">Tipo persona </h6>
                            <select name="tipo_persona" >

                                </select>
                            </div>
                        </Col>

                                        <Col md={3}>
                                            <div className="item1">
                            <h6 className="heading4">Cédula</h6>
                                <input type="text" name="cedula" />
                            </div>
                        </Col>
                    </Row>


                    <table className="table table-bordered table" name="table_socio">
                        <thead className="titulo2">
                            <tr >
                                <th>Id socio</th>
                                <th>Nombre</th>
                                <th>Cédula</th>
                                <th>Tipo persona</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Id servio</th>

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
                            <button id="btnGuardar" type="button" className="btn  btn-block botones ">Clientes Asociados</button>
                        </Col>
                    </Row>
                </Container>
               
          

                </main>
            );
    }
}