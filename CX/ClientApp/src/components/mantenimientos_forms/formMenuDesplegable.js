import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import "../mantenimientos_forms/css/formPasos.css";
import { InputText } from '../components_forms/inputs'
import { ObtenerUltimoIdPreguntas } from '../../servicios/ServicioPreguntasEncuestas';
import { EliminarRespuestas } from '../../servicios/ServicioRespuestasPreguntaEncuesta';

                                                                                                    //MENÚ DE OPCIONES
const MenuDesplegable = ({ data, proceso, onClickProcesarPregunta, onClickProcesarRespuestasPregunta, volverPasoDos, varIdTipoIndicador,
    varIdTipoEncuesta, varIdTipoMetrica, varIdTipoPerspectiva, varIdTipoContactoEncuesta, varIdTipoInteraccion }) => {

    //PARA EL VALOR DE LA PREGUNTA
    const [pregunta, setPregunta] = useState(proceso == 2 ? data.pregunta : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //RESPUESTAS PARA EL DROP-DOWN LIST
    const [respuestaDdl, setRespuestaDdl] = useState(proceso == 2 ? data.respuesta : ''); //si el proceso es 1 es insertar, si es 2 es actualizar

    //PARA OBTENER VALOR DEL ÚLTIMO ID DE LA TABLA PREGUNTAS Y ASÍ INGRESARLE LAS RESPUESTAS
    const [listaIdUltimaPregunta, setListaIdUltimaPregunta] = useState([]);

    useEffect(() => {

        ObtenerIdUltimaPregunta()
    }, []);

    //FUNCIÓN FLECHA PARA SETEAR EL ÚLTIMO VALOR ID DE LA TABLA PREGUNTAS
    const ObtenerIdUltimaPregunta = async () => {
        const valorId = await ObtenerUltimoIdPreguntas();
        setListaIdUltimaPregunta(valorId.idPreguntaEncuesta);
    }

    //validación
    const [validated, setValidated] = useState(false);

    const onClickAceptar = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const datos = {
                idPreguntaEncuesta: data.idPreguntaEncuesta,
                Pregunta: pregunta,
                idTipoEncuesta: parseInt(varIdTipoEncuesta),
                idTipoMetrica: parseInt(varIdTipoMetrica),
                idTipoPerspectiva: parseInt(varIdTipoPerspectiva),
                idTipoIndicador: parseInt(varIdTipoIndicador),
                idTipoPregunta: 4,
                idTipoContactoEncuesta: parseInt(varIdTipoContactoEncuesta),
                idTipoInteraccion: parseInt(varIdTipoInteraccion),
                estado: 1,
            };
            if (proceso === 2) { datos.idPreguntaEncuesta = data.idPreguntaEncuesta; };

            const result = onClickProcesarPregunta(datos); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }


    //FUNCIÓN FLECHA PARA EL FORM DE AGREGAR LAS RESPUESTAS
    const onClickAceptarRespuestas = async (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else {
            const datos = {
                IdPreguntaEncuesta: listaIdUltimaPregunta + 1,
                Respuesta: respuestaDdl
            };

            if (proceso === 2) { datos.idPreguntaEncuesta = data.idPreguntaEncuesta; };

            const result2 = onClickProcesarRespuestasPregunta(datos);

            setValidated(true);
            event.preventDefault();
        }
    }

    const onChangePreguntas = (e) => setPregunta(e.target.value);
    //SETEAR RESPUESTA 
    const onChangeRespuestaDDL = (e) => setRespuestaDdl(e.target.value);

    //FUNCIÓN FLECHA PARA AGREGAR NUEVAS OPCIONES AL DROP-DOWN LIST DESDE EL INPUT OPCIONES
    const nuevaOpcion = () => {
        //VARIABLE PARA DROP-DOWN LIST
        var ddl = document.getElementById("ddl");
        var inputOpciones = document.getElementById("inputOpciones").value;
        var option = document.createElement("option");
        option.text = inputOpciones;
        ddl.add(option);
    };

    //FUNCIÓN FLECHA PARA PARA QUE UNA VEZ SE AGREGUE LA PREGUNTA, MOSTRAR FORM PARA AGREGAR SUS OPCIONES
    const mostrarFormOpciones = () => {
        var formOpciones = document.getElementById('formOpciones');
        formOpciones.style.display = 'block';
        var formPregunta = document.getElementById('formPregunta');
        formPregunta.style.display = 'none';
    }

    //FNCIÓN FLECHA DONDE SE LE PASA EL ID DE LA PREGUNTA PREVIAMENTE CREADA PARA LUEGO ELIMINAR LAS DIFERENTES RESPUESTAS
    const eliminarRespuestas = () => {
        EliminarRespuestas(listaIdUltimaPregunta + 1);
        document.getElementById("ddl").innerHTML = "";
    }


    return (
        <div>
            <div id="formPregunta">
                <Card style={{ marginTop: 1 }}>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={onClickAceptar}>
                       


                            <h4>Menú Desplegable</h4>

                            <br></br>

                            <InputText id='txt-Pregunta' label='Pregunta:' type='text' placeholder='Ingrese la pregunta' value={pregunta}
                                  onChange={onChangePreguntas} mensajeValidacion="Este campo es requerido"
                             />

                              <br></br>

                               <div style={{ display: "flex", justifyContent: "space-around" }}>

                                   <Button onClick={mostrarFormOpciones} type="submit" className="primary" variant="primary"  size="sm">Siguiente</Button>
                                <Button className="btnListoVolver" variant="secondary" onClick={volverPasoDos}>
                                    Atras
                                </Button>
                            </div> 
                             
                        
                    </Form>
                </Card.Body>
                </Card>
            </div>

            <Card style={{ marginTop: 1 }}>
                <Card.Body>
                    <div style={{display:"none"}} id="formOpciones">
                    <Form onSubmit={onClickAceptarRespuestas} >

                            <div className="dvPregunta">
                                <h4 className="h4Pregunta" >{pregunta}</h4>
                            </div>


                        <label> Ahora Ingrese las Opciones:</label>

                        <br></br>
                        <br></br>


                        <select className="ddl" name="ddl" id="ddl" multiple>
                            <option value="programar">--Seleccione la Opción--</option>
                        </select>

                        <br></br>
                            <br></br>
                            <br></br>
                           

                         <div style={{ display: "flex", justifyContent: "space-around" }}>

                            <InputText id='inputOpciones' label='' type='text' placeholder='Ingrese la Opción' value={respuestaDdl}
                                onChange={onChangeRespuestaDDL} mensajeValidacion="Este campo es requerido"
                            />

                              
                            </div>

                            <br></br>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>


                                <Button type="submit" color="primary" onClick={nuevaOpcion} style={{ marginRight: "0.5vw" }}>  Ingresar Opción </Button>

                                <Button variant="danger" onClick={eliminarRespuestas} style={{ marginRight: "0.5vw"}}>Eliminar Respuestas </Button>

                            </div>
                            <br></br>
                            <br></br>
                            <div style={{ display: "flex", justifyContent: "center"}}>

                            <Button variant="primary" className="btnListoVolver" onClick={volverPasoDos}> 
                                Listo
                            </Button>
                        </div>

                        <br></br>
                        
                       
                          


                     </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MenuDesplegable;
