import React, { Component, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';

export class Formulario extends Component {
    static displayName = Formulario.name;





    render() {
        return (

            <main>

                <div class="row-full">Clientes </div>


                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Recopilación de datos de clientes a encuestar</h1>
                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Nombre de usuario</label>
                                {/*    <input type="text" name="nom_usuario" onChange={(e) => setNomUsuario(e.target.value)} />*/}
                                <input type="text" name="nom_usuario" />
                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Consecutivo #</label>
                                <input type="text" name="Consecutivo" />

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Face de servicio</label>

                                <select id="" class=" " name="face_servicio" >
                                </select>

                            </div>

                            <div class="form_item">

                                <label className="etiquetas">Fecha</label>
                                <input type="date" name="fecha" />

                            </div>

                        </div>
                    </div>
                </div>

                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Datos del cliente</h1>
                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label class="etiquetas">Código cliente</label>
                                <input type="text" name="cod_cliente" />

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Nombre cliente</label>
                                <input type="text" name="nom_cliente" />

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Sector económico</label>

                                <select id="" class=" " name="sector" >
                                </select>

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Segmento</label>
                                <select id="" class=" " name="segmento">
                                </select>

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Categoría</label>

                                <select id="slAeropuerto" class=" " name="categoria" >
                                </select>

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Línea de negocio</label>
                                <select id="" class=" " name="linea_negocio" >
                                </select>

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Servicios y productos</label>

                                <select id="" class=" " name="servicio">
                                </select>

                            </div>
                            <div className="form_item">

                            </div>


                        </div>
                    </div>
                </div>

                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Datos de contacto</h1>
                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label class="etiquetas">Nombre del contacto</label>
                                <input type="text" placeholder="" name="nom_contacto" />

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Canal encuesta</label>
                                <select id="" class=" " name="canal">
                                </select>

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Teléfono</label>

                                <input type="text" name="telefono_contacto" />

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Celular</label>
                                <input type="text" placeholder="" name="celular_contacto" />

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Correo</label>
                                <input type="text" placeholder="" name="correo_contacto" />

                            </div>

                            <div className="form_item">

                            </div>

                        </div>

                    </div>
                </div>

                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Datos del socio</h1>
                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label class="etiquetas">Código del socio</label>
                                <input type="text" placeholder="" name="cod_socio" />

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Nombre del socio</label>
                                <input type="text" name="nom_socio" />

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Teléfono</label>

                                <input type="text" placeholder="" name="telefono_socio" />

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Celular</label>
                                <input type="text" placeholder="" name="celular_socio" />

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Correo</label>
                                <input type="text" placeholder="" name="correo_socio" />

                            </div>

                            <div className="form_item">



                            </div>

                        </div>

                    </div>
                </div>
                <Container className="cont">

                    <Row>
                        <Col md={4}>

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

