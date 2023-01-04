import React, { Component, useState } from 'react';
import { InputText, InputSelect } from '../components_forms/inputs'
import { Container, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerCantidadMantenimientoHallazgo, ObtenerDatosOrbe, ObtenerGridMantenimiento, InactivarMantenimientoHallazgo, ObtenerMantenimientoHallazgoPorID, AgregarMantenimientoHallazgo, ActualizarMantenimientoHallazgo } from '../../servicios/ServicioMantenimientoHallazgo';
import { ObtenerResponsables, ObtenerResponsablesPorIdHallazgo, AgregarResponsable, ObtenerResponsablePorId, ActualizarResponsable, InactivarResponsable } from '../../servicios/ServicioResponsables';
import { FormularioModal } from '../components_forms/ventanaModal';
import FormResponsables from '../mantenimientos_forms/formResponsables';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap';
import { Table, Table2 } from '../Table';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import Formulario from '../mantenimientos_forms/formHallazgos';



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
            proceso2: 1,
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
            cabeceras: ["ID Direccion", "Direccion", "ID Responsable", "Nombre", "Plazo(Días)", "Fecha de Inicio", "Oficio", "Avance", "Aceptacíón", "Estado", "Acciones"],
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
            modalHallazgo: false,
            formEditarHallazgo: false


        }
    }



    async ObtenerListadoResponsables() {
        const respuesta = await ObtenerResponsables();
        this.setState({ listaResponsables: respuesta });
    }

    async ObtenerListadoResponsablesPorIdHallazgo() {
        const respuesta = await ObtenerResponsablesPorIdHallazgo(this.mantenimientoHallazgo.idMantenimientoHallazgo);

        this.setState({ listaResponsables: respuesta });
    }



    async ObtenerSecuenciaHallazgo() {
        const respuesta = await ObtenerCantidadMantenimientoHallazgo();
        this.setState({ secuenciaHallazgo: respuesta.cantidad + 1 });
    }





    onClickAgregarAnotacion = () => {


        this.setState({ data: this.mantenimientoHallazgo });

        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Agregar" });
        this.setState({ modalTitulo: "Agregar Anotacion" });
    }


    onClickProcesarAnotacion = async (data) => {
        this.setState({ anotacion: data });
       
    }



    onClickProcesarHallazgo = async (data) => {
        let respuesta = {};

        if (this.state.proceso2 === 1)
            respuesta = await AgregarMantenimientoHallazgo(data);
        else {

            respuesta = await ActualizarMantenimientoHallazgo(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modalHallazgo: false });
            this.setState({ mensajeRespuesta: respuesta}); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoGridHallazgo();
            if (this.state.proceso2 === 1) {
                this.setState({ usuarioAgregoH: '' });
                this.setState({ fechaAgregadoH: '' });
                this.setState({ usuarioModificoH: '' });
                this.setState({ fechaModificadoH: '' });
                this.setState({ usuarioFinalizadoH: '' });
                this.setState({ fechaFinalizadoH: '' });
                const tablaHallazgo = document.getElementById("tablaHallazgo");
                tablaHallazgo.hidden = false;
                const fechasHallazgo = document.getElementById("apartadofechas");
                fechasHallazgo.hidden = true;
            }
            setTimeout(() => {
                $('#example').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);

            this.setState({ show: true });
        }
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



    async focusInput2(e) {


        const respuesta = await ObtenerMantenimientoHallazgoPorID(e);
        this.mantenimientoHallazgo = respuesta;
        this.setState({ secuenciaHallazgo: this.mantenimientoHallazgo.idMantenimientoHallazgo });
        this.setState({ data: await ObtenerMantenimientoHallazgoPorID(e) });
        this.setState({ proceso2: 2 });
        if (e != '') {

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
        const tablaHallazgo = document.getElementById("tablaHallazgo");
        tablaHallazgo.hidden = true;
        const fechasHallazgo = document.getElementById("apartadofechas");
        fechasHallazgo.hidden = false;
        const formHallazgo = document.getElementById("formHallazgo");
        formHallazgo.hidden = false;

        this.setState({ usuarioAgregoH: this.mantenimientoHallazgo.ingresadoPor });
        this.setState({ fechaAgregadoH: this.formatDate(this.mantenimientoHallazgo.fechaIngreso) });
        this.setState({ usuarioModificoH: this.mantenimientoHallazgo.modificadoPor });
        this.setState({ fechaModificadoH: this.formatDate(this.mantenimientoHallazgo.fechaModificacion) });
        this.setState({ usuarioFinalizadoH: 'Sin Finalizar' });
        this.setState({ fechaFinalizadoH: 'Sin Finalizar' });

        if (this.state.estadoHallazgo.value === 8) {
            this.setState({ usuarioFinalizadoH: this.mantenimientoHallazgo.finalizadoPor });
            this.setState({ fechaFinalizadoH: this.formatDate(this.mantenimientoHallazgo.fechaFinalizacion) });
        }



    }



    async ObtenerListadoGridHallazgo() {
        const respuesta = await ObtenerGridMantenimiento();
        this.setState({ listaGridHallazgo: respuesta });
    }


    onClickCancelar = async () => {
        const tablaHallazgo = document.getElementById("tablaHallazgo");
        const fechasHallazgo = document.getElementById("apartadofechas");
        const responsables = document.getElementById("responsables");
        const formHallazgo = document.getElementById("formHallazgo");

        this.setState({ data: {} });
        this.setState({ proceso2: 1 });
        formHallazgo.hidden = true;

        fechasHallazgo.hidden = true;
        tablaHallazgo.hidden = false;
        responsables.hidden = true;


    }

    onClickInactivarResponsable = async (id) => {
        const respuesta = await InactivarResponsable(id)
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
        this.setState({ secuenciaHallazgo: '' });
        this.setState({ modalResponsables: !this.state.modalResponsables });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Socio" });
    }

    onClickProcesarResponsable = async (data) => {
        data.IdHallazgo = parseInt(this.state.secuenciaHallazgo);

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

    async componentDidMount() {
        const tablaHallazgo = document.getElementById("tablaHallazgo");
        tablaHallazgo.hidden = false;
        const fechasHallazgo = document.getElementById("apartadofechas");
        fechasHallazgo.hidden = true;
        await this.ObtenerSecuenciaHallazgo();
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
        var fechaingreso = new Date(item.fechaIngreso);
        var fechamodificacion = new Date(item.fechaModificacion);
        this.setState({ usuarioAgrego: item.ingresadoPor });
        this.setState({ fechaAgregado: fechaingreso.toLocaleDateString() });
        this.setState({ usuarioModifica: item.modificadoPor });
        this.setState({ fechaModificado: fechamodificacion.toLocaleDateString() });
        this.setState({ descripcionGeneralResponsable: "El nombre del responsable es " + item.nombre + " y está involucrado en la dirección " + item.direccion });
    }

    onClickNuevoHallazgo = async () => {
        this.setState({ proceso2: 1 });
        this.setState({ modalHallazgo: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Nuevo Hallazgo" });
    }

    onClickCerrarModalHallazgo = () => {
        this.setState({ modalHallazgo: false });
        this.setState({ mensajeFormulario: "" });
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
                <td>{item.aceptado === 1 ? "Aceptado" : "No Aceptado"}</td>

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

                    <Button color="primary" onClick={() => this.focusInput2(item.idMantenimientoHallazgo)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarGridMantenimiento(item.idMantenimientoHallazgo)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        const { listaResponsables,
            idEstadoAceptacion,
            pendiente,
            modal,
            labelButton,
            modalResponsables,
            proceso,
            mensajeRespuesta,
            show,
            alerta,
            descripcionGeneralResponsable,
            periodicidadEntregaAvances,
            cabeceras,
            usuarioAgrego,
            fechaAgregado,
            usuarioModifico,
            fechaModificado,
            porcentajeGeneral,
            proceso2
        } = this.state;
        return (
            <main>
                <div id="tablaHallazgo" hidden>
                    <div class="row-full">Grid Hallazgo</div>
                    <Container >
                        <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoHallazgo()}>Insertar Nuevo Mantenimiento</Button>

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
                        <FormularioModal show={this.state.modalHallazgo} handleClose={this.onClickCerrarModalHallazgo} titulo={this.state.modalTitulo} className=''>
                            <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso2={this.state.proceso2} mensaje={this.state.mensajeFormulario} onClickAgregarAnotacion={this.state.onClickAgregarAnotacion}
                                onClickProcesarHallazgo={this.onClickProcesarHallazgo}
                            />
                        </FormularioModal>



                    </Container >
                </div>
                <div id="formHallazgo" hidden >
                    <div class="row-full">Información General de Definición del Hallazgo </div>



                    <Input
                        id="numsecuencia"
                        name="text"
                        type="hidden"
                        value={this.state.secuenciaHallazgo}
                    />



                    <Container>
                        {Number(proceso2) === 1 ?
                            <><h6 className="heading3">Insertar</h6></>

                            : <>
                                {/*ALERTA*/}

                                {this.state.show ?
                                    <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                                        {this.state.mensajeRespuesta.mensaje}
                                    </Alert>
                                    : ""}

                                <br />
                                <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso2={this.state.proceso2} mensaje={this.state.mensajeFormulario} onClickAgregarAnotacion={this.state.onClickAgregarAnotacion}
                                    onClickProcesarHallazgo={this.onClickProcesarHallazgo} onClickCancelar={this.onClickCancelar} /></>


                        }

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
                            <FormResponsables labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarResponsable={this.onClickProcesarResponsable} mensaje={this.state.mensajeFormulario} />
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


