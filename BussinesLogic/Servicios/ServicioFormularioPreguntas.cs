using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.FormularioPreguntas;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace BussinesLogic.Servicios
{
    public class ServicioFormularioPreguntas : IServicioFormularioPreguntas
    {
        public  IRepositorioFormularioPreguntas repositorioFormularioPregunta;

        public ServicioFormularioPreguntas(IRepositorioFormularioPreguntas repositorioFormularioPreguntas)
        {
            this.repositorioFormularioPregunta = repositorioFormularioPreguntas;
        }

            public async Task <List<DtoRespuestasPreguntasEncuesta>> ObtenerPreguntaRespuestaPorID(int idPreguntaEncuesta)
        {
            return await this.repositorioFormularioPregunta.ObtenerPreguntaRespuestaPorID(idPreguntaEncuesta);
        }

    }
}
