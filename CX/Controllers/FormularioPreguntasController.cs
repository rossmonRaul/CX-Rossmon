using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.FaseServicio;
using Dominio.Interfaces.Aplicacion.FormularioPreguntas;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace TC.Controllers
{
    [Route("{controller}")]
    [ApiController]

    public class FormularioPreguntasController : Controller
    {
        private readonly IServicioFormularioPreguntas servicioFormularioPreguntas;

        public FormularioPreguntasController(IServicioFormularioPreguntas servicioFormularioPreguntas)
        {
            this.servicioFormularioPreguntas = servicioFormularioPreguntas;
        }
        [HttpGet("[action]/{idPreguntaEncuesta}")]
        public async Task<JsonResult> ObtenerPreguntaRespuestaPorID(int idPreguntaEncuesta)
        {
            return Json(await this.servicioFormularioPreguntas.ObtenerPreguntaRespuestaPorID(idPreguntaEncuesta));
        }
    }
}