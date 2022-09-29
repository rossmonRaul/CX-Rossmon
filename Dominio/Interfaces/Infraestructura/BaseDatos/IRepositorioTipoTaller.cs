using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioTipoTaller
    {
        Task<DtoRespuestaSP> InsertarTipoTaller(EntitiTipoTaller entitiTipoTaller);
        Task<DtoRespuestaSP> ActualizarTipoTaller(EntitiTipoTaller entitiTipoTaller);
        Task<DtoRespuestaSP> EliminarTipoTaller(int idTipoTaller);
        Task<DtoTipoTaller> ObtenerTipoTallerPorID(int idTipoTaller);
        Task<List<DtoTipoTaller>> ObtenerTipoTaller();
        Task<List<DtoTipoTaller>> ObtenerTipoTallerActivos();
    }
}
