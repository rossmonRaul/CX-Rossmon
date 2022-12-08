using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioRespuestasPreguntasEncuesta
    {
        Task<DtoRespuestaSP> InsertarRespuestaPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta);
        Task <List<DtoRespuestasPreguntasEncuesta>> ObtenerRespuestasPreguntaEcuestaPorID(int idRespuestasPE);
        Task<DtoRespuestaSP> ActualizarRespuestaPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta);
    }
}
