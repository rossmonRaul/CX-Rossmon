import React, { Component, useState } from 'react';
import { Container, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerPreguntaRespuestaPorID } from '../../servicios/ServicioFormularioPreguntas';
import { ObtenerPreguntasPorIdEncuesta } from '../../servicios/ServicioPreguntasAsignadas';
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
            preguntas: '',
            arrayDesordenado: [],
            arrayAcomodado: [],
            formularioCargado: false,
        }
    }
    onClickProcesarTextoPregunta = async () => {
        var arrayDeCadenas = await ObtenerPreguntasPorIdEncuesta(this.state.preguntas);
        this.state.arrayDesordenado = [];
        for (var i = 0; i < arrayDeCadenas.length; i++) {
            const respuesta = await ObtenerPreguntaRespuestaPorID(arrayDeCadenas[i].idPreguntaEncuesta);

            if (respuesta.length !== 0) {
                this.state.arrayDesordenado.push(respuesta);
            } 
            
        }
        console.log(this.state.arrayDesordenado);
        await this.acomodarPorPregunta();
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

                    pregunta = this.state.arrayDesordenado[i][j].pregunta;
                    respuestas= this.state.arrayDesordenado[i][j].respuesta;
                    tipoPregunta = this.state.arrayDesordenado[i][j].idTipoPregunta;
                    vectAcomodado.push(pregunta);
                    vectAcomodado.push(tipoPregunta);
                    vectAcomodado.push(respuestas);
                    j++;
                }
                respuestas = this.state.arrayDesordenado[i][j].respuesta;
                vectAcomodado.push(respuestas);
                j++;
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
        
        function SurveyComponent({ data }) {
          
            const survey = new Model();
           
            const page = survey.addNewPage("PersonalDetails");

            var respuestasArray = new Array;
            var tituloPregunta = "";
            var i, j=0;
            var pregunta, respuestas ,tipoPregunta;
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
                        //radiogroup es para seleccion unica
                        page.addNewQuestion("radiogroup", tituloPregunta).choices = respuestasArray;
                        tituloPregunta = "";
                        j = 0;
                    } else if (tipoPregunta == 2) {
                        //checkbox se utiliza para seleccion multiple
                        page.addNewQuestion("checkbox", tituloPregunta).choices = respuestasArray;
                        tituloPregunta = "";
                        j = 0;
                    } else if (tipoPregunta == 4) {
                        //dropdown es un combobox
                        page.addNewQuestion("dropdown", tituloPregunta).choices = respuestasArray;
                        tituloPregunta = "";
                        j = 0;
                    } else if (tipoPregunta == 6) {
                        //rating es la clasificacion de estrellas
                        page.addNewQuestion("rating", tituloPregunta).choices = respuestasArray;
                        tituloPregunta = "";
                        j = 0;
                    } else {
                        //text es para cajas de texto, se va utilizar para caja abierta y correo
                        page.addNewQuestion("text", tituloPregunta).choices = respuestasArray;
                        tituloPregunta = "";
                        j = 0;
                    }

                }
            }
            page.title = "Prueba SurveyJS";

            /* "radiogroup"(seleccion unica), "text"(email, caja de texto),"dropdown(menu desplegable)", seleccion multiple(combo-box-multiple: tagbox) cajas:checkbox, estrellas "rating"
             
             */


            return <Survey model={survey} />;
        } 
        
        const {
            preguntas,
            formularioCargado,
            arrayAcomodado,
        } = this.state;
        return (

            <main>

                <div class="row-full">Form Pregunta </div>
                <div className="wrapper">
                    <div>
                        <h1>Digite los numeros de pregunta</h1>
                        <Input
                            
                            id="exampleText"
                            name="text"
                            type="text"
                            value={preguntas}
                            onChange={this.onChangePreguntas}
                        />
                        <Button onClick={() => this.onClickProcesarTextoPregunta()} style={{ backgroundColor: "#17A797", borderColor: "#17A797" }}>Insertar Preguntas</Button>

                    </div>
                    <br>
                    </br>
                    <div id="prueba">{formularioCargado && <SurveyComponent data={{data: this.state.arrayAcomodado }} />} </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    

                </div>

            </main>

        );
    }

}

