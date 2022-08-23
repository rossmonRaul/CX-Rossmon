import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarGradoImpacto, mensaje }) => {

    //variables
    // const [codigo, setCodigo] = useState(proceso == 2 ? data.codigo : '');
    const [gradoImpacto, setGradoImpacto] = useState(proceso == 2 ? data.gradoImpacto : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                gradoImpacto: gradoImpacto,
            };
            if (proceso === 2) { datos.idGradoImpacto = data.idGradoImpacto; };

            const result = onClickProcesarGradoImpacto(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }

    //const onChangeCodigo = (e) => setCodigo(e.target.value);
    const onChangeGradoImpacto = (e) => setGradoImpacto(e.target.value);


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='Grado Impacto:' type='text' placeholder='Ingrese el nombre del grado de impacto' value={gradoImpacto}
                    onChange={onChangeGradoImpacto} mensajeValidacion="El grado impacto es requerida" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario