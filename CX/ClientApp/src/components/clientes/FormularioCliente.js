import React, { Component, useState } from 'react';
import { Container,  Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerLineaNegocio, ObtenerLineaNegocioPorId } from '../../servicios/ServicioLineaNegocio';
import { ObtenerSectores, ObtenerSectorPorId} from '../../servicios/ServicioSectores';
import { ObtenerSegmentos, ObtenerSegmentoPorId } from '../../servicios/ServicioSegmentos';
import { ObtenerFasesCJ, ObtenerFasesCJPorId } from '../../servicios/ServicioFasesCJ';
import { ObtenerServicioLineaNegocio, ObtenerServicioLineaNegocioPorId } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerCanales} from '../../servicios/ServicioCanales';
import { ObtenerCategorias } from '../../servicios/ServicioCategorias';
import { ObtenerSocios, ObtenerSocioPorId } from '../../servicios/ServicioSocio';
import { AgregarCliente, ObtenerClientes, ActualizarCliente } from '../../servicios/ServicioCliente';
import { InputPhone } from '../components_forms/inputs';
import { ReactComponent as Paso1 } from '../../img/Paso1.svg';
import { ReactComponent as Paso2 } from '../../img/Paso2.svg';
import { ReactComponent as Paso3 } from '../../img/Paso3.svg';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'
export class Formulario extends Component {
    static displayName = Formulario.name;
    constructor(props) {
        super(props);
        this.state = {
            proceso: props.proceso === 2 ? 2 : 1,
            cliente: props.cliente ? props.cliente :null,
            usuario: 'SISTEMA',
            consecutivo: '',
            listaFasesCJ: [],
            faseCJ:props.proceso===2?props.cliente.idFaseCJ:'',
            codigoCliente: props.proceso === 2 ? props.cliente.idClienteEncuesta : '',
            nombreCliente: props.proceso === 2 ? props.cliente.nombre : '',
            sectores: [],
            sector: props.proceso === 2 ? props.cliente.sector : '',
            segmentos: [],
            segmento: props.proceso === 2 ? props.cliente.idSegmento : '',
            segmentosFiltrados: [],
            categorias: [],
            categoria: props.proceso === 2 ? props.cliente.idCategoria : '',
            lineasNegocio: [],
            lineaNegocio: props.proceso === 2 ? props.cliente.idLinea : '',
            servicios: [],
            servicio: props.proceso === 2 ? props.cliente.idServicio : '',
            serviciosFiltrados:[],
            socios: [],
            socio: props.proceso === 2 ? props.cliente.idSocio : '',
            canales: [],
            canal: props.proceso === 2 ? props.cliente.idCanal : '',
            telefonoContacto: props.proceso === 2 ? props.cliente.telefono: '',
            celularContacto: '',
            correoContacto: props.proceso === 2 ? props.cliente.correoElectronico : '',
            codigoSocio: props.proceso === 2 ? props.cliente.idSocio: '',
            nombreSocio: props.proceso === 2 ? props.cliente.socio: '',
            telefonoSocio: props.proceso === 2 ? props.cliente.telefonoSocio : '',
            celularSocio: '',
            correoSocio: props.proceso === 2 ? props.cliente.correoSocio: '',
            fecha: '',
            paso1: true,
            paso2: false,
            paso3: false,

        }
    }
    async componentDidMount() {
        this.setState({ fecha: new Date().toISOString().substring(0, 10) })  ;
        await this.ObtenerListadoSocios();
        await this.ObtenerListaServicios();
        await this.ObtenerListadoLineaNegocio();
        await this.ObtenerListadoFasesCJ();
        await this.ObtenerListaSegmentos();
        await this.ObtenerListaSectores();
        await this.ObtenerListadoCategorias();
        await this.ObtenerListadoCanales();

        if (this.state.proceso === 1) {
            await this.ObtenerListadoClientes();
        } else {
            this.setState({ segmentosFiltrados: this.state.segmentos.filter(segmento => segmento.sector == this.state.sector) });
            this.setState({ serviciosFiltrados: this.state.servicios.filter(servicio => servicio.idLinea == this.state.lineaNegocio) }); 
        }
        
    }

    async ObtenerListadoClientes() {
        const respuesta = await ObtenerClientes();
        this.setState({ codigoCliente: respuesta.length+1 });
    }

    async ObtenerListadoSocios() {
        const respuesta = await ObtenerSocios();
        this.setState({ socios: respuesta });
    }
    async ObtenerListaServicios() {
        const respuesta = await ObtenerServicioLineaNegocio();
        this.setState({ servicios: respuesta });
    }

    async ObtenerListadoLineaNegocio() {
        const respuesta = await ObtenerLineaNegocio();
        this.setState({ lineasNegocio: respuesta });
    }
    async ObtenerListadoFasesCJ() {
        const respuesta = await ObtenerFasesCJ();
        this.setState({ listaFasesCJ: respuesta });
    }
    async ObtenerListaSegmentos() {
        const respuesta = await ObtenerSegmentos();
        this.setState({ segmentos: respuesta });
    }
    async ObtenerListaSectores() {
        const respuesta = await ObtenerSectores();
        this.setState({ sectores: respuesta });
    }
    async ObtenerListadoCategorias() {
        const respuesta = await ObtenerCategorias();
        this.setState({ categorias: respuesta });
    }
    async ObtenerListadoCanales() {
        const respuesta = await ObtenerCanales();
        this.setState({ canales: respuesta });
    }

   
    AgregarCliente = async (e) => {
        e.preventDefault();
        if (this.state.paso1) {
            this.setState({ paso1: false, paso2: true })
            return;
        }
        if (this.state.paso2) {
            if (this.state.telefonoContacto == '' || this.state.telefonoContacto.length<8) {
                return;
            } else {
                this.setState({ paso2: false, paso3: true })
                return;
            }
        if (this.state.paso3) {
            var datos = {
                IdClienteEncuesta: parseInt(this.state.codigoCliente),
                Nombre: this.state.nombreCliente,
                Telefono: this.state.telefonoContacto,
                CorreoElectronico: this.state.correoContacto,
                IdCanal: parseInt(this.state.canal),
                IdSegmento: parseInt(this.state.segmento),
                IdCategoria: parseInt(this.state.categoria),
                IdServicio: parseInt(this.state.servicio),
                IdFaseCJ: parseInt(this.state.faseCJ),
                IdSocio: parseInt(this.state.codigoSocio),
            };
            if (datos.Telefono === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Número de teléfono inválido',
                });
            }
            else {

                var result;

                if (this.state.proceso === 1) {
                    result = await AgregarCliente(datos);
                } else {
                    result = await ActualizarCliente(datos);
                }
                

                if (result.indicador !== 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.mensaje,
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: result.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    if (this.state.proceso === 1) {
                        this.setState({
                            faseCJ: '',
                            codigoCliente: this.state.codigoCliente + 1,
                            nombreCliente: '',
                            sector: '',
                            segmento: '',
                            categoria: '',
                            lineaNegocio: '',
                            servicio: '',
                            socio: '',
                            canal: '',
                            telefonoContacto: '',
                            correoContacto: '',
                            codigoSocio: '',
                            nombreSocio: '',
                            telefonoSocio: '',
                            celularSocio: '',
                            correoSocio: '',
                        });

                    }
                    this.setState({ paso3: false, paso1: true })
                }
            }
        }
    }
    //onchange inputs
    onChangeUsuario = (e) => {
        this.setState({ usuario: e.target.value });
    }
    onChangeConsecutivo = (e) => {
        this.setState({ consecutivo: e.target.value });
    }
    onChangeCodigoCliente = (e) => {
        this.setState({ codigoCliente: e.target.value });
    }
    onChangeNombreCliente = (e) => {
        this.setState({ nombreCliente: e.target.value });
    }
    onChangeTelefonoContacto = (e) => {
        this.setState({ telefonoContacto: e });
    }
    onChangeCelularContacto = (e) => {
        this.setState({ celularContacto: e });
    }
    onChangeCorreoContacto = (e) => {
        this.setState({ correoContacto: e.target.value });
    }
    onChangeCodigoSocio= (e) => {
        this.setState({ codigoSocio: e.target.value });
    }
    onChangeNombreSocio = (e) => {
        this.setState({ nombreSocio: e.target.value });
    }
    onChangeCodigoSocio = (e) => {
        this.setState({ codigoSocio: e.target.value });
    }

    onChangePaso = (e) => {
        this.setState({ paso: e.target.value });
    }

   
    onChangeSector = (e) => {
        if (e.target.value != '') {
            this.setState({ sector: e.target.value });
            this.setState({ segmentosFiltrados: this.state.segmentos.filter(segmento => segmento.sector == e.target.value) });
            this.setState({ segmento: '' });
        } else {
            this.setState({ segmento: '' });
        }
    }

    onChangeSocio = (e) => {
        this.setState({ socio: e.target.value });
        var socio = this.state.socios.filter(soc => soc.idSocio == e.target.value);
        this.setState({ telefonoSocio: socio[0].telefono });
        this.setState({ correoSocio: socio[0].correo });
        this.setState({ codigoSocio: socio[0].idSocio });

    }

    onChangeLineaNegocio = async (e) => {
        if (e.target.value != '') {
            this.setState({ lineaNegocio: e.target.value });
            this.setState({ serviciosFiltrados: this.state.servicios.filter(servicio => servicio.idLinea == e.target.value) }); 
            this.setState({ servicio: '' });
        } else {
            this.setState({ servicio: '' });
        }
    } 

    onChangeCanal = (e) => {
        this.setState({ canal: e.target.value });
    }
    onChangeServicio = (e) => {
        this.setState({ servicio: e.target.value });
    }
    onChangeSegmento = (e) => {
        this.setState({ segmento: e.target.value });
    }
    onChangeFaseServicio = (e) => {
        this.setState({ faseCJ: e.target.value })
    }
    onChangeCategoria = (e) => {
        this.setState({ categoria: e.target.value });
        
    }


    render() {
        return (


            <Form onSubmit={this.AgregarCliente} >

                {/* }<div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Recopilación de datos de clientes a encuestar</h1>
                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Nombre de usuario</label>
                                <Form.Control readOnly value={this.state.usuario} type="text" />
                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Consecutivo #</label>
                                <input readOnly type="text" name="Consecutivo" />

                            </div>

                        </div>

                        <div className="form_wrap fullname">


                            <div class="form_item">

                                <label className="etiquetas">Fecha</label>
                                <Form.Control readOnly value={this.state.fecha} type="date" />
                            </div>

                        </div>
                    </div>
                </div>
                */}
                <div className="wrapper">
                <div className="centerButtons">

                        
                        {this.state.paso1 ? <Paso1></Paso1> : this.state.paso2 ? <Paso2></Paso2> : this.state.paso3 ? <Paso3></Paso3> :null}
                        


                    </div>
                    </div>
                    

                {this.state.paso1 ?
                    <div className="wrapper">

                        <div className="form_container">
                            <div className="form_wrap fullname2">
                                <h1 className="heading2">Datos del cliente</h1>
                            </div>
                            <div className="form_wrap fullname">
                                <div className="form_item">

                                    <label class="etiquetas">Código cliente</label>
                                    <Form.Control readOnly value={this.state.codigoCliente} type="text" />
                                </div>

                                <div className="form_item">

                                    <label className="etiquetas">Nombre cliente</label>
                                    <Form.Control id="nombreCliente" required value={this.state.nombreCliente} onChange={this.onChangeNombreCliente} type="text" placeholder="Ingrese el nombre del cliente" />
                                </div>

                            </div>

                            <div className="form_wrap fullname">
                                <div className="form_item">

                                    <label className="etiquetas">Sector económico</label>

                                    <Form.Select required value={this.state.sector} onChange={this.onChangeSector}>
                                        <option disabled value=''> -- Seleccione un Sector -- </option>
                                        {
                                            this.state.sectores.map(index => <option value={index.sector}>{index.sector}</option>
                                            )};
                                    </Form.Select>
                                </div>

                                <div className="form_item">

                                    <label className="etiquetas">Segmento</label>
                                    <Form.Select required value={this.state.segmento} onChange={this.onChangeSegmento} id="" class=" " name="segmento">
                                        <option disabled value=''> -- Seleccione un Segmento -- </option>
                                        {
                                            this.state.segmentosFiltrados.map(index => <option key={index.idSegmento} value={index.idSegmento}>{index.segmento}</option>
                                            )};
                                    </Form.Select>

                                </div>

                            </div>
                            <div className="form_wrap fullname">
                                <div className="form_item">

                                    <label className="etiquetas">Categoría</label>

                                    <Form.Select required value={this.state.categoria} onChange={this.onChangeCategoria} id="slAeropuerto" class=" " name="categoria" >
                                        <option disabled value=''> -- Seleccione una Categoría -- </option>
                                        {
                                            this.state.categorias.map(index => <option key={index.idCategoria} value={index.idCategoria}>{index.categoria}</option>
                                            )};
                                    </Form.Select>

                                </div>

                                <div className="form_item">

                                    <label className="etiquetas">Línea de negocio</label>
                                    <Form.Select required value={this.state.lineaNegocio} onChange={this.onChangeLineaNegocio} id="" class=" " name="linea_negocio" >
                                        <option disabled value=''> -- Seleccione una Línea de Negocio -- </option>
                                        {
                                            this.state.lineasNegocio.map(index => <option key={index.idLinea} value={index.idLinea}>{index.lineaNegocio}</option>
                                            )};
                                    </Form.Select>

                                </div>

                            </div>
                            <div className="form_wrap fullname">
                                <div className="form_item">

                                    <label className="etiquetas">Servicios y productos</label>
                                    <Form.Select required value={this.state.servicio} required onChange={this.onChangeServicio} id="" class=" " name="servicio">
                                        <option disabled value=''>-- Seleccione un Servicio--</option>
                                        {
                                            this.state.serviciosFiltrados.map(index => <option key={index.idServicio} value={index.idServicio}>{index.servicio}</option>
                                            )};
                                    </Form.Select>

                                </div>
                                <div className="form_item">

                                    <label className="etiquetas">Fase de servicio</label>

                                    <Form.Select required value={this.state.faseCJ} onChange={this.onChangeFaseServicio} id="" class=" " name="face_servicio" >
                                        <option disabled value=''> -- Seleccione una Fase de Servicio -- </option>
                                        {this.state.listaFasesCJ.map(index => <option key={index.id} value={index.idFaseCJ}>{index.faseCustomerJourney}</option>
                                        )};
                                    </Form.Select>

                                </div>


                            </div>
                            <div className="centerButtons">
                                <button id="btnGuardar" type="submit" className="btn btn-block botones mr-1">Siguiente</button>

                            </div>
                        </div>

                    </div>
                    :
                    null
                }
                {
                    this.state.paso2 ? <div className="wrapper">

                        <div className="form_container">
                            <div className="form_wrap fullname2">
                                <h1 className="heading2">Datos de contacto</h1>
                            </div>
                            <div className="form_wrap fullname">
                                <div className="form_item">

                                    <label class="etiquetas">Nombre del contacto</label>
                                    <Form.Control value={this.state.nombreCliente} onChange={this.onChangeNombreCliente} type="text" placeholder="Ingrese el nombre de contacto" />
                                </div>

                                <div className="form_item">

                                    <label className="etiquetas">Canal encuesta</label>

                                    <Form.Select required value={this.state.canal} onChange={this.onChangeCanal} id="" class=" " name="canal">
                                        <option disabled value=''> -- Seleccione un Canal -- </option>
                                        {
                                            this.state.canales.map(index => <option key={index.idCanal} value={index.idCanal}>{index.canal}</option>
                                            )};
                                    </Form.Select>

                                </div>

                            </div>

                            <div className="form_wrap fullname">
                                <div className="form_item">

                                    <label id="labelTelefono" className="etiquetas">Teléfono</label>
                                    <Form.Control hidden type='text' size="sm" value={this.state.telefonoContacto} required readOnly disabled />
                                    <Form.Control.Feedback type="invalid">ES NECESARIO</Form.Control.Feedback>
                                    <PhoneInput
                                        country={'cr'}
                                        value={this.state.telefonoContacto}
                                        onChange={phone => this.setState({ telefonoContacto: phone })
                                        }
                                        required={true}

                                        isValid={(value, country) => {
                                            if (value.length < 8) {
                                                return 'Teléfono Inválido: ';
                                            } else {
                                                return true;
                                            }
                                        }}
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                        }} />
                                </div>
                                <div className="form_item">

                                    <label className="etiquetas">Correo</label>
                                    <Form.Control required value={this.state.correoContacto} onChange={this.onChangeCorreoContacto} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        No compartiremos el correo electrónico con nadie más.
                                    </Form.Text>
                                </div>
                            </div>

                            <div className="centerButtons">
                                <button id="btnSalir" type="button" className="btn btn-block botonesr  " onClick={() => { this.setState({ paso2: false }); this.setState({ paso1: true }) }}>Atrás</button>
                                <button id="btnGuardar" type="submit" className="btn btn-block botones mr-1">Siguiente</button>

                            </div>
                        </div>

                    </div>
                        :
                        null
                }
                



                
                {
                    this.state.paso3? <div className="wrapper">

                        <div className="form_container">
                            <div className="form_wrap fullname2">
                                <h1 className="heading2">Datos del socio</h1>
                            </div>
                            <div className="form_wrap fullname">


                                <div className="form_item">

                                    <label className="etiquetas">Nombre del socio</label>
                                    <Form.Select required value={this.state.codigoSocio} onChange={this.onChangeSocio} id="" class=" " name="socio">
                                        <option required disabled value=''> -- Seleccione un Socio -- </option>
                                        {
                                            this.state.socios.map(index => <option key={index.idSocio} value={index.idSocio}>{index.idSocio + " " + index.nombre}</option>
                                            )};
                                    </Form.Select>

                                </div>
                                <div className="form_item">

                                    <label class="etiquetas">Código del socio</label>
                                    <Form.Control readOnly value={this.state.codigoSocio} type="text" placeholder="Seleccione un Socio" />
                                </div>
                            </div>

                            <div className="form_wrap fullname">
                                <div className="form_item">

                                    <label className="etiquetas">Teléfono</label>


                                    <PhoneInput
                                        country={'cr'}
                                        value={this.state.telefonoSocio}
                                        disabled={true}

                                        inputProps={{
                                            name: 'phone',
                                        }} />
                                </div>
                                <div className="form_item">

                                    <label className="etiquetas">Correo</label>
                                    <Form.Control readOnly value={this.state.correoSocio} placeholder="Seleccione un Socio" type="email" />
                                </div>

                            </div>
                            <div className="centerButtons">
                                <button id="btnSalir" type="button" className="btn btn-block botonesr " onClick={() => { this.setState({ paso3: false }); this.setState({ paso2: true }) }}>Atrás</button>
                                <button id="btnGuardar" type="submit" className="btn btn-block botones mr-1"  >Guardar</button>

                            </div>
                        </div>

                    </div>
                        :
                        null
                }
                

                </Form>

        );
    }
}
export default Formulario
