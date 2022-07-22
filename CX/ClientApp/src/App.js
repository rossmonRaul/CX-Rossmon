import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import Footer from './components/Footer';



//Cliente
import { Formulario } from './components/clientes/Formulario';
import { MantenimientoCanales } from './components/clientes/MantenimientoCanales'
import { MantenimientoCategoria } from './components/clientes/MantenimientoCategoria'
import { MantenimientoFases } from './components/clientes/MantenimientoFases'
import { MantenimientoLineasServicio } from './components/clientes/MantenimientoLineasServicio'
import { MantenimientoSectores } from './components/clientes/MantenimientoSectores'
import { MantenimientoSegmentos } from './components/clientes/MantenimientoSegmentos'
import { MantenimientoServicioNegocio } from './components/clientes/MantenimientoServicioNegocio'
import { MantenimientoServicioSocio } from './components/clientes/MantenimientoServicioSocio'
import { MantenimientoSocioServicio } from './components/clientes/MantenimientoSocioServicio'
import { Reporte } from './components/clientes/Reporte';



//Hallazgos
import { MantenimientoHallazgos } from './components/hallazgos/MantenimientoHallazgos';
import { MantenimientoAnotaciones } from './components/hallazgos/MantenimientoAnotaciones';
import { MantenimientoTalleres } from './components/hallazgos/MantenimientoTalleres';
import { AdminHallazgosDireccion } from './components/hallazgos/AdminHallazgosDireccion';
import { EvidenciaTalleres } from './components/hallazgos/EvidenciaTalleres';
import { ReportesHallazgos } from './components/hallazgos/ReportesHallazgos';

import { MantenimientoDireccion } from './components/hallazgos/MantenimientoDireccion';
import { MantenimientoJefaturaDireccion } from './components/hallazgos/MantenimientoJefaturaDireccion';
import { MantenimientoActividades } from './components/hallazgos/MantenimientoActividades';
import { MantenimientoAceptacion } from './components/hallazgos/MantenimientoAceptacion';
import { MantenimientoEsfuerzo } from './components/hallazgos/MantenimientoEsfuerzo';
import { MantenimientoImpacto } from './components/hallazgos/MantenimientoImpacto';
import { MantenimientoTipoTaller } from './components/hallazgos/MantenimientoTipoTaller';
import { MantenimientoModelo } from './components/hallazgos/MantenimientoModelo';
import { MantenimientoEstadoHallazgo } from './components/hallazgos/MantenimientoEstadoHallazgo';
import { MantenimientoEtapas } from './components/hallazgos/MantenimientoEtapas';
import { MantenimientoPeriodicidades } from './components/hallazgos/MantenimientoPeriodicidades';


//Encuesta
import { MantenimientoCampana } from './components/contacto_encuestas/MantenimientoCampana';
import { MantenimientoIndicador } from './components/contacto_encuestas/MantenimientoIndicador';
import { MantIndicadorValor } from './components/contacto_encuestas/MantIndicadorValor';
import { MantenimientoTipoEncuesta } from './components/contacto_encuestas/MantenimientoTipoEncuesta';
import { MantenimientoTipoPersona } from './components/contacto_encuestas/MantenimientoTipoPersona';
import { MantenimientoEncuesta } from './components/contacto_encuestas/MantenimientoEncuesta';
import { MantenimientoMetricas } from './components/contacto_encuestas/MantenimientoMetricas';
import { MantenimientoPerspectiva } from './components/contacto_encuestas/MantenimientoPerspectiva';
import { MantenimientoPregunta } from './components/contacto_encuestas/MantenimientoPregunta';
import { MantenimientoClientesSocios } from './components/contacto_encuestas/MantenimientoClientesSocios';
import { MantenimientoInteracciones } from './components/contacto_encuestas/MantenimientoInteracciones';


//import axios from 'axios';

import './custom.css'


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <Layout>
                    <Route exact path='/' component={Home} />
                    {/*Clientes*/}




                    <Route path='/Formulario' component={Formulario} />
                    <Route path='/MantenimientoCanales' component={MantenimientoCanales} />
                    <Route path='/MantenimientoCategoria' component={MantenimientoCategoria} />
                    <Route path='/MantenimientoFases' component={MantenimientoFases} />
                    <Route path='/MantenimientoLineasServicio' component={MantenimientoLineasServicio} />
                    <Route path='/MantenimientoSectores' component={MantenimientoSectores} />
                    <Route path='/MantenimientoSegmentos' component={MantenimientoSegmentos} />
                    <Route path='/MantenimientoServicioNegocio' component={MantenimientoServicioNegocio} />
                    <Route path='/MantenimientoServicioSocio' component={MantenimientoServicioSocio} />
                    <Route path='/MantenimientoSocioServicio' component={MantenimientoSocioServicio} />
                    <Route path='/Reporte' component={Reporte} />

                    {/*Hallazgos*/}
                    <Route path='/MantenimientoHallazgos' component={MantenimientoHallazgos} />
                    <Route path='/MantenimientoAnotaciones' component={MantenimientoAnotaciones} />
                    <Route path='/MantenimientoTalleres' component={MantenimientoTalleres} />
                    <Route path='/AdminHallazgosDireccion' component={AdminHallazgosDireccion} />
                    <Route path='/EvidenciaTalleres' component={EvidenciaTalleres} />
                    <Route path='/ReportesHallazgos' component={ReportesHallazgos} />


                    {/*Parametros hallazgos*/}
                    <Route path='/MantenimientoDireccion' component={MantenimientoDireccion} />
                    <Route path='/MantenimientoJefaturaDireccion' component={MantenimientoJefaturaDireccion} />
                    <Route path='/MantenimientoActividades' component={MantenimientoActividades} />
                    <Route path='/MantenimientoAceptacion' component={MantenimientoAceptacion} />
                    <Route path='/MantenimientoEsfuerzo' component={MantenimientoEsfuerzo} />
                    <Route path='/MantenimientoImpacto' component={MantenimientoImpacto} />
                    <Route path='/MantenimientoTipoTaller' component={MantenimientoTipoTaller} />
                    <Route path='/MantenimientoModelo' component={MantenimientoModelo} />
                    <Route path='/MantenimientoEstadoHallazgo' component={MantenimientoEstadoHallazgo} />
                    <Route path='/MantenimientoEtapas' component={MantenimientoEtapas} />
                    <Route path='/MantenimientoPeriodicidades' component={MantenimientoPeriodicidades} />

                    {/*encuesta*/}
                    <Route path='/MantenimientoCampana' component={MantenimientoCampana} />
                    <Route path='/MantenimientoIndicador' component={MantenimientoIndicador} />
                    <Route path='/MantIndicadorValor' component={MantIndicadorValor} />
                    <Route path='/MantenimientoTipoEncuesta' component={MantenimientoTipoEncuesta} />
                    <Route path='/MantenimientoTipoPersona' component={MantenimientoTipoPersona} />
                    <Route path='/MantenimientoEncuesta' component={MantenimientoEncuesta} />
                    <Route path='/MantenimientoMetricas' component={MantenimientoMetricas} />
                    <Route path='/MantenimientoPerspectiva' component={MantenimientoPerspectiva} />
                    <Route path='/MantenimientoPregunta' component={MantenimientoPregunta} />
                    <Route path='/MantenimientoClientesSocios' component={MantenimientoClientesSocios} />
                    <Route path='/MantenimientoInteracciones' component={MantenimientoInteracciones} />

                </Layout>
                <Footer />
            </div>
        );
    }
}
