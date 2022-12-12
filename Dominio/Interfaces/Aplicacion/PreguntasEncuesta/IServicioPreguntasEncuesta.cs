using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.PreguntasEncuesta
{
    public interface IServicioPreguntasEncuesta
    {
        Task<DtoRespuestaSP> InsertarPregunta(EntitiPreguntasEncuestas entitiPreguntas);
        Task<DtoRespuestaSP> ActualizarPregunta(EntitiPreguntasEncuestas entitiPreguntas);
        Task<DtoRespuestaSP> EliminarPreguntaEncuesta(int idPreguntaEncuesta);
        Task<DtoPreguntasEncuestas> ObtenerUltimoIdPregunta();
        Task<DtoPreguntasEncuestas> ObtenerPreguntaPorID(int idPregunta);
        Task<List<DtoPreguntasEncuestas>> ObtenerPregunta();
    }
}
