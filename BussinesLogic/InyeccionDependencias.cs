using BussinesLogic.Servicios;
using Dominio.Interfaces.Aplicacion.Canales;
using Dominio.Interfaces.Aplicacion.Categoria;
using Dominio.Interfaces.Aplicacion.Direccion;
using Dominio.Interfaces.Aplicacion.EstadoAceptacion;
using Dominio.Interfaces.Aplicacion.EstadoHallazgo;
using Dominio.Interfaces.Aplicacion.EtapasTaller;
using Dominio.Interfaces.Aplicacion.FasesCJ;
using Dominio.Interfaces.Aplicacion.FaseServicio;
using Dominio.Interfaces.Aplicacion.GradoEsfuerzo;
using Dominio.Interfaces.Aplicacion.GradoImpacto;
using Dominio.Interfaces.Aplicacion.Jefatura;
using Dominio.Interfaces.Aplicacion.LineaNegocio;
using Dominio.Interfaces.Aplicacion.MacroActividad;
using Dominio.Interfaces.Aplicacion.MantenimientoHallazgo;
using Dominio.Interfaces.Aplicacion.MetodologiaCX;
using Dominio.Interfaces.Aplicacion.Periodicidad;
using Dominio.Interfaces.Aplicacion.Sectores;
using Dominio.Interfaces.Aplicacion.Segmentos;
using Dominio.Interfaces.Aplicacion.ServicioLineaNegocio;
using Dominio.Interfaces.Aplicacion.ServicioSocio;
using Dominio.Interfaces.Aplicacion.Socio;
using Dominio.Interfaces.Aplicacion.TipoContactoEncuesta;
using Dominio.Interfaces.Aplicacion.TipoEncuesta;
using Dominio.Interfaces.Aplicacion.TipoIdentificacion;
using Dominio.Interfaces.Aplicacion.TipoIndicador;
using Dominio.Interfaces.Aplicacion.TipoInteraccion;
using Dominio.Interfaces.Aplicacion.TipoMetrica;
using Dominio.Interfaces.Aplicacion.TipoPerspectivas;
using Dominio.Interfaces.Aplicacion.TiposPersona;
using Dominio.Interfaces.Aplicacion.TipoTaller;
using Dominio.Interfaces.Aplicacion.TalleresCoCreacion;

using Dominio.Interfaces.Aplicacion.PreguntasEncuesta;
using Dominio.Interfaces.Aplicacion.RespuestasPreguntaEncuesta;



using Microsoft.Extensions.Configuration;


using Microsoft.Extensions.DependencyInjection;
//using Dominio.Interfaces.
using System;
using System.Collections.Generic;
using System.Text;

namespace BussinesLogic
{
    public static class InyeccionDependencias
    {
        public static IServiceCollection AddAplicacion(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IServicioCanales, ServicioCanales>();
            services.AddScoped<IServicioCategorias, ServicioCategorias>();
            services.AddScoped<IServicioDirecciones, ServicioDirecciones>();
            services.AddScoped<IServicioEstadoAceptacion, ServicioEstadoAceptacion>();
            services.AddScoped<IServicioEstadoHallazgo, ServicioEstadoHallazgo>();
            services.AddScoped<IServicioEtapasTaller, ServicioEtapasTaller>();
            services.AddScoped<IServicioFaseServicio, ServicioFaseServicios>();
            services.AddScoped<IServicioGradoImpacto, ServicioGradoImpacto>();
            services.AddScoped<IServicioGradoEsfuerzo, ServicioGradosEsfuerzo>();
            services.AddScoped<IServicioJefaturaDireccion, ServicioJefaturaDireccion>();
            services.AddScoped<IServicioLineaNegocio, ServicioLineaNegocio>();
            services.AddScoped<IServicioMacroActividad, ServicioMacroActividad>();
            services.AddScoped<IServicioMetodologiaCX, ServicioMetodologiaCX>();
            services.AddScoped<IServicioPeriodicidad, ServicioPeriodicidad>();
            services.AddScoped<IServicioPreguntasEncuesta, ServicioPreguntasEncuesta>(); //*
            services.AddScoped<IServicioRespuestasPreguntaEncuesta, ServicioRespuestasPreguntaEncuesta>(); //*
            services.AddScoped<IServicioSectores, ServicioSectores>();
            services.AddScoped<IServicioSegmentos, ServicioSegmentos>();
            services.AddScoped<IServicioServicioLineaNegocio, ServicioServicioLineaNegocio>();
            services.AddScoped<IServicioServicioSocio, ServicioServicioSocio>();
            services.AddScoped<IServicioSocios, ServicioSocios>();
            services.AddScoped<IServicioTipoContactoEncuesta, ServicioTipoContactoEncuesta>();
            services.AddScoped<IServicioTipoEncuesta, ServicioTipoEncuesta>();
            services.AddScoped<IServicioTipoIdentificacion, ServicioTipoIdentificacion>();
            services.AddScoped<IServicioTipoIndicador, ServicioTipoIndicador>();
            services.AddScoped<IServicioTipoInteraccion, ServicioTipoInteraccion>();
            services.AddScoped<IServicioTipoMetrica, ServicioTipoMetrica>();
            services.AddScoped<IServicioTipoPerspectivas, ServicioTipoPerspectivas>();
            services.AddScoped<IServicioTiposPersona, ServicioTiposPersona>();
            services.AddScoped<IServicioTipoTaller, ServicioTipoTaller>();
            services.AddScoped<IServicioFasesCJ, ServicioFasesCJ>();
            services.AddScoped<IServicioMantenimientoHallazgo, ServicioMantenimientoHallazgo>();
            services.AddScoped<IServicioTalleresCoCreacion, ServicioTalleresCoCreacion>();
            return services;
        }
    }
}

