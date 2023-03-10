using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Canales;
using Dominio.Interfaces.Aplicacion.PreguntasAsignadas;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace TC.Controllers
{
    [Route("{controller}")]
    [ApiController]

    public class PreguntasAsignadasController : Controller
    {
        private readonly IServicioPreguntasAsignadas servicioPreguntasAsignadas;

        public PreguntasAsignadasController(IServicioPreguntasAsignadas servicioPreguntasAsignadas)
        {
            this.servicioPreguntasAsignadas = servicioPreguntasAsignadas;
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> AsignarPregunta(EntitiPreguntaAsignada entitiPreguntaAsignada) {
            return Json(await this.servicioPreguntasAsignadas.AsignarPregunta(entitiPreguntaAsignada));
        }

        [HttpGet("[action]/{idEncuesta}")]
        public async Task<JsonResult> ObtenerPreguntasPorIdEncuesta(int idEncuesta)
        {
            return Json(await this.servicioPreguntasAsignadas.ObtenerPreguntasPorIdEncuesta(idEncuesta));
        }

        [HttpGet("[action]/{idEncuesta}")]
        public async Task<JsonResult> ObtenerPreguntasNoAsignadasPorIdEncuesta(int idEncuesta)
        {
            return Json(await this.servicioPreguntasAsignadas.ObtenerPreguntasNoAsignadasPorIdEncuesta(idEncuesta));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> DesasignarPregunta(int idAsignacion)
        {
            return Json(await this.servicioPreguntasAsignadas.DesasignarPregunta(idAsignacion));
        }

    }
}