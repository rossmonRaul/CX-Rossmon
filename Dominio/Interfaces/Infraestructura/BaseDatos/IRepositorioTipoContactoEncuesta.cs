using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioTipoContactoEncuesta
    {
        Task<DtoRespuestaSP> InsertarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta);
        Task<DtoRespuestaSP> ActualizarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta);
        Task<DtoRespuestaSP> EliminarTipoContactoEncuesta(int idTipoContactoEncuesta);
        Task<DtoTipoContactoEncuesta> ObtenerTipoContactoEncuestaPorID(int idTipoContactoEncuesta);
        Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuesta();
        Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuestaActivos();
    }
}
