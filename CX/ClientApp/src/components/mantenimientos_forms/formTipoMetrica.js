import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarTipoMetrica, mensaje }) => {

    //variables
    //const [codigo, setCodigo] = useState(proceso == 2 ? data.codigo : '');
    const [tipo, setTipoMetrica] = useState(proceso == 2 ? data.tipo : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [descripcion, setDescripcion] = useState(proceso == 2 ? data.descripcion : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [listaTipos, setlistaTipos] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        ObtenerListaTipos();

    }, []);


    const ObtenerListaTipos = () => {
        const sect = []
        let cual = { tipo: "Cualitativa", option: "Cualitativa" };
        sect.push(cual);
        let cuant = { tipo: "Cuantitativa", option: "Cuantitativa" };
        sect.push(cuant);

            if (proceso === 2) {
                setlistaTipos(sect.sort((x, y) => { return x.tipo === tipo ? -1 : y.tipo === tipo ? 1 : 0; }));
            }
            else {
                let defecto = { tipo: '', option: " -- Seleccione un tipo de métrica  -- " };//Pone el valor por defecto en seleccionar el tipo de persona
                sect.push(defecto);
                setlistaTipos(sect.reverse());
            }

    }

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                descripcion: descripcion,
                tipo: tipo,
            };
            if (proceso === 2) { datos.idTipoMetrica = parseInt(data.idTipoMetrica); };

            const result = onClickProcesarTipoMetrica(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }



    const onChangeTipoMetrica = (e) => {setTipoMetrica(e.target.value); } 
    const onChangeDescripcion = (e) => {setDescripcion(e.target.value); } 

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='Descripcion de la métrica:' type='text' placeholder='Ingrese la descripción de la Metrica' value={descripcion}
                    onChange={onChangeDescripcion} mensajeValidacion="La descripción de la métrica es requerida" />

                    
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}


                <InputSelect className="slct_tipos" controlId="slct_tipos" label="Tipo de métrica" data={listaTipos} value={tipo} onChange={onChangeTipoMetrica} optionValue="tipo" optionLabel="option"
                    classGroup="form-lineas"></InputSelect>
                <br />

                <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        </>
    )
}

export default Formulario