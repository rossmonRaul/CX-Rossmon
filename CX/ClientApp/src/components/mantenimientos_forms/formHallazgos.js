import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'
import { ComboBox } from '../components_forms/combobox'
import { TextArea } from '../components_forms/textarea'
import { ObtenerSectoresActivos } from '../../servicios/ServicioSectores';
import { Container, Row, Col, Label, Input, FormGroup } from 'reactstrap';

import { ObtenerGradosEsfuerzo } from '../../servicios/ServicioGradosEsfuerzo';
import { ObtenerGradoImpacto } from '../../servicios/ServicioGradoImpacto';
import { ObtenerFasesCJ } from '../../servicios/ServicioFasesCJ';
import { ObtenerEstadoAceptacion } from '../../servicios/ServicioEstadoAceptacion';
import { ObtenerServicioLineaNegocio, ObtenerLineasNegociosActivos } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerCantidadMantenimientoHallazgo, ObtenerDatosOrbe, ObtenerGridMantenimiento, InactivarMantenimientoHallazgo, ObtenerMantenimientoHallazgoPorID, AgregarMantenimientoHallazgo, ActualizarMantenimientoHallazgo } from '../../servicios/ServicioMantenimientoHallazgo';
import { ObtenerResponsables, ObtenerResponsablesPorIdHallazgo, AgregarResponsable, ObtenerResponsablePorId, ActualizarResponsable, InactivarResponsable } from '../../servicios/ServicioResponsables';
import { ObtenerMacroActividad } from '../../servicios/ServicioMacroActividad';
import { ObtenerTalleresCoCreacion } from '../../servicios/ServicioTalleresCoCreacion';
import { ObtenerPeriodicidad } from '../../servicios/ServicioPeriodicidad';
import { FormularioModal } from '../components_forms/ventanaModal';
import { ObtenerEstadoHallazgo } from '../../servicios/ServicioEstadoHallazgo';
import FormAnotacion from '../mantenimientos_forms/formAnotacion';
import FormResponsables from '../mantenimientos_forms/formResponsables';
import Select from 'react-select'

import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap';
import { Table, Table2 } from '../Table';

const Formulario = ({ labelButton, proceso2, mensaje, data, onClickProcesarHallazgo, onClickCancelar }) => {
    const [secuencia, setSecuencia] = useState(proceso2 == 2 ? data.idMantenimientoHallazgo : 0); //si el proceso es 1 es insertar, si es 2 es actualizar

    const [alert, setalert] = useState(false);
    const [show, setshow] = useState(true);

    const [idFaseCJ, setidFaseCJ] = useState(0);
    const [idTaller, setidTaller] = useState(proceso2 == 2 ? data.idTallerCoCreacion : 0);
    const [idLineaNegocio, setidLineaNegocio] = useState(proceso2 == 2 ? data.idLineaNegocio : 0);
    const [idSevicioHallazgo, setidSevicioHallazgo] = useState(proceso2 == 2 ? data.idSevicioHallazgo : 0);
    const [idMacroActividad, setidMacroActividad] = useState(proceso2 == 2 ? data.idMacroActividad : 0);
    const [idGradoImpacto, setidGradoImpacto] = useState(proceso2 == 2 ? data.idGradoImpacto : 0);
    const [idGradoEsfuerzo, setidGradoEsfuerzo] = useState(proceso2 == 2 ? data.idGradoEsfuerzo : 1);
    const [idEstadoAceptacion, setidEstadoAceptacion,] = useState(proceso2 == 2 ? data.idEstadoAceptacion : 0);
    const [idEstadoHallazgo, setidEstadoHallazgo] = useState(proceso2 == 2 ? data.idEstadoHallazgo : 0);
    const [idNumOficio, setidNumOficio] = useState(proceso2 == 2 ? data.idNumOficio : 0);
    const [idPeriodicidad, setidPeriodicidad] = useState(proceso2 == 2 ? data.idPeriodicidad : 0);
    const [detalleGeneral, setDetalleGeneral] = useState(proceso2 == 2 ? data.detalleGeneralHallazgo : '');
    const [porcentajeGeneral, setPorcentajeGeneral] = useState(proceso2 == 2 ? data.porcentajeGeneral : '');
    const [detalleEspecificoH, setdetalleEspecificoH] = useState(proceso2 == 2 ? data.detalleEspecificoHallazgo : '');

    const [modal, setmodal] = useState(false);
    const [modalTitulo, setmodalTitulo] = useState("Agregar Anotacion");


    //listas
    const [listaFases, setListaFases] = useState([]);
    const [listaTalleres, setListaTalleres] = useState([]);
    const [listaLineaNegocio, setListaLineaNegocio] = useState([]);
    const [listaServicioHallazgo, setlistaServicioHallazgo] = useState([]);
    const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
    const [listaMacroActividad, setlistaMacroActividad] = useState([]);
    const [listaGradoImpacto, setlistaGradoImpacto] = useState([]);
    const [listaGradoEsfuerzo, setlistaGradoEsfuerzo] = useState([]);
    const [listaEstadoAceptacion, setlistaEstadoAceptacion] = useState([]);
    const [listaEstadoHallazgo, setlistaEstadoHallazgo] = useState([]);
    const [listaNumOficio, setlistaNumOficio] = useState([]);
    const [listaPeriodicidad, setlistaPeriodicidad] = useState([]);


    const [validated, setValidated] = useState(false);


    useEffect(() => {

        ObtenerSecuenciaHallazgo();
        ObtenerListaFasesCJ();

        ObtenerListaTalleres();
        ObtenerListaLineasNegocio();
        ObtenerListaServicioAsociadoHallazgo();
        ObtenerListaMacroActividadAsociadoHallazgo();
        ObtenerListaGradosImpacto();
        ObtenerListaGradosEsfuerzo();
        ObtenerListaEstadoAceptacion();
        ObtenerListaEstadosHallazgo();
        ObtenerListaNumeroOficioEnvio();
        ObtenerListaPeriodicidadEntregaAvances();




    }, []);



    const ObtenerSecuenciaHallazgo = async () => {
        if (proceso2 == 1) {
            const respuesta = await ObtenerCantidadMantenimientoHallazgo();
            setSecuencia(respuesta.cantidad + 1);
        }
    };



    const ObtenerListaFasesCJ = async () => {
        const respuesta = await ObtenerFasesCJ();
        const options = respuesta.map(function (row) {
            return { value: row.idFaseCJ, label: row.idFaseCJ + ' ' + row.faseCustomerJourney }
        })
        setListaFases(options);


        if (Number(proceso2) === 2) {
            setidFaseCJ(options.find(x => x.value === data.idFaseCJ));
        }

    }



    const ObtenerListaTalleres = async () => {

        const respuesta = await ObtenerTalleresCoCreacion();
        const options = respuesta.map(function (row) {
            return { value: row.idTallerCoCreacion, label: row.idTallerCoCreacion + ' ' + row.descripcionGeneral }
        })

        setListaTalleres(options);
        if (Number(proceso2) === 2) {
            setidTaller(options.find(x => x.value === data.idTallerCoCreacion));
        }
    }


    const ObtenerListaLineasNegocio = async () => {
        const respuesta = await ObtenerLineasNegociosActivos();


        const options = respuesta.map(function (row) {
            return { value: row.idLinea, label: row.idLinea + ' ' + row.lineaNegocio }
        })
        setListaLineaNegocio(options);
        if (Number(proceso2) === 2) {
            setidLineaNegocio(options.find(x => x.value === data.idSolucionAsociadaHallazgo));
        }
    }


    const ObtenerListaServicioAsociadoHallazgo = async () => {
        const respuesta = await ObtenerServicioLineaNegocio();
        const options = respuesta.map(function (row) {
            return { value: row.idServicio, label: row.idServicio + ' ' + row.servicio, idLinea: row.idLinea }
        })
        setlistaServicioHallazgo(options);
        if (Number(proceso2) === 2) {
            setidSevicioHallazgo(options.find(x => x.value === data.idServicioAsociadoHallazgo));
        }
    }


    const ObtenerListaMacroActividadAsociadoHallazgo = async () => {
        const respuesta = await ObtenerMacroActividad();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idMacro, label: row.idMacro + ' ' + row.macroActividad }
        })

        setlistaMacroActividad(options);
        if (Number(proceso2) === 2) {
            setidMacroActividad(options.find(x => x.value === data.idMacroActividadAsociadaHallazgo));
        }
    }


    const ObtenerListaGradosImpacto = async () => {
        const respuesta = await ObtenerGradoImpacto();
        const options = respuesta.map(function (row) {
            return { value: row.idGradoImpacto, label: row.idGradoImpacto + ' ' + row.gradoImpacto }
        })
        setlistaGradoImpacto(options);
        if (Number(proceso2) === 2) {
            setidGradoImpacto(options.find(x => x.value === data.idGradoImpacto));
        }

    }


    const ObtenerListaGradosEsfuerzo = async () => {
        const respuesta = await ObtenerGradosEsfuerzo();

        const options = respuesta.map(function (row) {
            return { value: row.idGradoEsfuerzo, label: row.idGradoEsfuerzo + ' ' + row.gradoEsfuerzo }
        })
        setlistaGradoEsfuerzo(options);
        if (Number(proceso2) === 2) {
            setidGradoEsfuerzo(options.find(x => x.value === data.idGradoEsfuerzo));
        }

    }


    const ObtenerListaEstadoAceptacion = async () => {
        const respuesta = await ObtenerEstadoAceptacion();
        const options = respuesta.map(function (row) {
            return { value: row.idEstadoAceptacion, label: row.idEstadoAceptacion + ' ' + row.estadoAceptacion }
        })
        setlistaEstadoAceptacion(options);
        if (Number(proceso2) === 2) {
            setidEstadoAceptacion(options.find(x => x.value === data.idEstadoAceptacion));
        }
    }


    const ObtenerListaEstadosHallazgo = async () => {

        const respuesta = await ObtenerEstadoHallazgo();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idEstadoHallazgo, label: row.idEstadoHallazgo + ' ' + row.estadoHallazgo }
        })

        setlistaEstadoHallazgo(options);

        if (Number(proceso2) === 2) {
            setidEstadoHallazgo(options.find(x => x.value === data.idEstadoHallazgo));
        }
    }


    const ObtenerListaNumeroOficioEnvio = async () => {
        const respuesta = await ObtenerDatosOrbe();
        //método que pasa del array traido de backend a un array con un valor y label para poder ser manejados en los select importados
        const options = respuesta.map(function (row) {
            return { value: row.idOrbe, label: row.idOrbe + ' ' + row.orbe }
        })

        setlistaNumOficio(options);

        if (Number(proceso2) === 2) {
            setidNumOficio(options.find(x => x.value === data.numOficioEnvio));
        }

    }


    const ObtenerListaPeriodicidadEntregaAvances = async () => {
        const respuesta = await ObtenerPeriodicidad();
        const options = respuesta.map(function (row) {
            return { value: row.idPeriodicidad, label: row.idPeriodicidad + ' ' + row.periodicidad }
        })
        setlistaPeriodicidad(options);
        if (Number(proceso2) === 2) {
            setidPeriodicidad(options.find(x => x.value === data.idPeriodicidadEntregaAvances));
        }

    }

    //Anotaciones

    const onClickAgregarAnotacion = () => {
        //this.setState({ data: this.mantenimientoHallazgo });

        setmodal(true);

    }

    const onClickCerrarModal = () => {
        setmodal(false);
        /*   this.setState({ mensajeFormulario: "" });*/
    }


    //Insertar hallazgo


    const onClickAgregarMantenimiento = async (event) => {


        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                IdSolucionAsociadaHallazgo: parseInt(idLineaNegocio.value),
                IdGradoImpacto: parseInt(idGradoImpacto.value),
                IdEstadoHallazgo: parseInt(idEstadoHallazgo.value),
                IdPeriodicidadEntregaAvances: parseInt(idPeriodicidad.value),
                IdFaseCJ: parseInt(idFaseCJ.value),
                IdServicioAsociadoHallazgo: parseInt(idSevicioHallazgo.value),
                IdGradoEsfuerzo: parseInt(idGradoEsfuerzo.value),
                NumOficioEnvio: idNumOficio.value,
                IdTallerCoCreacion: parseInt(idTaller.value),
                IdMacroActividadAsociadaHallazgo: parseInt(idMacroActividad.value),
                IdEstadoAceptacion: parseInt(idEstadoAceptacion.value),
                PorcentajeGeneral: parseInt(porcentajeGeneral),
                detalleGeneralHallazgo: detalleGeneral,
                detalleEspecificoHallazgo: detalleEspecificoH,
            };

            
            if (proceso2 === 2) { datos.idMantenimientoHallazgo = data.idMantenimientoHallazgo };

            const result = onClickProcesarHallazgo(datos); //se ejecuta la función
        

        }
        setValidated(true);
        event.preventDefault();

    }



    const onChangeFasesCJ = (e) => { setidFaseCJ(e);  };
    const onChangeTallerCoCreacion = (e) => setidTaller(e);

    const onChangeLineaNegocio = (e) => {
        if (e.value != '') {
            setidLineaNegocio(e);
            setServiciosFiltrados(listaServicioHallazgo.filter(servicios => servicios.idLinea == e.value))

        } else {

        }
    }

    const onChangeSevicioAsoHallazgo = (e) => setidSevicioHallazgo(e);
    const onChangeMacroActividad = (e) => setidMacroActividad(e);
    const onChangeGradoImpacto = (e) => setidGradoImpacto(e);
    const onChangeGradoEsfuerzo = (e) => setidGradoEsfuerzo(e);
    const onChangeEstadoAceptacion = (e) => setidEstadoAceptacion(e)
    const onChangeEstadoHallazgo = (e) => setidEstadoHallazgo(e);
    const onChangeNumOficio = (e) => setidNumOficio(e)

    const onChangePeriodicidad = (e) => setidPeriodicidad(e)





    const onChangeDetalleGeneral = (e) => {
        setDetalleGeneral(e.target.value);
    }
    const onChangePorcentajeGeneral = (object) => {

        if (!isNaN(object.target.value)) {
            if (object.target.value >= 101) {
                object.target.value = 100;
                setPorcentajeGeneral(object.target.value)
                return object;

            }
            else {
                setPorcentajeGeneral(object.target.value)
                return object;
            }
        }
        object.target.value = '';
        return object;
    }




    const onChangeDetalleEspecificoH = (e) => {
        setdetalleEspecificoH(e.target.value);
    }


    const InsertarHallazgo = () => {




        return (
            <>


                <InputText id='txt-nombre' label='Secuencia:' type='text' value={secuencia}
                    readOnly />

                <h6 className="heading3">Fase de Customer Journey</h6>
                <Select id="codFaseCJ" placeholder="Seleccione..." isSearchable={false} isClearable={true} value={idFaseCJ} options={listaFases} onChange={onChangeFasesCJ} />

                <h6 className="heading3">Taller de Co Creación</h6>
                <Select id="tallerCoCreacion" placeholder="Seleccione..." onChange={onChangeTallerCoCreacion} isClearable={true} value={idTaller} options={listaTalleres} />

                <h6 className="heading3">Solución asociada al hallazgo</h6>
                <Select id="lineaNegocio" placeholder="Seleccione..." onChange={onChangeLineaNegocio} isClearable={true} value={idLineaNegocio} options={listaLineaNegocio} />

                <h6 className="heading3">Servicio Asociado al Hallazgo </h6>
                <Select id="servicioAso" placeholder="Seleccione..." onChange={onChangeSevicioAsoHallazgo} isClearable={true} value={idSevicioHallazgo} options={serviciosFiltrados} />

                <h6 className="heading3">Macro Actividad Asociada al Hallazgo </h6>
                <Select id="macroActividadAso" placeholder="Seleccione..." onChange={onChangeMacroActividad} isClearable={true} value={idMacroActividad} options={listaMacroActividad} />

                <h6 className="heading3">Nivel de Impacto del Hallazgo</h6>
                <Select id="gradoImpacto" placeholder="Seleccione..." onChange={onChangeGradoImpacto} isSearchable={false} isClearable={true} value={idGradoImpacto} options={listaGradoImpacto} />

                <h6 className="heading3">Grado de Esfuerzo del Hallazgo</h6>
                <Select name="gradoEsfuerzo" id="gradoEsfuerzo" placeholder="Seleccione..." onChange={onChangeGradoEsfuerzo} isSearchable={false} isClearable={true} value={idGradoEsfuerzo} options={listaGradoEsfuerzo} />

                <h6 className="heading3">Estado de Aceptación</h6>
                <Select id="estadoAceptacion" placeholder="Seleccione..." onChange={onChangeEstadoAceptacion} isClearable={true} value={idEstadoAceptacion} options={listaEstadoAceptacion} />

                <h6 className="heading3">Estado del Hallazgo </h6>
                <Select id="estadoHallazgo" placeholder="Seleccione..." onChange={onChangeEstadoHallazgo} isClearable={true} value={idEstadoHallazgo} options={listaEstadoHallazgo} />

                <h6 className="heading3">Nro de Oficio del Envio </h6>

                <Select id="numOficioEnvio" placeholder="Seleccione..." onChange={onChangeNumOficio} isClearable={true} value={idNumOficio} options={listaNumOficio} />

                <h6 className="heading3">Periodicidad de Entrega de Avances</h6>
                <Select id="periodicidadEntrega" placeholder="Seleccione..." onChange={onChangePeriodicidad} isClearable={true} value={idPeriodicidad} options={listaPeriodicidad} />





            </>
        )
    }

    const EditarHallazgo = () => {
        return (
            <>

                <Row>
                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3"> Secuencia del hallazgo</h6>

                            <Input
                                id="numsecuencia"
                                name="text"
                                type="text"
                                value={secuencia}
                            />


                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Fase de Customer Journey</h6>
                            <Select id="codFaseCJ" placeholder="Seleccione..." onChange={onChangeFasesCJ} isSearchable={false} isClearable={true} value={idFaseCJ} options={listaFases} />

                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Taller de Co Creación</h6>
                            <Select id="tallerCoCreacion" placeholder="Seleccione..." onChange={onChangeTallerCoCreacion} isClearable={true} value={idTaller} options={listaTalleres} />

                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Solución asociada al hallazgo</h6>
                            <Select id="lineaNegocio" placeholder="Seleccione..." onChange={onChangeLineaNegocio} isClearable={true} value={idLineaNegocio} options={listaLineaNegocio} />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Servicio Asociado al Hallazgo </h6>
                            <Select id="servicioAso" placeholder="Seleccione..." onChange={onChangeSevicioAsoHallazgo} isClearable={true} value={idSevicioHallazgo} options={serviciosFiltrados} />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Macro Actividad Asociada al Hallazgo </h6>
                            <Select id="macroActividadAso" placeholder="Seleccione..." onChange={onChangeMacroActividad} isClearable={true} value={idMacroActividad} options={listaMacroActividad} />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Nivel de Impacto del Hallazgo</h6>
                            <Select id="gradoImpacto" placeholder="Seleccione..." onChange={onChangeGradoImpacto} isSearchable={false} isClearable={true} value={idGradoImpacto} options={listaGradoImpacto} />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Grado de Esfuerzo del Hallazgo</h6>
                            <Select name="gradoEsfuerzo" id="gradoEsfuerzo" placeholder="Seleccione..." onChange={onChangeGradoEsfuerzo} isSearchable={false} isClearable={true} value={idGradoEsfuerzo} options={listaGradoEsfuerzo} />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Estado de Aceptación</h6>
                            <Select id="estadoAceptacion" placeholder="Seleccione..." onChange={onChangeEstadoAceptacion} isClearable={true} value={idEstadoAceptacion} options={listaEstadoAceptacion} />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Estado del Hallazgo </h6>
                            <Select id="estadoHallazgo" placeholder="Seleccione..." onChange={onChangeEstadoHallazgo} isClearable={true} value={idEstadoHallazgo} options={listaEstadoHallazgo} />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 id="focus" className="heading3" style={{ "fontFamily": "Roboto,-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,sans-serif", "fontStyle": "normal", "fontWeight": "400", "textRendering": "optimizeLegibility" }}>Nro de Oficio del Envio</h6>

                            <Select id="numOficioEnvio" onChange={onChangeNumOficio} isClearable={true} value={idNumOficio} options={listaNumOficio} />

                        </div>
                    </Col>


                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3">Periodicidad de Entrega de Avances</h6>
                            <Select id="periodicidadEntrega" onChange={onChangePeriodicidad} isClearable={true} value={idPeriodicidad} options={listaPeriodicidad} />
                        </div>
                    </Col>
                </Row>


            </>
        )
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAgregarMantenimiento}>
            

                {Number(proceso2) === 1 ?  <InsertarHallazgo /> : <EditarHallazgo />


                }

                {Number(proceso2) === 1 ?
                    <>

                        <h6 className="heading3">Detalle General del Hallazgo</h6>
                        <Input
                            id="detalleGeneral"
                            name="text"
                            type="textarea"
                            value={detalleGeneral}
                            onChange={onChangeDetalleGeneral} />



                        <h6 className="heading3">Porcentaje General</h6>
                        <Input
                            id="porcentaje"
                            name="text"
                            type="text"
                            value={porcentajeGeneral}
                            onInput={onChangePorcentajeGeneral}
                            pattern="[0-9]{1,3}" min="0" max="100" maxLength="3" />

                        <h6 className="heading3">Detalle Específico del Hallazgo</h6>
                        <Input
                            id="detalleGeneral"
                            name="text"
                            type="textarea"
                            value={detalleEspecificoH}
                            onChange={onChangeDetalleEspecificoH} />




                        <div className="item1">
                            <h6 className="heading3">Anexos</h6>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control style={{ marginBottom: 2 }} type="file" />

                                <Button onClick={() => onClickAgregarAnotacion()} color="primary" variant="primary" size="sm">Agregar Anotaciones</Button>
                            </Form.Group>
                            <FormularioModal show={modal} handleClose={onClickCerrarModal} titulo={modalTitulo}>
                                <FormAnotacion />
                            </FormularioModal>
                        </div>

                    </>
                    : <><Row>
                        <Col md={4}>
                            <h6 className="heading3">Detalle General del Hallazgo</h6>
                            <Input
                                id="detalleGeneral"
                                name="text"
                                type="textarea"
                                value={detalleGeneral}
                                onChange={onChangeDetalleGeneral} />
                        </Col>

                        <Col md={4}>
                            <h6 className="heading3">Porcentaje General</h6>
                            <Input
                                id="porcentaje"
                                name="text"
                                type="text"
                                value={porcentajeGeneral}
                                onInput={onChangePorcentajeGeneral}
                                pattern="[0-9]{1,3}" min="0" max="100" maxLength="3" />
                        </Col>
                        <Col md={4}>
                            <h6 className="heading3">Detalle Específico del Hallazgo</h6>
                            <Input
                                id="detalleGeneral"
                                name="text"
                                type="textarea"
                                value={detalleEspecificoH}
                                onChange={onChangeDetalleEspecificoH} />
                        </Col>
                    </Row>

                        <Row>
                            <Col md={4}>
                                <div className="item1">
                                    <h6 className="heading3">Anexos</h6>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control style={{ marginBottom: 2 }} type="file" />

                                        <Button onClick={() => onClickAgregarAnotacion()} color="primary" variant="primary" size="sm">Agregar Anotaciones</Button>
                                    </Form.Group>
                                    <FormularioModal show={modal} handleClose={onClickCerrarModal} titulo={modalTitulo}>
                                        <FormAnotacion />
                                    </FormularioModal>
                                </div>
                            </Col>
                        </Row></>


                }



                {/*<Row id="filaBotones">*/}
                {/*    <Col id="botonesGuardado" md={3}>*/}
                {/*        <button id="btnGuardar" type="button" className="btn btn-primary btn-lg" >Guardar</button>*/}
                {/*        <button id="btnEditar" type="button" className="btn btn-primary btn-lg" >Editar</button>*/}
                {/*        <button id="btnCancelar" type="button" className="btn btn-danger btn-lg" >Cancelar</button>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <br />
                <div className='text-right'>

                    <Button variant="primary" type="submit" >Guadar</Button>
                    {Number(proceso2) === 2 ?
                        <button id="btnCancelar" type="button" className="btn btn-danger " onClick={() => onClickCancelar()}>Cancelar</button>
                        : <></>}
                </div>
            </Form>
        </>
    )
}

export default Formulario



