import React, { Component, useState } from 'react';
import { InputText, InputSelect } from '../components_forms/inputs'
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerGradosEsfuerzo } from '../../servicios/ServicioGradosEsfuerzo';
import { ObtenerGradoImpacto } from '../../servicios/ServicioGradoImpacto';
import { ObtenerFasesCJ } from '../../servicios/ServicioFasesCJ';
import { ObtenerEstadoAceptacion } from '../../servicios/ServicioEstadoAceptacion';
import { ObtenerServicioLineaNegocio, ObtenerLineasNegociosActivos } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerCantidadMantenimientoHallazgo, ObtenerDatosOrbe } from '../../servicios/ServicioMantenimientoHallazgo';
import { ObtenerMacroActividad } from '../../servicios/ServicioMacroActividad';
import { ObtenerTalleresCoCreacion } from '../../servicios/ServicioTalleresCoCreacion';
import Select from 'react-select'

export class MantenimientoHallazgos extends Component {
    static displayName = MantenimientoHallazgos.name;
    constructor(props) {
        super(props);
        this.state = {
            lineasNegocio: [],
            lineaNegocio: '',
            idLineaNegocio: '',
            estadosAceptacion: [],
            estadoAceptacion: '',
            idEstadoAceptacion: '',
            gradosEsfuerzo: [],
            gradosImpacto: [],
            fasesCJ: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            gradoEsfuerzo: '',
            idGradoEsfuerzo: '',
            gradoImpacto: '',
            idGradoImpacto: '',
            CJ: '',
            idCJ: '',
            serviciosAsociadoHallazgo: [],
            serviciosFiltrados: [],
            idServicio: '',
            servicio: '',
            secuenciaHallazgo: '',
            macroActividades: [],
            idMacro: '',
            macroActividad: '',
            numeroOficioEnvio: [],
            orbe: '',
            talleresCoCreacion: [],
            tallerCoCreacion: '',
        }
    }
    async ObtenerTalleresCoCreacion() {

        const respuesta = await ObtenerTalleresCoCreacion();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idTallerCoCreacion, label: row.idTallerCoCreacion + ' ' + row.descripcionGeneral }
        })

        this.setState({ talleresCoCreacion: options });
    }

    async ObtenerMacroActividadAsociadoHallazgo() {
        const respuesta = await ObtenerMacroActividad();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idMacro, label: row.idMacro + ' ' + row.macroActividad }
        })

        this.setState({ macroActividades: options });
    }

    async ObtenerNumeroOficioEnvio() {

        const respuesta = await ObtenerDatosOrbe();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idOrbe, label: row.orbe }
        })

        this.setState({ numeroOficioEnvio: options });

    }
    async ObtenerSecuenciaHallazgo() {
        const respuesta = await ObtenerCantidadMantenimientoHallazgo();
        this.setState({ secuenciaHallazgo: respuesta.cantidad + 1 });
    }

    async ObtenerServicioAsociadoHallazgo() {
        const respuesta = await ObtenerServicioLineaNegocio();
        this.setState({ serviciosAsociadoHallazgo: respuesta });
    }

    async ObtenerLineasNegocio() {
        const respuesta = await ObtenerLineasNegociosActivos();
        this.setState({ lineasNegocio: respuesta });
    }
    async ObtenerGradosEsfuerzo() {
        const respuesta = await ObtenerGradosEsfuerzo();
        this.setState({ gradosEsfuerzo: respuesta });
    }
    async ObtenerGradosImpacto() {
        const respuesta = await ObtenerGradoImpacto();
        this.setState({ gradosImpacto: respuesta });

    }
    async ObtenerFasesCJ() {
        const respuesta = await ObtenerFasesCJ();
        this.setState({ fasesCJ: respuesta });
    }
    async ObtenerEstadoAceptacion() {
        const respuesta = await ObtenerEstadoAceptacion();
        this.setState({ estadosAceptacion: respuesta });
    }
    onChangeEstadoAceptacion = (e) => {
        if (e.target.value != '') {
            this.setState({ estadoAceptacion: this.state.estadosAceptacion.find(obj => obj.idEstadoAceptacion == e.target.value).estadoAceptacion });

        } else {
            this.setState({ estadoAceptacion: '' });
        }

    }
    onChangeGradoEsfuerzo = (e) => {
        if (e.target.value != '') {
            this.setState({ gradoEsfuerzo: this.state.gradosEsfuerzo.find(obj => obj.idGradoEsfuerzo == e.target.value).gradoEsfuerzo });

        } else {
            this.setState({ gradoEsfuerzo: '' });
        }

    }
    onChangeGradoImpacto = (e) => {
        if (e.target.value != '') {
            this.setState({ gradoImpacto: this.state.gradosImpacto.find(obj => obj.idGradoImpacto == e.target.value).gradoImpacto });
        } else {
            this.setState({ gradoImpacto: '' });
        }
    }
    onChangeFasesCJ = (e) => {
        if (e.target.value != '') {
            this.setState({ CJ: this.state.fasesCJ.find(obj => obj.idFaseCJ == e.target.value).faseCustomerJourney });
        } else {
            this.setState({ CJ: '' });
        }
    }
    onChangeLineaNegocio = (e) => {
        if (e.target.value != '') {
            this.setState({ lineaNegocio: this.state.lineasNegocio.find(obj => obj.idLinea == e.target.value).lineaNegocio });
            this.state.serviciosFiltrados = this.state.serviciosAsociadoHallazgo.filter(servicio => servicio.idLinea == e.target.value);
            this.setState({ servicio: '' });
        } else {
            this.setState({ lineaNegocio: '' });
            this.setState({ servicio: '' });
        }
    }
    onChangeServicioAsoHallazgo = (e) => {
        if (e.target.value != '') {
            this.setState({ servicio: this.state.serviciosAsociadoHallazgo.find(obj => obj.idServicio == e.target.value).servicio });
        } else {
            this.setState({ servicio: '' });
        }

    }
    onChangeMacroActividadAsoHallazgo = (e) => {
        if (e.target.value != '') {
            this.setState({ macroActividad: this.state.macroActividades.find(obj => obj.idMacro == e.target.value).macroActividad });
        }
        else {
            this.setState({ macroActividad: '' });
        }
    }
    onChangeMacroNumeroOficioEnvio = (e) => {
        this.state.orbe = e;
    }
    onChangeTallerCoCreacion = (e) => {
        this.state.tallerCoCreacion = e;
    }

    onChangeMacroActividad = (e) => {
        this.state.macroActividad = e;
    }

    async componentDidMount() {
        await this.ObtenerGradosEsfuerzo();
        await this.ObtenerGradosImpacto();
        await this.ObtenerFasesCJ();
        await this.ObtenerEstadoAceptacion();
        await this.ObtenerLineasNegocio();
        await this.ObtenerServicioAsociadoHallazgo();
        await this.ObtenerSecuenciaHallazgo();
        await this.ObtenerMacroActividadAsociadoHallazgo();
        await this.ObtenerNumeroOficioEnvio();
        await this.ObtenerTalleresCoCreacion()
    }
    render() {
        return (
            <main>
                <div class="row-full">Información General de Definición del Hallazgo </div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3"> Secuencia del hallazgo</h6>
                                <input readonly className="secuencia" name="secuencia_hallazgos" value={this.state.secuenciaHallazgo}>

                                </input>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Fase de Customer Journey</h6>
                                <select onChange={this.onChangeFasesCJ} className="etiqueta" name="codigo_faseCJ" >
                                    <option value='' selected>-- Seleccione --</option>
                                    {this.state.fasesCJ.map(fcj =>
                                        <option key={fcj.idFaseCJ} value={fcj.idFaseCJ}>{fcj.idFaseCJ}</option>
                                    )};
                                </select>
                                <input name="descripcion_faseCJ" value={this.state.CJ}></input>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Taller de Co Creación</h6>
                                <Select placeholder="Seleccione..." onChange={this.onChangeTallerCoCreacion} isClearable={true} options={this.state.talleresCoCreacion} />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Solución asociada al hallazgo</h6>
                                <select onChange={this.onChangeLineaNegocio} className="etiqueta" name="solucion_hallazgo" >
                                    <option value='' selected>-- Seleccione --</option>
                                    {this.state.lineasNegocio.map(fcj =>
                                        <option key={fcj.idLinea} value={fcj.idLinea}>{fcj.idLinea}</option>
                                    )};
                                </select>
                                <input name="descripcion_hallazgo" value={this.state.lineaNegocio}></input>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Servicio Asociado al Hallazgo </h6>
                                <select onChange={this.onChangeServicioAsoHallazgo} className="etiqueta" name="codigo_servicio_asociado" >
                                    <option value='' selected>-- Seleccione --</option>
                                    {this.state.serviciosFiltrados.map(fbb =>
                                        <option key={fbb.idServicio} value={fbb.idServicio}>{fbb.idServicio}</option>
                                    )};
                                </select>
                                <input name="descripcion_servicio_asociado" value={this.state.servicio}></input>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Macro Actividad Asociada al Hallazgo </h6>
                                <Select placeholder="Seleccione..." onChange={this.onChangeMacroActividad} isClearable={true} options={this.state.macroActividades} />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Nivel de Impacto del Hallazgo</h6>
                                <select onChange={this.onChangeGradoImpacto} className="etiqueta" name="codigo_impacto" >
                                    <option value='' selected>-- Seleccione --</option>
                                    {this.state.gradosImpacto.map(fbb =>
                                        <option key={fbb.idGradoImpacto} value={fbb.idGradoImpacto}>{fbb.idGradoImpacto}</option>
                                    )};
                                </select>
                                <input name="descripcion_impacto" value={this.state.gradoImpacto}></input>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Grado de Esfuerzo del Hallazgo</h6>
                                <select onChange={this.onChangeGradoEsfuerzo} className="etiqueta" name="codigo_esfuerzo" >
                                    <option value='' selected>-- Seleccione --</option>
                                    {this.state.gradosEsfuerzo.map(fbb =>
                                        <option key={fbb.idGradoEsfuerzo} value={fbb.idGradoEsfuerzo}>{fbb.idGradoEsfuerzo}</option>
                                    )};
                                </select>
                                <input readonly name="descripcion_grado" value={this.state.gradoEsfuerzo} ></input>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado de Aceptación</h6>
                                <select onChange={this.onChangeEstadoAceptacion} className="etiqueta" name="codigo_estado_aceptacion" >
                                    <option value='' selected>-- Seleccione --</option>
                                    {this.state.estadosAceptacion.map(fbb =>
                                        <option key={fbb.idEstadoAceptacion} value={fbb.idEstadoAceptacion}>{fbb.idEstadoAceptacion}</option>
                                    )};
                                </select>
                                <input readonly name="descripcion_estado" value={this.state.estadoAceptacion} ></input>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado del Hallazgo </h6>
                                <select className="etiqueta" name="codigo_estado" ></select>
                                <select name="descripcion_estado" ></select>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3" style={{ "fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif", "fontStyle": "normal", "fontWeight": "400", "textRendering": "optimizeLegibility" }}>Nro de Oficio del Envio</h6>

                                <Select onChange={this.onChangeMacroNumeroOficioEnvio} isClearable={true} options={this.state.numeroOficioEnvio} />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Porcentaje General</h6>

                                <input type="text" className="etiqueta" name="porcentaje_general" />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Periodicidad de Entrega de Avances</h6>
                                <select className="etiqueta" name="periocidad_avance" ></select>
                                <select name="descripcion_periocidad" ></select>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Detalle General del Hallazgo</h6>
                                <textarea className="etiqueta" name="Detalle_hallazgo"></textarea>

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
                <div class="row-full">Direcciones y Responsables asignadas al Hallazgo </div>

                <Container>

                    <table className="table table-bordered table" name="table_hallazgo">
                        <thead className="titulo2">
                            <tr >
                                <th>Dirección</th>
                                <th>Responsable</th>
                                <th>Plazo (Días)</th>
                                <th>Fecha inicio</th>
                                <th>Nro. Oficio</th>
                                <th>% Avance</th>
                                <th>Aceptado</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>





                    <Row>
                        <Col md={12}>

                            <h6 className="heading3">Detalle General del Hallazgo</h6>
                            <textarea name="Detalle_direccion_resposable"></textarea>
                        </Col>


                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3"> Adicionado por</h6>
                                <input type="text" className="etiqueta" name="fecha_adicion" />
                                <input type="text" placeholder="" name="usuario_adicion" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Modificado por</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion" />
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>

                </Container >

                <div class="row-full">Fechas relacionadas al Registro</div>
                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3"> Adicionado por</h6>
                                <input type="text" className="etiqueta" name="fecha_adicion" />
                                <input type="text" placeholder="" name="usuario_adicion" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Modificado por</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion" />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Finalizado</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion" />
                            </div>
                        </Col>
                    </Row>

                </Container >




            </main>
        );
    }
}