import React, { Component, useState } from 'react';
import { Container, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerCantidadMantenimientoTalleresCoCreacion, ObtenerDatosOrbe, ObtenerFechasTallerCoCreacion, ObtenerEtapasTallerCoCreacion, ObtenerMantenimientoTallerCoCreacion, EliminarMantenimientoTallerCoCreacion, ObtenerMantenimientoTallerCoCreacionPorID, AgregarMantenimientoTallerCoCreacion, ActualizarMantenimientoTallerCoCreacion } from '../../servicios/ServicioMantenimientoTalleresCoCreacion';
import { AgregarEtapaTallerCo, ActualizarEtapaTallerCo, ObtenerEtapaTallerCoPorID, ObtenerEtapasTallerCo, ObtenerFechasTallerCo, ObtenerCantidadEtapasTallerCo } from '../../servicios/ServicioEtapasTallerCo';
import { ObtenerServicioLineaNegocio, ObtenerLineasNegociosActivos } from '../../servicios/ServicioServicioLineaNegocio';
import { InsertarParticipanteEquipoTrabajo, ObtenerEquipoTrabajoPorIdTaller,EliminarParticipante,ObtenerParticipantePorID,ActualizarParticipante  } from '../../servicios/ServicioParticipantesEquipoTrabajo';
import { ObtenerTipoTaller } from '../../servicios/ServicioTipoTaller';
import { ObtenerMacroActividad } from '../../servicios/ServicioMacroActividad';
import FormAnotacion from '../mantenimientos_forms/formAnotacion';
import FormParticipantesEquipoTrabajo from '../mantenimientos_forms/formParticipantesEquipoTrabajo';
import { FormularioModal } from '../components_forms/ventanaModal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { Alert } from 'react-bootstrap';
import { Table, Table2, Table3   } from '../Table';
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
            cabeceraEtapa: ["Id", "Macro Actividad(Linea)", "Observaciones", "Acciones", "Anexos"],
            cabeceraEquipoTrabajo: ["Id Participante", "Nombre", "Direccion", "Fase Customer Journey", "Asistencia" ,"Estado", "Acciones"],
            usuarioModificoT: "",
            fechaModificadoT: "",
            usuarioCreacionT: "",
            fechaCreacionT: "",
            observacion:"",
            macroActividades: [],
            idMacro: '',
            macroActividad: '',
            etapaTallerCo: '',
            idTallerCo: '',
            listaParticipantes: [],
            labelButtonP: '',
            modalTituloP: false,
            mensajeFormularioP: '',
            modalParticipantes: false,
            mensajeRespuestaP: {},
            alertaP: true,
            showP: false,
            usuarioAgrego: "",
            fechaAgregado: "",
            usuarioModifico: "",
            fechaModificado: "",
            labelButtonE: '',
            modalTituloE: false,
            mensajeFormularioE: '',
            modalEtapas: false,
            mensajeRespuestaE: {},
            alertaE: true,
            showE: false,

        };
    }

    ///Equipo de Trabajo
    onClickFila = (item) => {
        var fechaingreso = new Date(item.fechaIngreso);
        var fechamodificacion = new Date(item.fechaModificacion);
        this.setState({ usuarioAgrego: item.ingresadoPor });
        this.setState({ fechaAgregado: fechaingreso.toLocaleDateString() });
        this.setState({ usuarioModifica: item.modificadoPor });
        this.setState({ fechaModificado: fechamodificacion.toLocaleDateString() });
    }

    onClickInactivarParticipanteEquipoTrabajo = async (id) => {
        const respuesta = await EliminarParticipante(id)
        if (respuesta.indicador === 0) {
            await this.ObtenerListadoParticipantesEquipoTrabajo();
            this.setState({ alertaP: true });
        } else {
            this.setState({ alertaP: false });
        }
        this.setState({ mensajeRespuestaP: respuesta });
        this.setState({ showP: true });
    }

    async ObtenerEquipoTrabajoPorIdTaller() {
        const respuesta = await ObtenerEquipoTrabajoPorIdTaller(this.mantenimientoTallerCo.idMantenimientoTalleresCoCreacion);
        this.setState({ listaParticipantes: respuesta });
    }

    onClickAgregarParticipante = () => {
        this.setState({ proceso: 1 });
        this.setState({ modalParticipantes: !this.state.modalParticipantes });
        this.setState({ labelButtonP: "Agregar" });
        this.setState({ modalTituloP: "Agregar Participante" });
    }
    
    onClickCerrarModalParticipante = () => {
        this.setState({ modalParticipantes: false });
        this.setState({ mensajeFormularioP: "" });
    }

    onClickProcesarParticipante = async (data) => {
        data.IdTallerCoCreacion = parseInt(this.state.secuenciaHallazgo);
        let respuesta = {};

        if (this.state.proceso === 1)

            respuesta = await InsertarParticipanteEquipoTrabajo(data);
        else {

            respuesta = await ActualizarParticipante(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modalP: false });
            this.setState({ mensajeRespuestaP: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alertaP: true });
            this.setState({ modalParticipantes: !this.state.modalParticipantes });
            
            $('#example2').DataTable().destroy();
            await this.ObtenerEquipoTrabajoPorIdTaller();
            
            setTimeout(() => {
                $('#example2').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);
        } else {
            this.setState({ mensajeFormularioP: respuesta.mensaje });
            this.setState({ alertaP: false });
        }

        this.setState({ showP: true });
    }

    onClickActualizarParticipante = async (id) => {
        this.setState({ data: await ObtenerParticipantePorID(id) })
        this.setState({ proceso: 2 });
        this.setState({ modalParticipantes: !this.state.modalParticipantes });
        this.setState({ labelButtonP: "Actualizar" });
        this.setState({ modalTituloP: "Actualizar Participante" });
    }

    ///Termina Equipos de Trabajo




    async ObtenerListadoMantenimientoCo() {
        const respuesta = await ObtenerMantenimientoTallerCoCreacion();
        this.setState({ listaTallerCoCreacion: respuesta });
    }

    async ObtenerListadoParticipantesEquipoTrabajo() {
        const respuesta = await ObtenerEquipoTrabajoPorIdTaller(this.mantenimientoTallerCo.idMantenimientoTalleresCoCreacion);
        this.setState({ listaParticipantes: respuesta });
        
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
    }
    async ObtenerSecuenciaEtapa() {
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
        const formTalleres = document.getElementById("FormTalleresCo");
        const formEtapa = document.getElementById("observaciones");
        const botonGuardar = document.getElementById("btnGuardar");
        const botonEditar = document.getElementById("btnEditar");
        formTalleres.hidden = false;
        formEtapa.hidden = true;
        botonGuardar.hidden = false;
        botonEditar.hidden = true;

        var datos = {
            idTipoTaller: parseInt(this.state.tipoTaller.value),
            idSolucionAsociadaHallazgo: parseInt(this.state.lineaNegocio.value),
            idServicioAsociadoHallazgo: parseInt(this.state.servicio.value),
            numOficioEnvio: parseInt(this.state.orbe.value),
            fechaNumOficio: this.state.fechaCreacion,
            descripcionGeneral: this.state.detalleGeneral,
          
        }; 
        const result = this.GuardarHallazgo(datos);
        formTalleres.hidden = true;
        botonGuardar.hidden = false;
        botonEditar.hidden = false;
    }

    GuardarHallazgo = async (data) => {
        let respuesta = {};
        respuesta = await AgregarMantenimientoTallerCoCreacion(data);
        const formTalleres = document.getElementById("FormTalleresCo");
        const formEtapa = document.getElementById("observaciones");
        const botonEditar = document.getElementById("btnEditar");
        const botonGuardar = document.getElementById("btnGuardar");
        formTalleres.hidden = true;
        formEtapa.hidden = true;
        botonEditar.hidden = false;
        botonGuardar.hidden = false;

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
        const tablaTaller = document.getElementById("tablaTaller");
        tablaTaller.hidden = false;

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

            $('#example2').DataTable().destroy();
            await this.ObtenerListadoParticipantesEquipoTrabajo();
            setTimeout(() => {
                $('#example2').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);
        }
        else {
            this.setState({ mantenimientoTallerCo: '' });
        }
        const participantes = document.getElementById("participantes");
        participantes.hidden = false;
        const tablaTaller = document.getElementById("tablaTaller");
        tablaTaller.hidden = true;
        const formTalleres = document.getElementById("FormTalleresCo");
        const observaciones = document.getElementById("observaciones");
        const botonGuardar = document.getElementById("btnGuardar");
        const botonEditar = document.getElementById("btnEditar");
        formTalleres.hidden = false;
        observaciones.hidden = false;
        botonGuardar.hidden = true;
        botonEditar.hidden = false;
        document.getElementById("detalleGeneral").focus();
        //Etapas
        
        this.setState({ idTallerCo: this.mantenimientoTallerCo.idMantenimientoTalleresCoCreacion });

        //editar taller
        this.setState({ secuenciaHallazgo: this.mantenimientoTallerCo.idMantenimientoTalleresCoCreacion });
        this.setState({ tipoTaller: this.state.talleres.find(x => x.value === this.mantenimientoTallerCo.idTipoTaller) });
        this.setState({ lineaNegocio: this.state.lineasNegocio.find(x => x.value === this.mantenimientoTallerCo.idSolucionAsociadaHallazgo) });
        this.state.serviciosFiltrados = this.state.serviciosAsociadoHallazgo.filter(servicio => servicio.idLinea == this.mantenimientoTallerCo.idSolucionAsociadaHallazgo);
        this.setState({ servicio: this.state.serviciosFiltrados.find(x => x.value === this.mantenimientoTallerCo.idServicioAsociadoHallazgo) });
        this.setState({ orbe: this.state.numeroOficioEnvio.find(x => x.value === this.mantenimientoTallerCo.numOficioEnvio) });
        this.setState({ fechaCreacion: this.formatDate(this.mantenimientoTallerCo.fechaNumOficio) });
        this.setState({ detalleGeneral: this.mantenimientoTallerCo.descripcionGeneral });
    }

    onClickEditarMantenimientoTallerCo = async () => {
        const participantes = document.getElementById("participantes");
        const formTalleres = document.getElementById("FormTalleresCo");
        const observaciones = document.getElementById("observaciones");
        const botonEditar = document.getElementById("btnEditar");
        const botonGuardar = document.getElementById("btnGuardar");
        formTalleres.hidden = false;
        observaciones.hidden = false;
        botonEditar.hidden = false;
        botonGuardar.hidden = true;
        var datos = {
            idMantenimientoTalleresCoCreacion: this.state.secuenciaHallazgo,
            idTipoTaller: parseInt(this.state.tipoTaller.value),
            idSolucionAsociadaHallazgo: parseInt(this.state.lineaNegocio.value),
            idServicioAsociadoHallazgo: parseInt(this.state.servicio.value),
            numOficioEnvio: parseInt(this.state.orbe.value),
            fechaNumOficio: this.state.fechaCreacion,
            descripcionGeneral: this.state.detalleGeneral,
        };
        const result = this.EditarHallazgo(datos);
        formTalleres.hidden = true;
        botonEditar.hidden = false;
        botonGuardar.hidden = false;
        participantes.hidden = true;
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
        const tablaTaller = document.getElementById("tablaTaller");
        tablaTaller.hidden = false;
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
        const tablaTaller = document.getElementById("tablaTaller");
        tablaTaller.hidden = true;
        this.ObtenerSecuenciaHallazgo();
        this.setState({ tipoTaller:'' });
        this.setState({ lineaNegocio: '' });
        this.setState({ servicio:''});
        this.setState({ orbe: '' });
        this.setState({ fechaCreacion: '' });
        this.setState({ detalleGeneral: '' });
        const formTalleres = document.getElementById("FormTalleresCo");
        const observaciones = document.getElementById("observaciones");
        const botonEditar = document.getElementById("btnEditar");
        const botonGuardar = document.getElementById("btnGuardar");
        formTalleres.hidden = false;
        observaciones.hidden = true;
        botonEditar.hidden = true;
        botonGuardar.hidden = false;
        document.getElementById("detalleGeneral").focus();

    }
    ///////////////////////////////////////////////457
    onClickCancelar = async () => {
        $('#example3').DataTable().destroy();
        const tablaTaller = document.getElementById("tablaTaller");
        const participantes = document.getElementById("participantes");
        const formEtapa = document.getElementById("formAgregarEtapa");
        const formMantTaller = document.getElementById("FormTalleresCo");
        const observaciones = document.getElementById("observaciones");
        const botonEditar = document.getElementById("btnEditar");
        const botonGuardar = document.getElementById("btnGuardar");
        tablaTaller.hidden = false;
        botonEditar.hidden = false;
        botonGuardar.hidden = false;
        formMantTaller.hidden = true;
        participantes.hidden = true;
        observaciones.hidden = true;
        formEtapa.hidden = true;
        const botonGuardarEtapa = document.getElementById("BotonGuardarEtapa");
        botonGuardarEtapa.hidden = true;
        this.setState({ listaEtapas: [] });
        this.setState({ tipoTallerEtapa: '' });
        this.setState({ usuarioModificoT: '' });
        this.setState({ fechaModificadoT: '' });
        this.setState({ usuarioCreacionT: '' });
        this.setState({ fechaCreacionT: '' });

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
        if (i != ''&& i!=null) {
            var datePart = i.match(/\d+/g),
                year = datePart[0],
                month = datePart[1],
                day = datePart[2];
            return day + "/" + month + "/" + year;
        } else {
            return "No existe";
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
        const formEtapa = document.getElementById("formAgregarEtapa");
        const observaciones = document.getElementById("observaciones");
        formEtapa.hidden = false;
        observaciones.hidden = false;
        const botonGuardar = document.getElementById("btnGuardarEtapa");
        const botonEditar = document.getElementById("btnEditarEtapa");
        botonGuardar.hidden = false;
        botonEditar.hidden = true;
        this.ObtenerSecuenciaHallazgo();
        this.setState({ macroActividad: '' });
        this.setState({ observacion: '' });


    }
    onChangeObservacion= (e) => {
        this.setState({ observacion: e.target.value });
    }

    onChangeObtenerIdEtapa = async (e) => {

        const botonGuardarEtapa = document.getElementById("BotonGuardarEtapa");
        botonGuardarEtapa.hidden = false;
        this.setState({ tipoTallerEtapa: e });
        //const respuesta = await ObtenerEtapasTallerCo(e.value, this.state.idTallerCo);
        //this.setState({ listaEtapas: respuesta });
        $('#example3').DataTable().destroy();

        const respuesta1 = await ObtenerEtapasTallerCo(e.value, this.state.idTallerCo);
        this.setState({ listaEtapas: respuesta1 });

        setTimeout(() => {
            $('#example3').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
        //obtengo la fecha
        const R = await ObtenerFechasTallerCo(e.value, this.state.idTallerCo);
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
        const formEtapa = document.getElementById("formAgregarEtapa");
        const observaciones = document.getElementById("observaciones");
        const botonGuardar = document.getElementById("btnGuardarEtapa");
        const botonEditar = document.getElementById("btnEditarEtapa");
        formEtapa.hidden = false;
        observaciones.hidden = false;
        botonGuardar.hidden = false;
        botonEditar.hidden = true;
        var datos = {
            idTallerCoCreacion: this.state.idTallerCo,
            idTipoTaller: parseInt(this.state.tipoTallerEtapa.value),
            idMacro: parseInt(this.state.macroActividad.value),
            observacion: this.state.observacion,

        };
        const result = this.GuardarEtapa(datos);
        formEtapa.hidden = true;
        botonGuardar.hidden = false;
        botonEditar.hidden = false;
        
    }
    GuardarEtapa = async (data) => {
        let respuesta = {};
        respuesta = await AgregarEtapaTallerCo(data);
        const formEtapa = document.getElementById("formAgregarEtapa");
        const botonEditar = document.getElementById("btnEditarEtapa");
        const botonGuardar = document.getElementById("btnGuardarEtapa");
        formEtapa.hidden = true;
        botonEditar.hidden = false;
        botonGuardar.hidden = false;
        if (respuesta.indicador == 0) {
            this.setState({ modalEtapas: false });
            this.setState({ mensajeRespuestaE: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alertaE: true });
        }
        else {
            this.setState({ mensajeFormularioE: respuesta.mensaje });
            this.setState({ alertaE: false });
        }
        $('#example3').DataTable().destroy();

        const respuesta1 = await ObtenerEtapasTallerCo(data.idTipoTaller, this.state.idTallerCo);
        this.setState({ listaEtapas: respuesta1 });

        setTimeout(() => {
            $('#example3').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ showE: true });

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
        const formEtapa = document.getElementById("formAgregarEtapa");
        const observaciones = document.getElementById("observaciones");
        const botonGuardar = document.getElementById("btnGuardarEtapa");
        const botonEditar = document.getElementById("btnEditarEtapa");
        formEtapa.hidden = false;
        observaciones.hidden = false;
        botonGuardar.hidden = true; 
        botonEditar.hidden = false;
        //document.getElementById("detalleGeneral").focus();
        this.setState({ secuenciaEtapa: this.etapaTallerCo.idEtapaTallerCo });
        this.setState({ idTipoTaller: this.etapaTallerCo.idTipoTaller });
        this.setState({ macroActividad: this.state.macroActividades.find(x => x.value === parseInt(this.etapaTallerCo.idMacro)) });
        this.setState({ observacion: this.etapaTallerCo.observacion });

       

    } 


    onClickEditarEtapa = async () => {
        
        const formEtapa = document.getElementById("formAgregarEtapa");
        const observaciones = document.getElementById("observaciones");
        const botonEditar = document.getElementById("btnEditarEtapa");
        const botonGuardar = document.getElementById("btnGuardarEtapa");
        formEtapa.hidden = false;
        observaciones.hidden = false;
        botonEditar.hidden = false;
        botonGuardar.hidden = true;
        var datos = {
            idEtapaTallerCo: this.state.secuenciaEtapa,
            idTallerCoCreacion: this.state.idTallerCo,
            idTipoTaller: parseInt(this.state.tipoTallerEtapa.value),
            idMacro: parseInt(this.state.macroActividad.value),
            observacion: this.state.observacion,
        };
        const result = this.EditarEtapa(datos);
        formEtapa.hidden = true;
        botonEditar.hidden = false;
        botonGuardar.hidden = false;

        }
    EditarEtapa = async (data) => {
        let respuesta = {};
        respuesta = await ActualizarEtapaTallerCo(data);
        if (respuesta.indicador == 0) {
            this.setState({ modalEtapas: false });
            this.setState({ mensajeRespuestaE: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alertaE: true });
        } else {
            this.setState({ mensajeFormularioE: respuesta.mensaje });
            this.setState({ alertaE: false });
        }
        $('#example3').DataTable().destroy();

        const respuesta1 = await ObtenerEtapasTallerCo(data.idTipoTaller, this.state.idTallerCo);
        this.setState({ listaEtapas: respuesta1 });

        setTimeout(() => {
            $('#example3').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ showE: true });

    }

    async componentDidMount() {
        const tablaTaller = document.getElementById("tablaTaller");
        tablaTaller.hidden = false;
        await this.ObtenerLineasNegocio();
        await this.ObtenerServicioAsociadoHallazgo();
        await this.ObtenerSecuenciaHallazgo();
        await this.ObtenerSecuenciaEtapa();
        await this.ObtenerNumeroOficioEnvio();
        await this.ObtenerTalleres();
        await this.ObtenerTalleresEtapa();
        await this.ObtenerMacroActividadAsoEtapa();
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        setTimeout(() => {
            $('#example2').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
        
        setTimeout(() => {
            $('#example3').DataTable(
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
    tablaEquipoTrabajo = () => {
        return this.state.listaParticipantes.map((item, index) => (
            <tr onClick={() => this.onClickFila(item)} key={index}>
                <td>{item.idParticipante}</td>
                <td>{item.nombreParticipante}</td>
                <td>{item.direccion}</td>
                <td>{item.faseCustomerJourney}</td>
                <td>{
                    item.asistencia === 1 ? "Asistió" : "No Asistió"
                }</td>
                
                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarParticipante(item.idParticipante)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarParticipanteEquipoTrabajo(item.idParticipante)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
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
                <div id="tablaTaller" hidden> 
                <div class="row-full">Grid Taller CoCreacion</div>
                <Container >
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoMantenimientoTallerCo()}>Insertar Nuevo Taller Cocreación</Button>
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
                </div>
                <div id="FormTalleresCo" hidden>
                
                <div class="row-full">Talleres de Co Creación </div>

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
                    <Row id="filaBotones">
                        <Col md={3}>
                                <button id="btnGuardar" type="button" className="btn btn-primary btn-lg" onClick={() => this.onClickAgregarMantenimientoTallerCo()}>Guardar</button>
                                <button id="btnEditar" type="button" className="btn btn-primary btn-lg" onClick={() => this.onClickEditarMantenimientoTallerCo()}>Editar</button>
                                <button id="btnCancelar" type="button" className="btn btn-danger btn-lg" onClick={() => this.onClickCancelar()}>Cancelar</button>
                        </Col>
                    </Row>
                  </Container>
                </div>
                <div id="participantes" hidden>
                    <div class="row-full">Equipo de Trabajo</div>
                <Container>
                        
                        <Button onClick={() => this.onClickAgregarParticipante()} style={{ backgroundColor: "#17A797", borderColor: "#17A797" }}>Insertar Participante</Button>
                        <hr></hr>
                        {this.state.showP ?
                            <Alert variant={this.state.alertaP === true ? "success" : "danger"} onClose={() => this.setState({ showP: false })} dismissible>
                                {this.state.mensajeRespuestaP.mensaje}
                            </Alert>
                            : ""}

                        <br />
                        <Table2 tableHeading={this.state.cabeceraEquipoTrabajo} body={this.tablaEquipoTrabajo()} />
                        <FormularioModal show={this.state.modalParticipantes} handleClose={this.onClickCerrarModalParticipante} titulo={this.state.modalTituloP} className="FormularioParticipantes">
                            <FormParticipantesEquipoTrabajo labelButton={this.state.labelButtonP} data={this.state.data} proceso={this.state.proceso} onClickProcesarParticipante={this.onClickProcesarParticipante} mensaje={this.state.mensajeFormularioP} />
                        </FormularioModal>



                        <Row>
                            <Col md={4}>
                                <div className="item1">
                                    <h5 className="heading3"> Adicionado por</h5>
                                    <input type="text" className="etiqueta" name="fecha_adicion" value={this.state.fechaAgregado} />
                                    <input type="text" placeholder="" name="usuario_adicion_taller" value={this.state.usuarioAgrego} />

                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h5 className="heading3">Modificado por</h5>
                                    <input type="text" className="etiqueta" name="fecha_modificacion" value={this.state.fechaModificado} />
                                    <input type="text" placeholder="" name="usuario_modificacion_taller" value={this.state.usuarioModifica} />
                                </div>
                            </Col>

                            <Col md={4}>

                            </Col>
                        </Row>
                    
                    

                    </Container >
                </div>

                <div id="observaciones" hidden>
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
                                <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoDatoEtapa()}>Insertar Nueva Macro Actividad</Button>
                            </Col>
                            </div>
                        </Row>
                        <hr></hr>
                        {this.state.showE ?
                            <Alert variant={this.state.alertaE === true ? "success" : "danger"} onClose={() => this.setState({ showE: false })} dismissible>
                                {this.state.mensajeRespuestaE.mensaje}
                            </Alert>
                            : ""}

                        <br />

                        <Table3 tableHeading={this.state.cabeceraEtapa} body={this.tablaEtapas()} />

                        <div id="formAgregarEtapa" hidden>
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
                                        <button id="btnGuardarEtapa" type="button" className="btn btn-primary btn-lg" onClick={() => this.onClickAgregarEtapa()}>Guardar</button>
                                        <button id="btnEditarEtapa" type="button" className="btn btn-primary btn-lg" onClick={() => this.onClickEditarEtapa()}>Editar</button>
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

                </div>

            </main>
        );
    }
}