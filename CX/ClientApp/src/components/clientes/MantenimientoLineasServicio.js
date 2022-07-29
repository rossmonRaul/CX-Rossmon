import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { Grid } from '../grid.js';
import { ObtenerLineaNegocio } from '../../servicios/ServicioLineaNegocio';


export class MantenimientoLineasServicio extends Component {
    static displayName = MantenimientoLineasServicio.name;

    constructor(props) {
        super(props);
        this.state = {
            listaNegocios: [],
            encabezado: [
                { id: 'idLinea', name: 'Id', selector: row => row.idLinea, head: "Id Línea" },
                { id: 'lineaNegocio', name: 'Línea Negocio', selector: row => row.lineaNegocio, head: "Línea Negocio" },
            ],
            pendiente: false,
            filaSeleccionada: {},
            data: {},
            bloquearBoton: true,
            textoBotonInactivar: "Inactivar"
        };

        this.onClickSeleccionarFila = this.onClickSeleccionarFila.bind(this)
    }
    onClickSeleccionarFila(fila) {
        
        const filaValida = Object.entries(fila).length === 0 ? false : true;
        console.log(filaValida)
       this.setState({ bloquearBoton: !filaValida });
        this.setState({ textoBotonInactivar: !filaValida ? "Inactivar" : (fila.estado == "Activo" ? "Inactivar" : "Activar") });
        this.setState({ filaSeleccionada: fila });
    }

    /*ValidarSiFilaFueSeleccionada(fila) {
         Object.entries(fila).length === 0 ? false : true;
    }*/

    componentDidMount() {
        this.ObtenerListadoLineaNegocio();
    }

    async ObtenerListadoLineaNegocio() {
        this.setState({ pendiente: true });
        const respuesta = await ObtenerLineaNegocio();
        this.setState({ listaNegocios: respuesta });
        this.setState({ pendiente: false });
    }




    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Lineas de Servicio </div>
                <Container>
                    <Row>
                        <Col md={4}>

                            <div className="item1">
                                <h6 className="heading3">Línea de servicio </h6>
                                <input type="text" name="codigo_linea" />
                                <input type="text" name="descripcion_linea" />
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


                    <table className="table table-bordered table" name="table_linea">
                        <thead className="titulo2">
                            <tr >
                                <th>Código línea servicio</th>
                                <th>Descripción</th>



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
                    { /*TABLA Y BOTONES*/}
                    <span>Listado de líneas de servicios</span>
                    <br />
                    <hr />
                    <Button variant="primary" type="submit" size="sm" >Registrar</Button>{' '}
                    <Button variant="primary" type="submit" size="sm" disabled={this.state.bloquearBoton}>Actualizar</Button>{' '}
                    <Button variant="danger" type="submit" size="sm" disabled={this.state.bloquearBoton}>{this.state.textoBotonInactivar}</Button>
                    <br /><br />


                    <Grid gridHeading={this.state.encabezado} gridData={this.state.listaNegocios} selectableRows={true} pending={this.state.pendiente}
                        setFilaSeleccionada={this.onClickSeleccionarFila} idBuscar="idLinea" />
                    <br /><br />

                </Container>
            </main>
        );
    }
}