
using BussinesLogic.Servicios;
using Dominio.Entiti;
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
        private readonly ServicioGradosEsfuerzo servicioGradosEsfuerzo = new ServicioGradosEsfuerzo();

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

        
    }
}
