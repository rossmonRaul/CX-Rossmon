using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Encuesta;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class EncuestaController : Controller
    {
        private readonly IServicioEncuestas servicioEncuestas;

        public EncuestaController(IServicioEncuestas servicioEncuestas)
        {
            this.servicioEncuestas = servicioEncuestas;
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerEncuestas()
        {
            return Json(await this.servicioEncuestas.ObtenerEncuestas());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerEncuestasActivas()
        {
            return Json(await this.servicioEncuestas.ObtenerEncuestasActivas());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarEncuesta(EntitiEncuesta entitiEncuesta)
        {
            return Json(await this.servicioEncuestas.InsertarEncuestas(entitiEncuesta));

        }

        [HttpGet("[action]/{token}")]
        public async Task<bool> ValidarToken(string token)
        {
            return await this.servicioEncuestas.ValidarToken(token);
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarEncuesta(EntitiEncuesta entitiEncuesta)
        {
            return Json(await this.servicioEncuestas.ActualizarEncuesta(entitiEncuesta));
        }


        [HttpGet("[action]/{idEncuesta}")]
        public async Task<JsonResult> ObtenerEncuestaPorID(int idEncuesta)
        {
            return Json(await this.servicioEncuestas.ObtenerEncuestaPorID(idEncuesta));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarEncuesta(int idEncuesta)
        {
            return Json(await this.servicioEncuestas.EliminarEncuesta(idEncuesta));
        }
    }
}
