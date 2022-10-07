using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioTipoMetrica
    {
        Task<DtoRespuestaSP> InsertarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica);
        Task<DtoRespuestaSP> ActualizarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica);
        Task<DtoRespuestaSP> EliminarTipoMetrica(int idTipoMetrica);
        Task<DtoTipoMetrica> ObtenerTipoMetricaPorID(int idTipoMetrica);
        Task<List<DtoTipoMetrica>> ObtenerTiposMetricas();
        Task<List<DtoTipoMetrica>> ObtenerTiposMetricasActivos();
    }
}
