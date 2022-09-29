using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioTipoInteraccion
    {
        Task<DtoRespuestaSP> InsertarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion);
        Task<DtoRespuestaSP> ActualizarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion);
        Task<DtoRespuestaSP> EliminarTipoInteraccion(int idTipoInteraccion);
        Task<DtoTipoInteraccion> ObtenerTipoInteraccionPorID(int idTipoInteraccion);
        Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccion();
        Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccionActivos();
    }
}
