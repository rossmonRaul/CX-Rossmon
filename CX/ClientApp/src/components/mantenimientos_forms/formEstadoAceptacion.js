import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarEstadoAceptacion, mensaje }) => {

    //variables

    const [ codigo, setCodigo] = useState(proceso == 2 ? data.codigo : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [ estadoAceptacion, setEstadoAceptacion] = useState(proceso == 2 ? data.estadoAceptacion : '');


    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();            
        } else { //si está correcto arma la variable datos
            const datos = {
                codigo:codigo,
                estadoAceptacion: estadoAceptacion
            };
            if (proceso === 2) { datos.idEstadoAceptacion = data.idEstadoAceptacion; };

            const result = onClickProcesarEstadoAceptacion(datos); //se ejecuta la función
          
        }
        setValidated(true);
        event.preventDefault();
    }
    
    const onChangeEstadoAceptacion = (e) => setEstadoAceptacion(e.target.value);
    const onChangeEstadoAceptacionCodigo = (e) => setCodigo(e.target.value);
    return(
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>                
                <InputText id='txt-nombre' label='Codigo:' type='text' placeholder='Ingrese el código  del estado de aceptación' value={codigo} 
                    onChange={onChangeEstadoAceptacionCodigo} mensajeValidacion="El código es requerido"/>
                <InputText id='txt-nombre' label='Estado Aceptación' type='text' placeholder='Ingrese el nombre del estado de aceptación' value={estadoAceptacion}
                    onChange={onChangeEstadoAceptacion} mensajeValidacion="El nombre del estado de aceptación es requerido" />
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>  
            </Form>
             
        </>
    )
}

export default Formulario