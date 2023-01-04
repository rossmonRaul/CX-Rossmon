import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarTipoIdentificacion, mensaje }) => {

    //variables
    const [tipoIdentificacion, setTipoIdentificacion] = useState(proceso == 2 ? data.tipoIdentificacion : ''); //si el proceso es 1 es insertar, si es 2 es actualizar


    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                TipoIdentificacion: tipoIdentificacion,
                idTipoIdentificacion: data.idTipoIdentificacion
            };

            const result = onClickProcesarTipoIdentificacion(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }



    const onChangeTipoIdentificacion = (e) => setTipoIdentificacion(e.target.value);


    return (

        <Form noValidate validated={validated} onSubmit={onClickAceptar}>

            <InputText id='txt-nombre' label='Tipo de identificación:' type='text' placeholder='Ingrese el nombre del tipo de identificación' value={tipoIdentificacion}
                onChange={onChangeTipoIdentificacion} mensajeValidacion="El tipo de identificación es requerido" />

            {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
            <div className='text-right'>
                <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
            </div>
        </Form>


    )
}

export default Formulario