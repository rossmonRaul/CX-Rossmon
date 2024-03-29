﻿import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'
import { InputSelect } from '../components_forms/inputs'
import { ObtenerTiposIndicadores } from '../../servicios/ServicioTipoIndicador';
import { ObtenerTiposMetricas } from '../../servicios/ServicioTipoMetrica';
import { ObtenerTiposEncuestas } from '../../servicios/ServicioTipoEncuesta';
import { ObtenerFasesCJ } from '../../servicios/ServicioFasesCJ';
//FORMULARIO PARA REALIZAR LA EDICIÓN DE LOS VALORES Y LA PREGUNTA
const Formulario = ({ labelButton, data, proceso, onClickProcesarPregunta}) => {

    //PARA MOSTRAR LA PREGUNTA Y GUARDAR EL CAMBIO
    const [pregunta, setPregunta] = useState(proceso === 2 ? data.pregunta : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //PARA INGRESAR EL ID DE LA OPCIÓN SELECCIONADA
    const [idTipoIndicador, setIdTipoIndicador] = useState(proceso === 2 ? data.idTipoIndicador : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [idTipoMetrica, setIdTipoMetrica] = useState(proceso === 2 ? data.idTipoMetrica : '');
    const [idTipoEncuesta, setIdTipoEncuesta] = useState(proceso === 2 ? data.idTipoEncuesta : '');
    const [idFaseCJ, setIdFaseCJ] = useState(proceso === 2 ? data.idFaseCJ : '');
    //PARA MOSTRAR LAS DIFERENTES OPCIONES EN CADA SELECT
    const [listaTiposIndicadores, setListaTiposIndicadores] = useState([]);
    const [listaTiposMetricas, setListaTiposMetricas] = useState([]);
    const [listaTiposEncuestas, setListaTiposEncuestas] = useState([]);
    const [listaFasesCJ, setListaFasesCJ] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        ObtenerListaFasesCJ();        
        ObtenerListaTiposIndicadores();
        ObtenerListaTiposMetricas();
        ObtenerListaTiposEncuestas();
    }, []);

    const ObtenerListaFasesCJ = async () => {
        const soc = await ObtenerFasesCJ();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaFasesCJ(soc.sort((x, y) => { return parseInt(x.idFaseCJ) === idFaseCJ ? -1 : parseInt(y.idFaseCJ) === idFaseCJ ? 1 : 0; }));
            } else {
                let defecto = { idFaseCJ: '', faseCustomerJourney: "-- Seleccione una Fase de Customer Journey --" };
                soc.push(defecto);
                setListaFasesCJ(soc.reverse());
            }
        }
    }

    const ObtenerListaTiposIndicadores = async () => {
        const soc = await ObtenerTiposIndicadores();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTiposIndicadores(soc.sort((x, y) => { return parseInt(x.idTipoIndicador) === idTipoIndicador ? -1 : parseInt(y.idTipoIndicador) === idTipoIndicador ? 1 : 0; }));
            } else {
                let defecto = { idTipoIndicador: '', tipoIndicador: "-- Seleccione Tipo Indicador --" };
                soc.push(defecto);
                setListaTiposIndicadores(soc.reverse());
            }
        }
    }

    const ObtenerListaTiposMetricas = async () => {
        const soc = await ObtenerTiposMetricas();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTiposMetricas(soc.sort((x, y) => { return parseInt(x.idTipoMetrica) === idTipoMetrica ? -1 : parseInt(y.idTipoMetrica) === idTipoMetrica ? 1 : 0; }));
            } else {
                let defecto = { idTipoMetrica: '', tipo: "-- Seleccione Tipo Metrica --" };
                soc.push(defecto);
                setListaTiposMetricas(soc.reverse());
            }
        }
    }

    const ObtenerListaTiposEncuestas = async () => {
        const soc = await ObtenerTiposEncuestas();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaTiposEncuestas(soc.sort((x, y) => { return parseInt(x.idTipoEncuesta) === idTipoEncuesta ? -1 : parseInt(y.idTipoEncuesta) === idTipoEncuesta ? 1 : 0; }));
            } else {
                let defecto = { idTipoEncuesta: '', tipoEncuesta: "-- Seleccione Tipo Encuesta --" };
                soc.push(defecto);
                setListaTiposEncuestas(soc.reverse());
            }
        }
    }

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            if (data.idTipoIndicador) {
                const datos = {
                    Pregunta: pregunta,
                    IdtipoIndicador: parseInt(idTipoIndicador),
                    IdTipoMetrica: parseInt(idTipoMetrica),
                    IdTipoEncuesta: parseInt(idTipoEncuesta),
                    IdPreguntaEncuesta: data.idPreguntaEncuesta,
                    IdFaseCJ: parseInt(idFaseCJ),
                };
                const result = onClickProcesarPregunta(datos);
            } else {
                const datos = {
                    Pregunta: pregunta,
                    IdTipoMetrica: parseInt(idTipoMetrica),
                    IdTipoEncuesta: parseInt(idTipoEncuesta),
                    IdPreguntaEncuesta: data.idPreguntaEncuesta,
                    IdFaseCJ: parseInt(idFaseCJ),
                };
                const result = onClickProcesarPregunta(datos);
            }
            
           
             //se ejecuta la función      
        }
        setValidated(true);
        event.preventDefault();
    }

    const onChangePreguntas = (e) => setPregunta(e.target.value);
    const onChangeIdTipoIndicador = (e) => setIdTipoIndicador(e.target.value);
    const onChangeIdTipoMetrica = (e) => setIdTipoMetrica(e.target.value);
    const onChangeIdTipoEncuesta = (e) => setIdTipoEncuesta(e.target.value);
    const onChangeIdFaseCJ = (e) => {
        setIdFaseCJ(e.target.value);
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
                <InputText id='txt-Pregunta' label='Pregunta:' type='text' placeholder='Ingrese la pregunta' value={pregunta}
                    onChange={onChangePreguntas} mensajeValidacion="Este campo es requerido" />
          
                {data.idTipoIndicador ?
                        <>
                        <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Indicador" data={listaTiposIndicadores} value={idTipoIndicador}
                            onChange={onChangeIdTipoIndicador} optionValue="idTipoIndicador" optionLabel="tipoIndicador"
                            classGroup="form-lineas"> </InputSelect>
                        <br></br>
                        </>
                     : null

                }


            
                <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Métrica" data={listaTiposMetricas} value={idTipoMetrica}
                    onChange={onChangeIdTipoMetrica} optionValue="idTipoMetrica" optionLabel="tipo"
                    classGroup="form-lineas"></InputSelect>

                
                <br></br>

                <InputSelect className="slct_socios" controlId="slct_socios" label="Fase de Customer Journey" data={listaFasesCJ} value={idFaseCJ}
                    onChange={onChangeIdFaseCJ} optionValue="idFaseCJ" optionLabel="faseCustomerJourney"
                    classGroup="form-lineas"></InputSelect>


                <br></br>
                <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Encuesta" data={listaTiposEncuestas} value={idTipoEncuesta}
                    onChange={onChangeIdTipoEncuesta} optionValue="idTipoEncuesta" optionLabel="tipoEncuesta"
                    classGroup="form-lineas"></InputSelect>

                <br></br>

                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario