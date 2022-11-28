import React, { Component, useState } from 'react';
import { Container, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerCantidadMantenimientoTalleresCoCreacion, ObtenerDatosOrbe, ObtenerFechasTallerCoCreacion, ObtenerEtapasTallerCoCreacion, ObtenerMantenimientoTallerCoCreacion, EliminarMantenimientoTallerCoCreacion, ObtenerMantenimientoTallerCoCreacionPorID, AgregarMantenimientoTallerCoCreacion, ActualizarMantenimientoTallerCoCreacion } from '../../servicios/ServicioMantenimientoTalleresCoCreacion';
import { AgregarEtapaTallerCo, ActualizarEtapaTallerCo, ObtenerEtapaTallerCoPorID, ObtenerEtapasTallerCo, ObtenerFechasTallerCo, ObtenerCantidadEtapasTallerCo } from '../../servicios/ServicioEtapasTallerCo';
import { ObtenerServicioLineaNegocio, ObtenerLineasNegociosActivos } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerTipoTaller } from '../../servicios/ServicioTipoTaller';
import { ObtenerMacroActividad } from '../../servicios/ServicioMacroActividad';
import FormAnotacion from '../mantenimientos_forms/formAnotacion';
import { FormularioModal } from '../components_forms/ventanaModal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { Alert } from 'react-bootstrap';
import { Table } from '../Table';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

export class MantenimientoTalleres extends Component {
    static displayName = MantenimientoTalleres.name;
    constructor(props) {
        super(props);
        this.state = {
            lineasNegocio: [],
            lineaNegocio: '',
            idLineaNegocio: '',
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            modalTitulo:'Evidencia',
            serviciosAsociadoHallazgo: [],
            serviciosFiltrados: [],
            idServicio: '',
            servicio: '',
            secuenciaHallazgo: '',
            secuenciaEtapa: '',
            numeroOficioEnvio: [],
            orbe: '',
            fechaCreacion: '',
            detalleGeneral: '',
            fechaNumOficio:'',
            talleres: [],
            idTipoTaller: '',
            tipoTaller: '',
            tipoTallerEtapa:'',
            talleresEtapa:[],
            mantenimientoTallerCo: '',
            listaTallerCoCreacion: [],
            listaEtapas:[],
            cabeceras: ["Id", "Taller", "Solucion Asociada", "Servicio", "Estado", "Acciones"],
            cabeceraEtapa: ["Id", "Macro Actividad(Linea)", "Observaciones", "Acciones","Anexos"],
            usuarioModificoT: "",
            fechaModificadoT: "",
            usuarioCreacionT: "",
            fechaCreacionT: "",
            observacion:"",
            macroActividades: [],
            idMacro: '',
            macroActividad: '',
            etapaTallerCo:'',
        };
    }
    async ObtenerListadoMantenimientoCo() {
        const respuesta = await ObtenerMantenimientoTallerCoCreacion();
        this.setState({ listaTallerCoCreacion: respuesta });
    }
    async ObtenerListadoEtapas() {
      //  const respuesta = await ObtenerEtapasTallerCoCreacion(1);
        //this.setState({ listaEtapas: respuesta });
    }
    async ObtenerNumeroOficioEnvio() {

        const respuesta = await ObtenerDatosOrbe();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idOrbe, fecha: row.fechaIngreso, label: row.idOrbe + ' ' + row.orbe }
        })

        this.setState({ numeroOficioEnvio: options });

    }

    async ObtenerSecuenciaHallazgo() {
        const respuesta = await ObtenerCantidadMantenimientoTalleresCoCreacion();
        this.setState({ secuenciaHallazgo: respuesta.cantidad + 1 });
        const respuestaEtapa = await ObtenerCantidadEtapasTallerCo();
        this.setState({ secuenciaEtapa: respuestaEtapa.cantidad + 1 });
    }

        
    
    async ObtenerServicioAsociadoHallazgo() {
        const respuesta = await ObtenerServicioLineaNegocio();
        const options = respuesta.map(function (row) {
            return { value: row.idServicio, label: row.idServicio + ' ' + row.servicio, idLinea: row.idLinea }
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

    async ObtenerTalleres() {
        const respuesta = await ObtenerTipoTaller();
        const options = respuesta.map(function (row) {
            return { value: row.idTipoTaller, label: row.idTipoTaller + ' ' + row.tipoTaller }
        })
        this.setState({ talleres: options });
    }
    async ObtenerTalleresEtapa() {
        const respuesta = await ObtenerTipoTaller();
        const options = respuesta.map(function (row) {
            return { value: row.idTipoTaller, label: row.idTipoTaller + ' ' + row.tipoTaller }
        })
        this.setState({ talleresEtapa: options });
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

    onChangeTipoTaller = (e) => {
        this.setState({ tipoTaller: e });
    }

    onChangeMacroNumeroOficioEnvio = (e) => {
        this.setState({ orbe: e });
        var cadena = this.formatDate(e.fecha.slice(0, 10));
        this.setState({ fechaCreacion: cadena })

    }
    onChangeDetalleGeneral = (e) => {
        this.setState({ detalleGeneral: e.target.value });
    }
    
    onClickAgregarMantenimientoTallerCo = async () => {
        const element = document.getElementById("FormMT");
        const element2 = document.getElementById("btnGuardar");
        const element3 = document.getElementById("btnEditar");
        element2.hidden = false;
        element.hidden = false;
        element3.hidden = true;
        var datos = {
            idTipoTaller: parseInt(this.state.tipoTaller.value),
            idSolucionAsociadaHallazgo: parseInt(this.state.lineaNegocio.value),
            idServicioAsociadoHallazgo: parseInt(this.state.servicio.value),
            numOficioEnvio: parseInt(this.state.orbe.value),
            fechaNumOficio: this.formatDate(this.state.fechaCreacion),
            descripcionGeneral: this.state.detalleGeneral,
          
        }; 
        const result = this.GuardarHallazgo(datos);
        element.hidden = true;
        element2.hidden = false;
        element3.hidden = false;
    }
    GuardarHallazgo = async (data) => {
        let respuesta = {};
        respuesta = await AgregarMantenimientoTallerCoCreacion(data);
        const element = document.getElementById("FormMT");
        const element2 = document.getElementById("btnEditar");
        const element3 = document.getElementById("btnGuardar");
        element.hidden = true;
        element2.hidden = false;
        element3.hidden = false;
        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });
        }
        else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }
        $('#example').DataTable().destroy();

        await this.ObtenerListadoMantenimientoCo();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ show: true });

    }

    async focusEdit(e) {
        if (e != '') {
            const respuesta = await ObtenerMantenimientoTallerCoCreacionPorID(e);
            this.mantenimientoTallerCo = respuesta;
            this.setState({ data: respuesta });
        }
        else {
            this.setState({ mantenimientoTallerCo: '' });
        }
        const element = document.getElementById("FormMT");
        const element2 = document.getElementById("btnGuardar");
        const element3 = document.getElementById("btnEditar");
        element2.hidden = true;
        element.hidden = false;
        element3.hidden = false;
        document.getElementById("detalleGeneral").focus();
        this.setState({ secuenciaHallazgo: this.mantenimientoTallerCo.idMantenimientoTalleresCoCreacion });
        this.setState({ tipoTaller: this.state.talleres.find(x => x.value === this.mantenimientoTallerCo.idTipoTaller) });
        this.setState({ lineaNegocio: this.state.lineasNegocio.find(x => x.value === this.mantenimientoTallerCo.idSolucionAsociadaHallazgo) });
        this.state.serviciosFiltrados = this.state.serviciosAsociadoHallazgo.filter(servicio => servicio.idLinea == this.mantenimientoTallerCo.idSolucionAsociadaHallazgo);
        this.setState({ servicio: this.state.serviciosFiltrados.find(x => x.value === this.mantenimientoTallerCo.idServicioAsociadoHallazgo) });
        this.setState({ orbe: this.state.numeroOficioEnvio.find(x => x.value === this.mantenimientoTallerCo.numOficioEnvio) });
        this.setState({ fechaCreacion: this.formatDate2(this.mantenimientoTallerCo.fechaNumOficio) });
        this.setState({ detalleGeneral: this.mantenimientoTallerCo.descripcionGeneral });
        
        
    }

    onClickEditarMantenimientoTallerCo = async () => {
        const element = document.getElementById("FormMT");
        const element2 = document.getElementById("btnEditar");
        const element3 = document.getElementById("btnGuardar");
        element.hidden = false;
        element2.hidden = false;
        element3.hidden = true;
        var datos = {
            idMantenimientoTalleresCoCreacion: this.state.secuenciaHallazgo,
            idTipoTaller: parseInt(this.state.tipoTaller.value),
            idSolucionAsociadaHallazgo: parseInt(this.state.lineaNegocio.value),
            idServicioAsociadoHallazgo: parseInt(this.state.servicio.value),
            numOficioEnvio: parseInt(this.state.orbe.value),
            fechaNumOficio: this.formatDate(this.state.fechaCreacion),
            descripcionGeneral: this.state.detalleGeneral,
        };
        const result = this.EditarHallazgo(datos);
        element.hidden = true;
        element2.hidden = false;
        element3.hidden = false;
       
    }
    EditarHallazgo = async (data) => {
        let respuesta = {};
        respuesta = await ActualizarMantenimientoTallerCoCreacion(data);
        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });
        } else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }
        $('#example').DataTable().destroy();

        await this.ObtenerListadoMantenimientoCo();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ show: true });

    }

  

    onClickInactivarMantenimientoTallerCo = async (id) => {
        const respuesta = await EliminarMantenimientoTallerCoCreacion(id);
        if (respuesta.indicador === 0) {
            this.setState({ lineaMantenimientoTaller: await this.ObtenerListadoMantenimientoCo() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }
    onClickNuevoMantenimientoTallerCo() {
        this.ObtenerSecuenciaHallazgo();
        this.setState({ tipoTaller:'' });
        this.setState({ lineaNegocio: '' });
        this.setState({ servicio:''});
        this.setState({ orbe: '' });
        this.setState({ fechaCreacion: '' });
        this.setState({ detalleGeneral: '' });
        const element = document.getElementById("FormMT");
        const element2 = document.getElementById("btnEditar");
        const element3 = document.getElementById("btnGuardar");
        element.hidden = false;
        element2.hidden = true;
        element3.hidden = false;
        document.getElementById("detalleGeneral").focus();

    }
    formatDate = (i) => {
        if (i != '') {
            var datePart = i.match(/\d+/g),
                year = datePart[2], 
                month = datePart[0],
                day = datePart[1];
            return day + "/" + month + "/" + year;
        } else {
            return "No hay";
        }
    }
    formatDate2 = (i) => {
        if (i != '') {
            var datePart = i.match(/\d+/g),
                year = datePart[2],
                month = datePart[1],
                day = datePart[0];
            return day + "/" + month + "/" + year;
        } else {
            return "No hay";
        }
    }
    formatDateEtapa = (i) => {
        if (i != '') {
            var datePart = i.match(/\d+/g),
                year = datePart[0],
                month = datePart[1],
                day = datePart[2];
            return day + "/" + month + "/" + year;
        } else {
            return "No hay";
        }
    }
    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }
    onClickAgregarEvidencia = () => {

        this.setState({ data: this.mantenimientoHallazgo });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Agregar" });
        this.setState({ modalTitulo: "Agregar Evidencia" });
    }
    ////////Nuevo/////////
    async ObtenerMacroActividadAsoEtapa() {
        const respuesta = await ObtenerMacroActividad();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idMacro, label: row.idMacro + ' ' + row.macroActividad }
        })

        this.setState({ macroActividades: options });
    }

    onChangeMacroActividad = (e) => {
        this.setState({ macroActividad: e });


    }
    onClickNuevoDatoEtapa() {
        const element = document.getElementById("formEM");
        element.hidden = false;
        const element2 = document.getElementById("btnGuardarEtapa");
        const element3 = document.getElementById("btnEditarEtapa");
        element2.hidden = false;
        element3.hidden = true;
        this.ObtenerSecuenciaHallazgo();
        this.setState({ macroActividad: '' });
        this.setState({ observacion: '' });


    }
    onChangeObservacion= (e) => {
        this.setState({ observacion: e.target.value });
    }

    onChangeObtenerIdEtapa = async (e) => {
        const element = document.getElementById("BotonGuardarEtapa");
        element.hidden = false;
        this.setState({ tipoTallerEtapa: e });
        const respuesta = await ObtenerEtapasTallerCo(e.value);
        this.setState({ listaEtapas: respuesta });
        //obtengo la fecha
        const R = await ObtenerFechasTallerCo(e.value);
        if (R !== null) {
            this.setState({ usuarioModificoT: R.modificadoPor });
            this.setState({ fechaModificadoT: this.formatDateEtapa(R.fechaModificacion) });
            this.setState({ usuarioCreacionT: R.ingresadoPor });
            this.setState({ fechaCreacionT: this.formatDateEtapa(R.fechaIngreso) });
        } else {
            this.setState({ usuarioModificoT: '' });
            this.setState({ fechaModificadoT: '' });
            this.setState({ usuarioCreacionT: '' });
            this.setState({ fechaCreacionT: '' });
        }
    }
    onClickAgregarEtapa = async () => {
        const element = document.getElementById("formEM");
        const element2 = document.getElementById("btnGuardarEtapa");
        const element3 = document.getElementById("btnEditarEtapa");
        element2.hidden = false;
        element.hidden = false;
        element3.hidden = true;
        var datos = {
            idTipoTaller: parseInt(this.state.tipoTallerEtapa.value),
            idMacro: parseInt(this.state.macroActividad.value),
            observacion: this.state.observacion,

        };
        const result = this.GuardarEtapa(datos);
        element.hidden = true;
        element2.hidden = false;
        element3.hidden = false;
        
    }
    GuardarEtapa = async (data) => {
        let respuesta = {};
        respuesta = await AgregarEtapaTallerCo(data);
        const element = document.getElementById("formEM");
        const element2 = document.getElementById("btnEditarEtapa");
        const element3 = document.getElementById("btnGuardarEtapa");
        element.hidden = true;
        element2.hidden = false;
        element3.hidden = false;
        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });
        }
        else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }
        $('#example').DataTable().destroy();

        const respuesta1 = await ObtenerEtapasTallerCo(data.idTipoTaller);
        this.setState({ listaEtapas: respuesta1 });

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ show: true });

    }
    
    async onclickFocusEditarEtapa(e) {
        if (e != '') {
            const respuesta = await ObtenerEtapaTallerCoPorID(e);
            this.etapaTallerCo = respuesta;
            this.setState({ data: respuesta });
        }
        else {
            this.setState({ etapaTallerCo: '' });
        }
        const element = document.getElementById("formEM");
        const element2 = document.getElementById("btnGuardarEtapa");
        const element3 = document.getElementById("btnEditarEtapa");
        element.hidden = false;
        element2.hidden = true; 
        element3.hidden = false;
        //document.getElementById("detalleGeneral").focus();
        console.log(this.etapaTallerCo);
        this.setState({ secuenciaEtapa: this.etapaTallerCo.idEtapaTallerCo });
        this.setState({ idTipoTaller: this.etapaTallerCo.idTipoTaller });
        this.setState({ macroActividad: this.state.macroActividades.find(x => x.value === parseInt(this.etapaTallerCo.idMacro)) });
        this.setState({ observacion: this.etapaTallerCo.observacion });

       

    } 


    onClickEditarEtapa = async () => {
            const element = document.getElementById("formEM");
            const element2 = document.getElementById("btnEditarEtapa");
            const element3 = document.getElementById("btnGuardarEtapa");
            element.hidden = false;
            element2.hidden = false;
            element3.hidden = true;
        var datos = {
                idEtapaTallerCo: this.state.secuenciaEtapa,
                idTipoTaller: parseInt(this.state.tipoTallerEtapa.value),
                idMacro: parseInt(this.state.macroActividad.value),
                observacion: this.state.observacion,
            };
            const result = this.EditarEtapa(datos);
            element.hidden = true;
            element2.hidden = false;
            element3.hidden = false;

        }
    EditarEtapa = async (data) => {
        let respuesta = {};
        respuesta = await ActualizarEtapaTallerCo(data);
        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });
        } else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }
        $('#example').DataTable().destroy();

        const respuesta1 = await ObtenerEtapasTallerCo(data.idTipoTaller);
        this.setState({ listaEtapas: respuesta1 });

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ show: true });

    }
    ////////////////////

    async componentDidMount() {
        await this.ObtenerLineasNegocio();
        await this.ObtenerServicioAsociadoHallazgo();
        await this.ObtenerSecuenciaHallazgo();
        await this.ObtenerNumeroOficioEnvio();
        await this.ObtenerTalleres();
        await this.ObtenerListadoEtapas();
        await this.ObtenerTalleresEtapa();
        await this.ObtenerMacroActividadAsoEtapa();
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
        await this.ObtenerListadoMantenimientoCo();
    }
    gridMantenimiento = () => {
        return this.state.listaTallerCoCreacion.map((item, index) => (
            <tr key={index}>
                <td>{item.idMantenimientoTalleresCoCreacion}</td>
                <td>{item.tipoTaller}</td>
                <td>{item.lineaNegocio}</td>
                <td>{item.servicio}</td>




                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.focusEdit(item.idMantenimientoTalleresCoCreacion)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarMantenimientoTallerCo(item.idMantenimientoTalleresCoCreacion)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }
    tablaEtapas = () => {
        return this.state.listaEtapas.map((item, index) => (
            <tr key={index}>
                <td>{item.idEtapaTallerCo}</td>
                <td>{item.macroActividad}</td>
                <td>{item.observacion}</td>
                <td> <Button color="primary" onClick={() => this.onclickFocusEditarEtapa(item.idEtapaTallerCo)} style={{ marginRight: "1vw" }}>Editar
                </Button></td>

               

                <td style={{ display: "flex", padding: "0.5vw" }}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Button onClick={() => this.onClickAgregarEvidencia()} color="primary" variant="primary" size="sm">Evidencia</Button>
                    </Form.Group>
                        <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className="FormularioAnotacion">
                        <FormAnotacion /*onClickProcesarAnotacion={this.onClickProcesarAnotacion}*/ />
                    </FormularioModal>
                    
                </td>
            </tr>
        ))
    }
    render() {
        const {  
            lineasNegocio,
            lineaNegocio,
            idLineaNegocio,
            pendiente,
            data,
            modal,
            proceso,
            mensajeRespuesta,
            show,
            alerta,
            serviciosAsociadoHallazgo,
            serviciosFiltrados,
            idServicio,
            servicio,
            secuenciaHallazgo,
            secuenciaEtapa,
            numeroOficioEnvio,
            orbe,
            detalleGeneral,
            fechaNumOficio,
            fechaCreacion,
            talleres,
            idTipoTaller,
            tipoTaller,
            tipoTallerEtapa,
            usuarioModificoT, 
            fechaModificadoT,
            usuarioCreacionT,
            fechaCreacionT,
            macroActividades,
            idMacro,
            macroActividad,
            observacion,
        } = this.state;
        return (
            <main>
                <div class="row-full">Grid Taller CoCreacion</div>
                <Container >
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoMantenimientoTallerCo()}>Insertar Nuevo Mantenimiento Taller Cocreación</Button>
                    <hr />
                    <br />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />

                    <Table tableHeading={this.state.cabeceras} body={this.gridMantenimiento()} />
                </Container >
                <div class="row-full">Talleres de Co Creación </div>

                <div id="FormMT" hidden>
                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Secuencia</h5>
                                <input readonly className="secuencia" name="secuencia_hallazgos" value={this.state.secuenciaHallazgo}>

                                </input>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">

                                <h6 className="heading3" style={{ "fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif", "fontStyle": "normal", "fontWeight": "400", "textRendering": "optimizeLegibility" }}>Tipo Taller</h6>

                                <Select id="tipoTaller" onChange={this.onChangeTipoTaller} isClearable={true} value={tipoTaller} options={this.state.talleres} />

                            </div>

                        </Col>

                        <Col md={4}>
                            <div className="item1">

                                <h6 className="heading3" style={{ "fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif", "fontStyle": "normal", "fontWeight": "400", "textRendering": "optimizeLegibility" }}>Linea Negocio</h6>

                                <Select id="lineaNegocio" placeholder="Seleccione..." onChange={this.onChangeLineaNegocio} isClearable={true} value={lineaNegocio} options={this.state.lineasNegocio} />

                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                           
                            <div className="item1">

                                <h6 className="heading3" style={{ "fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif", "fontStyle": "normal", "fontWeight": "400", "textRendering": "optimizeLegibility" }}>Servicio</h6>

                                <Select id="servicioAso" placeholder="Seleccione..." onChange={this.onChangeServicioAsoHallazgo} isClearable={true} value={servicio} options={this.state.serviciosFiltrados} />
                            </div>
                        </Col>

                        <Col md={4}>
                               <div className="item1">
                                <h6 className="heading3" style={{ "fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif", "fontStyle": "normal", "fontWeight": "400", "textRendering": "optimizeLegibility"}}>Nro de Oficio del Envio</h6>

                                    <Select id="numOficioEnvio" onChange={this.onChangeMacroNumeroOficioEnvio} isClearable={true} value={orbe } options={this.state.numeroOficioEnvio} />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Fecha</h5>
                                <input readonly className="etiqueta" name="fecha_oficio" value={this.state.fechaCreacion}>

                                </input>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>

                            <div className="item1">
                                <h6 className="heading3">Descripción General</h6>
                                <Input
                                    id="detalleGeneral"
                                    name="text"
                                    type="textarea"
                                    value={detalleGeneral}
                                    onChange={this.onChangeDetalleGeneral}
                                />

                            </div>
                        </Col>


                    </Row>
                    <Row>
                        <Col md={3}>
                                <button id="btnGuardar" type="button" className="btn  btn-block botones" onClick={() => this.onClickAgregarMantenimientoTallerCo()}>Guardar</button>
                                <button id="btnEditar" type="button" className="btn  btn-block botones" onClick={() => this.onClickEditarMantenimientoTallerCo()}>Editar</button>
                        </Col>
                    </Row>
                  </Container>
                </div>
   
                <Container>
                    <div class="heading2">Equipo de Trabajo </div>
                    <table className="table table-bordered table" name="table_equipo">
                        <thead className="titulo2">
                            <tr >
                                <th>Dirección</th>
                                <th>Participante</th>
                                <th>Asistencia</th>
                                <th>Nro. Fase Customer Journey</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>



                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Adicionado por</h5>
                                <input type="text" className="etiqueta" name="fecha_adicion" />
                                <input type="text" placeholder="" name="usuario_adicion_taller" />

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Modificado por</h5>
                                <input type="text" className="etiqueta" name="fecha_modificacion" />
                                <input type="text" placeholder="" name="usuario_modificacion_taller" />
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>

                </Container >


                <div class="row-full">Observaciones </div>

                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Etapa</h5>
                                <Select id="tipoTaller" onChange={this.onChangeObtenerIdEtapa} isClearable={true} value={tipoTallerEtapa} options={this.state.talleresEtapa} />
                            </div>
                        </Col>
                        <div id="BotonGuardarEtapa" hidden>
                        <Col md={4}>
                            <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoDatoEtapa()}>Insertar Nuevo Mantenimiento Taller Cocreación</Button>
                        </Col>
                        </div>
                        <Col md={4}>

                        </Col>
                    </Row>


                    <Table tableHeading={this.state.cabeceraEtapa} body={this.tablaEtapas()} />

                    <div id="formEM" hidden>
                        <div class="heading2">Agregar datos a etapa </div>
                        <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Secuencia</h5>
                                    <input readonly className="secuencia" name="secuencia_hallazgos" value={this.state.secuenciaEtapa}>

                                </input>

                            </div>
                        </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Macro Actividad Asociada a la etapa </h6>
                                    <Select id="macroActividadAso" placeholder="Seleccione..." onChange={this.onChangeMacroActividad} isClearable={true} value={macroActividad} options={this.state.macroActividades} />
                                </div>
                            </Col>
                        <Col >
                            <div className="item1">
                                <h6 className="heading3">Observaciones</h6>
                                <Input
                                    id="detalleGeneral"
                                    name="text"
                                    type="textarea"
                                    value={observacion}
                                    onChange={this.onChangeObservacion}

                                />

                            </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button id="btnGuardarEtapa" type="button" className="btn  btn-block botones" onClick={() => this.onClickAgregarEtapa()}>Guardar</button>
                                <button id="btnEditarEtapa" type="button" className="btn  btn-block botones" onClick={() => this.onClickEditarEtapa()}>Editar</button>
                            </Col>
                        </Row>
                    </div>
                    <div class="heading2">Información Auditoria</div>
                    <Row>
                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3"> Adicionado por</h5>
                                <div id="fechas">
                                    <input type="text" className="etiqueta" name="fecha_adicion" value={this.state.fechaCreacionT} />
                                    <input type="text" placeholder="" name="usuario_adicion" value={this.state.usuarioCreacionT}/>
                                </div>

                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1">
                                <h5 className="heading3">Modificado por</h5>
                                <div id="fechas">
                                    <input type="text" className="etiqueta" name="fecha_modificacion" value={this.state.fechaModificadoT} />
                                    <input type="text" placeholder="" name="usuario_modificacion" value={this.state.usuarioModificoT} />
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>

                        </Col>
                    </Row>


                </Container >


            </main>
        );
    }
}