import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect, InputPhone } from '../components_forms/inputs'
import { ObtenerTiposPersona } from '../../servicios/ServicioSocio';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './css/tel.css'
const Formulario = ({ labelButton, data, proceso, onClickProcesarSocio, mensaje }) => {

    //variables

    const [cedula, setCedula] = useState(proceso == 2 ? data.cedula : '');
    const [nombre, setNombre] = useState(proceso == 2 ? data.nombre : '');
    const [telefono, setTelefono] = useState(proceso == 2 ? data.telefono : '');
    const [correo, setCorreo] = useState(proceso == 2 ? data.correo : '');
    const [idTipoPersona, setIdTipoPersona] = useState(proceso == 2 ? parseInt(data.idTipoPersona) : 1);


    const [listaTiposPersona, setlistaTiposPersona] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        ObtenerListaTiposPersona();
    }, []);

    const ObtenerListaTiposPersona = async () => {
        const sect = await ObtenerTiposPersona();
        if (sect !== undefined) {
            if (proceso === 2) {
                setlistaTiposPersona(sect.sort((x, y) => { return x.idTipoPersona === idTipoPersona ? -1 : y.idTipoPersona === idTipoPersona ? 1 : 0; }));
            }
            else {
                setlistaTiposPersona(sect);
            }
            
            console.log(sect);
        }

    }



    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                Telefono: telefono,
                Nombre: nombre,
                Cedula: cedula,
                Correo:correo,
                IdTipoPersona: parseInt(idTipoPersona) 
            };
            if (proceso === 2) { datos.IdSocio = parseInt(data.idSocio); };
            const result = onClickProcesarSocio(datos); //se ejecuta la función
            console.log(result);
        }
        setValidated(true);
        event.preventDefault();
    }


    //const onChangeIdSector = (event) => {
    //    setidSector(event.target.value);
    //}


    const onChangeIdTipoPersona = (e) => {
        console.log(e.target.value);
        setIdTipoPersona(e.target.value);
    } 
    const onChangeCorreo = (e) => setCorreo(e.target.value);
    const onChangeCedula = (e) => setCedula(e.target.value);
    const onChangeTelefono = (e) => setTelefono(e.target.value);
    const onChangeNombre = (e) => setNombre(e.target.value);
    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Tipo de Persona" data={listaTiposPersona} value={idTipoPersona} onChange={onChangeIdTipoPersona} optionValue="idTipoPersona" optionLabel="tipoPersona"
                    classGroup="form-lineas"></InputSelect>
                <br />
                <InputText id='txt-nombre' label='Nombre del socio:' type='text' placeholder='Ingrese el nombre del socio' value={nombre}
                    onChange={onChangeNombre} mensajeValidacion="El nombre del socio es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <InputText id='txt-cedula' label='Cédula del socio:' type='text' placeholder='Ingrese la cédula del socio' value={cedula}
                    onChange={onChangeCedula} mensajeValidacion="La cédula del socio es requerida" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}


                <InputPhone disabled='true' id='txt-tel' label='Teléfono:' type='tel' placeholder='Ingrese el teléfono del socio' value={telefono}
                    onChange={onChangeTelefono} mensajeValidacion="El teléfono es requerido"/>
                <PhoneInput
                    country={'cr'}
                    value={telefono}
                    onChange={phone => setTelefono(phone)
                    }
                    inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true,
                        defaultErrorMessage: 'Número de teléfono inválido'
                    }} 
                    isValid={(value, country) => {
                        if (value.length < 11) {
                            return 'Número de teléfono inválido';
                        } else if (value.length > 11) {
                            return false;
                        } else {
                            return true;
                        }
                    }}
                />
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <br />

                <InputText id='txt-tel' label='Correo:' type='email' placeholder='Ingrese el correo' value={correo}
                    onChange={onChangeCorreo} mensajeValidacion="El correo es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <div className='text-right'>
                    <Button variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>
        </>
    )
}

export default Formulario



