import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarFasesCJ, mensaje }) => {

    //variables
    const [faseCustomerJourney, setFaseCJ] = useState(proceso == 2 ? data.faseCustomerJourney : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                faseCustomerJourney: faseCustomerJourney,
                idFaseCJ: data.idFaseCJ
            };

            const result = onClickProcesarFasesCJ(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }



    const onChangeFasesCJ = (e) => setFaseCJ(e.target.value);


    return (

        <Form noValidate validated={validated} onSubmit={onClickAceptar}>

            <InputText id='txt-nombre' label='Fase de Customer Journey:' type='text' placeholder='Ingrese el nombre del fase de customer journey' value={faseCustomerJourney}
                onChange={onChangeFasesCJ} mensajeValidacion="La fase de customer journey es requerida" />

            {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
            <div className='text-right'>
                <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
            </div>
        </Form>


    )
}

export default Formulario