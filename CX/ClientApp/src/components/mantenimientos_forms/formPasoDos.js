import React from "react";
import { Form, Button } from "react-bootstrap";
import "../mantenimientos_forms/css/formPasos.css";

//COMPONENTE QUE SIRVE PARA REDIRIGIR AL USUARIO AL FORM SELECCIONADO MEDIANTE LAS OPCIONES DISPONIBLES
const StepTwo = ({ seleccionUnica, seleccionMultiple, menuDesplegable, correoElectronico, cajaTextoAbierto, calificacionEstrellas }) => {

    return (
        <>
            <Form className="main-frm">

                <h6>Opciones</h6>

                <div className="cont-button" style={{ display: "flex", justifyContent: "space-around" }}>
                    
                    <Button onClick={seleccionUnica} className="button" >
                        Seleccionar Una Respuesta
                    </Button>

                    <Button className="button" onClick={seleccionMultiple}>
                        Seleccionar Varias Respuestas
                    </Button>
                </div>
                
                <div className="cont-button" style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button className="button" onClick={menuDesplegable}>
                        Menú Desplegable  
                    </Button>
                    
                    <Button className="button" onClick={correoElectronico} >
                        Correo Electrónico
                    </Button>
                </div>
                
                <div className="cont-button" style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button className="button" onClick={cajaTextoAbierto} >
                        Caja de Texto Abierto
                    </Button>
                    
                    <Button className="button" onClick={calificacionEstrellas}>
                        Calificación de Estrellas
                    </Button>
                </div>

                <br></br>
                
            </Form>
        </>
    );
};

export default StepTwo;
