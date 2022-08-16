import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarEstadoHallazgo, mensaje }) => {

    //variables

    const [ codigo, setCodigo] = useState(proceso == 2 ? data.codigo : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [estadoHallazgo, setEstadoHallazgo] = useState(proceso == 2 ? data.estadoHallazgo : '');


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
                estadoHallazgo: estadoHallazgo
            };
            if (proceso === 2) { datos.idEstadoHallazgo = data.idEstadoHallazgo; };

            const result = onClickProcesarEstadoHallazgo(datos); //se ejecuta la función
          
        }
        setValidated(true);
        event.preventDefault();
    }
    
    const onChangeEstadoHallazgo = (e) => setEstadoHallazgo(e.target.value);
    const onChangeEstadoHallazgoCodigo = (e) => setCodigo(e.target.value);
    return(
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>                
                <InputText id='txt-nombre' label='Codigo:' type='text' placeholder='Ingrese el código  del estado de Hallazgo' value={codigo}
                    onChange={onChangeEstadoHallazgoCodigo} mensajeValidacion="El código es requerido"/>
                <InputText id='txt-nombre' label='Estado Hallazgo' type='text' placeholder='Ingrese el nombre del estado de Hallazgo' value={estadoHallazgo}
                    onChange={onChangeEstadoHallazgo} mensajeValidacion="El nombre del  estado de Hallazgo es requerido" />
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>  
            </Form>
             
        </>
    )
}

export default Formulario