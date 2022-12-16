import React, { Component, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';

export class Formulario extends Component {
    static displayName = Formulario.name;




   
    render() {
        return (
         
            <main>
            

                <div class="row-full">Recopilación de datos de clientes a encuestar </div>

             
                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Nombre de usuario</label>
                            {/*    <input type="text" name="nom_usuario" onChange={(e) => setNomUsuario(e.target.value)} />*/}
                                <input type="text" name="nom_usuario" />
                        </div>

                            <div className="form_item">

                            <label>Consecutivo #</label>
                                <input type="text" name="Consecutivo" />

                        </div>

                    </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                            <label>Face de servicio</label>
                        
                                <select id="" class=" " name="face_servicio" >
                            </select>

                        </div>

                        <div class="form_item">

                            <label>Fecha</label>
                                <input type="date" name="fecha"  />

                        </div>

                    </div>
                </div>
                </div>

                <div className="wrapper">
                 
                    <div className="form_container">
                        <h1 className="heading2">Datos del cliente</h1>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label class="etiquetas">Código cliente</label>
                                <input type="text" name="cod_cliente" />

                            </div>

                            <div className="form_item">

                                <label>Nombre cliente</label>
                                <input type="text" name="nom_cliente" />

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label>Sector económico</label>

                                <select id="" class=" " name="sector" >
                                </select>

                            </div>

                            <div className="form_item">

                                <label>Segmento</label>
                                <select id="" class=" " name="segmento">
                                </select>

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label>Categoría</label>

                                <select id="slAeropuerto" class=" " name="categoria" >
                                </select>

                            </div>

                            <div className="form_item">

                                <label>Línea de negocio</label>
                                <select id="" class=" " name="linea_negocio" >
                                </select>

                            </div>

                        </div>
                           <div className="form_wrap fullname">
                            <div className="form_item">

                                <label>Servicios y productos</label>

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
                        <h1 className="heading2">Datos de contacto</h1>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label class="etiquetas">Nombre del contacto</label>
                                <input type="text" placeholder="" name="nom_contacto" />

                            </div>

                            <div className="form_item">

                                <label>Canal encuesta</label>
                                <select id="" class=" " name="canal">
                                </select>

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label>Teléfono</label>

                                <input type="text" name="telefono_contacto" />

                            </div>

                            <div className="form_item">

                                <label>Celular</label>
                                <input type="text" placeholder="" name="celular_contacto" />

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label>Correo</label>
                                <input type="text" placeholder="" name="correo_contacto" />

                            </div>

                            <div className="form_item">

                            </div>

                        </div>
                   
                    </div>
                </div>

                <div className="wrapper">

                    <div className="form_container">
                        <h1 className="heading2">Datos del socio</h1>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label class="etiquetas">Código del socio</label>
                                <input type="text" placeholder="" name="cod_socio" />

                            </div>

                            <div className="form_item">

                                <label>Nombre del socio</label>
                                <input type="text" name="nom_socio" />

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label>Teléfono</label>

                                <input type="text" placeholder="" name="telefono_socio" />

                            </div>

                            <div className="form_item">

                                <label>Celular</label>
                                <input type="text" placeholder="" name="celular_socio" />

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label>Correo</label>
                                <input type="text" placeholder="" name="correo_socio" />

                            </div>

                            <div className="form_item">



                            </div>

                        </div>

                    </div>
                </div>
                <Container className="cont">
               
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

