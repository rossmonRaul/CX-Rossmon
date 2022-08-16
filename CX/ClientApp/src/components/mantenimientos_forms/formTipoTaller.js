﻿import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarTipoTaller, mensaje }) => {

    //variables
    const [codigo, setCodigo] = useState(proceso == 2 ? data.codigo : '');
    const [tipoTaller, setTipoTaller] = useState(proceso == 2 ? data.tipoTaller : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                codigo: codigo,
                tipoTaller: tipoTaller,
            };
            if (proceso === 2) { datos.idTipoTaller = data.idTipoTaller; };

            const result = onClickProcesarTipoTaller(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }

    const onChangeCodigo = (e) => setCodigo(e.target.value);
    const onChangeTipoTaller = (e) => setTipoTaller(e.target.value);


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
                <InputText id='txt-nombre' label='Código:' type='text' placeholder='Ingrese el código de la macro actividad' value={codigo}
                    onChange={onChangeCodigo} mensajeValidacion="El código es requerido" />

                <InputText id='txt-nombre' label='Tipo Taller:' type='text' placeholder='Ingrese el nombre del tipo de taller' value={tipoTaller}
                    onChange={onChangeTipoTaller} mensajeValidacion="El tipo de taller es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario