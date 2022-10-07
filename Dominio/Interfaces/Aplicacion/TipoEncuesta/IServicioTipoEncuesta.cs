using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.TipoEncuesta
{
    public interface IServicioTipoEncuesta
    {
         Task<DtoRespuestaSP> InsertarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta);

         Task<DtoRespuestaSP> ActualizarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta);
 
         Task<DtoRespuestaSP> EliminarTipoEncuesta(int idTipoEncuesta);

         Task<DtoTipoEncuesta> ObtenerTipoEncuestaPorID(int idTipoEncuesta);


         Task<List<DtoTipoEncuesta>> ObtenerTipoEncuesta();


         Task<List<DtoTipoEncuesta>> ObtenerTipoEncuestaActivos();
    }
}
