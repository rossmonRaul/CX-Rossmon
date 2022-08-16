import React from 'react';
import { Button, closeButton, Modal } from 'react-bootstrap';


export const FormularioModal = ({show, handleClose, titulo, className, children, tamano}) => {  

    return(
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName={className}
                aria-labelledby="contained-modal-title-vcenter" centered size={tamano} >
                <Modal.Header closeButton>
                    <Modal.Title className='h5'>{titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}                   
                </Modal.Body>
            </Modal>
        </>
    )
}

export const MensajeModal = ({show, handleClose, titulo, mensaje, handleAceptar}) => {
    return(
        <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} 
                aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title className='h5'>{titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensaje}                    
                    <div className='text-center'>
                        <br/>
                        <Button variant="outline-secondary" 
                            size="sm" onClick={handleClose}>Cancelar</Button>{' '}
                        <Button variant="outline-primary" 
                            size="sm" onClick={() => handleAceptar()}>Aceptar</Button>   
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export const MensajeModalAceptar = ({show, handleClose, titulo, mensaje}) => {
    return(
        <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} 
                aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title className='h5'>{titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensaje}                    
                    <div className='text-center'>
                        <br/>
                        <Button variant="outline-primary" 
                            size="sm" onClick={() => handleClose()}>Aceptar</Button>   
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}