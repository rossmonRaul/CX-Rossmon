using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Canales;
using Dominio.Interfaces.Aplicacion.PreguntasEncuesta;
using Dominio.Interfaces.Aplicacion.RespuestasPreguntaEncuesta;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]

    public class RespuestasPreguntaEncuestaController : Controller
    {
        private readonly IServicioRespuestasPreguntaEncuesta servicioRespuestasPreguntaEncuesta;

        public RespuestasPreguntaEncuestaController(IServicioRespuestasPreguntaEncuesta servicioRespuestasPreguntaEncuesta)
        {
            this.servicioRespuestasPreguntaEncuesta = servicioRespuestasPreguntaEncuesta;
        }

        [HttpGet("[action]/{idRespuestasPE}")]
        public async Task<JsonResult> ObtenerRespuestasPreguntaPorID(int idRespuestasPE)
        {
            return Json(await this.servicioRespuestasPreguntaEncuesta.ObtenerRespuestasPreguntaEncuestaPorID(idRespuestasPE));
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarRespuestaPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta)
        {
            return Json(await this.servicioRespuestasPreguntaEncuesta.InsertarRespuestaPreguntaEncuesta(entitiRespuestasPreguntasEncuesta));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarRespuestasPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta)
        {
            return Json(await this.servicioRespuestasPreguntaEncuesta.ActualizarRespuestasPreguntaEncuesta(entitiRespuestasPreguntasEncuesta));
        }
    }
}