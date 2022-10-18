using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.TalleresCoCreacion
{
    public interface IServicioTalleresCoCreacion
    {
        Task<List<DtoTallerCoCreacion>> ObtenerTalleresCoCreacion();

        Task<DtoRespuestaSP> InsertarTalleresCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion);

        Task<DtoRespuestaSP> ActualizarTallerCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion);

        Task<DtoTallerCoCreacion> ObtenerTallerCoCreacion(int idTallerCoCreacion);

        Task<DtoRespuestaSP> EliminarTallerCoCreacion(int idTallerCoCreacion);

        Task<List<DtoTallerCoCreacion>> ObtenerTalleresCoCreacionActivos();
    }
}
