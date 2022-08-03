import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarLineaNegocio, mensaje }) => {

    //variables

    const [lineaNegocio, setLineaNegocio] = useState(proceso == 2 ? data.lineaNegocio : ''); //si el proceso es 1 es insertar, si es 2 es actualizar



    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();            
        } else { //si está correcto arma la variable datos
            const datos = {
                lineaNegocio: lineaNegocio
            };
            if (proceso === 2) { datos.idLinea = data.idLinea; };

            const result = onClickProcesarLineaNegocio(datos); //se ejecuta la función
            console.log(result);
        }
        setValidated(true);
        event.preventDefault();
    }
    
    const onChangeLineaNegocio = (e) => setLineaNegocio(e.target.value);

    return(
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>                
                <InputText id='txt-nombre' label='Línea de  Negocio:' type='text' placeholder='Ingrese el nombre de la línea de negocio' value={lineaNegocio} 
                     onChange={onChangeLineaNegocio} mensajeValidacion="El nombre de línea negocio es requerido"/>
              
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>  
            </Form>
             
        </>
    )
}

export default Formulario