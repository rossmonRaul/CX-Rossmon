using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.TipoMetrica
{
    public interface IServicioTipoMetrica
    {
         Task<DtoRespuestaSP> InsertarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica);

         Task<DtoRespuestaSP> ActualizarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica);

         Task<DtoRespuestaSP> EliminarTipoMetrica(int idTipoMetrica);

         Task<DtoTipoMetrica> ObtenerTipoMetricaPorID(int idTipoMetrica);

         Task<List<DtoTipoMetrica>> ObtenerTiposMetricas();

         Task<List<DtoTipoMetrica>> ObtenerTipoMetricaActivos();
    }
}
