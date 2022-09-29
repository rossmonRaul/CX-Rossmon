using DataAccess.StoredProcedures;
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
            services.AddScoped<IRepositorioCanales, SPCanales>();
            services.AddScoped<IRepositorioCategorias, SPCategorias>();
            services.AddScoped<IRepositorioDirecciones, SPDirecciones>();
            services.AddScoped<IRepositorioEstadoAceptacion,SPEstadoAceptacion>();
            services.AddScoped<IRepositorioEstadoHallazgo,SPEstadoHallazgo>();
            services.AddScoped<IRepositorioEtapasTaller,SPEtapasTaller>();
            services.AddScoped<IRepositorioFaseServicios, SPFaseServicios>();
            services.AddScoped<IRepositorioGradoImpacto,SPGradoImpacto>();
            services.AddScoped<IRepositorioGradosEsfuerzo,SPGradosEsfuerzo>();
            services.AddScoped<IRepositorioJefaturasDirecciones,SPJefaturasDirecciones>();
            services.AddScoped<IRepositorioLineaNegocio,SPLineaNegocio>();
            services.AddScoped<IRepositorioMacroActividad,SPMacroActividad>();
            services.AddScoped<IRepositorioMetodologiaCX,SPMetodologiaCX>();
            services.AddScoped<IRepositorioPeriodicidad,SPPeriodicidad>();
            services.AddScoped<IRepositorioSectores,SPSectores>();
            services.AddScoped<IRepositorioSegmentos,SPSegmentos>();
            services.AddScoped<IRepositorioServicioLineaNegocio,SPServicioLineaNegocio>();
            services.AddScoped<IRepositorioServicioSocio,SPServicioSocio>();
            services.AddScoped<IRepositorioSocios,SPSocios>();
            services.AddScoped<IRepositorioTipoContactoEncuesta,SPTipoContactoEncuesta>();
            services.AddScoped<IRepositorioTipoIdentificacion, SPTipoIdentificacion>();
            services.AddScoped<IRepositorioTipoEncuesta,SPTipoEncuesta>();
            services.AddScoped<IRepositorioTipoIndicador,SPTipoIndicador>();
            services.AddScoped<IRepositorioTipoInteraccion,SPTipoInteraccion>();
            services.AddScoped<IRepositorioTipoMetrica,SPTipoMetrica>();
            services.AddScoped<IRepositorioTipoPerspectivas,SPTipoPerspectivas>();
            services.AddScoped<IRepositorioTiposPersona,SPTiposPersona>();
            services.AddScoped<IRepositorioTipoTaller,SPTipoTaller>();
            return services;
        }
    }
}
