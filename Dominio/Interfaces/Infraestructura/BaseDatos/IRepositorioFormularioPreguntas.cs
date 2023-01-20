using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioFormularioPreguntas
    {
        Task<List<DtoRespuestasPreguntasEncuesta>> ObtenerPreguntaRespuestaPorID(int idPreguntaEncuesta);
    }
}
