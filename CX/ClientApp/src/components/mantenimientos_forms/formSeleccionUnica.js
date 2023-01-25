import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "../mantenimientos_forms/css/formPasos.css";
import { InputText, InputSelect } from '../components_forms/inputs'
import { ObtenerUltimoIdPreguntas } from '../../servicios/ServicioPreguntasEncuestas';
import { ObtenerTiposIndicadores, ObtenerTipoIndicadorPorId, ObtenerValoresIndicadorPorID } from '../../servicios/ServicioTipoIndicador';
import { InputTabla } from '../components_forms/inputs'
import { Table } from '../Table';
// creating functional component ans getting props from app.js and destucturing them
const SeleccionUnica = ({ data, proceso, onClickProcesarPregunta, onClickProcesarRespuestasPregunta, volverPasoDos,
    varIdTipoEncuesta, varIdTipoMetrica, varIdTipoPerspectiva, varIdTipoContactoEncuesta, varIdTipoInteraccion }) => {

    //PARA EL VALOR DE LA PREGUNTA
    const [pregunta, setPregunta] = useState(proceso == 2 ? data.pregunta : '')

    //Donde se almacenan las respuestas dinamicas
    const [listaRespuesta, setListaRespuesta] = useState([{ respuesta: "" }]);
    const cabeceras2 = ["Valor", "Descripción"];
    //PARA OBTENER VALOR DEL ÚLTIMO ID DE LA TABLA PREGUNTAS Y ASÍ INGRESARLE LAS RESPUESTAS
    const [listaIdUltimaPregunta, setListaIdUltimaPregunta] = useState([]);

    const [idTipoIndicador, setTipoIndicador] = useState(proceso == 2 ? data.idTipoIndicador : '');
    const [listaTipoIndicador, setListaTipoIndicador] = useState([]);
    const [listaValoresIndicador, setListaValoresIndicador] = useState([]);
    useEffect(() => {
        ObtenerListaTipoIndicador();
        ObtenerIdUltimaPregunta()
    }, []);

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
    //FUNCIÓN FLECHA PARA SETEAR EL ÚLTIMO VALOR ID DE LA TABLA PREGUNTAS
    const ObtenerIdUltimaPregunta = async () => {
        const soc = await ObtenerUltimoIdPreguntas();

        setListaIdUltimaPregunta(soc.idPreguntaEncuesta);
    }

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        ObtenerValoresIndicador();
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
                idTipoPregunta: 1, //LA SELECCIÓN ÚNICA ES TIPO DE PREGUNTA #1
                idTipoContactoEncuesta: parseInt(varIdTipoContactoEncuesta),
                idTipoInteraccion: parseInt(varIdTipoInteraccion),
                estado: 1,
            };
            if (proceso === 2) { datos.idPreguntaEncuesta = data.idPreguntaEncuesta; };

            const result = onClickProcesarPregunta(datos); //se ejecuta la función

            setValidated(true);
            event.preventDefault();
        }


    }
    const ObtenerValoresIndicador = async () => {
        const respuesta = await ObtenerValoresIndicadorPorID(idTipoIndicador);
        setListaValoresIndicador(respuesta);
     }

    const onClickAceptarR = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else {

            //ALMACENAR LOS VALORES DE LAS RESPUESTAS
            let respuestas = listaRespuesta.map(function (entry) {
                return entry.respuesta;
            });

            const datos2 = {
                IdPreguntaEncuesta: listaIdUltimaPregunta + 1,

                //INGRESAR LOS VALORES
                Respuestas: respuestas
            };

            if (proceso === 2) { datos2.idPreguntaEncuesta = data.idPreguntaEncuesta; };

            const result2 = onClickProcesarRespuestasPregunta(datos2);


            setValidated(true);
            event.preventDefault();
        }
    }

    //FUNCIÓN FLECHA PARA PARA QUE UNA VEZ SE AGREGUE LA PREGUNTA, MOSTRAR FORM PARA AGREGAR SUS OPCIONES
    const mostrarFormOpciones = () => {
        var formOpciones = document.getElementById('formOpciones');
        formOpciones.style.display = 'block';
        var formPregunta = document.getElementById('formPregunta');
        formPregunta.style.display = 'none';
    }

    const onChangePreguntas = (e) => setPregunta(e.target.value);
    const onChangeTipoIndicador = (e) => setTipoIndicador(e.target.value);

    const valores = () => {

        return listaValoresIndicador.map((item, index) => (
            <tr key={index}>
                <td>{item.valor}</td>
                <td>
                    <InputTabla id='txt-descripcion' type='text' placeholder='Descripcion' value={item.clasificacion} mensajeValidacion="" />
                </td>
            </tr>
        ))
    }
    return (
        <div>
            <div id="formPregunta">
                <Card style={{ marginTop: 1 }}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={onClickAceptar} >

                            <h4>Selección Única</h4>
                            <br></br>

                            <InputSelect className="slct_socios" controlId="slct_socios" label="Tipo Indicador" data={listaTipoIndicador} value={idTipoIndicador}
                                onChange={onChangeTipoIndicador} optionValue="idTipoIndicador" optionLabel="tipoIndicador"
                                classGroup="form-lineas">
                            </InputSelect>
                            <br></br>
                        <InputText id='txt-Pregunta' label='Pregunta:' type='text' placeholder='Ingrese la pregunta' value={pregunta}
                            onChange={onChangePreguntas} mensajeValidacion="Este campo es requerido"
                        />
                            <br></br>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>

                    <Button onClick={mostrarFormOpciones} variant="primary" type="submit">Siguiente</Button>  <Button variant="secondary" onClick={volverPasoDos}>
                        Atras
                    </Button> 
                        </div>

                    </Form>
                </Card.Body>
                </Card>
            </div>


            <div style={{ display: "none", overflowY: "auto", height: "498px" }} id="formOpciones">
                    <h4>Opciones</h4>
                    <Table tableHeading={cabeceras2} body={valores()} />
            </div>

        </div>
    );
};

export default SeleccionUnica;