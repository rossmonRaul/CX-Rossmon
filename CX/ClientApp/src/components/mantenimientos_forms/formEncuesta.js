import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect, InputPhone } from '../components_forms/inputs'
import { ObtenerTiposEncuestas } from '../../servicios/ServicioTipoEncuesta';
import { ObtenerFasesCJ } from '../../servicios/ServicioFasesCJ';
import { ObtenerTipoContactoEncuesta } from '../../servicios/ServicioTipoContactoEncuesta';
import 'react-phone-input-2/lib/style.css'
import './css/tel.css'
const Formulario = ({ labelButton, data, proceso, onClickProcesarEncuesta, mensaje }) => {

    //variables





    const [nombre, setNombre] = useState(proceso == 2 ? data.nombre : '');
    const [descripcion, setDescripcion] = useState(proceso == 2 ? data.descripcion : '');

    const [idTipoEncuesta, setIdTipoEncuesta] = useState(proceso == 2 ? parseInt(data.idTipoEncuesta) : 1);
    const [idFaseCJ, setIdFaseCJ] = useState(proceso == 2 ? parseInt(data.idFaseCJ) : 1);
    const [idTipoContactoEncuesta, setIdTipoContactoEncuesta] = useState(proceso == 2 ? parseInt(data.idTipoContactoEncuesta) : 1);

    const [listaTiposEncuesta, setlistaTiposEncuesta] = useState([]);
    const [listaFasesCJ, setlistaFasesCJ] = useState([]);
    const [listaTiposContactoEncuesta, setlistaTiposContactoEncuesta] = useState([]);


    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        ObtenerListaTiposEncuesta();
        ObtenerListaFasesCJ();
        ObtenerListaTiposContacto();
    }, []);


    const ObtenerListaTiposEncuesta = async () => {
        const sect = await ObtenerTiposEncuestas();

        if (sect !== undefined) {
            if (proceso === 2) {
                setlistaTiposEncuesta(sect.sort((x, y) => { return x.idTipoEncuesta === idTipoEncuesta ? -1 : y.idTipoEncuesta === idTipoEncuesta ? 1 : 0; }));//Ordena el array colocando de primero el tipo de encuesta 
            }
            else {
                let defecto = { idTipoEncuesta: '', tipoEncuesta: " --- Seleccione un tipo de encuesta  --- " };//Pone el valor por defecto en seleccionar el tipo de encuesta
                sect.push(defecto);
                setlistaTiposEncuesta(sect.reverse());
            }

        }

    }

    const ObtenerListaFasesCJ = async () => {
        const sect = await ObtenerFasesCJ();

        if (sect !== undefined) {
            if (proceso === 2) {
                setlistaFasesCJ(sect.sort((x, y) => { return x.idFaseCJ === idFaseCJ ? -1 : y.idFaseCJ === idFaseCJ ? 1 : 0; }));//Ordena el array colocando de primero el tipo de encuesta 
            }
            else {
                let defecto = { idFaseCJ: '', faseCustomerJourney: " --- Seleccione una fase de CJ  --- " };//Pone el valor por defecto en seleccionar el tipo de encuesta
                sect.push(defecto);
                setlistaFasesCJ(sect.reverse());
            }

        }

    }

    const ObtenerListaTiposContacto = async () => {
        const sect = await ObtenerTipoContactoEncuesta();

        if (sect !== undefined) {
            if (proceso === 2) {
                setlistaTiposContactoEncuesta(sect.sort((x, y) => { return x.idTipoContactoEncuesta === idTipoContactoEncuesta ? -1 : y.idTipoContactoEncuesta === idTipoContactoEncuesta ? 1 : 0; }));//Ordena el array colocando de primero el tipo de encuesta 
            }
            else {
                let defecto = { idTipoContactoEncuesta: '', tipoContactoEncuesta: " --- Seleccione un tipo de contacto  --- " };//Pone el valor por defecto en seleccionar el tipo de encuesta
                sect.push(defecto);
                setlistaTiposContactoEncuesta(sect.reverse());
            }

        }

    }


    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                Nombre: nombre,
                Descripcion:descripcion,
                IdTipoEncuesta: parseInt(idTipoEncuesta) ,
                IdFaseCJ: parseInt(idFaseCJ) ,
                IdTipoContactoEncuesta: parseInt(idTipoContactoEncuesta) ,
            };
            if (proceso === 2) { datos.IdEncuesta = parseInt(data.idEncuesta); };
            const result = onClickProcesarEncuesta(datos); //se ejecuta la función
        }   
        setValidated(true);
        event.preventDefault();
    }


    const onChangeNombre = (e) => setNombre(e.target.value);
    const onChangeDescripcion = (e) => setDescripcion(e.target.value);

    const onChangeIdTipoEncuesta = (e) => {
        setIdTipoEncuesta(e.target.value);
    } 

    const onChangeIdFaseCJ = (e) => {
        setIdFaseCJ(e.target.value);
    } 

    const onChangeIdTipoContactoEncuesta = (e) => {
        setIdTipoContactoEncuesta(e.target.value);
    } 
    
    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>




                <InputText id='txt-nombre' label='Nombre de la encuesta:' type='text' placeholder='Ingrese el nombre de la encuesta' value={nombre}
                    onChange={onChangeNombre} mensajeValidacion="El nombre la encuesta es requerido" />


                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <InputText id='txt-descripcion' label='Descripción de la encuesta:' type='text' placeholder='Ingrese la descripción de la encuesta' value={descripcion}
                    onChange={onChangeDescripcion} mensajeValidacion="La descripcion es requerida" />


                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}


                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Tipo de Encuesta" data={listaTiposEncuesta} value={idTipoEncuesta}
                    onChange={onChangeIdTipoEncuesta} optionValue="idTipoEncuesta" optionLabel="tipoEncuesta"
                    classGroup="form-lineas"></InputSelect>
                <br />

                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Fase de Customer Journey" data={listaFasesCJ} value={idFaseCJ}
                    onChange={onChangeIdFaseCJ} optionValue="idFaseCJ" optionLabel="faseCustomerJourney"
                    classGroup="form-lineas"></InputSelect>
                <br />

                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Tipo de Contacto" data={listaTiposContactoEncuesta} value={idTipoContactoEncuesta}
                    onChange={onChangeIdTipoContactoEncuesta} optionValue="idTipoContactoEncuesta" optionLabel="tipoContactoEncuesta"
                    classGroup="form-lineas"></InputSelect>
                <br />

                <div className='text-right'>
                    <Button variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>
        </>
    )
}

export default Formulario



