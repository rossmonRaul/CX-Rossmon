import StarRating from '../components_forms/calificacionEstrellas'
import React, { useState,useEffect } from "react";
import "../mantenimientos_forms/css/formPasos.css";
import { InputText, InputSelect } from '../components_forms/inputs'
import { Form, Button } from "react-bootstrap";
import { ObtenerTiposIndicadores } from '../../servicios/ServicioTipoIndicador';
const CalificacionEstrellas = ({ data, proceso, onClickProcesarPregunta, volverPasoDos,
    varIdTipoEncuesta, varIdTipoMetrica, varIdTipoPerspectiva, varIdTipoContactoEncuesta, varIdTipoInteraccion }) => {

    //PARA EL VALOR DE LA PREGUNTA
    const [pregunta, setPregunta] = useState(proceso === 2 ? data.pregunta : '')

    const [idTipoIndicador, setTipoIndicador] = useState(proceso === 2 ? data.idTipoIndicador : '');
    const [listaTipoIndicador, setListaTipoIndicador] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        ObtenerListaTipoIndicador();
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
    const onChangeTipoIndicador = (e) => setTipoIndicador(e.target.value);
    return (
        <div className="App">
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

            <StarRating />

                <br></br>

            <div style={{ display: "flex", justifyContent: "space-around" }}>

                <Button className="primary" variant="primary" type="submit" >Guardar</Button>
                <Button  variant="secondary" onClick={volverPasoDos}>
                    Atrás
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default CalificacionEstrellas;
