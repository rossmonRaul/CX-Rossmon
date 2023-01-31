import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
export class Reporte extends Component {
    static displayName = Reporte.name;


    render() {
        return (
            <main  >

                <div class="row-full"  >Contactos</div>

                <Container>


                    <table className="table"
                        name="table_contacto">
                        <thead>
                            <tr
                            >
                                <th>Id Cliente</th>
                                <th>Fecha de ingreso</th>
                                <th>Nombre cliente</th>
                                <th>Sector</th>
                                <th>Fase servicio</th>
                                <th>Servicio solicitado</th>
                                <th>Categoria cliente</th>
                                <th>Información de Contacto</th>
                                <th>Información del socio</th>
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
