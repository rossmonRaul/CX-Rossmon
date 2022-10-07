using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.TipoIndicador
{
    public interface IServicioTipoIndicador
    {
         Task<DtoRespuestaSP> InsertarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador);

         Task<DtoRespuestaSP> ActualizarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador);

         Task<DtoRespuestaSP> ActualizarValorIndicador(EntitiValorIndicador entitiValorIndicador);

         Task<DtoRespuestaSP> EliminarTipoIndicador(int idTipoIndicador);
  
         Task<DtoTipoIndicador> ObtenerTipoIndicadorPorID(int idTipoIndicador);
 
         Task<List<DtoValorIndicador>> ObtenerValoresIndicadorPorID(int idTipoIndicador);

         Task<List<DtoTipoIndicador>> ObtenerTipoIndicador();

         Task<List<DtoTipoIndicador>> ObtenerTipoIndicadorActivos();
    }
}
