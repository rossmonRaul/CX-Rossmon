﻿import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { InputText } from '../components_forms/inputs';

const CorreoElectronico = ({ data, proceso, onClickProcesarPregunta, volverPasoDos,
    varIdTipoEncuesta, varIdTipoMetrica, varIdTipoPerspectiva, varIdTipoContactoEncuesta, varIdTipoInteraccion, varIdFaseCJ }) => {

    //PARA EL VALOR DE LA PREGUNTA
    const [pregunta, setPregunta] = useState("Ingrese su correo electrónico"); //si el proceso es 1 es insertar, si es 2 es actualizar
    //NO REQUIERE VALOR DE LA RESPUESTA, ES PARA QUE FUNCIONE EL onChange
    const [respuesta, setRespuesta] = useState(proceso == 2 ? data.respuesta : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

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
                idTipoIndicador: null,
                idTipoPregunta: 3,
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


    //POR PASARLE UN onChange AL INPUT DONDE IRÍA LA RESPUESTA
    const onChangeRespuesta = (e) => setRespuesta(e.target.value);

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <Card style={{ marginTop: 1, textAlign: "left" }}>
                    <Card.Body>

                        <h4>Correo Electrónico</h4>

                        <br></br>
                        {/*<label>{MiId }</label>*/}
                        <InputText id='txt-Pregunta' label='Pregunta:' type='text' placeholder='Ingrese la pregunta' value={pregunta}
                             mensajeValidacion="Este campo es requerido" enabled={false}
                        />


                        <InputText id='txt-Pregunta' label='' type='text' placeholder='' value={'mi_correo55@gmail.com'}
                            onChange={onChangeRespuesta} mensajeValidacion="Este campo es requerido"
                        />

                        <br></br>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <Button className="primary" variant="primary" type="submit">Guardar</Button>

                            <Button style={{backgroundColor: "#6c757d" }} variant="secondary" onClick={volverPasoDos}>
                                Atrás
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>

        </>
    );
};
export default CorreoElectronico;
