import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'
import { ComboBox } from '../components_forms/combobox'
import { ObtenerSectoresActivos } from '../../servicios/ServicioSectores';



const Formulario = ({ labelButton, data, proceso, onClickProcesarSegmento, mensaje }) => {

    //variables

    const [segmento, setSegmento] = useState(proceso == 2 ? data.segmento : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    const [idSector, setidSector] = useState(proceso == 2 ? data.idSector : 1);


    const [listaSectores, setListaSectores] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        ObtenerListaSectores();
    }, []);

    const ObtenerListaSectores = async () => {
        const sect = await ObtenerSectoresActivos();
        if (sect !== undefined) {
            setListaSectores(sect);
           
        }
    }



    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                Segmento: segmento,
                IdSector: parseInt(idSector)
            };

            if (proceso === 2) { datos.IdSegmento = data.idSegmento; };

            const result = onClickProcesarSegmento(datos); //se ejecuta la función
            console.log(result);
        }
        setValidated(true);
        event.preventDefault();
    }


    //const onChangeIdSector = (event) => {
    //    setidSector(event.target.value);
    //}

    const onChangeSegmento = (e) => setSegmento(e.target.value);
    const onChangeIdSector = (e) => setidSector(e.target.value);

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
                <InputText id='txt-nombre' label='Segmento:' type='text' placeholder='Ingrese el nombre del segmento' value={segmento}
                    onChange={onChangeSegmento} mensajeValidacion="El nombre del segmento es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}


                <InputSelect className="slct_sectores" controlId="slct_sectores" label="Sector" data={listaSectores} value={idSector} onChange={onChangeIdSector} optionValue="idSector" optionLabel="sector"
                   classGroup="form-sectores"></InputSelect>


               {/* <ComboBox data={listaSectores} label="Sector" controlId="sel-idSector" onChange={onChangeIdSector} value={idSector} optionValue="idSector" optionLabel="sector" indicacion="Seleccione el sector" />*/}

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



