
import React, { useState, Component, useRef } from 'react'
import {Input} from 'reactstrap';

const Formulario = () => {


   

    return (
        <div className="file-uploader">

            <Input
                id="exampleText"
                name="text"
                type="textarea"
                rows="10"
            />
            <br></br>
            <button className="btn btn-primary" >Guardar</button>
        </div>
    )
}

export default Formulario