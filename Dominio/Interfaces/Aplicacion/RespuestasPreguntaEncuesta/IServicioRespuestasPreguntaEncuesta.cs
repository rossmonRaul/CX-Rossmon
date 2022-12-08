using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.RespuestasPreguntaEncuesta
{
    public interface IServicioRespuestasPreguntaEncuesta
    {
        Task<DtoRespuestaSP> InsertarRespuestaPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta);
        Task<DtoRespuestaSP> ActualizarRespuestasPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta);
        Task <List<DtoRespuestasPreguntasEncuesta>> ObtenerRespuestasPreguntaEncuestaPorID(int idRespuestasPE);
    }
}
