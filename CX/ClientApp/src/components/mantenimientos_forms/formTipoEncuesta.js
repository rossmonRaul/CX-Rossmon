import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarTipoEncuesta, mensaje }) => {

    //variables
    //const [codigo, setCodigo] = useState(proceso == 2 ? data.codigo : '');
    const [tipoEncuesta, setTipoEncuesta] = useState(proceso == 2 ? data.tipoEncuesta : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                tipoEncuesta: tipoEncuesta,
            };
            if (proceso === 2) { datos.idTipoEncuesta = data.idTipoEncuesta; };

            const result = onClickProcesarTipoEncuesta(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }


    const onChangeTipoEncuesta = (e) => {setTipoEncuesta(e.target.value); } 


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='Tipo Encuesta:' type='text' placeholder='Ingrese el nombre del tipo de Encuesta' value={tipoEncuesta}
                    onChange={onChangeTipoEncuesta} mensajeValidacion="El tipo de Encuesta es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario