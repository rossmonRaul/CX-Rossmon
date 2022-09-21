import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarTipoIndicador, mensaje }) => {

    //variables
    //const [codigo, setCodigo] = useState(proceso == 2 ? data.codigo : '');
    const [tipoIndicador, setTipoIndicador] = useState(proceso == 2 ? data.tipoIndicador : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [sigla, setSigla] = useState(proceso == 2 ? data.sigla : '');
    const [minimo, setMinimo] = useState(proceso == 2 ? data.minimo : 1);
    const [maximo, setMaximo] = useState(proceso == 2 ? data.maximo : '');

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                tipoIndicador: tipoIndicador,
                sigla: sigla,
                minimo: parseInt(minimo),
                maximo: parseInt(maximo),
            };
            if (proceso === 2) { datos.idTipoIndicador = parseInt(data.idTipoIndicador)};

            const result = onClickProcesarTipoIndicador(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }


    const onChangeTipoIndicador = (e) => {setTipoIndicador(e.target.value); } 
    const onChangeSigla = (e) => { setSigla(e.target.value); }
    const onChangeMinimo = (e) => { setMinimo(e.target.value); }
    const onChangeMaximo = (e) => { setMaximo(e.target.value); } 

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='Tipo indicador:' type='text' placeholder='Ingrese la descripción del tipo de Indicador' value={tipoIndicador}
                    onChange={onChangeTipoIndicador} mensajeValidacion="El tipo de Indicador es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <InputText id='txt-siglas' label='Siglas:' type='text' placeholder='Ingrese las siglas del tipo de Indicador' value={sigla}
                    onChange={onChangeSigla} mensajeValidacion="Las siglas del tipo de Indicador es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}



                <InputText id='txt-minimo' label='Valor mínimo:' type='number' placeholder='Ingrese el valor mínimo para medir el indicador' value={minimo}
                    onChange={onChangeMinimo} mensajeValidacion="El valor mínimo del tipo de Indicador es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <InputText id='txt-maximo' label='Valor máximo:' type='number' placeholder='Ingrese el valor máximo para medir el indicador' value={maximo}
                    onChange={onChangeMaximo} mensajeValidacion="El valor máximo del tipo de Indicador es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario