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
                <Navbar className=" navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" >
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">


                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Clientes

                                </DropdownToggle>

                                <DropdownMenu right>


                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/Formulario">Recopilacion de datos de clientes</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/Reporte">Reporte</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Catálogos y Mantenimientos</Accordion.Header>
                                            <Accordion.Body>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoCanales">Canales</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoCategoria">Categoria</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoFases">Fases</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoLineasServicio">Lineas de Servicio</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoSectores">Sectores</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoSegmentos">Segmentos</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoCanales">Canales</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoServicioNegocio">Servicio Negocio</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/CatalogoServicioSocio">Servicios por Socios</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/CatalogoTipoContactoEncuesta">Tipos de Contacto de Encuesta</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/CatalogoTipoInteraccion">Tipos de Interaccion</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/CatalogoTipoPerspectivas">Tipos de Perspectivas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/CatalogoTipoIdentificacion">Catalogo de Tipo de Identificacion</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoSocio">{"Socios"}</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>


                                </DropdownMenu>
                            </UncontrolledDropdown>


                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Hallazgos
                                </DropdownToggle>

                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/AdminHallazgosDireccion">Administracion de hallazgos por direccion</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                </DropdownMenu>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/AdminHallazgosDireccion">Administracion de hallazgos por direccion</NavLink>
                                        </NavItem>
                                    </DropdownItem>


                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Reporterías</Accordion.Header>
                                            <Accordion.Body>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/EvidenciaTalleres">Evidencia Talleres</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/ReportesHallazgos">Reportes Hallazgos</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Catálogos y Mantenimientos</Accordion.Header>
                                            <Accordion.Body>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoAnotaciones">Anotaciones</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoHallazgos">Hallazgos</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoTalleres">Talleres</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header>Parámetros Hallazgos</Accordion.Header>
                                            <Accordion.Body>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoFasesCJ">Fases Customer Journey</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoDireccion">Direcciones</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoJefaturaDireccion">Jefatura Direccion</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoActividades">Actividades</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoAceptacion">Estados de Aceptacion</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoEsfuerzo">Esfuerzo</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoImpacto">Impacto</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoModelo">Modelo</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoEstadoHallazgo">Estado Hallazgo</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoTipoTaller">Tipos de Talleres</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoEtapas">Etapas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoPeriodicidades">Periodicidades</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </DropdownMenu>
                            </UncontrolledDropdown>








                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Encuestas
                                </DropdownToggle>
                                <DropdownMenu right>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoCampana">Campañas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoEncuesta">Encuestas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoIndicador">Indicadores</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoMetricas">Métricas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoPerspectiva">Perspectivas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoPregunta">Preguntas</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoTipoEncuesta">Tipos de Encuesta</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoTipoPersona">Tipos de Persona</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoClientesSocios">Clientes Por Socios</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoInteracciones">Interacciones</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>


                        </ul>
                    </Collapse>
                    <NavbarBrand tag={Link} to="/" className="titulo">Customer Experience</NavbarBrand>

                </Navbar>
            </header>

        );
    }
}
