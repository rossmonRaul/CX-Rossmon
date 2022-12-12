import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "../mantenimientos_forms/css/formPasos.css";
import { InputText } from '../components_forms/inputs'
import { TextArea } from '../components_forms/textarea'

const CajaTextoAbierto = ({ data, proceso, onClickProcesarPregunta, volverPasoDos, varIdTipoIndicador,
    varIdTipoEncuesta, varIdTipoMetrica, varIdTipoPerspectiva, varIdTipoContactoEncuesta, varIdTipoInteraccion }) => {

    //PARA LA PREGUNTA A INGRESAR
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
                idTipoPregunta: 5,
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
    //onChange SENCILLO PARA EL TEXT AREA QUE NO REQUIERE FUNCIONALIDAD
    const onChangeTextArea = (e) => { };

    return (
        <div>
            <Card style={{ marginTop: 1 }}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                        <h4>Caja de Texto Abierto</h4>

                        <InputText id='txt-Pregunta' label='Pregunta:' type='text' placeholder='Ingrese la pregunta' value={pregunta}
                            onChange={onChangePreguntas} mensajeValidacion="Este campo es requerido"
                        />

                        <TextArea id="txt-area-respuesta" label="" type="text" placeholder="" value="Mi respuesta Caja de Texto Abierto"
                            text="" onChange={onChangeTextArea} mensajeValidacion="" />

                        <br></br>
                        <br></br>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <Button className="primary" variant="primary" type="submit" size="sm">Guardar</Button>
                            <Button className="btnVolver" variant="secondary" onClick={volverPasoDos}>
                                Atrás
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CajaTextoAbierto;
