import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'
import { ComboBox } from '../components_forms/combobox'
import { ObtenerLineasNegociosActivos, ObtenerServicioLineaNegocio } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerSocios } from '../../servicios/ServicioSocio';



const Formulario = ({ labelButton, data, proceso, onClickProcesarServiciosSocios, mensaje }) => {

    //variables

    const [idServicio, setServicio] = useState(proceso == 2 ? data.idServicio : ''); //si el proceso es 1 es insertar, si es 2 es actualizar
    const [idLinea, setidLinea] = useState(proceso == 2 ? data.idLinea : '');
    const [idSocio, setSocio] = useState(proceso == 2 ? data.idSocio : '');

    const [listaServicioLineaNegocio, setListaServicioLineaNegocio] = useState([]);
    const [listaSocio, setListaSocio] = useState([]);
    const [listaServicio, setListaServicio] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);
    
    useEffect(() => {

        ObtenerListaServicioLineaNegocio();
        ObtenerListaServicio();
        ObtenerListaSocio();
    }, []);
    
    const ObtenerListaServicioLineaNegocio = async () => {
        const sect = await ObtenerLineasNegociosActivos();
        if (sect !== undefined) {
            
            if (proceso === 2) {
                //acomoda la linea de negocio como por "defecto" del combo-box(aparece la linea a la cual este asociado el socio)
                setListaServicioLineaNegocio(sect.sort((x, y) => { return x.idLinea === idLinea ? -1 : y.idLinea === idLinea ? 1 : 0; }));
            } else {
                //Para evitar campos vacios y ayudarle de guia al usuario
                let defecto = { idLinea: '', lineaNegocio: "-- Seleccione una linea de negocio --" };
                sect.push(defecto);
                setListaServicioLineaNegocio(sect.reverse());
            }  
        }
    }

    const ObtenerListaServicio= async () => {
        const serv = await ObtenerServicioLineaNegocio();
        if (serv !== undefined) {
            if (proceso === 2) {
                setListaServicio(serv.sort((x, y) => { return x.idServicio === idServicio ? -1 : y.idServicio === idServicio ? 1 : 0; }));
            } else {
                let defecto = { idServicio: '', servicio: "-- Seleccione un Servicio --" };
                serv.push(defecto);
                setListaServicio(serv.reverse());
            }
        }
    }

    const ObtenerListaSocio = async () => {
        const soc = await ObtenerSocios();
        if (soc !== undefined) {
            if (proceso === 2) {
                setListaSocio(soc.sort((x, y) => { return parseInt(x.idSocio) === idSocio ? -1 : parseInt(y.idSocio) === idSocio ? 1 : 0; }));
            } else {
                let defecto = { idSocio: '', nombre: "-- Seleccione un Socio --" };
                soc.push(defecto);
                setListaSocio(soc.reverse());
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
                Nombre: parseInt(idSocio),
                LineaNegocio: parseInt(idLinea),
                Servicio: parseInt(idServicio),
                idServicioSocio: data.idServicioSocio
            };
           
            const result = onClickProcesarServiciosSocios(datos); //se ejecuta la función      
        }
        setValidated(true);
        event.preventDefault();
    }

    const onChangeServicio = (e) => setServicio(e.target.value);
    const onChangeIdLinea = (e) => setidLinea(e.target.value);
    const onChangeSocio = (e) => setSocio(e.target.value);                                           

    return (
        
        <Form noValidate validated={validated} onSubmit={onClickAceptar}>

            <InputSelect className="slct_socios" controlId="slct_socios" label="Socio" data={listaSocio} value={idSocio}  
                onChange={onChangeSocio} optionValue="idSocio" optionLabel="nombre"
                classGroup="form-lineas"></InputSelect>
            
            <InputSelect className="slct_servicios" isClearable controlId="slct_servicios" label="Servicio" data={listaServicio} value={idServicio} 
                onChange={onChangeServicio} optionValue="idServicio" optionLabel="servicio"
                classGroup="form-lineas"></InputSelect>

            <InputSelect className="slct_lineas" controlId="slct_lineas" label="Linea" data={listaServicioLineaNegocio} value={idLinea} 
                onChange={onChangeIdLinea} optionValue="idLinea" optionLabel="lineaNegocio"
                classGroup="form-lineas"></InputSelect>
            <br/>
            <div className='text-right'>
                    <Button className="primary" variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>  
    )
}

export default Formulario