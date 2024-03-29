﻿import React, { Component} from 'react';
import { Container, Button } from 'reactstrap';
import { ObtenerMacroActividad, ActualizarMacroActividad, AgregarMacroActividad, ObtenerMacroActividadPorId, InactivarMacroActividad } from '../../servicios/ServicioMacroActividad';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';


//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formMacroActividades';


export class MantenimientoActividades extends Component {
    static displayName = MantenimientoActividades.name;

    constructor(props) {
        super(props);
        this.state = {
            listaActividades: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Macro Actividad",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: [
                "Id",
                "Macro Actividad",
                "Estado",
                "Acciones"
            ],
        };

    }

    async componentDidMount() {
        await this.ObtenerListadoMacroActividad();

        setTimeout(() => {
            $('#tbl_table_mantenimiento').DataTable(
                {
                    "lengthMenu": [[15, 20, 25, -1], [15, 20, 25, "All"]]
                });
        }, 100);
    }


    async ObtenerListadoMacroActividad() {
        const respuesta = await ObtenerMacroActividad();
        this.setState({ listaActividades: respuesta });
    }

    onClickNuevaMacroActividad = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Macro Actividad" });
    }

    onClickInactivarMacroActividad = async (id) => {
        const respuesta = await InactivarMacroActividad(id)
        if (respuesta.indicador === 0) {
            this.setState({ listaActividades: await ObtenerMacroActividad() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarMacroActividad = async (id) => {
        this.setState({ data: await ObtenerMacroActividadPorId(id) })
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Macro Actividad" });
    }

    onClickProcesarMacroActividad = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await AgregarMacroActividad(data);
        else {

            respuesta = await ActualizarMacroActividad(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#tbl_table_mantenimiento').DataTable().destroy();

            await this.ObtenerListadoMacroActividad();

            setTimeout(() => {
                $('#tbl_table_mantenimiento').DataTable(
                    {
                        "lengthMenu": [[15, 20, 25, -1], [15, 20, 25, "All"]]
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
        return this.state.listaActividades.map((item, index) => (
            <tr key={index}>
                <td>{item.idMacro}</td>
                <td>{item.macroActividad}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarMacroActividad(item.idMacro)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarMacroActividad(item.idMacro)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de Macro Actividades</div>
                <Container>
                    <Button className="btn_insert" onClick={() => this.onClickNuevaMacroActividad()}>Insertar Macro Actividad</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarMacroActividad={this.onClickProcesarMacroActividad} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>

                <Container className="cont">
                </Container>
            </main>
        );
    }
}