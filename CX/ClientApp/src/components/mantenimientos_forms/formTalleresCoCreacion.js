import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'
import { ComboBox } from '../components_forms/combobox'
import { ObtenerSectoresActivos } from '../../servicios/ServicioSectores';
import { Container, Row, Col, Label, Input, FormGroup, input } from 'reactstrap';
import { ObtenerTipoTaller } from '../../servicios/ServicioTipoTaller';
import { ObtenerServicioLineaNegocio, ObtenerLineasNegociosActivos } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerCantidadMantenimientoTalleresCoCreacion, ObtenerDatosOrbe, ObtenerFechasTallerCoCreacion, ObtenerEtapasTallerCoCreacion, ObtenerMantenimientoTallerCoCreacion, EliminarMantenimientoTallerCoCreacion, ObtenerMantenimientoTallerCoCreacionPorID, AgregarMantenimientoTallerCoCreacion, ActualizarMantenimientoTallerCoCreacion } from '../../servicios/ServicioMantenimientoTalleresCoCreacion';
import { AgregarEtapaTallerCo, ActualizarEtapaTallerCo, ObtenerEtapaTallerCoPorID, ObtenerEtapasTallerCo, ObtenerFechasTallerCo, ObtenerCantidadEtapasTallerCo } from '../../servicios/ServicioEtapasTallerCo';
import Select from 'react-select';


const Formulario = ({ labelButton, procesot, mensaje, data, onClickGuardarTallerCoCreacion, onClickCancelar }) => {
    const [secuencia, setSecuencia] = useState(procesot == 1 ? data.idMantenimientoTalleresCoCreacion : 0); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [idLineaNegocio, setidLineaNegocio] = useState(procesot == 2 ? data.idLineaNegocio : 0);
    const [fechaCreacion, setfechaCreacion] = useState(procesot == 2 ? data.fechaNumOficio : ' ');
    const [validated, setValidated] = useState(false);
    const [idTaller, setidTaller] = useState(procesot == 2 ? data.idTaller : 0);
    const [idnumOficioEnvio, setidnumOficioEnvio] = useState(procesot == 2 ? data.idnumOficioEnvio : 0);
    const [idServicioHallazgo, setidServicioHallazgo] = useState(procesot == 2 ? data.idServicioHallazgo : 0);
    const [detalleGeneral, setdetalleGeneral] = useState(procesot == 2 ? data.descripcionGeneral : '');

    const [listaTalleres, setListaTalleres] = useState([]);
    const [listalineaNegocio, setListalineaNegocio] = useState([]);
    const [serviciosFiltrados, setserviciosFiltrados] = useState([]);
    const [listanumOficioEnvio, setnumOficioEnvio] = useState([]);
    const [listaServicioHallazgo, setlistaServicioHallazgo] = useState([]);

    useEffect(() => {

        ObtenerSecuenciaHallazgo();
        ObtenerTalleres();
        ObtenerLineasNegocio();
        ObtenerServicioAsociadoHallazgo();
        ObtenerNumeroOficioEnvio();
        ObtenerFecha();

    }, []);

    const ObtenerServicioAsociadoHallazgo = async () => {
        const sect = await ObtenerServicioLineaNegocio();
        const options = sect.map(function (row) {
            return { value: row.idServicio, label: row.idServicio + ' ' + row.servicio, idLinea: row.idLinea }
        })

        setlistaServicioHallazgo(options);
        if (Number(procesot) === 2) {
            setidServicioHallazgo(options.find(x => x.value === data.idServicioAsociadoHallazgo));
        }
    }
    const ObtenerLineasNegocio = async () => {
        const sect = await ObtenerLineasNegociosActivos();
        const options = sect.map(function (row) {
            return { value: row.idLinea, label: row.idLinea + ' ' + row.lineaNegocio }
        })

        setListalineaNegocio(options);
        if (Number(procesot) === 2) {
            setidLineaNegocio(options.find(x => x.value === data.idSolucionAsociadaHallazgo));
        }
    }
    const ObtenerNumeroOficioEnvio = async () => {
        const sect = await ObtenerDatosOrbe();
        const options = sect.map(function (row) {
            return { value: row.idOrbe, fecha: row.fechaIngreso, label: row.idOrbe + ' ' + row.orbe }
        })
        if (sect !== undefined) {
            setnumOficioEnvio(options);

        }
        if (Number(procesot) === 2) {
            setidnumOficioEnvio(options.find(x => x.value === data.numOficioEnvio));
        }
    }
    const ObtenerSecuenciaHallazgo = async () => {
        if (procesot == 1) {
            const respuesta = await ObtenerCantidadMantenimientoTalleresCoCreacion();
            setSecuencia(respuesta.cantidad + 1);
        }
        if (Number(procesot) === 2) {
            setSecuencia(data.idMantenimientoTalleresCoCreacion);

        }
    }
    const ObtenerFecha = async () => {

        if (Number(procesot) === 2) {
            var cadena = formatDate(data.fechaNumOficio);
            setfechaCreacion(cadena);
        }
    }
    const ObtenerTalleres = async () => {
        const sect = await ObtenerTipoTaller();
        const options = sect.map(function (row) {
            return { value: row.idTipoTaller, label: row.idTipoTaller + ' ' + row.tipoTaller }
        })
        setListaTalleres(options);
        if (Number(procesot) === 2) {
            setidTaller(options.find(x => x.value === data.idTipoTaller));
        }
    }
    const formatDate = (i) => {
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
    const onChangeTipoTaller = (e) => setidTaller(e);
    const onChangeServicioAsoHallazgo = (e) => setidServicioHallazgo(e);
    const onChangeLineaNegocio = (e) => {
        if (e.value != '') {
            setidLineaNegocio(e);
            setserviciosFiltrados(listaServicioHallazgo.filter(servicios => servicios.idLinea == e.value))

        } else {

        }
    }
    const onChangeMacroNumeroOficioEnvio = (e) => {
        setidnumOficioEnvio(e);
        var cadena = formatDate(e.fecha);
        setfechaCreacion(cadena);
    }
    const onChangeDetalleGeneral = (e) => {
        setdetalleGeneral(e.target.value);
    }
    const onClickAgregarMantenimientoTallerCo = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                IdTipoTaller: parseInt(idTaller.value),
                IdSolucionAsociadaHallazgo: parseInt(idLineaNegocio.value),
                IdServicioAsociadoHallazgo: parseInt(idServicioHallazgo.value),
                NumOficioEnvio: parseInt(idnumOficioEnvio.value),
                FechaNumOficio: fechaCreacion,
                DescripcionGeneral: detalleGeneral,
            };
            if (procesot === 2) { datos.IdMantenimientoTalleresCoCreacion = data.idMantenimientoTalleresCoCreacion };
            const result = onClickGuardarTallerCoCreacion(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }
    const Insertartaller = () => {

        return (
            <>
                <h6 className="heading3"> Secuencia</h6>
                <input readonly type="text" name="secuencia_hallazgos" value={secuencia} style={{ width: "30.9vw", height: "30px", marginBottom: "5px" }} />

                <h6 className="heading3" >Tipo Taller</h6>
                <Select id="tipoTaller" placeholder="Seleccione..." onChange={onChangeTipoTaller} value={idTaller} options={listaTalleres} />

                <h6 className="heading3" >Linea Negocio</h6>
                <Select id="lineaNegocio" placeholder="Seleccione..." onChange={onChangeLineaNegocio} isClearable={true} value={idLineaNegocio} options={listalineaNegocio} />

                <h6 className="heading3" >Servicio</h6>
                <Select id="servicioAso" placeholder="Seleccione..." onChange={onChangeServicioAsoHallazgo} isClearable={true} value={idServicioHallazgo} options={serviciosFiltrados} />

                <h6 className="heading3" >Nro de Oficio del Envio</h6>
                <Select id="numOficioEnvio" placeholder="Seleccione..." onChange={onChangeMacroNumeroOficioEnvio} isClearable={true} value={idnumOficioEnvio} options={listanumOficioEnvio} />

                <h5 className="heading3">Fecha</h5>
                <input readonly type="text" name="fecha_oficio" value={fechaCreacion} style={{ width: "30.9vw", height: "30px", marginBottom: "5px" }}></input>



            </>
        )

    }

    const EditarTaller = () => {

        return (
            <>
                <Row>
                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3"> Secuencia</h6>
                            <Input
                                id="numsecuencia"
                                name="text"
                                type="text"
                                value={secuencia}
                                style={{ width: "26vw", height: "40px" }}
                            />

                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">

                            <h6 className="heading3" >Tipo Taller</h6>
                            <Select id="tipoTaller" placeholder="Seleccione..." onChange={onChangeTipoTaller} isSearchable={false} isClearable={true} value={idTaller} options={listaTalleres} />

                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">

                            <h6 className="heading3" >Linea Negocio</h6>
                            <Select id="lineaNegocio" placeholder="Seleccione..." onChange={onChangeLineaNegocio} isSearchable={false} isClearable={true} value={idLineaNegocio} options={listalineaNegocio} />

                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>

                        <div className="item1">

                            <h6 className="heading3" >Servicio</h6>
                            <Select id="servicioAso" placeholder="Seleccione..." onChange={onChangeServicioAsoHallazgo} isSearchable={false} isClearable={true} value={idServicioHallazgo} options={serviciosFiltrados} />
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h6 className="heading3" >Nro de Oficio del Envio</h6>
                            <Select id="numOficioEnvio" placeholder="Seleccione..." onChange={onChangeMacroNumeroOficioEnvio} isSearchable={false} isClearable={true} value={idnumOficioEnvio} options={listanumOficioEnvio} />

                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="item1">
                            <h5 className="heading3">Fecha</h5>
                            <input readonly type="text" name="fecha_oficio" value={fechaCreacion} style={{ width: "26vw", height: "40px" }}></input>


                        </div>
                    </Col>
                </Row>
            </>
        )

    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAgregarMantenimientoTallerCo}>

                {Number(procesot) === 1 ?
                    <Insertartaller />

                    : <EditarTaller />

                }
                {Number(procesot) === 1 ?
                    <>

                        <div className="item1">
                            <h6 className="heading3">Descripción General</h6>
                            <Input

                                id="detalleGeneral"
                                name="text"
                                type="textarea"
                                value={detalleGeneral}
                                onChange={onChangeDetalleGeneral}
                            />

                        </div>

                    </>
                    : <>
                        <Row>
                            <div className="item1">
                                <h6 className="heading3">Descripción General</h6>
                                <Input

                                    id="detalleGeneral"
                                    name="text"
                                    type="textarea"
                                    value={detalleGeneral}
                                    onChange={onChangeDetalleGeneral}
                                />

                            </div>
                        </Row>
                    </>
                }

                <br />
                <div className='text-right'>

                    <Button variant="primary" className="btna" type="submit" >Guardar</Button>
                    {Number(procesot) === 2 ?
                        <button id="btnCancelar" type="button" className="btn btn-danger " onClick={() => onClickCancelar()}>Cancelar</button>
                        : <></>}
                </div>
            </Form>
        </>
    )
}
export default Formulario



