import StarRating from '../components_forms/calificacionEstrellas'
import React, { useState,useEffect } from "react";
import "../mantenimientos_forms/css/formPasos.css";
import { InputText, InputSelect } from '../components_forms/inputs'
import { Form, Button } from "react-bootstrap";
import { ObtenerTiposIndicadores, ObtenerTipoIndicadorPorId, ObtenerValoresIndicadorPorID } from '../../servicios/ServicioTipoIndicador';
import { StylesManager, Model } from "survey-core";
import { Survey, PopupSurvey } from 'survey-react-ui';
import "survey-core/defaultV2.min.css";
const CalificacionEstrellas = ({ data, proceso, onClickProcesarPregunta, volverPasoDos, onClickProcesarRespuestasPregunta,
    varIdTipoEncuesta, varIdTipoMetrica, varIdTipoPerspectiva, varIdTipoContactoEncuesta, varIdTipoInteraccion, varIdFaseCJ }) => {

    //PARA EL VALOR DE LA PREGUNTA
    const [pregunta, setPregunta] = useState(proceso === 2 ? data.pregunta : '')
    const [valoresIndicador, setValoresIndicador] = useState([]);
    const [idTipoIndicador, setTipoIndicador] = useState(proceso === 2 ? data.idTipoIndicador : '');
    const [listaTipoIndicador, setListaTipoIndicador] = useState([]);
    const [formularioCargado, setFormularioCargado] = useState(false);
    const [listaRespuesta, setListaRespuesta] = useState([{ respuesta: "" }]);
    //validación
    const [validated, setValidated] = useState(false);
    const [indicador, setIndicador] = useState({});

    useEffect(() => {
        ObtenerListaTipoIndicador();
    }, []);

    const ObtenerListaTipoIndicador = async () => {
        const soc = await ObtenerTiposIndicadores();
        if (soc !== undefined) {
                let defecto = { idTipoIndicador: '', tipoIndicador: "-- Seleccione Tipo Indicador --" };
                soc.push(defecto);
                setListaTipoIndicador(soc.reverse());
            }
        
    }
    const ObtenerTipoIndicador = async (e) => {
        const respuesta = await ObtenerTipoIndicadorPorId(e);
        const listaValoresIndicador = await ObtenerValoresIndicadorPorID(e);
        setIndicador(respuesta);
        setValoresIndicador(listaValoresIndicador);
    }

    const onClickAceptar = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                idPreguntaEncuesta: data.idPreguntaEncuesta,
                Pregunta: pregunta,
                idTipoEncuesta: parseInt(varIdTipoEncuesta),
                idTipoMetrica: parseInt(varIdTipoMetrica),
                idTipoPerspectiva: parseInt(varIdTipoPerspectiva),
                idTipoIndicador: parseInt(idTipoIndicador),
                idTipoPregunta: 6,
                idTipoContactoEncuesta: parseInt(varIdTipoContactoEncuesta),
                idTipoInteraccion: parseInt(varIdTipoInteraccion),
                idFaseCJ: parseInt(varIdFaseCJ),
            };
            if (proceso === 2) { datos.idPreguntaEncuesta = data.idPreguntaEncuesta; };

            const result = onClickProcesarPregunta(datos); //se ejecuta la función

        }
        setValidated(true);
        event.preventDefault();
    }

    const onChangePreguntas = (e) => setPregunta(e.target.value);

    const onChangeTipoIndicador = (e) => {
        setTipoIndicador(e.target.value);
        ObtenerTipoIndicador(e.target.value);
        setFormularioCargado(true);
    }

    const SurveyComponent = ({ data }) => {

        const survey = new Model();
        survey.showNavigationButtons = false;
        const page = survey.addNewPage("PersonalDetails");

        var preguntaDinamica= page.addNewQuestion("rating","");
        //rating es la clasificacion de estrellas
        preguntaDinamica.titleLocation = "hidden";
        preguntaDinamica.displayMode="buttons"
        preguntaDinamica.rateMax = indicador.maximo;

        return <Survey model={survey} />;
    } 

    return (

            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
            <h4>Calificación de Estrellas</h4>

                <br></br>

            <InputText id='txt-Pregunta' label='Pregunta:' type='text' placeholder='Ingrese la pregunta' value={pregunta}
                onChange={onChangePreguntas} mensajeValidacion="Este campo es requerido"
                />

                <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Indicador" data={listaTipoIndicador} value={idTipoIndicador}
                    onChange={onChangeTipoIndicador} optionValue="idTipoIndicador" optionLabel="tipoIndicador"
                    classGroup="form-lineas">
                </InputSelect>
            <br></br>
            <div id="estrellas">{formularioCargado && <SurveyComponent />} </div>

                <br></br>

            <div style={{ display: "flex", justifyContent: "space-around" }}>

                <Button className="primary" type="submit" variant="primary">Guardar</Button>
                <Button  variant="secondary" onClick={volverPasoDos}>
                    Atrás
                </Button>
                </div>
            </Form>
    );
};

export default CalificacionEstrellas;
