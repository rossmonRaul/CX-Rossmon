using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.TipoPerspectivas
{
    public interface IServicioTipoPerspectivas
    {
         Task<DtoRespuestaSP> InsertarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas);

         Task<DtoRespuestaSP> ActualizarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas);

         Task<DtoRespuestaSP> EliminarTipoPerspectivas(int idTipoPerspectivas);

         Task<DtoTipoPerspectivas> ObtenerTipoPerspectivasPorID(int idTipoPerspectivas);

         Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivas();

         Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivasActivos();

     }
}
