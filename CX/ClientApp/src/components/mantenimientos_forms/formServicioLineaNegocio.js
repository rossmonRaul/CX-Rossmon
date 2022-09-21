import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect } from '../components_forms/inputs'
import { ComboBox } from '../components_forms/combobox'
import { ObtenerLineasNegociosActivos } from '../../servicios/ServicioServicioLineaNegocio';



const Formulario = ({ labelButton, data, proceso, onClickProcesarServicioLineaNegocio, mensaje }) => {

    //variables

    const [servicio, setServicio] = useState(proceso == 2 ? data.servicio : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    const [idLinea, setidLinea] = useState(proceso == 2 ? data.idLinea : 1);


    const [listaServicioLineaNegocio, setListaServicioLineaNegocio] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {

        ObtenerListaServicioLineaNegocio();
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

    const onChangeServicio = (e) => setServicio(e.target.value);
    const onChangeIdLinea = (e) => setidLinea(e.target.value);

    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>
                <InputText id='txt-nombre' label='Servicio:' type='text' placeholder='Ingrese el nombre del servicio' value={servicio}
                    onChange={onChangeServicio} mensajeValidacion="El nombre del servicio es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}


                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Linea" data={listaServicioLineaNegocio} value={idLinea} onChange={onChangeIdLinea} optionValue="idLinea" optionLabel="lineaNegocio"
                    classGroup="form-lineas"></InputSelect>


                {/*   */}{/*<ComboBox data={listaServicioLineaNegocio} label="Sector" controlId="sel-idSector" onChange={onChangeIdLinea} value={idLinea} optionValue="idLinea" optionLabel="linea" indicacion="Seleccione la linea" />*/}

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}
                <div className='text-right'>
                    <Button variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>
        </>
    )
}

export default Formulario


