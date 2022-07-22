import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class Reporte extends Component {
    static displayName = Reporte.name;


render() {
    return (
        <main>

            <div class="row-full">Contactos</div>
            <Container>
        
           
            <table className="table table-bordered table" name="table_contacto">
                <thead>
                    <tr className="titulo2">
                        <th>Fecha</th>
                        <th>Consecutivo #</th>
                        <th>Sector</th>
                        <th>Fase servicio</th>
                        <th>Servicio solicitado</th>
                        <th>Categoria cliente</th>
                        <th>Nombre cliente</th>
                        <th>Canal</th>
                        <th>Teléfono</th>
                        <th>Celular</th>
                        <th>Correo</th>
                        <th>Nombre socio</th>
                        <th>Teléfono socio</th>
                        <th>Correo socio</th>
                    </tr>
                </thead>
                <tbody>
                 </tbody>
            </table>

            </Container>
        </main>
    );
    }
}
