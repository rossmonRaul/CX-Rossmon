import React from 'react';
import { Form } from "react-bootstrap"

export const TextArea = ({ id, label, type, placeholder, value, text, onChange, mensajeValidacion, disabled }) => {
    return (
        <>
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{label}</Form.Label>
                <Form.Control type={type} as="textarea" rows={3} placeholder={placeholder} size="sm" value={value} onChange={onChange} required
                    className="textarea-style" disabled={disabled }     />
            <Form.Text className="text-muted">{text}</Form.Text>
            <Form.Control.Feedback type="invalid">{mensajeValidacion}</Form.Control.Feedback>      
            </Form.Group>

            <style type="text/css">
                {`
                    .textarea-style{
                        max-height: 150px;
                    }
                `}
            </style>
       </>
    )
}