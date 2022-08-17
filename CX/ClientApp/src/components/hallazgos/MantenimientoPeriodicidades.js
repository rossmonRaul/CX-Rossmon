import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerPeriodicidad, ActualizarPeriodicidad, AgregarPeriodicidad, ObtenerPeriodicidadPorId, InactivarPeriodicidad } from '../../servicios/ServicioPeriodicidad';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import '../../custom.css'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formPeriodicidades';
import { ActualizarMetodologiaCX } from '../../servicios/ServicioMetodologiaCX';

export class MantenimientoPeriodicidades extends Component {
    static displayName = MantenimientoPeriodicidades.name;

    constructor(props) {
        super(props);
        this.state = {
            listaPeriodicidades: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Periodicidad",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: [
                "Id",
                "Periodicidad",
                "Estado",
                "Acciones"
            ],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoPeriodicidad();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoPeriodicidad() {
        const respuesta = await ObtenerPeriodicidad();
        this.setState({ listaPeriodicidades: respuesta });
    }

    onClickNuevaPeriodicidad = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Periodicidad" });
    }

    onClickInactivarPeriodicidad = async (id) => {
        const respuesta = await InactivarPeriodicidad(id)
        if (respuesta.indicador === 0) {
            this.setState({ listaPeriodicidades: await ObtenerPeriodicidad() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarPeriodicidad = async (id) => {
        this.setState({ data: await ObtenerPeriodicidadPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Periodicidad" });
    }

    onClickProcesarPeriodicidad = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarPeriodicidad(data);
        else {

            respuesta = await ActualizarPeriodicidad(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoPeriodicidad();

            setTimeout(() => {
                $('#example').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);
        } else {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }

        this.setState({ show: true });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    body = () => {
        return this.state.listaPeriodicidades.map((item, index) => (
            <tr key={index}>
                <td>{item.idPeriodicidad}</td>
                <td>{item.periodicidad}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarPeriodicidad(item.idPeriodicidad)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarPeriodicidad(item.idPeriodicidad)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Periodicidades</div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevaPeriodicidad()}>Insertar Periodicidad</Button>
                    <hr />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""
                    }

                    <br />
                 
                    <Table tableHeading={this.state.cabeceras} body={this.body()} />

                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarPeriodicidad={this.onClickProcesarPeriodicidad} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>

                <br />
                <br />
                <br />
            </main>
        );
    }
}