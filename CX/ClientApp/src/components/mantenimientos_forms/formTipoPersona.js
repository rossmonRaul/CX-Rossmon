import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect, InputPhone } from '../components_forms/inputs'
import { ObtenerTiposPersona } from '../../servicios/ServicioTipoPersona';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './css/tel.css'
const Formulario = ({ labelButton, data, proceso, onClickProcesarTipoPersona, mensaje }) => {

    //variables

    const [tipoPersona, setTipoPersona] = useState(proceso == 2 ? data.tipoPersona : '');

    //validación
    const [validated, setValidated] = useState(false);





    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                TipoPersona: tipoPersona,
            };
            if (proceso === 2) { datos.IdTipoPersona = parseInt(data.idTipoPersona); };
            const result = onClickProcesarTipoPersona(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }





    const onChangeTipoPersona = (e) => setTipoPersona(e.target.value);
    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='Tipo de Persona:' type='text' placeholder='Ingrese el tipo de persona' value={tipoPersona}
                    onChange={onChangeTipoPersona} mensajeValidacion="El tipo de persona es requerido"/>

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}




                <div className='text-right'>
                    <Button variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>
        </>
    )
}

export default Formulario



