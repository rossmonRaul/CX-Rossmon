import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarFaseServicio, mensaje }) => {

    //variables

    const [faseServicio, setFaseServicio] = useState(proceso == 2 ? data.fase : ''); //si el proceso es 1 es insertar, si es 2 es actualizar



    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();            
        } else { //si está correcto arma la variable datos
            const datos = {
                faseServicio: faseServicio
            };
            if (proceso === 2) { datos.idFase = data.idFase; };

            const result = onClickProcesarFaseServicio(datos); //se ejecuta la función
          
        }
        setValidated(true);
        event.preventDefault();
    }
    
    const onChangeFaseServicio = (e) => setFaseServicio(e.target.value);

    return(
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>                
                <InputText id='txt-nombre' label='Fase de Servicio:' type='text' placeholder='Ingrese el nombre de la fase de servicio' value={faseServicio} 
                     onChange={onChangeFaseServicio} mensajeValidacion="El nombre de la fase de servicio es requerido"/>
              
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>  
            </Form>
             
        </>
    )
}

export default Formulario