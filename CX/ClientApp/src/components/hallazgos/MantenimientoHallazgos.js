import React, { Component, useState } from 'react';
import { InputText, InputSelect } from '../components_forms/inputs'
import { Container, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerGradosEsfuerzo } from '../../servicios/ServicioGradosEsfuerzo';
import { ObtenerGradoImpacto } from '../../servicios/ServicioGradoImpacto';
import { ObtenerFasesCJ } from '../../servicios/ServicioFasesCJ';
import { ObtenerEstadoAceptacion } from '../../servicios/ServicioEstadoAceptacion';
import { ObtenerServicioLineaNegocio, ObtenerLineasNegociosActivos } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerCantidadMantenimientoHallazgo, ObtenerDatosOrbe } from '../../servicios/ServicioMantenimientoHallazgo';
import { ObtenerResponsables } from '../../servicios/ServicioResponsables';
import { ObtenerMacroActividad } from '../../servicios/ServicioMacroActividad';
import { ObtenerTalleresCoCreacion } from '../../servicios/ServicioTalleresCoCreacion';
import { ObtenerPeriodicidad } from '../../servicios/ServicioPeriodicidad';
import { FormularioModal} from '../components_forms/ventanaModal';
import { ObtenerEstadoHallazgo } from '../../servicios/ServicioEstadoHallazgo';
import FormAnotacion from '../mantenimientos_forms/formAnotacion';
import FormResponsables from '../mantenimientos_forms/formResponsables';
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import 'jquery/dist/jquery.min.js';
import { Table } from '../Table';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

export class MantenimientoHallazgos extends Component {
    static displayName = MantenimientoHallazgos.name;
    constructor(props) {
        super(props);
        this.state = {
            listaResponsables:[],
            lineasNegocio: [],
            lineaNegocio: '',
            idLineaNegocio:'',
            estadosAceptacion: [],
            estadoAceptacion: '',
            idEstadoAceptacion:'',
            gradosEsfuerzo: [],
            gradosImpacto: [],
            fasesCJ:[],
            pendiente: false,
            data: {},
            modal: false,
            labelButton: "Registrar",
            modalResponsables: false,
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
            serviciosFiltrados:[],
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
            estadosHallazgo: [],
            estadoHallazgo: '',
            idPeriodicidad: '',
            periodicidad: '',
            descripcionGeneralResponsable:'',
            periodicidadEntregaAvances: [],
            cabeceras: ["ID Direccion", "Direccion", "ID Responsable", "Nombre", "Plazo(Días)", "Fecha de Inicio", "Oficio", "Avance", "Aceptado"],
            usuarioAgrego: "",
            fechaAgregado: "",
            usuarioModifico: "",
            fechaModificado: "",
            porcentajeGeneral: 0,

        }
    }



    async ObtenerListadoResponsables() {
        const respuesta = await ObtenerResponsables();
        this.setState({ listaResponsables: respuesta });
        console.log(respuesta);
    }

    async ObtenerTalleresCoCreacion() {
       
        const respuesta = await ObtenerTalleresCoCreacion();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idTallerCoCreacion, label: row.idTallerCoCreacion +' '+row.descripcionGeneral }
        })

        this.setState({ talleresCoCreacion: options });
    }

    async ObtenerEstadosHallazgo() {

        const respuesta = await ObtenerEstadoHallazgo();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idEstadoHallazgo, label: row.idEstadoHallazgo + ' ' + row.estadoHallazgo }
        })

        this.setState({ estadosHallazgo: options });
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
        const options = respuesta.map(function (row) {
            return { value: row.idServicio, label: row.idServicio + ' ' + row.servicio, idLinea:row.idLinea}
        })
        this.setState({ serviciosAsociadoHallazgo: options });
    }


    async ObtenerLineasNegocio() {
        const respuesta = await ObtenerLineasNegociosActivos();
        

        const options = respuesta.map(function (row) {
            return { value: row.idLinea, label: row.idLinea + ' ' + row.lineaNegocio }
        })
        this.setState({ lineasNegocio: options });
    }

    async ObtenerGradosEsfuerzo() {
        const respuesta = await ObtenerGradosEsfuerzo();
        console.log(respuesta);
        const options = respuesta.map(function (row) {
            return { value: row.idGradoEsfuerzo, label: row.idGradoEsfuerzo + ' ' + row.gradoEsfuerzo }
        })
        this.setState({ gradosEsfuerzo: options });

    }

    async ObtenerGradosImpacto() {
        const respuesta = await ObtenerGradoImpacto();
        const options = respuesta.map(function (row) {
            return { value: row.idGradoImpacto, label: row.idGradoImpacto + ' ' + row.gradoImpacto }
        })
        this.setState({ gradosImpacto: options });
       
    }

    async ObtenerFasesCJ() {
        const respuesta = await ObtenerFasesCJ();
        const options = respuesta.map(function (row) {
            return { value: row.idFaseCJ, label: row.idFaseCJ + ' ' + row.faseCustomerJourney }
        })
        this.setState({ fasesCJ: options });
    }

    async ObtenerEstadoAceptacion() {
        const respuesta = await ObtenerEstadoAceptacion();
        const options = respuesta.map(function (row) {
            return { value: row.idEstadoAceptacion, label: row.idEstadoAceptacion + ' ' + row.estadoAceptacion }
        })
        this.setState({ estadosAceptacion: options });
    }

    async ObtenerPeriodicidadEntregaAvances() {
        const respuesta = await ObtenerPeriodicidad();
        const options = respuesta.map(function (row) {
            return { value: row.idPeriodicidad, label: row.idPeriodicidad + ' ' + row.periodicidad }
        })
        this.setState({ periodicidadEntregaAvances: options });

    }

    onChangeEstadoAceptacion = (e) => {
        this.setState({ estadoAceptacion: e });
    }

    onChangeGradoEsfuerzo = (e) => {
        this.setState({ gradoEsfuerzo: e });
    }

    onChangeGradoImpacto = (e) => {

        this.setState({ gradoImpacto: e });
    }

    onChangeFasesCJ = (e) => {
        this.setState({ CJ: e });
    }

    onChangeLineaNegocio = (e) => {
        if (e.value != '') {
            this.setState({ lineaNegocio: e });
            this.state.serviciosFiltrados = this.state.serviciosAsociadoHallazgo.filter(servicio => servicio.idLinea == e.value);
            this.setState({ servicio: '' });
        } else {
            this.setState({ servicio: '' });
        }
    }

    onChangeServicioAsoHallazgo = (e) => {
            this.setState({ servicio: e });
    }

    onChangeMacroActividadAsoHallazgo = (e) => {

        this.setState({ macroActividad: e });
    }

    onChangeMacroNumeroOficioEnvio = (e) => {
        this.setState({ orbe: e });
    }
    onChangeTallerCoCreacion = (e) => {
        this.setState({ tallerCoCreacion: e });
    }

    onChangeMacroActividad = (e) => {
        this.setState({ macroActividad: e });

    }
    onChangeEstadoHallazgo = (e) => {
        this.setState({ estadoHallazgo: e });
    }

    verificarPorcentaje = (object) => {
        //revisa si es numero, si no lo es setea vacio, negativos no acepta porque no hay caracteres especiales, si es mayor a 100 setea 100por defecto.
        if (!isNaN(object.target.value)) {
            if (object.target.value >= 101) {
                object.target.value = 100;
                this.setState({ porcentajeGeneral: object.target.value });
                return object;

            }
            else {
                this.setState({ porcentajeGeneral: object.target.value });
                return object;
            }
        }
        object.target.value = '';
        return object;
    }

    onClickAgregarAnotacion = () => {
        console.log("boton clickeado");
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Agregar" });
        this.setState({ modalTitulo: "Agregar Anotacion" });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickAgregarResponsable = () => {
        this.setState({ proceso: 1 });
        this.setState({ modalResponsables: !this.state.modalResponsables });
        this.setState({ labelButton: "Agregar" });
        this.setState({ modalTitulo: "Agregar Responsable" });
        

    }

    onClickCerrarModalResponsable = () => {
        this.setState({ modalResponsables: false });
        this.setState({ mensajeFormulario: "" });
    }

    onChangePeriodicidadEntregaAvances = (e) => {
        this.setState({ periodicidad: e });
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
        await this.ObtenerTalleresCoCreacion();
        await this.ObtenerEstadosHallazgo();
        await this.ObtenerPeriodicidadEntregaAvances();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        await this.ObtenerListadoResponsables();
    }
    onClickFila = (item) => {
        console.log(item);
        var fechaingreso = new Date(item.fechaIngreso);
        var fechamodificacion = new Date(item.fechaModificacion);
        this.setState({ usuarioAgrego: item.ingresadoPor });
        this.setState({ fechaAgregado: fechaingreso.toLocaleDateString() });
        this.setState({ usuarioModifica: item.modificadoPor });
        this.setState({ fechaModificado: fechamodificacion.toLocaleDateString() });
        
        this.setState({ descripcionGeneralResponsable: "El nombre del responsable es "+item.nombre+" y está involucrado en la dirección "+item.direccion });
        
    }

    body = () => {
        return this.state.listaResponsables.map((item, index) => (
            <tr onClick={() => this.onClickFila(item)}  key={index}>
                <td>{item.idDireccion}</td>
                <td>{item.direccion}</td>
                <td>{item.idResponsable}</td>
                <td>{item.nombre}</td>
                <td>{item.plazo}</td>
                <td>{item.fechaInicio}</td>
                <td>{item.orbe}</td>
                <td>{item.avance}</td>
                <td>{item.aceptado}</td>
            </tr>
        ))
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
                                
                                    <Input
                                        id="exampleText"
                                        name="text"
                                        type="text"
                                        value={this.state.secuenciaHallazgo}
                                    />    
                                

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Fase de Customer Journey</h6>
                                <Select placeholder="Seleccione..." onChange={this.onChangeFasesCJ} isSearchable={false} isClearable={true} options={this.state.fasesCJ} />

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
                                <Select placeholder="Seleccione..." onChange={this.onChangeLineaNegocio} isClearable={true} options={this.state.lineasNegocio}/>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Servicio Asociado al Hallazgo </h6>
                                <Select placeholder="Seleccione..." onChange={this.onChangeServicioAsoHallazgo} isClearable={true} options={this.state.serviciosFiltrados} />
                              
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
                                <Select placeholder="Seleccione..." onChange={this.onChangeGradoImpacto} isSearchable={false} isClearable={true} options={this.state.gradosImpacto} />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Grado de Esfuerzo del Hallazgo</h6>
                                <Select placeholder="Seleccione..." onChange={this.onChangeGradoEsfuerzo} isSearchable={false} isClearable={true} options={this.state.gradosEsfuerzo} />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado de Aceptación</h6>
                                <Select placeholder="Seleccione..." onChange={this.onChangeEstadoAceptacion} isClearable={true} options={this.state.estadosAceptacion} />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Estado del Hallazgo </h6>
                                <Select placeholder="Seleccione..." onChange={this.onChangeEstadoHallazgo} isClearable={true} options={this.state.estadosHallazgo} />
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3" style={{ "fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif", "fontStyle": "normal", "fontWeight": "400", "textRendering": "optimizeLegibility"}}>Nro de Oficio del Envio</h6>

                                <Select onChange={this.onChangeMacroNumeroOficioEnvio} isClearable={true} options={this.state.numeroOficioEnvio} />

                            </div>
                        </Col>


                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Periodicidad de Entrega de Avances</h6>
                                <Select onChange={this.onChangePeriodicidadEntregaAvances} isClearable={true} options={this.state.periodicidadEntregaAvances} />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Anexos</h6>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control style={{ marginBottom: 2 }} type="file" />

                                    <Button onClick={() => this.onClickAgregarAnotacion()} color="primary" variant="primary" size="sm">Agregar Anotaciones</Button>
                                </Form.Group>
                                <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className="FormularioAnotacion">
                                    <FormAnotacion />
                                </FormularioModal>
                            </div>
                        </Col>

                        <Col >
                            <div className="item1">
                                <h6 className="heading3">Detalle General del Hallazgo</h6>
                                    <Input
                                        id="exampleText"
                                        name="text"
                                        type="textarea"
                                    />

                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Porcentaje General</h6>
                                <Input
                                    id="exampleText"
                                    name="text"
                                    type="text"
                                    value={this.state.porcentajeGeneral}
                                    onInput={this.verificarPorcentaje}
                                    pattern="[0-9]{1,3}" min="0" max="100" maxLength="3"
                                />   

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            <button id="btnGuardar" type="button" className="btn  btn-block botones" >Guardar</button>
                        </Col>
                    </Row>
                </Container >
                <div class="row-full">Direcciones y Responsables asignadas al Hallazgo </div>

                <Container>
                    <Button onClick={() => this.onClickAgregarResponsable()}  style={{ backgroundColor: "#17A797", borderColor: "#17A797" }}>Insertar Responsable</Button>
                    <br></br>
                    <br></br>
                    <Table tableHeading={this.state.cabeceras} body={this.body()} />
                    <FormularioModal labelButton={this.state.labelButton} show={this.state.modalResponsables} proceso={this.state.proceso} handleClose={this.onClickCerrarModalResponsable} titulo={this.state.modalTitulo} className="FormularioResponsables">
                        <FormResponsables />
                    </FormularioModal>
  


                    <Row>
                        <Col md={12}>

                            <h6 className="heading3">Detalle por Dirección y Responsable</h6>
                            <Input
                                value={this.state.descripcionGeneralResponsable}
                                id="exampleText"
                                name="text"
                                type="text"
                            />
                        </Col>


                    </Row>
                    <br></br>
                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3"> Adicionado por</h6>
                                <input type="text" className="etiqueta" name="usuario_modificacion" value={this.state.usuarioAgrego} />
                                <input type="text" placeholder="" name="fecha_modificacion" value={this.state.fechaAgregado} />


                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h6 className="heading3">Modificado por</h6>
                                <input type="text" className="etiqueta" name="fecha_modificacion" value={this.state.usuarioModifica} />
                                <input type="text" placeholder="" name="usuario_modificacion" value={this.state.fechaModificado} />
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


