using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioTalleresCoCreacion
    {
        Task<List<DtoTallerCoCreacion>> ObtenerTalleresCoCreacion();

        Task<DtoRespuestaSP> InsertarTalleresCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion);

        Task<DtoRespuestaSP> ActualizarTallerCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion);

        Task<DtoTallerCoCreacion> ObtenerTallerCoCreacion(int idTallerCoCreacion);

        Task<DtoRespuestaSP> EliminarTallerCoCreacion(int idTallerCoCreacion);

        Task<List<DtoTallerCoCreacion>> ObtenerTalleresCoCreacionActivos();
    }
}
