import React, { Component } from 'react';
import {
    Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Logo from '../img/rossmoncx.png';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (

            <header>

                <Navbar className=" navbar-expand-sm navbar-toggleable-sm ng-with border-bottom box-shadow mb-3" >
                    <NavbarBrand tag={Link} to="/" className="titulo">
                        <img
                            alt="logo"
                            src={Logo} 
                            className="img-fluid"
                        />
                    </NavbarBrand>

                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">


                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: "#303F9F", }}>
                                    Clientes

                                </DropdownToggle>

                                <DropdownMenu left>


                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/Formulario">Recopilacion de datos de clientes</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/Reporte">Reporte</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Catálogos y Mantenimientos</Accordion.Header>
                                            <Accordion.Body
                                            >
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoCanales">Canales</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoCategoria">Categoria</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoFases">Fases</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoLineasServicio">Lineas de Servicio</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoSectores">Sectores</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoSegmentos">Segmentos</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoCanales">Canales</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoServicioNegocio">Servicio Negocio</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/CatalogoServicioSocio">Servicios por Socios</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/CatalogoTipoContactoEncuesta">Tipos de Contacto de Encuesta</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/CatalogoTipoInteraccion">Tipos de Interaccion</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/CatalogoTipoPerspectivas">Tipos de Perspectivas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/CatalogoTipoIdentificacion">Catalogo de Tipo de Identificacion</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoSocio">{"Socios"}</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>


                                </DropdownMenu>
                            </UncontrolledDropdown>


                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: "#303F9F", }}>
                                    Hallazgos
                                </DropdownToggle>

                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/AdminHallazgosDireccion">Administracion de hallazgos por direccion</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                </DropdownMenu>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/AdminHallazgosDireccion">Administracion de hallazgos por direccion</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                    {console.disableYellowBox = true}

                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header style={{ color: "#303F9F", }}>Reporterías</Accordion.Header>
                                            <Accordion.Body>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/EvidenciaTalleres">Evidencia Talleres</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/ReportesHallazgos">Reportes Hallazgos</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header style={{ color: "#303F9F", }}> Catálogos y Mantenimientos</Accordion.Header>
                                            <Accordion.Body>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoAnotaciones">Anotaciones</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoHallazgos">Hallazgos</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoTalleres">Talleres</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header style={{ color: "#303F9F", }} >Parámetros Hallazgos</Accordion.Header>
                                            <Accordion.Body>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoFasesCJ">Fases Customer Journey</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoDireccion">Direcciones</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoJefaturaDireccion">Jefatura Direccion</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoActividades">Actividades</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoAceptacion">Estados de Aceptacion</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoEsfuerzo">Esfuerzo</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoImpacto">Impacto</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoModelo">Modelo</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoEstadoHallazgo">Estado Hallazgo</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoTipoTaller">Tipos de Talleres</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoEtapas">Etapas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoPeriodicidades">Periodicidades</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </DropdownMenu>
                            </UncontrolledDropdown>








                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret style={{ color: "#303F9F", }}>
                                    Encuestas
                                </DropdownToggle>
                                <DropdownMenu right>
                                   
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoCampana">Campañas</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoEncuesta">Encuestas</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoIndicador">Indicadores</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoMetricas">Métricas</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoPerspectiva">Perspectivas</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoPregunta">Preguntas</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoTipoEncuesta">Tipos de Encuesta</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoTipoPersona">Tipos de Persona</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoClientesSocios">Clientes Por Socios</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} style={{ color: "#303F9F", }} to="/MantenimientoInteracciones">Interacciones</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>


                        </ul>
                    </Collapse>


                </Navbar>
            </header>

        );
    }
}
