import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarCategoria, mensaje }) => {

    //variables

    const [categoria, setcategoria] = useState(proceso == 2 ? data.categoria : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [rango, setrango] = useState(proceso == 2 ? data.rango : ''); //si el proceso es 1 es insertar, si es 2 es actualizar


    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();            
        } else { //si está correcto arma la variable datos
            const datos = {
                Categoria: categoria,
                Rango: rango
            };
            if (proceso === 2) { datos.IdCategoria = data.idCategoria; };

            const result = onClickProcesarCategoria(datos); //se ejecuta la función
            console.log(result);
        }
        setValidated(true);
        event.preventDefault();
    }
    
    const onChangeCategoria = (e) => setcategoria(e.target.value);
    const onChangeRango = (e) => setrango(e.target.value);

    return(
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>     
                <InputText id='txt-categoria' label='Categoría:' type='text' placeholder='Ingrese la categoría' value={categoria} 
                    onChange={onChangeCategoria} mensajeValidacion="La categoría es requerido" />
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <InputText id='txt-rango' label='Rango:' type='text' placeholder='Ingrese el rango de la categoría' value={rango}
                    onChange={onChangeRango} mensajeValidacion="El rango es requerido" />
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>  
            </Form>
             
        </>
    )
}

export default Formulario