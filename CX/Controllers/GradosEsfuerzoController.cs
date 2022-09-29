using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.GradoEsfuerzo;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class GradosEsfuerzoController : Controller
    {
        private readonly IServicioGradoEsfuerzo servicioGradosEsfuerzo;

        public GradosEsfuerzoController(IServicioGradoEsfuerzo servicioGradosEsfuerzo)
        {
            this.servicioGradosEsfuerzo = servicioGradosEsfuerzo;
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerGradosEsfuerzo()
        {
            return Json(await this.servicioGradosEsfuerzo.ObtenerGradosEsfuerzo());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarGradosEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            return Json(await this.servicioGradosEsfuerzo.InsertarGradosEsfuerzo(entitiGradosEsfuerzo));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarGradoEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            return Json(await this.servicioGradosEsfuerzo.ActualizarGradoEsfuerzo(entitiGradosEsfuerzo));
        }


        [HttpGet("[action]/{idGradoEsfuerzo}")]
        public async Task<JsonResult> ObtenerGradoEsfuerzoPorID(int idGradoEsfuerzo)
        {
            return Json(await this.servicioGradosEsfuerzo.ObtenerGradoEsfuerzoPorID(idGradoEsfuerzo));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarGradoEsfuerzo(int idGradoEsfuerzo)
        {
            return Json(await this.servicioGradosEsfuerzo.EliminarGradoEsfuerzo(idGradoEsfuerzo));
        }


    }
}
