import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarCanales, mensaje }) => {

    //variables

    const [canal, setCanal] = useState(proceso == 2 ? data.canal : ''); //si el proceso es 1 es insertar, si es 2 es actualizar



    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();            
        } else { //si está correcto arma la variable datos
            const datos = {
                canal: canal
            };
            if (proceso === 2) { datos.idCanal = data.idCanal; };

            const result = onClickProcesarCanales(datos); //se ejecuta la función
          
        }
        setValidated(true);
        event.preventDefault();
    }
    
    const onChangeCanales = (e) => setCanal(e.target.value);

    return(
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>                
                <InputText id='txt-nombre' label='Canal:' type='text' placeholder='Ingrese el nombre del canal de comunicación' value={canal} 
                     onChange={onChangeCanales} mensajeValidacion="El nombre del canal es requerido"/>
              
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>  
            </Form>
             
        </>
    )
}

export default Formulario