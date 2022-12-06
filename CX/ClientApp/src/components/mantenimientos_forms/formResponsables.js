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
    const [fechaInicio, setFechaInicio] = useState(proceso == 2 ? data.fechaInicio.substring(0, data.fechaInicio.indexOf('T')) : '');
    const [idOrbe, setIdOrbe] = useState(proceso == 2 ? data.idOrbe : '');
    const [avance, setAvance] = useState(proceso == 2 ? data.avance : '');
    const [aceptado, setAceptado] = useState(proceso == 2 ? data.aceptado : '');


    const [listaDirecciones, setlistaDirecciones] = useState([]);
    const [listaOrbe, setlistaOrbe] = useState([]);
    const [opciones, setOpciones] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        ObtenerListaDirecciones();
        ObtenerListaOrbe();
        ObtenerAceptado();
    }, []);

    const ObtenerListaDirecciones = async () => {
        const sect = await ObtenerDirecciones();

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

    const ObtenerAceptado = async () => {
        const sect = [];
        let opcionSi = { valor: 1, opcion: "Si" };
        let opcionNo = { valor: 0, opcion: "No" };
        let defecto = { valor: '', opcion: " --- Seleccione un estado de aceptado  --- " };//Pone el valor por defecto en seleccionar el tipo de persona
        sect.push(opcionSi);
        sect.push(opcionNo);
        sect.push(defecto);

        if (proceso === 2) {
            setOpciones(sect.sort((x, y) => { return x.valor === aceptado ? -1 : y.valor === aceptado ? 1 : 0; }));//Ordena el array colocando de primero el tipo de persona del actual socio
        } else {
            
            setOpciones(sect.reverse());
        }
       
    }



const onClickAceptar = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) { //valida el form
        event.preventDefault();
        event.stopPropagation();
    } else { //si está correcto arma la variable datos
        const datos = {
            IdDireccion: parseInt(idDireccion),
            Nombre: nombre,
            Plazo: parseInt(plazo),
            fechaInicio: fechaInicio,
            IdOrbe: parseInt(idOrbe),
            Avance: parseInt(avance),
            Aceptado: parseInt(aceptado),
        };
        if (proceso === 2) { datos.IdResponsable = parseInt(data.idResponsable); };
        const result = onClickProcesarResponsable(datos); //se ejecuta la función
    }
    setValidated(true);
    event.preventDefault();
}
const onChangeOrbe = (e) => setIdOrbe(e.target.value);
const onChangeNombre = (e) => setNombre(e.target.value);
const onChangeDireccion = (e) => setDireccion(e.target.value);
const onChangeAvance = (e) => setAvance(e.target.value);
const onChangePlazo = (e) => setPlazo(e.target.value);
const onChangeAceptado = (e) => setAceptado(e.target.value);
const onChangeFechaInicio = (e) => setFechaInicio(e.target.value);



return (
    <>
        <Form noValidate validated={validated} onSubmit={onClickAceptar}>

            <InputSelect className="slct_lineas" controlId="slct_lineas" label="Direccion" data={listaDirecciones} value={idDireccion} onChange={onChangeDireccion} optionValue="idDireccion" optionLabel="direccion"
                classGroup="form-lineas"></InputSelect>
            <br />

            <InputText id='txt-nombre' label='Nombre del responsable' type='text' placeholder='Ingrese el nombre del responsable' value={nombre}
                onChange={onChangeNombre} mensajeValidacion="El nombre del responsable es requerido" />

            {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}


            <InputSelect className="slct_lineas" controlId="slct_lineas" label="Oficio de Orbe" data={listaOrbe} value={idOrbe} onChange={onChangeOrbe} optionValue="idOrbe" optionLabel="orbe"
                classGroup="form-lineas"></InputSelect>
            <br />
            <InputText id='txt-plzo' label='Plazo en días' type='number' placeholder='Ingrese el plazo en días' value={plazo}
                onChange={onChangePlazo} mensajeValidacion="El plazo es requerido" />

            {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

            <InputText id='txt-avance' label='Porcentaje de Avance' type='number' placeholder='Ingrese el porcentaje de avance' value={avance}
                onChange={onChangeAvance} mensajeValidacion="El avance es requerido" />

            {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

            <InputText id='txt-fecha' label='Fecha de Inicio:' type='date' placeholder='Ingrese la fecha de inicio' value={fechaInicio}
                onChange={onChangeFechaInicio} mensajeValidacion="La fecha de inicio es requerida" />

            <InputSelect className="slct_lineas" controlId="slct_lineas" label="¿Aceptado?" data={opciones} value={aceptado} onChange={onChangeAceptado} optionValue="valor" optionLabel="opcion"
                classGroup="form-lineas"></InputSelect>
            <br />


            {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
            <div className='text-right'>
                <Button variant="primary" type="submit" size="sm">Guardar responsable</Button>
            </div>
        </Form>
    </>
)
}

export default Formulario



