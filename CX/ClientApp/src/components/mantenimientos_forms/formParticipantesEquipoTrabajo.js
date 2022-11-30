import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect, InputPhone } from '../components_forms/inputs'
import { ObtenerDirecciones } from '../../servicios/ServicioDirecciones';
import { ObtenerDatosOrbe } from '../../servicios/ServicioMantenimientoHallazgo';
import { ObtenerFasesCJ } from '../../servicios/ServicioFasesCJ';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './css/tel.css'
const Formulario = ({ labelButton, data, proceso, onClickProcesarParticipante, mensaje }) => {

    //variables
    const [idDireccion, setDireccion] = useState(proceso == 2 ? data.idDireccion : '');
    const [nombre, setNombre] = useState(proceso == 2 ? data.nombreParticipante : '');
    const [idFaseCJ, setIdFaseCJ] = useState(proceso == 2 ? data.idFaseCJ : '');
    const [asistencia, setAsistencia] = useState(proceso == 2 ? data.asistencia : '');
    const [listaDirecciones, setlistaDirecciones] = useState([]);
    const [listaFasesCJ, setlistaFasesCJ] = useState([]);
    const [opciones, setOpciones] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        ObtenerListaDirecciones();
        ObtenerAsistencia();
        ObtenerListaFasesCJ();
    }, []);

    const ObtenerListaDirecciones = async () => {
        console.log(data);
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
    const ObtenerListaFasesCJ = async () => {
        const sect = await ObtenerFasesCJ();
        console.log(sect);
        if (sect !== undefined) {
            if (proceso === 2) {
                setlistaFasesCJ(sect.sort((x, y) => { return x.idFaseCJ === idFaseCJ ? -1 : y.idFaseCJ === idFaseCJ ? 1 : 0; }));//Ordena el array colocando de primero el tipo de persona del actual socio
            }
            else {
                let defecto = { idFaseCJ: '', faseCustomerJourney: " --- Seleccione una fase customer journey  --- " };//Pone el valor por defecto en seleccionar el tipo de persona
                sect.push(defecto);
                setlistaFasesCJ(sect.reverse());
            }

        }

    }

    const ObtenerAsistencia = async () => {
        const sect = [];
        let opcionSi = { valor: 1, opcion: "Si" };
        let opcionNo = { valor: 0, opcion: "No" };
        sect.push(opcionSi);
        sect.push(opcionNo);

        if (proceso == 1) {
            let defecto = { valor: '', opcion: " --- Seleccione un estado de aceptado  --- " };
            sect.push(defecto);
            setOpciones(sect.reverse());
        }
        //Pone el valor por defecto en seleccionar el tipo de persona

        

        if (proceso === 2) {
            setOpciones(sect.sort((x, y) => { return x.valor === asistencia ? -1 : y.valor === asistencia ? 1 : 0; }));//Ordena el array colocando de primero el tipo de persona del actual socio
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
            NombreParticipante: nombre,
            IdFaseCJ: parseInt(idFaseCJ),
            Asistencia: parseInt(asistencia),
        };
        if (proceso === 2) { datos.IdParticipante = parseInt(data.idParticipante); };
        const result = onClickProcesarParticipante(datos); //se ejecuta la función
    }
    setValidated(true);
    event.preventDefault();
}
const onChangeIdFaseCJ = (e) => setIdFaseCJ(e.target.value);
const onChangeNombre = (e) => setNombre(e.target.value);
const onChangeDireccion = (e) => setDireccion(e.target.value);
const onChangeAsistencia = (e) => setAsistencia(e.target.value);



return (
    <>
        <Form noValidate validated={validated} onSubmit={onClickAceptar}>



            <InputText id='txt-nombre' label='Nombre del responsable' type='text' placeholder='Ingrese el nombre del responsable' value={nombre}
                onChange={onChangeNombre} mensajeValidacion="El nombre del responsable es requerido" />

            {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

            <InputSelect className="slct_lineas" controlId="slct_lineas" label="Direccion" data={listaDirecciones} value={idDireccion} onChange={onChangeDireccion} optionValue="idDireccion" optionLabel="direccion"
                classGroup="form-lineas"></InputSelect>
            <br />

            <InputSelect className="slct_lineas" controlId="slct_lineas" label="Fase de Customer Journey" data={listaFasesCJ} value={idFaseCJ} onChange={onChangeIdFaseCJ} optionValue="idFaseCJ" optionLabel="faseCustomerJourney"
                classGroup="form-lineas"></InputSelect>
            <br />

            <InputSelect className="slct_lineas" controlId="slct_lineas" label="¿Asistió?" data={opciones} value={asistencia} onChange={onChangeAsistencia} optionValue="valor" optionLabel="opcion"
                classGroup="form-lineas"></InputSelect>
            <br />


            {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
            <div className='text-right'>
                <Button variant="primary" type="submit" size="sm">Guardar participante</Button>
            </div>
        </Form>
    </>
)
}

export default Formulario



