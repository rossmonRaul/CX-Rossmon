using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.PreguntasAsignadas
{
    public interface IServicioPreguntasAsignadas
    {
        Task<DtoRespuestaSP> AsignarPregunta(EntitiPreguntaAsignada entitiPreguntaAsignada);
        Task<DtoRespuestaSP> DesasignarPregunta(int idPreguntaEncuesta);
        Task<List<DtoPreguntaAsignada>> ObtenerPreguntasPorIdEncuesta(int idEncuesta);
    }
}
