import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

export class MantenimientoCategoria extends Component {
    static displayName = MantenimientoCategoria.name;
    //Inicializar la datatable de jquery
    componentDidMount() {
        //initialize datatable
        $(document).ready(function () {
            $('#example').DataTable();
        });
    }

    

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Categorias </div>
                <Container>
                    <Row>
                        <Col md={4}>

                            <div className="item1">
                                <h6 className="heading3">Categoria </h6>
                                <input type="text" name="codigo_categoria" />
                                <input type="text" name="descripcion_categoria" />
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>

                        <Col md={4}>
                           
                        </Col>
                     </Row>

                    <Row>
                        <Col md={4}>
                           
                        </Col>
                    </Row>


                    <table id="example"
                        class="display" >
                        <thead >
                            <tr >
                                <th > Name </th>
                                <th > Position </th>
                                <th > Office </th>
                                <th > Age </th>
                                <th > Start date </th>
                                <th > Salary </th>
                            </tr >
                        </thead>
                        <tbody >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                            <tr >
                                <td > Tiger Nixon </td>
                                <td > System Architect </td>
                                <td > Edinburgh </td>
                                <td > 61 </td>
                                <td > 2011 / 04 / 25 </td>
                                <td > $320, 800 </td>
                            </tr >
                        </tbody>
                    </table >

                

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