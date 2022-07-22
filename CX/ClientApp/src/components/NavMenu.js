import React, { Component } from 'react';
import {
    Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
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

                    <NavbarBrand tag={Link} to="/" className="titulo">Customer Experience</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
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

                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoCanales">Mantenimiento Canales</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoCategoria">Mantenimiento Categoria</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoFases">Mantenimiento Fases</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoLineasServicio">Mantenimiento Lineas de Servicio</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoSectores">Mantenimiento Sectores</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoSegmentos">Mantenimiento Segmentos</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoCanales">Mantenimiento Canales</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoServicioNegocio">Mantenimiento Servicio Negocio</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoServicioSocio">Mantenimiento Servicio Socio</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoSocioServicio">Mantenimiento Socio Servicio</NavLink>
                                        </NavItem>
                                    </DropdownItem>
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
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoAnotaciones">Mantenimiento Anotaciones</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoHallazgos">Mantenimiento Hallazgos</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoTalleres">Mantenimiento Talleres</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/EvidenciaTalleres">Evidencia Talleres</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/ReportesHallazgos">Reportes Hallazgos</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>







                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Parametros Hallazgos
              </DropdownToggle>

                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoDireccion">Mantenimiento Direccion</NavLink>
                                        </NavItem>
                                    </DropdownItem>

                                </DropdownMenu>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoJefaturaDireccion">Mantenimiento Jefatura Direccion</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoActividades">Mantenimiento Actividades</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoAceptacion">Mantenimiento Estado Aceptacion</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoEsfuerzo">Mantenimiento Esfuerzo</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoImpacto">Mantenimiento Impacto</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoModelo">Mantenimiento Modelo</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoEstadoHallazgo">Mantenimiento Estado Hallazgo</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoTipoTaller">Mantenimiento Tipo Taller</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoEtapas">Mantenimiento Etapas</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoPeriodicidades">Mantenimiento Periodicidades</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>



                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Encuesta
              </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoCampana">Mantenimiento Campana</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoEncuesta">Mantenimiento de Encuestas</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoIndicador">Mantenimiento Indicador</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoMetricas">Mantenimiento Metricas</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoPerspectiva">Mantenimiento Perspectiva</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoPregunta">Mantenimiento Pregunta</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoTipoEncuesta">Mantenimiento Tipo Encuesta</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantIndicadorValor">Mantenimiento Valor Indicador</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoTipoPersona">Mantenimiento Tipo Persona</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoClientesSocios">Mantenimiento Clientes Socios</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-black" to="/MantenimientoInteracciones">Mantenimiento Interacciones</NavLink>
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
