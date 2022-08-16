import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarDirecciones, mensaje }) => {

    //variables

    const [direccion, setDireccion] = useState(proceso == 2 ? data.direccion : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [codigo, setCodigo] = useState(proceso == 2 ? data.codigo : ''); //si el proceso es 1 es insertar, si es 2 es actualizar


    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                direccion: direccion,
                codigo: codigo
            };
            if (proceso === 2) { datos.idDireccion = data.idDireccion; };

            const result = onClickProcesarDirecciones(datos); //se ejecuta la función
            console.log(result);
        }
        setValidated(true);
        event.preventDefault();
    }

    const onChangeDireccion = (e) => setDireccion(e.target.value);
    const onChangeCodigo = (e) => setCodigo(e.target.value);

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
                <InputText id='txt-nombre' label='Dirección:' type='text' placeholder='Ingrese la dirección' value={direccion}
                    onChange={onChangeDireccion} mensajeValidacion="La direccion es requerida" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <InputText id='txt-nombre' label='Código:' type='text' placeholder='Ingrese el código' value={codigo}
                    onChange={onChangeCodigo} mensajeValidacion="El código es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario