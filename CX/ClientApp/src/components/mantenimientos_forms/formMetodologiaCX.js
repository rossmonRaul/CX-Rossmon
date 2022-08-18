import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarMetodologiaCX, mensaje }) => {

    //variables
    const [metodologia, setMetodologia] = useState(proceso == 2 ? data.metodologia : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                metodologia: metodologia,
            };
            if (proceso === 2) { datos.idMetodologia = data.idMetodologia; };

            const result = onClickProcesarMetodologiaCX(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }

    
    const onChangeMetodologia = (e) => setMetodologia(e.target.value);


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
              

                <InputText id='txt-nombre' label='Metodología:' type='text' placeholder='Ingrese el nombre de la metodología' value={metodologia}
                    onChange={onChangeMetodologia} mensajeValidacion="La metodología es requerida" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario