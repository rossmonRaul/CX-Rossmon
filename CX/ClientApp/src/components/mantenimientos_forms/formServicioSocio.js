import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'
import { ComboBox } from '../components_forms/combobox'
import { ObtenerLineasNegociosActivos, ObtenerServicioLineaNegocio } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerServicioSocio} from '../../servicios/ServicioServicioSocio';



const Formulario = ({ labelButton, data, proceso, onClickProcesarCanales, mensaje }) => {

    //variables

    const [servicio, setServicio] = useState(proceso == 2 ? data.servicio : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    const [idLinea, setidLinea] = useState(proceso == 2 ? data.idLinea : 1);

    const [socio, setSocio] = useState(proceso == 2 ? data.servicio : '');

    const [listaServicioLineaNegocio, setListaServicioLineaNegocio] = useState([]);

    const [listaSocio, setListaSocio] = useState([]);

    const [listaServicio, setListaServicio] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);
    
    useEffect(() => {

        ObtenerListaServicioLineaNegocio();
        ObtenerListaServicio();
        ObtenerServicioSocio();
    }, []);
    
    const ObtenerListaServicioLineaNegocio = async () => {
        const sect = await ObtenerLineasNegociosActivos();
        if (sect !== undefined) {
            setListaServicioLineaNegocio(sect);

        }
    }
    const ObtenerListaServicio= async () => {
        const serv = await ObtenerServicioLineaNegocio();
        if (serv !== undefined) {
            setListaServicio(serv);

        }
    }
    const ObtenerListaSocio = async () => {
        const soc = await ObtenerServicioSocio();
        if (soc !== undefined) {
            setListaSocio(soc.nombre);

        }
    }

    /*
    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                Servicio: servicio,
                IdLinea: parseInt(idLinea)
            };

            if (proceso === 2) { datos.IdServicio = data.idServicio; };

            const result = onClickProcesarServicioLineaNegocio(datos); //se ejecuta la función
            console.log(result);
        }
        setValidated(true);
        event.preventDefault();
    }

    //const onChangeIdSector = (event) => {
    //    setidSector(event.target.value);
    //}
    */
    const onChangeServicio = (e) => setServicio(e.target.value);
    const onChangeIdLinea = (e) => setidLinea(e.target.value);
    const onChangeSocio = (e) => setSocio(e.target.value);
                                                //onSubmit={onClickAceptar}

    return (
        
            <Form noValidate validated={validated} >
            
            <InputSelect className="slct_servicios" controlId="slct_servicios" label="Servicio" data={listaServicio} value={servicio}
                onChange={onChangeServicio} optionValue="servicio" optionLabel="servicio"
                classGroup="form-lineas"></InputSelect>

            {/*   */}{/*<ComboBox data={listaServicioLineaNegocio} label="Sector" controlId="sel-idSector" onChange={onChangeIdLinea} value={idLinea} optionValue="idLinea" optionLabel="linea" indicacion="Seleccione la linea" />*/}


                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Linea" data={listaServicioLineaNegocio} value={idLinea}
                onChange={onChangeIdLinea} optionValue="idLinea" optionLabel="lineaNegocio"
                classGroup="form-lineas"></InputSelect>

            {/*   */}{/*<ComboBox data={listaServicioLineaNegocio} label="Sector" controlId="sel-idSector" onChange={onChangeIdLinea} value={idLinea} optionValue="idLinea" optionLabel="linea" indicacion="Seleccione la linea" />*/}

            <InputSelect className="slct_socios" controlId="slct_socios" label="Socio" data={listaSocio} value={socio}
                onChange={onChangeSocio} optionValue="socio" optionLabel="socio"
                classGroup="form-lineas"></InputSelect>

            {/*   */}{/*<ComboBox data={listaSocio} label="Sector" controlId="sel-idSector" onChange={onChangeSocio} value={idLinea} optionValue="idLinea" optionLabel="linea" indicacion="Seleccione la linea" />*/}
            
            <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>

        
    )
}

export default Formulario