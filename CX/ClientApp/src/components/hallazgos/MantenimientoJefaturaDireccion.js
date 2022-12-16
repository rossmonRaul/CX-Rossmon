import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { Alert } from 'react-bootstrap'
import { ObtenerJefaturasDireccion, EliminarJefaturasDireccion, caragcombo, InsertarJefaturasDireccion, ObtenerJefaturasDireccionPorId,ActualizarJefaturasDireccion } from '../../servicios/ServicioJefaturasDireccion.js'
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formJefaturasDireccion';
import { Table } from '../Table.js';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';


export class MantenimientoJefaturaDireccion extends Component {
    static displayName = MantenimientoJefaturaDireccion.name;

    constructor(props) {
        super(props);
        this.state = {
            listajefaturasdireccion: [],
            cabeceras: [
                "Dirección",
                "Código",
                "Jefatura",
                "Estado",
                "Acciones"
            ],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar categoría",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            combo: []
        };
    }

    async componentDidMount() {
        await this.ObtenerListadoJefaturasDireccion();
        await this.CargaCombo();
        //initialize datatable
        $(document).ready(function () {

            $('#tbl_table').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],

            });
        })
    }

    async ObtenerListadoJefaturasDireccion() {
        const respuesta = await ObtenerJefaturasDireccion();
        this.setState({ listajefaturasdireccion: respuesta });
    }

    async CargaCombo() {
        const respuesta = await caragcombo();
        this.setState({ combo: respuesta });
    }

    onClickInactivarJefatura = async (id) => {
        const respuesta = await EliminarJefaturasDireccion(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaNegocios: await this.ObtenerListadoJefaturasDireccion() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickNuevaJefatura = async () => {
        await this.CargaCombo();
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar nueva jefatura" });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickActualizarJefatura = async (id) => {
        await this.CargaCombo();
        this.setState({ data: await ObtenerJefaturasDireccionPorId(id) })
        console.log(this.state.data)
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Categoría" });
    }

    onClickProcesarJefaturaDireccion = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await InsertarJefaturasDireccion(data);
        else {

            respuesta = await ActualizarJefaturasDireccion(data);
        }
        console.log(respuesta)
        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#tbl_table').DataTable().destroy();

            await this.ObtenerListadoJefaturasDireccion();

            $('#tbl_table').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        } else {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta });
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ alerta: false });
        }
        this.setState({ show: true });
    }

    body = () => {
        return this.state.listajefaturasdireccion.map((item, index) => {
            return <tr key={index}>
                <td> {item.direccion}</td>
                <td>{item.codigoJefatura}</td>
                <td> {item.jefatura}</td>
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarJefatura(item.idJefatura)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarJefatura(item.idJefatura)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>

            </tr>
        })
    }

    render() {
        return (
            <main>
                <div className="row-full">Mantenimiento de jefaturas por dirección </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevaJefatura()}>Insertar jefatura</Button>
                    <hr />
                    <br />

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />

                    <Table tableHeading={this.state.cabeceras} body={this.body()} />

                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarJefatura={this.onClickProcesarJefaturaDireccion} mensaje={this.state.mensajeFormulario} combo={this.state.combo} />
                    </FormularioModal>
                </Container>



            </main>
        );
    }
}