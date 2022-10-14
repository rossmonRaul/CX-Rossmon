using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TalleresCoCreacion;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTalleresCoCreacion : IServicioTalleresCoCreacion
    {
        public readonly IRepositorioTalleresCoCreacion repositorioTalleresCoCreacion;

        public ServicioTalleresCoCreacion(IRepositorioTalleresCoCreacion repositorioTalleresCoCreacion)
        {
            this.repositorioTalleresCoCreacion = repositorioTalleresCoCreacion;
        }


        public async Task<List<DtoTallerCoCreacion>> ObtenerTalleresCoCreacion()
        {
            return await this.repositorioTalleresCoCreacion.ObtenerTalleresCoCreacion();
        }

        public async Task<DtoRespuestaSP> InsertarTalleresCoCreacion(EntitiTallerCoCreacion entitiTalleresCoCreacion)
        {
            return await this.repositorioTalleresCoCreacion.InsertarTalleresCoCreacion(entitiTalleresCoCreacion);
        }

        public async Task<DtoRespuestaSP> ActualizarTallerCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion)
        {
            return await this.repositorioTalleresCoCreacion.ActualizarTallerCoCreacion(entitiTallerCoCreacion);
        }

        public async Task<DtoTallerCoCreacion> ObtenerTallerCoCreacion(int idTallerCoCreacion)
        {
            return await this.repositorioTalleresCoCreacion.ObtenerTallerCoCreacion(idTallerCoCreacion);
        }
        public async Task<DtoRespuestaSP> EliminarTallerCoCreacion(int idTalleresCoCreacion)
        {
            return await this.repositorioTalleresCoCreacion.EliminarTallerCoCreacion(idTalleresCoCreacion);
        }

        public async Task<List<DtoTallerCoCreacion>> ObtenerTalleresCoCreacionActivos()
        {
            return await this.repositorioTalleresCoCreacion.ObtenerTalleresCoCreacionActivos();
        }
    }
}
