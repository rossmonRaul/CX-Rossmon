import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'
import { ComboBox} from '../components_forms/combobox'

const Formulario = ({ labelButton, data, proceso, onClickProcesarJefatura, mensaje,combo }) => {

    //variables

    const [jefatura, setjefatura] = useState(proceso == 2 ? data.jefatura : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [codigo, setcodigo] = useState(proceso == 2 ? data.codigoJefatura : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [combobox, setcombo] = useState(proceso == 2 ? data.idDireccion:1);

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async(event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();            
        } else { //si está correcto arma la variable datos
            const datos = {
                IdDireccion: parseInt(combobox),
                Codigo: codigo,
                Jefatura:jefatura
            };
            console.log(datos)
            if (proceso === 2) { datos.IdJefatura = data.idJefatura; };

            const result = onClickProcesarJefatura(datos); //se ejecuta la función
            console.log(result);
        }
        setValidated(true);
        event.preventDefault();
    }
    
    const onChangejefatura = (e) => setjefatura(e.target.value);
    const onChangeCodigo = (e) => setcodigo(e.target.value);
    const onChangeCombo = (e) => setcombo(e.target.value);

    return(
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>     
                <InputText id='txt-jefatura' label='Nombre Jefatura:' type='text' placeholder='Ingrese el nombre de la jefatura' value={jefatura} 
                    onChange={onChangejefatura} mensajeValidacion="La jefatura es requerido" />
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <InputText id='txt-codigo' label='Código:' type='text' placeholder='Ingrese el código de la jefatura' value={codigo}
                    onChange={onChangeCodigo} mensajeValidacion="El codigo es requerido" />
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <InputSelect className="slct_direcciones" controlId="slct_direcciones" label="Dirección" data={combo} value={combobox} onChange={onChangeCombo} optionValue="idDireccion" optionLabel="direccion" classGroup="form-combo"></InputSelect>
                <br></br>
                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>  
            </Form>
             
        </>
    )
}

export default Formulario