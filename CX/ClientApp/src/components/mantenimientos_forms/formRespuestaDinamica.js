import React, { useState} from "react";
import { Button, Form } from 'react-bootstrap'

//COMPONENTE QUE CREA NUEVOS INPUTS PARA ALMACENAR LAS RESPUESTAS DE UNA PREGUNTA
const RespuestaDinamica = ({ listaRespuesta, setListaRespuesta, onClickAceptarR, varIdTipoIndicador, volverPasoDos, pregunta }) => {

    const numResp = useState(10);




    //GUARDAR EL VALOR DE LOS INPUTS
    const handleRespuestaChange = (e, index) => {
        const { name, value } = e.target;
        const lista = [...listaRespuesta];
        lista[index][name] = value;
        setListaRespuesta(lista);
    }

    //CREAR NUEVOS INPUTS
    const handleAgregarRespuesta = async () => {

        setListaRespuesta([...listaRespuesta, { respuesta: "" }]);
    }

    //ELIMINAR INPUTS
    const handleEliminarRespuesta = (index) => {
        const lista = [...listaRespuesta];
        lista.splice(index, 1);
        setListaRespuesta(lista);
    }


    return (
        <>
            <Form  onSubmit={onClickAceptarR}>

                <div className="dvPregunta">
                    <h4 className="h4Pregunta" >{pregunta}</h4>
                </div>

                <h7>Ahora ingrese las opciones:</h7>

                <br></br>
                <br></br>

                {listaRespuesta.map((respuestas, index) => (
                    <div key={index} >

                        <div style={{ display: "flex", justifyContent: "space-around" }} >

                            <input type="radio" />
                            <input
                                name="respuesta"
                                placeholder="Ingrese la respuesta"
                                type="text"
                                id="respuesta"
                                value={respuestas.respuesta}
                                onChange={(e) => handleRespuestaChange(e, index)}
                                required
                            />
                        </div>
                        <br></br>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            {listaRespuesta.length - 1 === index && listaRespuesta.length < numResp &&
                            (<Button variant="primary" type={Button} onClick={handleAgregarRespuesta} >
                                Agregar una nueva respuesta
                            </Button>)


                        }
                        {listaRespuesta.length - 1 === index &&
                                (<Button variant="danger" type={Button} disabled={index === 0} onClick={() => handleEliminarRespuesta(index)} >
                                Eliminar respuesta
                            </Button>)

                        }

                            </div>
                    </div>
                ))}

                <br></br>
                <br></br>

                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button className="primary" variant="primary" type="submit" size="sm">Guardar</Button>

                    <Button variant="secondary" variant="secondary" onClick={volverPasoDos}>
                        Menú
                    </Button>
                </div>

                <br></br>


            </Form>

        </>
    )
}

export default RespuestaDinamica