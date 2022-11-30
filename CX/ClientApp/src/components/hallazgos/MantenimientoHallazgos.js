import React, { Component, useState } from 'react';
import { InputText, InputSelect } from '../components_forms/inputs'
import { Container, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerGradosEsfuerzo } from '../../servicios/ServicioGradosEsfuerzo';
import { ObtenerGradoImpacto } from '../../servicios/ServicioGradoImpacto';
import { ObtenerFasesCJ } from '../../servicios/ServicioFasesCJ';
import { ObtenerEstadoAceptacion } from '../../servicios/ServicioEstadoAceptacion';
import { ObtenerServicioLineaNegocio, ObtenerLineasNegociosActivos } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerCantidadMantenimientoHallazgo, ObtenerDatosOrbe, ObtenerGridMantenimiento, InactivarMantenimientoHallazgo, ObtenerMantenimientoHallazgoPorID, AgregarMantenimientoHallazgo, ActualizarMantenimientoHallazgo } from '../../servicios/ServicioMantenimientoHallazgo';
import { ObtenerResponsables, ObtenerResponsablesPorIdHallazgo, AgregarResponsable, ObtenerResponsablePorId, ActualizarResponsable, InactivarResponsable} from '../../servicios/ServicioResponsables';
import { ObtenerMacroActividad } from '../../servicios/ServicioMacroActividad';
import { ObtenerTalleresCoCreacion } from '../../servicios/ServicioTalleresCoCreacion';
import { ObtenerPeriodicidad } from '../../servicios/ServicioPeriodicidad';
import { FormularioModal } from '../components_forms/ventanaModal';
import { ObtenerEstadoHallazgo } from '../../servicios/ServicioEstadoHallazgo';
import FormAnotacion from '../mantenimientos_forms/formAnotacion';
import FormResponsables from '../mantenimientos_forms/formResponsables';
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap';
import { Table, Table2 } from '../Table';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

export class MantenimientoHallazgos extends Component {
    static displayName = MantenimientoHallazgos.name;
    constructor(props) {
        super(props);
        this.state = {
            listaResponsables: [],
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
            estadosHallazgo: [],
            estadoHallazgo: '',
            idPeriodicidad: '',
            periodicidad: '',
            descripcionGeneralResponsable: '',
            periodicidadEntregaAvances: [],
            cabeceras: ["ID Direccion", "Direccion", "ID Responsable", "Nombre", "Plazo(Días)", "Fecha de Inicio", "Oficio", "Avance", "Aceptacíón","Estado", "Acciones"],
            usuarioAgrego: "",
            fechaAgregado: "",
            usuarioModifico: "",
            fechaModificado: "",
            porcentajeGeneral: 0,
            mantenimientoHallazgo: '',
            listaGridHallazgo: [],
            mensajeFormulario: "",
            cabeceras2: ["Id", "Detalle Especifico", "Solucion Asociada", "Servicio", "Estado", "Acciones"],
            detalleGeneralH: '',
            detalleEspecificoH: '',
            usuarioAgregoH: "",
            fechaAgregadoH: "",
            usuarioModificoH: "",
            fechaModificadoH: "",
            usuarioFinalizadoH: "",
            fechaFinalizadoH: "",
            anotacion: '',


        }
    }



    async ObtenerListadoResponsables() {
        const respuesta = await ObtenerResponsables();
        this.setState({ listaResponsables: respuesta });
    }

    async ObtenerListadoResponsablesPorIdHallazgo() {
        const respuesta = await ObtenerResponsablesPorIdHallazgo(this.mantenimientoHallazgo.idMantenimientoHallazgo);
        console.log(respuesta);
        this.setState({ listaResponsables: respuesta });
    }

    async ObtenerTalleresCoCreacion() {

        const respuesta = await ObtenerTalleresCoCreacion();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idTallerCoCreacion, label: row.idTallerCoCreacion + ' ' + row.descripcionGeneral }
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


    async ObtenerSecuenciaHallazgo() {
        const respuesta = await ObtenerCantidadMantenimientoHallazgo();
        this.setState({ secuenciaHallazgo: respuesta.cantidad + 1 });
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

    async ObtenerGradosEsfuerzo() {
        const respuesta = await ObtenerGradosEsfuerzo();
        console.log(respuesta);
        const options = respuesta.map(function (row) {
            return { value: row.idGradoEsfuerzo, label: row.idGradoEsfuerzo + ' ' + row.gradoEsfuerzo }
        })
        this.setState({ gradosEsfuerzo: options });

    }
    async ObtenerNumeroOficioEnvio() {

        const respuesta = await ObtenerDatosOrbe();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idOrbe, label: row.idOrbe + ' ' + row.orbe }
        })

        this.setState({ numeroOficioEnvio: options });

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

    onChangeDetalleGeneral = (e) => {
        this.setState({ detalleGeneralH: e.target.value });
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
        console.log("Agregar Anotacion");

        this.setState({ data: this.mantenimientoHallazgo });
        console.log(this.state.data);
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Agregar" });
        this.setState({ modalTitulo: "Agregar Anotacion" });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    onClickProcesarAnotacion = async (data) => {
        console.log(data);
        this.setState({ anotacion: data });
    }
    
    GuardarHallazgo = async (data) => {
        let respuesta = {};
        console.log(data);
        respuesta = await AgregarMantenimientoHallazgo(data);
        const element = document.getElementById("FormMM");
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

        await this.ObtenerListadoGridHallazgo();
        const tablita = document.getElementById("tablaHallazgo");
        tablita.hidden = false;
        const fechasHallazgo = document.getElementById("apartadofechas");
        fechasHallazgo.hidden = true;
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ show: true });

    }

    EditarHallazgo = async (data) => {
        let respuesta = {};
        respuesta = await ActualizarMantenimientoHallazgo(data);
        console.log(respuesta);
        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });
        } else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }
        $('#example').DataTable().destroy();

        await this.ObtenerListadoGridHallazgo();

        this.setState({ usuarioAgregoH: '' });
        this.setState({ fechaAgregadoH: '' });
        this.setState({ usuarioModificoH: '' });
        this.setState({ fechaModificadoH: '' });
        this.setState({ usuarioFinalizadoH: '' });
        this.setState({ fechaFinalizadoH: '' });
        const tablita = document.getElementById("tablaHallazgo");
        tablita.hidden = false;
        const fechasHallazgo = document.getElementById("apartadofechas");
        fechasHallazgo.hidden = true;
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

        this.setState({ show: true });

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
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

    onChangeDetalleEspecifico = (e) => {
        this.setState({ detalleEspecificoH: e.target.value });
    }

    onClickInactivarGridMantenimiento = async (id) => {
        const respuesta = await InactivarMantenimientoHallazgo(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaTipoIdentificacion: await this.ObtenerListadoGridHallazgo() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }
    /////
    formatDate = (i) => {
        if (i != '') {
            var datePart = i.match(/\d+/g),
                year = datePart[2], // get only two digits
                month = datePart[0],
                day = datePart[1];
            return day + "/" + month + "/" + year;
        } else {
            return "No hay";
        }
    }

    async focusInput(e) {
        if (e != '') {
            const respuesta = await ObtenerMantenimientoHallazgoPorID(e);
            this.mantenimientoHallazgo = respuesta;
            this.setState({ data: respuesta });
            console.log("mantenimientoHallazgo");
            console.log(this.mantenimientoHallazgo);

            $('#example2').DataTable().destroy();
            await this.ObtenerListadoResponsablesPorIdHallazgo();
            setTimeout(() => {
                $('#example2').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);

        }
        else {
            this.setState({ mantenimientoHallazgo: '' });
        }
        const responsables = document.getElementById("responsables");
        responsables.hidden = false;
        const tablita = document.getElementById("tablaHallazgo");
        tablita.hidden = true;
        const fechasHallazgo = document.getElementById("apartadofechas");
        fechasHallazgo.hidden = false;
        const element = document.getElementById("FormMM");
        const element2 = document.getElementById("btnGuardar");
        const element3 = document.getElementById("btnEditar");
        element2.hidden = true;
        element.hidden = false;
        element3.hidden = false;

        this.setState({ macroActividad: this.state.macroActividades.find(x => x.value === this.mantenimientoHallazgo.idMacroActividadAsociadaHallazgo) });
        this.setState({ CJ: this.state.fasesCJ.find(x => x.value === this.mantenimientoHallazgo.idFaseCJ) });
        this.setState({ tallerCoCreacion: this.state.talleresCoCreacion.find(x => x.value === this.mantenimientoHallazgo.idTallerCoCreacion) });
        this.setState({ lineaNegocio: this.state.lineasNegocio.find(x => x.value === this.mantenimientoHallazgo.idSolucionAsociadaHallazgo) });

        this.state.serviciosFiltrados = this.state.serviciosAsociadoHallazgo.filter(servicio => servicio.idLinea == this.mantenimientoHallazgo.idSolucionAsociadaHallazgo);
        this.setState({ servicio: this.state.serviciosFiltrados.find(x => x.value === this.mantenimientoHallazgo.idServicioAsociadoHallazgo) });

        this.setState({ gradoImpacto: this.state.gradosImpacto.find(x => x.value === this.mantenimientoHallazgo.idGradoImpacto) });
        this.setState({ gradoEsfuerzo: this.state.gradosEsfuerzo.find(x => x.value === this.mantenimientoHallazgo.idGradoEsfuerzo) });
        this.setState({ estadoAceptacion: this.state.estadosAceptacion.find(x => x.value === this.mantenimientoHallazgo.idEstadoAceptacion) });
        this.setState({ estadoHallazgo: this.state.estadosHallazgo.find(x => x.value === this.mantenimientoHallazgo.idEstadoHallazgo) });
        this.setState({ orbe: this.state.numeroOficioEnvio.find(x => x.value === this.mantenimientoHallazgo.numOficioEnvio) });
        this.setState({ periodicidad: this.state.periodicidadEntregaAvances.find(x => x.value === this.mantenimientoHallazgo.idPeriodicidadEntregaAvances) });
        document.getElementById("porcentaje").focus();
        this.setState({ secuenciaHallazgo: this.mantenimientoHallazgo.idMantenimientoHallazgo });
        this.setState({ detalleGeneralH: this.mantenimientoHallazgo.detalleGeneralHallazgo });
        this.setState({ detalleEspecificoH: this.mantenimientoHallazgo.detalleEspecificoHallazgo });
        this.setState({ porcentajeGeneral: this.mantenimientoHallazgo.porcentajeGeneral });
        this.setState({ anotacion: this.mantenimientoHallazgo.anotacion });

        this.setState({ usuarioAgregoH: this.mantenimientoHallazgo.ingresadoPor });
        this.setState({ fechaAgregadoH: this.formatDate(this.mantenimientoHallazgo.fechaIngreso) });
        this.setState({ usuarioModificoH: this.mantenimientoHallazgo.modificadoPor });
        this.setState({ fechaModificadoH: this.formatDate(this.mantenimientoHallazgo.fechaModificacion) });
        this.setState({ usuarioFinalizadoH: 'Sin Finalizar' });
        this.setState({ fechaFinalizadoH: 'Sin Finalizar' });

        if (this.state.estadoHallazgo.value === 8) {
            console.log(this.state.estadoHallazgo);
            this.setState({ usuarioFinalizadoH: this.mantenimientoHallazgo.finalizadoPor });
            this.setState({ fechaFinalizadoH: this.formatDate(this.mantenimientoHallazgo.fechaFinalizacion) });
        }


    }



    async ObtenerListadoGridHallazgo() {
        const respuesta = await ObtenerGridMantenimiento();
        this.setState({ listaGridHallazgo: respuesta });
    }

    onClickNuevoMantenimientoHallazgo() {
        const tablita = document.getElementById("tablaHallazgo");
        tablita.hidden = true;
        const fechasHallazgo = document.getElementById("apartadofechas");
        fechasHallazgo.hidden = true;
        this.ObtenerSecuenciaHallazgo();
        this.setState({ macroActividad: '' });
        this.setState({ CJ: '' });
        this.setState({ tallerCoCreacion: '' });
        this.setState({ lineaNegocio: '' });
        this.setState({ servicio: '' });
        this.setState({ gradoImpacto: '' });
        this.setState({ gradoEsfuerzo: '' });
        this.setState({ estadoAceptacion: '' });
        this.setState({ estadoHallazgo: '' });
        this.setState({ orbe: '' });
        this.setState({ periodicidad: '' });
        this.setState({ secuenciaHallazgo: '' });
        this.setState({ detalleGeneralH: '' });
        this.setState({ detalleEspecificoH: '' });
        this.setState({ porcentajeGeneral: '' });
        this.setState({ anotacion: '' });
        this.setState({ usuarioAgregoH: '' });
        this.setState({ fechaAgregadoH: '' });
        this.setState({ usuarioModificoH: '' });
        this.setState({ fechaModificadoH: '' });
        this.setState({ usuarioFinalizadoH: '' });
        this.setState({ fechaFinalizadoH: '' });
        const element = document.getElementById("FormMM");
        const element2 = document.getElementById("btnEditar");
        const element3 = document.getElementById("btnGuardar");
        element.hidden = false;
        element2.hidden = true;
        element3.hidden = false;
        document.getElementById("porcentaje").focus();
    }

    onClickAgregarMantenimiento = async () => {
        const element = document.getElementById("FormMM");
        const element2 = document.getElementById("btnGuardar");
        const element3 = document.getElementById("btnEditar");
        element2.hidden = false;
        element.hidden = false;
        element3.hidden = true;
        var datos = {
            IdSolucionAsociadaHallazgo: parseInt(this.state.lineaNegocio.value),
            IdGradoImpacto: parseInt(this.state.gradoImpacto.value),
            IdEstadoHallazgo: parseInt(this.state.estadoHallazgo.value),
            IdPeriodicidadEntregaAvances: parseInt(this.state.periodicidad.value),
            IdFaseCJ: parseInt(this.state.CJ.value),
            IdServicioAsociadoHallazgo: parseInt(this.state.servicio.value),
            IdGradoEsfuerzo: parseInt(this.state.gradoEsfuerzo.value),
            NumOficioEnvio: parseInt(this.state.orbe.value),
            IdTallerCoCreacion: parseInt(this.state.tallerCoCreacion.value),
            IdMacroActividadAsociadaHallazgo: parseInt(this.state.macroActividad.value),
            IdEstadoAceptacion: parseInt(this.state.estadoAceptacion.value),
            PorcentajeGeneral: parseInt(this.state.porcentajeGeneral),
            detalleGeneralHallazgo: this.state.detalleGeneralH,
            detalleEspecificoHallazgo: this.state.detalleEspecificoH,
        };
        const result = this.GuardarHallazgo(datos);
        element.hidden = true;
        element2.hidden = false;
        element3.hidden = false;
    }
    onClickEditarMantenimiento = async () => {

        const responsables = document.getElementById("responsables");
        const element = document.getElementById("FormMM");
        const element2 = document.getElementById("btnEditar");
        const element3 = document.getElementById("btnGuardar");
        element.hidden = false;
        element2.hidden = false;
        element3.hidden = true;
        var datos = {
            IdMantenimientoHallazgo: this.state.secuenciaHallazgo,
            IdSolucionAsociadaHallazgo: parseInt(this.state.lineaNegocio.value),
            IdGradoImpacto: parseInt(this.state.gradoImpacto.value),
            IdEstadoHallazgo: parseInt(this.state.estadoHallazgo.value),
            IdPeriodicidadEntregaAvances: parseInt(this.state.periodicidad.value),
            IdFaseCJ: parseInt(this.state.CJ.value),
            IdServicioAsociadoHallazgo: parseInt(this.state.servicio.value),
            IdGradoEsfuerzo: parseInt(this.state.gradoEsfuerzo.value),
            NumOficioEnvio: parseInt(this.state.orbe.value),
            IdTallerCoCreacion: parseInt(this.state.tallerCoCreacion.value),
            IdMacroActividadAsociadaHallazgo: parseInt(this.state.macroActividad.value),
            IdEstadoAceptacion: parseInt(this.state.estadoAceptacion.value),
            PorcentajeGeneral: parseInt(this.state.porcentajeGeneral),
            detalleGeneralHallazgo: this.state.detalleGeneralH,
            detalleEspecificoHallazgo: this.state.detalleEspecificoH,
        };

        const result = this.EditarHallazgo(datos);
        element.hidden = true;
        element2.hidden = false;
        element3.hidden = false;
        responsables.hidden = true;
    }
    /////
    ///////
    //Responsables//
    onClickInactivarResponsable = async (id) => {
        const respuesta = await InactivarResponsable(id)
        console.log("Inactivado ")
        console.log(respuesta);
        if (respuesta.indicador === 0) {
            $('#example2').DataTable().destroy();
            await this.ObtenerListadoResponsablesPorIdHallazgo();
            setTimeout(() => {
                $('#example2').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });
    }

    onClickActualizarResponsable = async (id) => {
        this.setState({ data: await ObtenerResponsablePorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modalResponsables: !this.state.modalResponsables });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Responsable" });
    }

    onClickNuevoResponsable = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modalResponsables: !this.state.modalResponsables });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Socio" });
    }

    onClickProcesarResponsable = async (data) => {
        data.IdHallazgo = parseInt(this.state.secuenciaHallazgo);
        console.log(data.IdHallazgo);
        let respuesta = {};

        if (this.state.proceso === 1)

            respuesta = await AgregarResponsable(data);
        else {

            respuesta = await ActualizarResponsable(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });
            this.setState({ modalResponsables: !this.state.modalResponsables });
            $('#example2').DataTable().destroy();

            await this.ObtenerListadoResponsablesPorIdHallazgo();

            setTimeout(() => {
                $('#example2').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);
        } else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }

        this.setState({ show: true });
    }

    ///
    async componentDidMount() {
        const tablita = document.getElementById("tablaHallazgo");
        tablita.hidden = false;
        const fechasHallazgo = document.getElementById("apartadofechas");
        fechasHallazgo.hidden = true;
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
        await this.ObtenerListadoGridHallazgo();
        await this.ObtenerListadoResponsables();

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

        

    }

    onClickFila = (item) => {
        console.log(item);
        var fechaingreso = new Date(item.fechaIngreso);
        var fechamodificacion = new Date(item.fechaModificacion);
        this.setState({ usuarioAgrego: item.ingresadoPor });
        this.setState({ fechaAgregado: fechaingreso.toLocaleDateString() });
        this.setState({ usuarioModifica: item.modificadoPor });
        this.setState({ fechaModificado: fechamodificacion.toLocaleDateString() });
        this.setState({ descripcionGeneralResponsable: "El nombre del responsable es " + item.nombre + " y está involucrado en la dirección " + item.direccion });
    }


    body = () => {
        return this.state.listaResponsables.map((item, index) => (
            <tr onClick={() => this.onClickFila(item)} key={index}>
                <td>{item.idDireccion}</td>
                <td>{item.direccion}</td>
                <td>{item.idResponsable}</td>
                <td>{item.nombre}</td>
                <td>{item.plazo}</td>
                <td>{item.fechaInicio.substring(0, item.fechaInicio.indexOf('T'))}</td>
                <td>{item.orbe}</td>
                <td>{item.avance}</td>
                <td>{item.aceptado === 1 ? "Aceptado": "No Aceptado"}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarResponsable(item.idResponsable)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarResponsable(item.idResponsable)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }

    gridMantenimiento = () => {
        return this.state.listaGridHallazgo.map((item, index) => (
            <tr key={index}>
                <td>{item.idMantenimientoHallazgo}</td>
                <td>{item.detalleEspecificoHallazgo}</td>
                <td>{item.lineaNegocio}</td>
                <td>{item.servicio}</td>




                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.focusInput(item.idMantenimientoHallazgo)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarGridMantenimiento(item.idMantenimientoHallazgo)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        const { listaResponsables,
            lineasNegocio,
            lineaNegocio,
            idLineaNegocio,
            estadosAceptacion,
            estadoAceptacion,
            idEstadoAceptacion,
            gradosEsfuerzo,
            gradosImpacto,
            fasesCJ,
            pendiente,
            modal,
            labelButton,
            modalResponsables,
            proceso,
            mensajeRespuesta,
            show,
            alerta,
            gradoEsfuerzo,
            idGradoEsfuerzo,
            gradoImpacto,
            idGradoImpacto,
            CJ,
            idCJ,
            serviciosAsociadoHallazgo,
            serviciosFiltrados,
            idServicio,
            servicio,
            secuenciaHallazgo,
            macroActividades,
            idMacro,
            macroActividad,
            numeroOficioEnvio,
            orbe,
            talleresCoCreacion,
            tallerCoCreacion,
            estadosHallazgo,
            estadoHallazgo,
            idPeriodicidad,
            periodicidad,
            descripcionGeneralResponsable,
            periodicidadEntregaAvances,
            detalleGeneralH,
            cabeceras,
            usuarioAgrego,
            fechaAgregado,
            usuarioModifico,
            fechaModificado,
            porcentajeGeneral,
            detalleEspecificoH,
        } = this.state;
        return (
            <main>
                <div id="tablaHallazgo" hidden>
                <div class="row-full">Grid Hallazgo</div>
                <Container >
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoMantenimientoHallazgo()}>Insertar Nuevo Mantenimiento</Button>
                    <hr />
                    <br />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />

                    <Table tableHeading={this.state.cabeceras2} body={this.gridMantenimiento()} />
                    </Container >
                </div>
                <div id="FormMM" hidden >
                    <div class="row-full">Información General de Definición del Hallazgo </div>

                    <Container>


                        <Row>
                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3"> Secuencia del hallazgo</h6>

                                    <Input
                                        id="numsecuencia"
                                        name="text"
                                        type="text"
                                        value={this.state.secuenciaHallazgo}
                                    />


                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Fase de Customer Journey</h6>
                                    <Select id="codFaseCJ" placeholder="Seleccione..." onChange={this.onChangeFasesCJ} isSearchable={false} isClearable={true} value={CJ} options={this.state.fasesCJ} />

                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Taller de Co Creación</h6>
                                    <Select id="tallerCoCreacion" placeholder="Seleccione..." onChange={this.onChangeTallerCoCreacion} isClearable={true} value={tallerCoCreacion} options={this.state.talleresCoCreacion} />

                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Solución asociada al hallazgo</h6>
                                    <Select id="lineaNegocio" placeholder="Seleccione..." onChange={this.onChangeLineaNegocio} isClearable={true} value={lineaNegocio} options={this.state.lineasNegocio} />
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Servicio Asociado al Hallazgo </h6>
                                    <Select id="servicioAso" placeholder="Seleccione..." onChange={this.onChangeServicioAsoHallazgo} isClearable={true} value={servicio} options={this.state.serviciosFiltrados} />
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Macro Actividad Asociada al Hallazgo </h6>
                                    <Select id="macroActividadAso" placeholder="Seleccione..." onChange={this.onChangeMacroActividad} isClearable={true} value={macroActividad} options={this.state.macroActividades} />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Nivel de Impacto del Hallazgo</h6>
                                    <Select id="gradoImpacto" placeholder="Seleccione..." onChange={this.onChangeGradoImpacto} isSearchable={false} isClearable={true} value={gradoImpacto} options={this.state.gradosImpacto} />
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Grado de Esfuerzo del Hallazgo</h6>
                                    <Select name="gradoEsfuerzo" id="gradoEsfuerzo" placeholder="Seleccione..." onChange={this.onChangeGradoEsfuerzo} isSearchable={false} isClearable={true} value={gradoEsfuerzo} options={this.state.gradosEsfuerzo} />
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Estado de Aceptación</h6>
                                    <Select id="estadoAceptacion" placeholder="Seleccione..." onChange={this.onChangeEstadoAceptacion} isClearable={true} value={estadoAceptacion} options={this.state.estadosAceptacion} />
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Estado del Hallazgo </h6>
                                    <Select id="estadoHallazgo" placeholder="Seleccione..." onChange={this.onChangeEstadoHallazgo} isClearable={true} value={estadoHallazgo} options={this.state.estadosHallazgo} />
                                </div>
                            </Col>

                            <Col md={4}>
                                <div className="item1">
                                    <h6 id="focus" className="heading3" style={{ "fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif", "fontStyle": "normal", "fontWeight": "400", "textRendering": "optimizeLegibility" }}>Nro de Oficio del Envio</h6>

                                    <Select id="numOficioEnvio" onChange={this.onChangeMacroNumeroOficioEnvio} isClearable={true} value={orbe} options={this.state.numeroOficioEnvio} />

                                </div>
                            </Col>


                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Periodicidad de Entrega de Avances</h6>
                                    <Select id="periodicidadEntrega" onChange={this.onChangePeriodicidadEntregaAvances} isClearable={true} value={periodicidad} options={this.state.periodicidadEntregaAvances} />
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
                                        <FormAnotacion onClickProcesarAnotacion={this.onClickProcesarAnotacion} data={this.state.data} />
                                    </FormularioModal>
                                </div>
                            </Col>

                            <Col >
                                <div className="item1">
                                    <h6 className="heading3">Detalle General del Hallazgo</h6>
                                    <Input
                                        id="detalleGeneral"
                                        name="text"
                                        type="textarea"
                                        value={detalleGeneralH}
                                        onChange={this.onChangeDetalleGeneral}

                                    />

                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Porcentaje General</h6>
                                    <Input
                                        id="porcentaje"
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
                            <Col >
                                <div className="item1">
                                    <h6 className="heading3">Detalle Específico del Hallazgo</h6>
                                    <Input
                                        id="detalleGeneral"
                                        name="text"
                                        type="textarea"
                                        value={detalleEspecificoH}
                                        onChange={this.onChangeDetalleEspecifico}

                                    />

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <button id="btnGuardar" type="button" className="btn  btn-block botones" onClick={() => this.onClickAgregarMantenimiento()}>Guardar</button>
                                <button id="btnEditar" type="button" className="btn  btn-block botones" onClick={() => this.onClickEditarMantenimiento()}>Editar</button>
                            </Col>
                        </Row>


                    </Container >
                </div>

            
                
                <div id="responsables" hidden>
                    <div class="row-full">Direcciones y Responsables asignadas al Hallazgo </div>
                    <Container>
                        <Button onClick={() => this.onClickAgregarResponsable()} style={{ backgroundColor: "#17A797", borderColor: "#17A797" }}>Insertar Responsable</Button>
                        <br></br>
                        <br></br>
                        <Table2 tableHeading={this.state.cabeceras} body={this.body()} />
                        <FormularioModal labelButton={this.state.labelButton} show={this.state.modalResponsables} proceso={this.state.proceso} handleClose={this.onClickCerrarModalResponsable} titulo={this.state.modalTitulo} className="FormularioResponsables">
                            <FormResponsables labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarResponsable={this.onClickProcesarResponsable} mensaje={this.state.mensajeFormulario}  />
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
                </div>
                <div id="apartadofechas" hidden>
                <div class="row-full">Fechas relacionadas al Registro</div>
                <Container>


                    <Row>
                        <Col md={4}>
                            <div className="item1" id="contfechas">
                                <h6 className="heading3"> Adicionado por</h6>
                                <div id="fechas">
                                    <input type="text" className="etiqueta" name="fecha_adicion" value={this.state.fechaAgregadoH} />
                                    <input type="text" placeholder="" name="usuario_adicion" value={this.state.usuarioAgregoH} />
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1" id="contfechas">
                                <h6 className="heading3">Modificado por</h6>
                                <div id="fechas">
                                    <input type="text" className="etiqueta" name="fecha_modificacion" value={this.state.fechaModificadoH} />
                                    <input type="text" placeholder="" name="usuario_modificacion" value={this.state.usuarioModificoH} />
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>
                            <div className="item1" id="contfechas" >
                                <h6 className="heading3">Finalizado</h6>
                                <div id="fechas">
                                    <input type="text" className="etiqueta" name="fecha_modificacion" value={this.state.fechaFinalizadoH} />
                                    <input type="text" placeholder="" name="usuario_modificacion" value={this.state.usuarioFinalizadoH} />
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container >
                </div>



            </main>
        );
    }
}


