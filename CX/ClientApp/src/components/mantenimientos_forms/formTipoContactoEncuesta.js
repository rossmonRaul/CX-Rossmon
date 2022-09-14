import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarTipoContactoEncuesta, mensaje }) => {

    //variables
    const [tipoContactoEncuesta, setTipoContactoEncuesta] = useState(proceso == 2 ? data.tipoContactoEncuesta : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                TipoContactoEncuesta: tipoContactoEncuesta,
                idTipoContactoEncuesta: data.idTipoContactoEncuesta
            };

            const result = onClickProcesarTipoContactoEncuesta(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }

  
  
    const onChangeTipoContactoEncuesta = (e) => setTipoContactoEncuesta(e.target.value);


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='Tipo de contacto de encuesta:' type='text' placeholder='Ingrese el nombre del tipo de contacto de encuesta' value={tipoContactoEncuesta}
                    onChange={onChangeTipoContactoEncuesta} mensajeValidacion="El tipo de contacto de encuesta es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario