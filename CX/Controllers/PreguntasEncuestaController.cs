using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Canales;
using Dominio.Interfaces.Aplicacion.PreguntasEncuesta;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]

    public class PreguntasEncuestaController : Controller
    {
        private readonly IServicioPreguntasEncuesta servicioPreguntasEncuesta;

        public PreguntasEncuestaController(IServicioPreguntasEncuesta servicioPreguntasEncuesta)
        {
            this.servicioPreguntasEncuesta = servicioPreguntasEncuesta;
        }



        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarPreguntaEncuesta(EntitiPreguntasEncuestas entitiPreguntasEncuestas)
        {
            return Json(await this.servicioPreguntasEncuesta.InsertarPregunta(entitiPreguntasEncuestas));
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerPregunta()
        {
            return Json(await this.servicioPreguntasEncuesta.ObtenerPregunta());
        }

        [HttpGet("[action]/{idPregunta}")]
        public async Task<JsonResult> ObtenerPreguntaPorID(int idPregunta)
        {
            return Json(await this.servicioPreguntasEncuesta.ObtenerPreguntaPorID(idPregunta));
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerUltimoIdPregunta()
        {
            return Json(await this.servicioPreguntasEncuesta.ObtenerUltimoIdPregunta());
        }


        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarPreguntaEncuesta(int idPreguntaEncuesta)
        {
            return Json(await this.servicioPreguntasEncuesta.EliminarPreguntaEncuesta(idPreguntaEncuesta));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarPregunta(EntitiPreguntasEncuestas entitiPreguntas)
        {
            return Json(await this.servicioPreguntasEncuesta.ActualizarPregunta(entitiPreguntas));
        }
    }
}