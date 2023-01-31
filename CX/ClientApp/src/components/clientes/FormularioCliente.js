import React, { Component, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import { ObtenerLineaNegocio, ObtenerLineaNegocioPorId } from '../../servicios/ServicioLineaNegocio';
import { ObtenerSectores, ObtenerSectorPorId} from '../../servicios/ServicioSectores';
import { ObtenerSegmentos, ObtenerSegmentoPorId } from '../../servicios/ServicioSegmentos';
import { ObtenerFasesCJ, ObtenerFasesCJPorId } from '../../servicios/ServicioFasesCJ';
import { ObtenerServicioLineaNegocio, ObtenerServicioLineaNegocioPorId } from '../../servicios/ServicioServicioLineaNegocio';
import { ObtenerCanales} from '../../servicios/ServicioCanales';
import { ObtenerCategorias } from '../../servicios/ServicioCategorias';
import { ObtenerSocios, ObtenerSocioPorId } from '../../servicios/ServicioSocio';
import { AgregarCliente } from '../../servicios/ServicioCliente';
export class Formulario extends Component {
    static displayName = Formulario.name;
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            consecutivo: '',
            listaFasesCJ: [],
            faseCJ:'',
            codigoCliente: '',
            nombreCliente: '',
            sectores: [],
            sector:'',
            segmentos: [],
            segmento:'',
            segmentosFiltrados: [],
            categorias: [],
            categoria: '',
            lineasNegocio: [],
            lineaNegocio: '',
            servicios: [],
            servicio:'',
            serviciosFiltrados:[],
            socios: [],
            socio:'',
            nombreContacto: '',
            canales: [],
            canal: '',
            telefonoContacto: '',
            celularContacto: '',
            correoContacto: '',
            codigoSocio: '',
            nombreSocio: '',
            telefonoSocio: '',
            celularSocio: '',
            correoSocio: '',
            fecha:'',

        }
    }
    async componentDidMount() {

        var today = new Date();
        this.setState({ fecha: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() })  ;
        console.log(this.state.fecha);
        await this.ObtenerListadoSocios();
        await this.ObtenerListaServicios();
        await this.ObtenerListadoLineaNegocio();
        await this.ObtenerListadoFasesCJ();
        await this.ObtenerListaSegmentos();
        await this.ObtenerListaSectores();
        await this.ObtenerListadoCategorias();
        await this.ObtenerListadoCanales();
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


    onClickAgregarCliente = async () => {

        var datos = {
            Nombre: this.state.nombreCliente,
            Telefono: this.state.telefonoContacto,
            CorreoElectronico: this.state.correoContacto,
            IdCanal: parseInt(this.state.canal),
            IdSegemento: parseInt(this.state.segmento),
            IdCategoria: parseInt(this.state.categoria),
            IdServicio: parseInt(this.state.servicio),
            IdFaseCJ: parseInt(this.state.faseCJ),
            IdSocio: parseInt(this.state.codigoSocio),

        };
        const result =await this.AgregarCliente(datos);

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
    onChangeNombreContacto = (e) => {
        this.setState({ nombreContacto: e.target.value });
    }
    onChangeTelefonoContacto = (e) => {
        this.setState({ telefonoContacto: e.target.value });
    }
    onChangeCelularContacto = (e) => {
        this.setState({ celularContacto: e.target.value });
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
        this.setState({ socio: '' });
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
        const { 
            usuario,
            consecutivo,
            faseServicio,
            codigoCliente,
            nombreCliente,
            sectorEconomico,
            segmento,
            categoria,
            lineaNegocio,
            servicioProductos,
            nombreContacto,
            canalEncuesta,
            telefonoContacto,
            celularContacto,
            correoContacto,
            codigoSocio,
            nombreSocio,
            telefonoSocio,
            celularSocio,
        } = this.state;
        return (

            <main>

                <div class="row-full">Clientes </div>


                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Recopilación de datos de clientes a encuestar</h1>
                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Nombre de usuario</label>
                                {/*    <input type="text" name="nom_usuario" onChange={(e) => setNomUsuario(e.target.value)} />*/}
                                <input type="text" name="nom_usuario" value={usuario} onChange={this.onChangeUsuario} />
                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Consecutivo #</label>
                                <input type="text" name="Consecutivo"  />

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Fase de servicio</label>

                                <select onChange={this.onChangeFaseServicio} id="" class=" " name="face_servicio" >
                                    <option disabled selected value> -- Seleccione una Fase de Servicio -- </option>
                                    {this.state.listaFasesCJ.map(index => <option key={index.id} value={index.idFaseCJ}>{index.faseCustomerJourney}</option>
                                )};
                                </select>

                            </div>

                            <div class="form_item">

                                <label className="etiquetas">Fecha</label>
                                <input type="date" value={this.state.fecha} name="fecha" />

                            </div>

                        </div>
                    </div>
                </div>

                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Datos del cliente</h1>
                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label class="etiquetas">Código cliente</label>
                                <input readOnly type="text" name="cod_cliente" value={codigoCliente} onChange={this.onChangeCodigoCliente} />

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Nombre cliente</label>
                                <input type="text" name="nom_cliente" value={nombreCliente} onChange={this.onChangeNombreCliente} />

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Sector económico</label>

                                <select onChange={this.onChangeSector} id="" class=" " name="sector" >
                                    <option disabled selected value> -- Seleccione un Sector -- </option>
                                    {
                                        this.state.sectores.map(index => <option key={index.idSector} value={index.sector}>{index.sector}</option>
                                        )};
                                </select>

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Segmento</label>
                                <select defaultValue='' value={this.state.segmento} onChange={this.onChangeSegmento} id="" class=" " name="segmento">
                                    <option disabled value=''> -- Seleccione un Segmento -- </option>
                                    {
                                        this.state.segmentosFiltrados.map(index => <option key={index.idSegmento} value={index.idSegmento}>{index.segmento}</option>
                                        )};
                                </select>
                                
                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Categoría</label>

                                <select value={this.state.categoria} onChange={this.onChangeCategoria} id="slAeropuerto" class=" " name="categoria" >
                                    <option disabled value=''> -- Seleccione una Categoría -- </option>
                                    {
                                        this.state.categorias.map(index => <option key={index.idCategoria} value={index.idCategoria}>{index.categoria}</option>
                                        )};
                                </select>

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Línea de negocio</label>
                                <select value={ this.state.lineaNegocio} onChange={this.onChangeLineaNegocio} id="" class=" " name="linea_negocio" >
                                    <option disabled value=''> -- Seleccione una Línea de Negocio -- </option>
                                    {
                                        this.state.lineasNegocio.map(index => <option key={index.idLinea} value={index.idLinea}>{index.lineaNegocio}</option>
                                        )};
                                </select>

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Servicios y productos</label>
                                <select defaultValue='' value={ this.state.servicio} required onChange={this.onChangeServicio} id="" class=" " name="servicio">
                                    <option disabled value=''>-- Seleccione un Servicio--</option>
                                    {
                                        this.state.serviciosFiltrados.map(index => <option key={index.idServicio} value={index.idServicio}>{index.servicio}</option>
                                        )};
                                </select>

                            </div>
                            <div className="form_item">

                            </div>


                        </div>
                    </div>
                </div>

                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Datos de contacto</h1>
                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label class="etiquetas">Nombre del contacto</label>
                                <input required type="text" placeholder="" name="nom_contacto" value={nombreContacto} onChange={this.onChangeNombreContacto} />

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Canal encuesta</label>
                                
                                <select required onChange={this.onChangeCanal} id="" class=" " name="canal">
                                    <option disabled selected value> -- Seleccione un Canal -- </option>
                                    {
                                    this.state.canales.map(index => <option key={index.idCanal} value={index.idCanal}>{index.canal}</option>
                                    )};
                                </select>

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Teléfono</label>

                                <input required type="text" name="telefono_contacto" value={telefonoContacto} onChange={this.onChangeTelefonoContacto} />

                            </div>

                            <div className="form_item">

                                <label className="etiquetas">Celular</label>
                                <input required type="text" placeholder="" name="celular_contacto" value={this.statecelularContacto} onChange={this.onChangeCelularContacto} />

                            </div>

                        </div>
                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Correo</label>
                                <input required type="text" placeholder="" name="correo_contacto" value={this.statecorreoContacto} onChange={this.onChangeCorreoContacto} />

                            </div>

                            <div className="form_item">

                            </div>

                        </div>

                    </div>
                </div>

                <div className="wrapper">

                    <div className="form_container">
                        <div className="form_wrap fullname2">
                            <h1 className="heading2">Datos del socio</h1>
                        </div>
                        <div className="form_wrap fullname">


                            <div className="form_item">

                                <label className="etiquetas">Nombre del socio</label>
                                <select required onChange={this.onChangeSocio} id="" class=" " name="socio">
                                    <option disabled selected value> -- Seleccione un Socio -- </option>
                                    {
                                    this.state.socios.map(index => <option key={index.idSocio} value={index.idSocio}>{index.idSocio+" "+index.nombre }</option>
                                    )};
                                </select>

                            </div>
                            <div className="form_item">

                                <label class="etiquetas">Código del socio</label>
                                <input readOnly type="text" placeholder="" name="cod_socio" value={this.state.codigoSocio}  />

                            </div>

                        </div>

                        <div className="form_wrap fullname">
                            <div className="form_item">

                                <label className="etiquetas">Teléfono</label>

                                <input readOnly type="text" placeholder="" name="telefono_socio" value={this.state.telefonoSocio}/>

                            </div>
                            <div className="form_item">

                                <label className="etiquetas">Correo</label>
                                <input readOnly type="text" placeholder="" name="correo_socio" value={this.state.correoSocio} />

                            </div>
                        </div>

                    </div>

                </div>
                <div className="wrapper">
                    
                    <button id="btnGuardar" type="submit" className="btn btn-block botones" onClick={() => this.onClickAgregarCliente() } >Guardar</button>
                    <button id="btnSalir" type="button" className="btn btn-block botonesr">Salir</button>
                   

                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </main>

        );
    }
}

