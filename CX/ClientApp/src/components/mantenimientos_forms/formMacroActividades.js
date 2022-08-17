import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarMacroActividad, mensaje }) => {

    //variables
   // const [codigo, setCodigo] = useState(proceso == 2 ? data.codigo : '');
    const [macroActividad, setMacroActividad] = useState(proceso == 2 ? data.macroActividad : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                macroActividad: macroActividad,
            };
            if (proceso === 2) { datos.idMacro = data.idMacro; };

            const result = onClickProcesarMacroActividad(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }

    //const onChangeCodigo = (e) => setCodigo(e.target.value);
    const onChangeMacroActividad = (e) => setMacroActividad(e.target.value);


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
             
                <InputText id='txt-nombre' label='Macro actividad:' type='text' placeholder='Ingrese el nombre de la macro actividad' value={macroActividad}
                    onChange={onChangeMacroActividad} mensajeValidacion="La macro actividad es requerida" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario