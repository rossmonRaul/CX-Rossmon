import "../mantenimientos_forms/css/formPasos.css";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import React from 'react';
import StepOne from "./formPasoUno.js";
import StepTwo from "./formPasoDos";
import SeleccionUnica from "./formSeleccionUnica";
import SeleccionMultiple from "./formSeleccionMultiple";
import MenuDesplegable from "./formMenuDesplegable";
import CorreoElectronico from "./formCorreoElectronico";
import CajaTextoAbierto from "./formCajaTextoAbierto";
import CalificacionEstrellas from "./formCalificacionEstrellas";
//VARIABLES CON LA PARAMETRIZACIÓN PARA PASARLAS COMO PROPIEDADES A LOS DIFERENTES COMPONENTES
import {varIdTipoEncuesta, varIdTipoMetrica, varIdTipoPerspectiva, varIdTipoContactoEncuesta, varIdTipoInteraccion } from './formPasoUno';


const FormularioPasos = ({ data, proceso, onClickProcesarPregunta, onClickProcesarRespuestasPregunta }) => {

    //INDICA EL FORM A MOSTRAR SEGÚN LA CIFRA DE ESTA VARIABLE
    const [step, setstep] = useState(1);

    //INCREMENTA EN UNA UNIDAD PARA MOSTRAR EL SIGUIENTE FORM (SIGUIENTE PASO)
    const nextStep = () => {
        setstep(step + 1);
    };

    //FUNCIÓN QUE DECREMENTA EN UNA UNIDAD PARA MOSTRAR EL PASO ANTERIOR
    const prevStep = () => {
        setstep(step - 1);
    };

    //FUNCIÓN QUE CAMBIA EL VALOR A 2 PARA QUE SE MUESTRE EL FORM DE OPCIONES DE PREGUNTAS
    const volverPasoDos = () => {
        setstep(2);
    };

  
    //PARA QUE MUESTRE FORM SELECCION UNICA
    const seleccionUnica = () => {
        setstep(4);
    };
    //PARA FORM SELECCION MULTIPLE
    const seleccionMultiple = () => {
        setstep(5);
    };

    //PARA FORM MENU DESPLEGABLE
    const menuDesplegable = () => {
        setstep(6);
    };

    //PARA FORM CORREO ELECTRONICO
    const correoElectronico = () => {
        setstep(7);
    };

    //PARA FORM CAJA DE TEXTO ABIERTO
    const cajaTextoAbierto = () => {
        setstep(8);
    };

    //PARA CALIFICACION ESTRELLAS
    const calificacionEstrellas = () => {
        setstep(9);
    };

    //SWITCH PARA MOSTRAR LLAMAR LOS FORMS SEGÚN SEA EL CASO
    switch (step) {
        //AL INICIAR MUESTRA EL PASO UNO
        case 1:
            return (
                <div>
                    <Container style={{width:"450px"}}>
                       
                                <StepOne nextStep={nextStep} />
                           
                    </Container>
                </div>
            );
        case 2:
            return (
                <div >
                    <Container style={{ width: "450px" }}>
                                <StepTwo seleccionUnica={seleccionUnica} seleccionMultiple={seleccionMultiple}
                                    menuDesplegable={menuDesplegable} correoElectronico={correoElectronico} cajaTextoAbierto={cajaTextoAbierto} prevStep={prevStep} calificacionEstrellas={calificacionEstrellas} />
                          
                    </Container>
                </div>
            );
        case 4:
            return (
                <div >
                    <Container style={{ width: "450px" }}>
                       
                                <SeleccionUnica data={data} proceso={proceso} onClickProcesarPregunta={onClickProcesarPregunta} onClickProcesarRespuestasPregunta={onClickProcesarRespuestasPregunta}
                                    volverPasoDos={volverPasoDos}  varIdTipoEncuesta={varIdTipoEncuesta}
                                    varIdTipoMetrica={varIdTipoMetrica} varIdTipoPerspectiva={varIdTipoPerspectiva} varIdTipoContactoEncuesta={varIdTipoContactoEncuesta}
                                    varIdTipoInteraccion={varIdTipoInteraccion} />
                           
                    </Container>
                </div>
            );
        case 5:
            return (
                <div>
                    <Container style={{ width: "450px" }}>
                       
                                <SeleccionMultiple volverPasoDos={volverPasoDos} data={data} proceso={proceso} onClickProcesarPregunta={onClickProcesarPregunta} onClickProcesarRespuestasPregunta={onClickProcesarRespuestasPregunta}
                                    volverPasoDos={volverPasoDos}  varIdTipoEncuesta={varIdTipoEncuesta}
                                    varIdTipoMetrica={varIdTipoMetrica} varIdTipoPerspectiva={varIdTipoPerspectiva} varIdTipoContactoEncuesta={varIdTipoContactoEncuesta}
                                    varIdTipoInteraccion={varIdTipoInteraccion} />
                           
                    </Container>
                </div>
            );
        case 6:
            return (
                <div >
                    <Container style={{ width: "450px" }}>
                        
                                <MenuDesplegable data={data} proceso={proceso} onClickProcesarPregunta={onClickProcesarPregunta} onClickProcesarRespuestasPregunta={onClickProcesarRespuestasPregunta}
                                    volverPasoDos={volverPasoDos} varIdTipoEncuesta={varIdTipoEncuesta}
                                    varIdTipoMetrica={varIdTipoMetrica} varIdTipoPerspectiva={varIdTipoPerspectiva} varIdTipoContactoEncuesta={varIdTipoContactoEncuesta}
                                    varIdTipoInteraccion={varIdTipoInteraccion} />
                            
                    </Container>
                </div>
            );
        case 7:
            return (
                <div >
                    <Container style={{ width: "450px" }}>
                        
                                <CorreoElectronico data={data} proceso={proceso} onClickProcesarPregunta={onClickProcesarPregunta} onClickProcesarRespuestasPregunta={onClickProcesarRespuestasPregunta}
                                    volverPasoDos={volverPasoDos}  varIdTipoEncuesta={varIdTipoEncuesta}
                                    varIdTipoMetrica={varIdTipoMetrica} varIdTipoPerspectiva={varIdTipoPerspectiva} varIdTipoContactoEncuesta={varIdTipoContactoEncuesta}
                                    varIdTipoInteraccion={varIdTipoInteraccion}
                                />
                           
                    </Container>
                </div>
            );
        case 8:
            return (
                <div >
                    <Container style={{ width: "450px" }}>
                 
                                <CajaTextoAbierto data={data} proceso={proceso} onClickProcesarPregunta={onClickProcesarPregunta} onClickProcesarRespuestasPregunta={onClickProcesarRespuestasPregunta}
                                    volverPasoDos={volverPasoDos}  varIdTipoEncuesta={varIdTipoEncuesta}
                                    varIdTipoMetrica={varIdTipoMetrica} varIdTipoPerspectiva={varIdTipoPerspectiva} varIdTipoContactoEncuesta={varIdTipoContactoEncuesta}
                                    varIdTipoInteraccion={varIdTipoInteraccion} />
                          
                    </Container>
                </div>
            );
        case 9:
            return (
                <div >
                    <Container className="contenedorEstrellas" style={{ width: "450px" }}>
                       
                                <CalificacionEstrellas data={data} proceso={proceso} onClickProcesarPregunta={onClickProcesarPregunta} onClickProcesarRespuestasPregunta={onClickProcesarRespuestasPregunta}
                                    volverPasoDos={volverPasoDos}  varIdTipoEncuesta={varIdTipoEncuesta}
                                    varIdTipoMetrica={varIdTipoMetrica} varIdTipoPerspectiva={varIdTipoPerspectiva} varIdTipoContactoEncuesta={varIdTipoContactoEncuesta}
                                    varIdTipoInteraccion={varIdTipoInteraccion} />
                           
                    </Container>
                </div>
            );
        default:
            return (
                <div className="App">
                </div>
            );
    }
}

export default FormularioPasos;
