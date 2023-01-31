using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Encuesta
{
    public interface IServicioEncuestas
    {
         Task<List<DtoEncuesta>> ObtenerEncuestas();

         Task<DtoRespuestaSP> InsertarEncuestas(EntitiEncuesta entitiEncuestas);

         Task<DtoRespuestaSP> ActualizarEncuesta(EntitiEncuesta entitiEncuesta);

         Task<DtoEncuesta> ObtenerEncuestaPorID(int idEncuesta);

         Task<DtoRespuestaSP> EliminarEncuesta(int idEncuestas);

         Task<List<DtoEncuesta>> ObtenerEncuestasActivas();
    }
}
