import { Form } from 'react-bootstrap';
import React from 'react';


export const ComboBox = ({ data, indicacion, label, id, text,value, onChange, mensajeValidacion }) => {


    return (
        <>
         <Form.Group className="mb-3" controlId={id}>
                <Form.Label>{label}</Form.Label>
                <br/>
                <Form.Control as="select" value={value} onChange={onChange}  size="sm"  required >
                    <option value="">{indicacion}</option>
                    {
                        data.map(item => (
                            <option value={item.idPlanta} key={item.idPlanta} > {item.idPlanta}{" - "}{item.nombrePlanta} </option>
                        ))
                } 
             </Form.Control>
                <Form.Text className="text-muted">{text}</Form.Text>
                 <Form.Control.Feedback type="invalid">{mensajeValidacion}</Form.Control.Feedback>
            </Form.Group>      
        </>
    );
}