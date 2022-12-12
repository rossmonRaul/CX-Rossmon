import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { ObtenerTiposIndicadores } from '../../servicios/ServicioTipoIndicador';
import { ObtenerTipoContactoEncuesta } from '../../servicios/ServicioTipoContactoEncuesta';
import { ObtenerTiposEncuestas } from '../../servicios/ServicioTipoEncuesta';
import { ObtenerTiposMetricas } from '../../servicios/ServicioTipoMetrica';
import { ObtenerTipoInteraccion } from '../../servicios/ServicioTipoInteraccion';
import { ObtenerTipoPerspectivas } from '../../servicios/ServicioTipoPerspectivas';
import { InputSelect } from '../components_forms/inputs'
import "../mantenimientos_forms/css/formPasos.css";

//VARIABLES QUE SE UTILIZAN EN EL COMPONENTE FORM PASOS PARA SER TRASLADADAS COMO PROPIEDADES A LOS COMPONENTES QUE LAS REQUIERAN
export var varIdTipoIndicador = 1; export var varIdTipoEncuesta = 1; export var varIdTipoMetrica = 1; export var varIdTipoPerspectiva= 1;
export var varIdTipoPregunta = 1; export var varIdTipoContactoEncuesta = 1; export var varIdTipoInteraccion = 1;

//PASO UNO, AQUÍ SE GUARDAN TODOS LOS VALORES DE PARAMETRIZACIÓN
const StepOne = ({ nextStep, data, proceso }) => {

    //VARIABLES DE ESTADO DE CADA UNO DE LOS ID'S PARA PARAMETRIZAR LA PREGUNTA + LA LISTA QUE SE MOSTRARÁ EN EL SELECT
    const [idTipoContactoEncuesta, setTipoContactoEncuesta] = useState(proceso == 2 ? data.idTipoContactoEncuesta : '');
    const [listaTipoContactoEncuesta, setListaTipoContactoEncuesta] = useState([]);

    const [idTipoIndicador, setTipoIndicador] = useState(proceso == 2 ? data.idTipoIndicador : '');
    const [listaTipoIndicador, setListaTipoIndicador] = useState([]);

    const [idTipoEncuesta, setTipoEncuesta] = useState(proceso == 2 ? data.idTipoEncuesta : '');
    const [listaTipoEncuesta, setListaTipoEncuesta] = useState([]);

    const [idTipoMetrica, setTipoMetrica] = useState(proceso == 2 ? data.idTipoMetrica : '');
    const [listaTipoMetrica, setListaTipoMetrica] = useState([]);

    const [idTipoInteraccion, setTipoInteraccion] = useState(proceso == 2 ? data.idTipoInteraccion : '');
    const [listaTipoInteraccion, setListaTipoInteraccion] = useState([]);

    const [idTipoPerspectiva, setTipoPerspectiva] = useState(proceso == 2 ? data.idTipoPerspectiva : '');
    const [listaTipoPerspectiva, setListaTipoPerspectiva] = useState([]);

    //PARA CAMBIAR AL PASO SIGUIENTE
    const submitFormData = (e) => {
        e.preventDefault();
        nextStep();
    };


    useEffect(() => {

        ObtenerListaTipoContactoEncuesta();
        ObtenerListaTipoIndicador();
        ObtenerListaTipoEncuesta();
        ObtenerListaTipoMetrica();
        ObtenerListaTipoInteraccion();
        ObtenerListaTipoPerspectiva();
    }, []);

    //SE OBTIENEN LAS LISTAS DE DATOS PARA SER MOSTRADOS EN LOS SELECT
    const ObtenerListaTipoContactoEncuesta = async () => {
        const soc = await ObtenerTipoContactoEncuesta();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTipoContactoEncuesta(soc.sort((x, y) => { return parseInt(x.idTipoContactoEncuesta) === idTipoContactoEncuesta ? -1 : parseInt(y.idTipoContactoEncuesta) === idTipoContactoEncuesta ? 1 : 0; }));
            } else {
                let defecto = { idTipoContactoEncuesta: '', tipoContactoEncuesta: "-- Seleccione Tipo Contacto Encuesta --" };
                soc.push(defecto);
                setListaTipoContactoEncuesta(soc.reverse());
            }
        }
    }
    

    const ObtenerListaTipoIndicador = async () => {
        const soc = await ObtenerTiposIndicadores();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTipoIndicador(soc.sort((x, y) => { return parseInt(x.idTipoIndicador) === idTipoIndicador ? -1 : parseInt(y.idTipoIndicador) === idTipoIndicador ? 1 : 0; }));
            } else {
                let defecto = { idTipoIndicador: '', tipoIndicador: "-- Seleccione Tipo Indicador --" };
                soc.push(defecto);
                setListaTipoIndicador(soc.reverse());
            }
        }
    }

    const ObtenerListaTipoEncuesta = async () => {
        const soc = await ObtenerTiposEncuestas();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTipoEncuesta(soc.sort((x, y) => { return parseInt(x.idTipoEncuesta) === idTipoEncuesta ? -1 : parseInt(y.idTipoEncuesta) === idTipoEncuesta ? 1 : 0; }));
            } else {
                let defecto = { idTipoEncuesta: '', tipoEncuesta: "-- Seleccione Tipo Encuesta --" };
                soc.push(defecto);
                setListaTipoEncuesta(soc.reverse());
            }
        }
    }

    const ObtenerListaTipoMetrica = async () => {
        const soc = await ObtenerTiposMetricas();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTipoMetrica(soc.sort((x, y) => { return parseInt(x.idTipoMetrica) === idTipoMetrica ? -1 : parseInt(y.idTipoMetrica) === idTipoMetrica ? 1 : 0; }));
            } else {
                let defecto = { idTipoMetrica: '', tipo: "-- Seleccione Tipo Metrica --" };
                soc.push(defecto);
                setListaTipoMetrica(soc.reverse());
            }
        }
    }

    const ObtenerListaTipoInteraccion = async () => {
        const soc = await ObtenerTipoInteraccion();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTipoInteraccion(soc.sort((x, y) => { return parseInt(x.idTipoInteraccion) === idTipoInteraccion ? -1 : parseInt(y.idTipoInteraccion) === idTipoInteraccion ? 1 : 0; }));
            } else {
                let defecto = { idTipoInteraccion: '', tipoInteraccion: "-- Seleccione Tipo Interaccion --" };
                soc.push(defecto);
                setListaTipoInteraccion(soc.reverse());
            }
        }
    }

    const ObtenerListaTipoPerspectiva = async () => {
        const soc = await ObtenerTipoPerspectivas();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTipoPerspectiva(soc.sort((x, y) => { return parseInt(x.idTipoPerspectiva) === idTipoPerspectiva ? -1 : parseInt(y.idTipoPerspectiva) === idTipoPerspectiva ? 1 : 0; }));
            } else {
                let defecto = { idTipoPerspectiva: '', tipoPerspectiva: "-- Seleccione Tipo Perspectiva --" };
                soc.push(defecto);
                setListaTipoPerspectiva(soc.reverse());
            }
        }
    }

    const onChangeTipoPerspectiva = (e) => setTipoPerspectiva(e.target.value);
    const onChangeTipoInteraccion = (e) => setTipoInteraccion(e.target.value);
    const onChangeTipoMetrica = (e) => setTipoMetrica(e.target.value); 
    const onChangeTipoEncuesta = (e) => setTipoEncuesta(e.target.value); 
    const onChangeTipoContactoEncuesta = (e) => setTipoContactoEncuesta(e.target.value); 
    const onChangeSocio = (e) => setTipoIndicador(e.target.value); 

    //GUARDAR TODOS LOS VALORES DE PARAMETRIZACIÓN PARA ENVIARLOS COMO PROPIEDADES DESDE EL formPasos
    varIdTipoIndicador = idTipoIndicador;
    varIdTipoEncuesta = idTipoEncuesta;
    varIdTipoMetrica = idTipoMetrica;
    varIdTipoPerspectiva = idTipoPerspectiva;
    varIdTipoContactoEncuesta = idTipoContactoEncuesta;
    varIdTipoInteraccion = idTipoInteraccion;

    return (
        <div>
            <Card style={{ marginTop: 1 }}>
                <Card.Body>
                    <Form onSubmit={submitFormData}>

                        <h6>Parametrizar Pregunta</h6>

                        <br></br>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Contacto Encuesta" data={listaTipoContactoEncuesta} value={idTipoContactoEncuesta}
                                onChange={onChangeTipoContactoEncuesta} optionValue="idTipoContactoEncuesta" optionLabel="tipoContactoEncuesta"
                                classGroup="form-lineas"></InputSelect>

                            <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Indicador" data={listaTipoIndicador} value={idTipoIndicador}
                                onChange={onChangeSocio} optionValue="idTipoIndicador" optionLabel="tipoIndicador"
                                classGroup="form-lineas"></InputSelect>
                        </div>

                        <br></br>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Encuesta" data={listaTipoEncuesta} value={idTipoEncuesta}
                                onChange={onChangeTipoEncuesta} optionValue="idTipoEncuesta" optionLabel="tipoEncuesta"
                                classGroup="form-lineas"></InputSelect>

                            <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Métrica" data={listaTipoMetrica} value={idTipoMetrica}
                                onChange={onChangeTipoMetrica} optionValue="idTipoMetrica" optionLabel="tipo"
                                classGroup="form-lineas"></InputSelect>
                            
                        </div>

                        <br></br>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Interacción" data={listaTipoInteraccion} value={idTipoInteraccion}
                                onChange={onChangeTipoInteraccion} optionValue="idTipoInteraccion" optionLabel="tipoInteraccion"
                                classGroup="form-lineas"></InputSelect>

                            <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Perspectiva" data={listaTipoPerspectiva} value={idTipoPerspectiva}
                                onChange={onChangeTipoPerspectiva} optionValue="idTipoPerspectiva" optionLabel="tipoPerspectiva"
                                classGroup="form-lineas"></InputSelect>

                        </div>

                        <br></br>

                        <Button variant="primary" type="submit">
                            Siguiente
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StepOne;
