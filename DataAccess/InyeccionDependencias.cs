using DataAccess.StoredProcedures;
using Dominio.Interfaces.Aplicacion.PreguntasEncuesta;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
namespace DataAccess
{
    public static class InyeccionDependencias
    {
        public static IServiceCollection AddInfrastructura(this IServiceCollection services, IConfiguration configuration)
        {
            //contexto BD
            services.AddScoped<IContextoBD, ContextoBD>();

            //repositorios de cada CRUD
            services.AddScoped<IRepositorioCanales, RepositorioCanales>();
            services.AddScoped<IRepositorioCategorias, RepositorioCategorias>();
            services.AddScoped<IRepositorioDirecciones, RepositorioDirecciones>();
            services.AddScoped<IRepositorioEstadoAceptacion,RepositorioEstadoAceptacion>();
            services.AddScoped<IRepositorioEstadoHallazgo,RepositorioEstadoHallazgo>();
            services.AddScoped<IRepositorioEtapasTaller,RepositorioEtapasTaller>();
            services.AddScoped<IRepositorioFaseServicios, RepositorioFaseServicios>();
            services.AddScoped<IRepositorioGradoImpacto,RepositorioGradoImpacto>();
            services.AddScoped<IRepositorioGradosEsfuerzo,RepositorioGradosEsfuerzo>();
            services.AddScoped<IRepositorioJefaturasDirecciones,RepositorioJefaturasDirecciones>();
            services.AddScoped<IRepositorioLineaNegocio,RepositorioLineaNegocio>();
            services.AddScoped<IRepositorioMacroActividad,RepositorioMacroActividad>();
            services.AddScoped<IRepositorioMetodologiaCX,RepositorioMetodologiaCX>();
            services.AddScoped<IRepositorioPeriodicidad,RepositorioPeriodicidad>();
            services.AddScoped<IRepositorioPreguntasEncuestas, RepositorioPreguntasEncuestas>(); //**
            services.AddScoped<IRepositorioRespuestasPreguntasEncuesta, RepositorioRespuestasPreguntaEncuesta>(); //**
            services.AddScoped<IRepositorioSectores,RepositorioSectores>();
            services.AddScoped<IRepositorioSegmentos,RepositorioSegmentos>();
            services.AddScoped<IRepositorioServicioLineaNegocio,RepositorioServicioLineaNegocio>();
            services.AddScoped<IRepositorioServicioSocio,RepositorioServicioSocio>();
            services.AddScoped<IRepositorioSocios,RepositorioSocios>();
            services.AddScoped<IRepositorioTipoContactoEncuesta,RepositorioTipoContactoEncuesta>();
            services.AddScoped<IRepositorioTipoIdentificacion, RepositorioTipoIdentificacion>();
            services.AddScoped<IRepositorioTipoEncuesta,RepositorioTipoEncuesta>();
            services.AddScoped<IRepositorioTipoIndicador,RepositorioTipoIndicador>();
            services.AddScoped<IRepositorioTipoInteraccion,RepositorioTipoInteraccion>();
            services.AddScoped<IRepositorioTipoMetrica, RepositorioTipoMetrica>();
            services.AddScoped<IRepositorioTipoPerspectivas, RepositorioTipoPerspectivas>();
            services.AddScoped<IRepositorioTiposPersona, RepositorioTiposPersona>();
            services.AddScoped<IRepositorioTipoTaller, RepositorioTipoTaller>();
            services.AddScoped<IRepositorioFasesCJ, RepositorioFasesCJ>();
            services.AddScoped<IRepositorioMantenimientoHallazgo, RepositorioMantenimientoHallazgo>();
            services.AddScoped<IRepositorioTalleresCoCreacion, RepositorioTalleresCoCreacion>();

            return services;
        }
    }
}
