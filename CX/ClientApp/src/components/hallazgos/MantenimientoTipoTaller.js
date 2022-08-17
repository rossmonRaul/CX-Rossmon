import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerTipoTaller, ActualizarTipoTaller, AgregarTipoTaller, ObtenerTipoTallerPorId, InactivarTipoTaller } from '../../servicios/ServicioTipoTaller';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formTipoTaller';

export class MantenimientoTipoTaller extends Component {
    static displayName = MantenimientoTipoTaller.name;

    constructor(props) {
        super(props);
        this.state = {
            listaTalleres: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Tipo de Taller",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
             cabeceras: [
                "Id",
                "Tipo de Taller",
                "Estado",
                "Acciones"
            ],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoTipoTaller();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoTipoTaller() {
        const respuesta = await ObtenerTipoTaller();
        this.setState({ listaTalleres: respuesta });
    }

    onClickNuevoTipoTaller= async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Tipo de Taller" });
    }

    onClickInactivarTipoTaller = async (id) => {
        const respuesta = await InactivarTipoTaller(id)
        if (respuesta.indicador === 0) {
            this.setState({ listaTalleres   : await ObtenerTipoTaller() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarTipoTaller= async (id) => {
        this.setState({ data: await ObtenerTipoTallerPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Tipo de Taller" });
    }

    onClickProcesarTipoTaller= async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarTipoTaller(data);
        else {

            respuesta = await ActualizarTipoTaller(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#example').DataTable().destroy();

            await this.ObtenerListadoTipoTaller();

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
        return this.state.listaTalleres.map((item, index) => (
            <tr key={index}>
                <td>{item.idTipoTaller}</td>
                <td>{item.tipoTaller}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarTipoTaller(item.idTipoTaller)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarTipoTaller(item.idTipoTaller)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Tipo de Taller</div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoTipoTaller()}>Insertar Tipo de Taller</Button>
                    <hr />
                    <br />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />


                    <Table tableHeading={this.state.cabeceras} body={this.body()} />


                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarTipoTaller={this.onClickProcesarTipoTaller} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>

                <br />
                <br />
                <br />
            </main>
        );
    }
}