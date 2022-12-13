using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioPreguntasEncuestas
    {
        Task<DtoRespuestaSP> InsertarPreguntaEncuesta(EntitiPreguntasEncuestas entitiPreguntas);
        Task<DtoRespuestaSP> ActualizarPregunta(EntitiPreguntasEncuestas entitiPreguntas);
        Task<DtoRespuestaSP> EliminarPreguntaEncuesta(int idPreguntaEncuesta);
        Task<DtoPreguntasEncuestas> ObtenerPreguntaPorID(int idPregunta);
        Task<DtoPreguntasEncuestas> ObtenerUltimoIdPregunta();
        Task<List<DtoPreguntasEncuestas>> ObtenerPregunta();
    }
}
