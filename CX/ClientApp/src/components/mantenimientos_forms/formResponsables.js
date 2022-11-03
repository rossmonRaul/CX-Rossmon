import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect, InputPhone } from '../components_forms/inputs'
import { ObtenerDirecciones } from '../../servicios/ServicioDirecciones';
import { ObtenerDatosOrbe } from '../../servicios/ServicioMantenimientoHallazgo';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './css/tel.css'
const Formulario = ({ labelButton, data, proceso, onClickProcesarResponsable, mensaje }) => {

    //variables
    const [idDireccion, setDireccion] = useState(proceso == 2 ? data.idDireccion : '');
    const [nombre, setNombre] = useState(proceso == 2 ? data.nombre : '');
    const [plazo, setPlazo] = useState(proceso == 2 ? data.plazo : '');
    const [fechaInicio, setFechaInicio] = useState(proceso == 2 ? data.fechaInicio : '');
    const [idOrbe, setIdOrbe] = useState(proceso == 2 ? data.idOrbe : '');
    const [avance, setAvance] = useState(proceso == 2 ? data.avance : '');
    const [aceptado, setAceptado] = useState(proceso == 2 ? data.aceptado : '');
    const [idTipoPersona, setIdTipoPersona] = useState(proceso == 2 ? parseInt(data.idTipoPersona) : 1);


    const [listaDirecciones, setlistaDirecciones] = useState([]);
    const [listaOrbe, setlistaOrbe] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        ObtenerListaDirecciones();
        ObtenerListaOrbe();
    }, []);

    const ObtenerListaDirecciones = async () => {
        const sect = await ObtenerDirecciones();
        console.log(sect);
        if (sect !== undefined) {
            if (proceso === 2) {
                setlistaDirecciones(sect.sort((x, y) => { return x.idDireccion === idDireccion ? -1 : y.idDireccion === idDireccion ? 1 : 0; }));//Ordena el array colocando de primero el tipo de persona del actual socio
            }

            else {
                let defecto = {
                    idDireccion: '', direccion: " --- Seleccione una dirección  --- ", codigo: "", ingresadoPor: null, fechaIngreso: null, modificadoPor: null, fechaModificacion: null, estado: null, accion: null
                };//Pone el valor por defecto en seleccionar el tipo de persona

                sect.push(defecto);
                setlistaDirecciones(sect.reverse());
                console.log(sect);
            }

        }

    }
    const ObtenerListaOrbe = async () => {
        const sect = await ObtenerDatosOrbe();
        if (sect !== undefined) {
            if (proceso === 2) {
                setlistaOrbe(sect.sort((x, y) => { return x.idOrbe === idOrbe ? -1 : y.idOrbe === idOrbe ? 1 : 0; }));//Ordena el array colocando de primero el tipo de persona del actual socio
            }
            else {
                let defecto = { idOrbe: '', orbe: " --- Seleccione un oficio  --- " };//Pone el valor por defecto en seleccionar el tipo de persona
                sect.push(defecto);
                setlistaOrbe(sect.reverse());
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
                IdDireccion: idDireccion,
                Nombre: nombre,
                Plazo: plazo,
                fechaInicio: fechaInicio,
                IdOrbe: idOrbe,
                Avance: avance,
                Aceptado: aceptado,
            };
            if (proceso === 2) { datos.IdResponsable = parseInt(data.idResponsable); };
            const result = onClickProcesarResponsable(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }




    const onChangeIdTipoPersona = (e) => {
        setIdTipoPersona(e.target.value);
    } 
    const onChangeOrbe = (e) => setIdOrbe(e.target.value);
    const onChangeNombre = (e) => setNombre(e.target.value);
    const onChangeDireccion = (e) => setDireccion(e.target.value);
    const onChangeAvance = (e) => setAvance(e.target.value);
    const onChangeAceptado = (e) => setAceptado(e.target.value);
    const onChangeFechaInicio = (e) => setFechaInicio(e.target.value);
    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Direccion" data={listaDirecciones} value={idDireccion} onChange={onChangeDireccion} optionValue="idDireccion" optionLabel="direccion"
                    classGroup="form-lineas"></InputSelect>
                <br />

                <InputText id='txt-nombre' label='Nombre del responsable:' type='text' placeholder='Ingrese el nombre del responsable' value={nombre}
                    onChange={onChangeNombre} mensajeValidacion="El nombre del responsable es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}


                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Oficio de Orbe" data={listaOrbe} value={idOrbe} onChange={onChangeOrbe} optionValue="idOrbe" optionLabel="orbe"
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



