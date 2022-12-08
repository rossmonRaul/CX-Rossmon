import StarRating from '../components_forms/calificacionEstrellas'
import React, { useState } from "react";
import "../mantenimientos_forms/css/formPasos.css";
import { InputText } from '../components_forms/inputs'
import { Form, Button } from "react-bootstrap";

const CalificacionEstrellas = ({ data, proceso, onClickProcesarPregunta, volverPasoDos, varIdTipoIndicador,
    varIdTipoEncuesta, varIdTipoMetrica, varIdTipoPerspectiva, varIdTipoContactoEncuesta, varIdTipoInteraccion }) => {

    //PARA EL VALOR DE LA PREGUNTA
    const [pregunta, setPregunta] = useState(proceso == 2 ? data.pregunta : '')

    //validación
    const [validated, setValidated] = useState(false);

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
                idTipoIndicador: parseInt(varIdTipoIndicador),
                idTipoPregunta: 6,
                idTipoContactoEncuesta: parseInt(varIdTipoContactoEncuesta),
                idTipoInteraccion: parseInt(varIdTipoInteraccion),
                estado: 1,
            };
            if (proceso === 2) { datos.idPreguntaEncuesta = data.idPreguntaEncuesta; };

            const result = onClickProcesarPregunta(datos); //se ejecuta la función

        }
        setValidated(true);
        event.preventDefault();
    }

    const onChangePreguntas = (e) => setPregunta(e.target.value);

    return (
        <div className="App">
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
            <h4>Calificación de Estrellas</h4>

                <br></br>

            <InputText id='txt-Pregunta' label='Pregunta:' type='text' placeholder='Ingrese la pregunta' value={pregunta}
                onChange={onChangePreguntas} mensajeValidacion="Este campo es requerido"
            />

            <StarRating />

                <br></br>

            <div style={{ display: "flex", justifyContent: "space-around" }}>

                <Button className="primary" variant="primary" type="submit" size="sm">Guardar</Button>
                <Button className="btnVolver" variant="secondary" onClick={volverPasoDos}>
                    Atrás
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default CalificacionEstrellas;
