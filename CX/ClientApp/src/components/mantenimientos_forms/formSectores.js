import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarSectores, mensaje }) => {

    //variables

    const [sector, setSector] = useState(proceso == 2 ? data.sector : ''); //si el proceso es 1 es insertar, si es 2 es actualizar



    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                sector: sector
            };
            if (proceso === 2) { datos.idSector = data.idSector; };

            const result = onClickProcesarSectores(datos); //se ejecuta la función
            console.log(result);
        }
        setValidated(true);
        event.preventDefault();
    }

    const onChangeSectores = (e) => setSector(e.target.value);

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
                <InputText id='txt-nombre' label='Sector:' type='text' placeholder='Ingrese el nombre del sector' value={sector}
                    onChange={onChangeSectores} mensajeValidacion="El nombre del sector es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario