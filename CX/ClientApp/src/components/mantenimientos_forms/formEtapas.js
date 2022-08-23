import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'
import { ComboBox } from '../components_forms/combobox'
import { ObtenerTipoTallerActivos } from '../../servicios/ServicioTipoTaller';



const Formulario = ({ labelButton, data, proceso, onClickProcesarEtapasTaller, mensaje }) => {

    //variables

    const [etapaTaller, setEtapaTaller] = useState(proceso == 2 ? data.etapaTaller : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    const [idTipoTaller, setIdTipoTaller] = useState(proceso == 2 ? data.idTipoTaller : 1);


    const [listaTiposTaller, setListaTiposTaller] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        ObtenerListaTalleres();
    }, []);

    const ObtenerListaTalleres = async () => {
        const sect = await ObtenerTipoTallerActivos();
        if (sect !== undefined) {
            setListaTiposTaller(sect);    
            setIdTipoTaller(proceso == 2  ? data.idTipoTaller : sect[0].idTipoTaller );

        }
    }


    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                etapaTaller: etapaTaller,
                idTipoTaller: parseInt(idTipoTaller)
            };

            if (proceso === 2) { datos.idEtapaTaller = data.idEtapaTaller; };

            const result = onClickProcesarEtapasTaller(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }

    const onChangeEtapaTaller = (e) => setEtapaTaller(e.target.value);
    const onChangeIdTipoTaller = (e) => setIdTipoTaller(e.target.value);

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
                <InputText id='txt-nombre' label='Etapa de tipo de taller:' type='text' placeholder='Ingrese el nombre de la etapa de taller' value={etapaTaller}
                    onChange={onChangeEtapaTaller} mensajeValidacion="El nombre de la etapa de taller es requerida" />

                <InputSelect className="slct_sectores" controlId="slct_sectores" label="Tipos de taller" data={listaTiposTaller} value={idTipoTaller} onChange={onChangeIdTipoTaller} optionValue="idTipoTaller" optionLabel="tipoTaller"
                    classGroup="form-sectores"></InputSelect>


                {/*  <ComboBox data={listaSectores} label="Sector" controlId="sel-idSector" onChange={onChangeIdSector} value={idSector} optionValue="idSector" optionLabel="sector" indicacion="Seleccione el sector" />*/}
                <br/>
                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <br />
                <div className='text-right'>
                    <Button variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>
        </>
    )
}

export default Formulario



