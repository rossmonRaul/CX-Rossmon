import React, { Component } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { Alert } from 'react-bootstrap'
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $, { data } from 'jquery';
import { ObtenerCategorias, InsertarCategorias,ActualizarCategoria,ObtenerCategoriasPorId,InactivarCategoria } from '../../servicios/ServicioCategorias.js'
import { Table } from '../Table.js';
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formCategorias';

export class MantenimientoCategoria extends Component {
    static displayName = MantenimientoCategoria.name;

    constructor(props) {
        super(props);
        this.state = {
            listacategorias: [],
            cabeceras: [
                "Código",
                "Categoría",
                "Rango",
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
            alerta: true
        };
    }

    //Inicializar la datatable de jquery
    async componentDidMount() {
        await this.ObtenerListadoCategorias();
        //initialize datatable
        $(document).ready(function () {
            $('#tbl_table').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
            });
        });
    }

    async ObtenerListadoCategorias() {
        const respuesta = await ObtenerCategorias();
        this.setState({ listacategorias: respuesta });
    }

    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }

    onClickNuevaCategoría = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar nueva Categoría" });
    }

    onClickInactivarCategoria = async (id) => {
        const respuesta = await InactivarCategoria(id)
        if (respuesta.indicador === 0) {
            this.setState({ lineaNegocios: await this.ObtenerListadoCategorias() });
            this.setState({ alerta: true });
        } else {
            this.setState({ alerta: false });
        }
        this.setState({ mensajeRespuesta: respuesta });
        this.setState({ show: true });

    }

    onClickActualizarCategoria = async (id) => {
        this.setState({ data: await ObtenerCategoriasPorId(id) })
        console.log(this.state.data)
        this.setState({ proceso: 2 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Actualizar" });
        this.setState({ modalTitulo: "Actualizar Categoría" });
    }


    onClickProcesarCategoria = async (data) => {
        let respuesta = {};

        if (this.state.proceso === 1)
            respuesta = await InsertarCategorias(data);
        else {

            respuesta = await ActualizarCategoria(data);
        }

        if (respuesta.indicador == 0) {
            this.setState({ modal: false });
            this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
            this.setState({ alerta: true });

            $('#tbl_table').DataTable().destroy();

            await this.ObtenerListadoCategorias();

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
        return this.state.listacategorias.map((item, index) => {
            return <tr key={index}>
                <td>{item.idCategoria }</td>
                <td> {item.categoria}</td>
                <td> {item.rango}</td>
                <td style={item.estado === false ? { color: "#dc3545", fontWeight: 700 } : { color: "#198754", fontWeight: 700 }}>
                    {item.estado === true ? "Activo" : "Inactivo"}</td>
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarCategoria(item.idCategoria)} style={{ marginRight: "1vw" }}>Editar
                    </Button>

                    <Button color={item.estado === true ? "danger" : "success"} onClick={() => this.onClickInactivarCategoria(item.idCategoria)}> {item.estado === true ? "Inactivar" : "Activar"}
                    </Button>
                </td>

            </tr>
        })
    }
    render() {
        return (

            <main>

                <div className="row-full">Mantenimiento de Categorias </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevaCategoría()}>Insertar Categoría</Button>
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
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarCategoria={this.onClickProcesarCategoria} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>



                </Container>

            </main>
        );
    }
}