import React, { Component, useState } from 'react';
import { Container, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerPreguntaRespuestaPorID } from '../../servicios/ServicioFormularioPreguntas';
import { ObtenerPreguntasPorIdEncuesta } from '../../servicios/ServicioPreguntasAsignadas';
import { ObtenerTipoIndicadorPorId} from '../../servicios/ServicioTipoIndicador';
import * as ReactDOM from 'react-dom';

//Survey
import { StylesManager, Model } from "survey-core";
import { Survey, PopupSurvey } from 'survey-react-ui';
import "survey-core/defaultV2.min.css";

export class FormularioPreguntas extends Component {
    static displayName = FormularioPreguntas.name;
    constructor(props) {
        super(props);
        this.state = {
            preguntas: props.idEncuesta,
            tituloEncuesta: props.tituloEncuesta,
            arrayDesordenado: [],
            arrayAcomodado: [],
            formularioCargado: false,
            arrayIndicadores: [],
            vectorIdIndicador:[],
        }
    }
    componentDidMount() {
        this.onClickProcesarTextoPregunta();
    }


    async obtenerTextoIndicadores() {
        var tamano = this.state.vectorIdIndicador.length;
        var arrayI = new Array;
        for (var i = 0; i < tamano; i++) {
            const respuesta = await ObtenerTipoIndicadorPorId(this.state.vectorIdIndicador[i]);

            if (respuesta) {
                arrayI.push(respuesta);
            } else {
                arrayI.push(0);
            }
        }
        this.setState({ arrayIndicadores: arrayI });

    }

    onClickProcesarTextoPregunta = async () => {
        var arrayDeCadenas = await ObtenerPreguntasPorIdEncuesta(this.state.preguntas);
        this.state.arrayDesordenado = [];
        for (var i = 0; i < arrayDeCadenas.length; i++) {
            const respuesta = await ObtenerPreguntaRespuestaPorID(arrayDeCadenas[i].idPreguntaEncuesta);
            this.state.vectorIdIndicador.push(arrayDeCadenas[i].idPreguntaEncuesta);

            if (respuesta.length !== 0) {
                this.state.arrayDesordenado.push(respuesta);
            }

        }
        await this.acomodarPorPregunta();
        await this.obtenerTextoIndicadores();
        this.setState({ formularioCargado: !this.state.formularioCargado });
    }



    async acomodarPorPregunta() {
        var pregunta, respuestas,tipoPregunta;//variable para pregunta y respuesta
        var vectAcomodado = new Array;//array necesario para poder crear una matriz en js
        var vectTotal = new Array;
        var i, j = 0;
        var cantArray = this.state.arrayDesordenado.length;
        for (i = 0; i < cantArray; i++) {
            var cantElementos = this.state.arrayDesordenado[i].length;
            do {
                if (j == 0) {

                    

                    if (!this.state.arrayDesordenado[i][j]) {
                        pregunta = this.state.arrayDesordenado[i][j].pregunta;
                        respuestas = 0;
                        tipoPregunta = this.state.arrayDesordenado[i][j].idTipoPregunta;
                        vectAcomodado.push(respuestas);
                        vectAcomodado.push(respuestas);
                        vectAcomodado.push(respuestas);

                        j++;
                    } else {
                        respuestas = this.state.arrayDesordenado[i][j].respuesta;
                        tipoPregunta = this.state.arrayDesordenado[i][j].idTipoPregunta;
                        pregunta = this.state.arrayDesordenado[i][j].pregunta;
                        vectAcomodado.push(pregunta);
                        vectAcomodado.push(tipoPregunta);
                        vectAcomodado.push(respuestas);

                        j++;
                    }
  
                }
                if (!this.state.arrayDesordenado[i][j]) {
                    respuestas = 0;
                    vectAcomodado.push(respuestas);

                    j++;
                } else {
                    respuestas = this.state.arrayDesordenado[i][j].respuesta;
                    vectAcomodado.push(respuestas);

                    j++;
                }
                //respuestas = this.state.arrayDesordenado[i][j].respuesta;
               
            }
            while (j < cantElementos) {
                
                vectTotal.push(vectAcomodado);
                vectAcomodado = [];
                j = 0;
            }
        }
        this.setState({ arrayAcomodado: vectTotal });
 
    }


    onChangePreguntas = (e) => {
        this.setState({ preguntas: e.target.value });
    }


    render() { 

        
         function SurveyComponent   ({ data })  {


            const survey = new Model();
           
            const page = survey.addNewPage("PersonalDetails");

            var respuestasArray = new Array;
            var tituloPregunta = "";
            var i, j=0;
            var pregunta, respuestas , tipoPregunta;
            var cantArray = data.data.length;
            for (i = 0; i < cantArray; i++) {
                var cantElementos = data.data[i].length;
                respuestasArray = [];
                do {
                    if (j == 0) {
                        pregunta = data.data[i][j];
                        tipoPregunta = data.data[i][j + 1];
                        respuestas = data.data[i][j + 2];

                        tituloPregunta = pregunta;
                        respuestasArray.push(respuestas);
                        j++;
                    }
                    respuestas = data.data[i][j+2];
                    respuestasArray.push(respuestas);
                    j++;
                }
                while (j < cantElementos - 2) {

                    

                    if (tipoPregunta == 1) {
                        var arrayChoices = [];
                        const indicador = data.indicadorM[i];


                        for (var z = 0; z < indicador.maximo; z++) {
                            arrayChoices.push(z + 1);
                        }

                        //radiogroup es para seleccion unica
                        var preguntaDinamica = page.addNewQuestion("radiogroup", tituloPregunta);

        
                        preguntaDinamica.choices = arrayChoices;



                        tituloPregunta = "";
                        j = 0;
                    } else if (tipoPregunta == 2) {

                        //checkbox se utiliza para seleccion multiple
                        var preguntaDinamica2 = page.addNewQuestion("checkbox", tituloPregunta).choices = respuestasArray;
                        tituloPregunta = "";
                        j = 0;
                    } else if (tipoPregunta == 4) {
                        //dropdown es un combobox
                        var preguntaDinamica3 = page.addNewQuestion("dropdown", tituloPregunta).choices = respuestasArray;

                        tituloPregunta = "";
                        j = 0;
                    } else if (tipoPregunta == 6) {

                        //varIndicador
                        const indicador = data.indicadorM[i];
                        //rating es la clasificacion de estrellas
                        var preguntaDinamica4 = page.addNewQuestion("rating", tituloPregunta);
                        preguntaDinamica4.maxRateDescription = "Excelente";
                        preguntaDinamica4.minRateDescription = "Malo";
                        preguntaDinamica4.displayMode = "buttons"


                        preguntaDinamica4.rateMax = indicador.maximo;
                        tituloPregunta = "";
                        j = 0;
                    }
                    else if (tipoPregunta == 3){
                        var preguntaDinamica6 = page.addNewQuestion("text", "Ingrese su correo electrónico");
                        preguntaDinamica6.isRequired = true;
                        preguntaDinamica6.requiredErrorText = "El valor no puede estar vacío";
                        j = 0;
                    }
                    else {
                        //text es para cajas de texto, se va utilizar para caja abierta y correo
                        var preguntaDinamica5 = page.addNewQuestion("text", tituloPregunta);
                        preguntaDinamica5.isRequired = true;
                        preguntaDinamica5.requiredErrorText = "El valor no puede estar vacío";
                        tituloPregunta = "";
                        j = 0;
                    }

                }
            }
             page.title = data.titulo;

             survey.onComplete.add((sender, options) => {
                 console.log(JSON.stringify(sender.data, null, 3));
             });

            /* "radiogroup"(seleccion unica), "text"(email, caja de texto),"dropdown(menu desplegable)", seleccion multiple(combo-box-multiple: tagbox) cajas:checkbox, estrellas "rating"
             
             */


            return <Survey model={survey} />;
        } 
        
        const {
            formularioCargado,
        } = this.state;
        return (
            <div id="prueba">{formularioCargado && <SurveyComponent data={{ data: this.state.arrayAcomodado, indicadorM: this.state.arrayIndicadores,titulo: this.state.tituloEncuesta }} />} </div>
        );
    }

}
export default FormularioPreguntas;

