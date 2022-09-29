using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Periodicidad;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class PeriodicidadController : Controller
    {
        private readonly IServicioPeriodicidad servicioPeriodicidad;

        public PeriodicidadController(IServicioPeriodicidad servicioPeriodicidad)
        {
            this.servicioPeriodicidad = servicioPeriodicidad;
        }

    [HttpPost("[action]")]
        public async Task<JsonResult> InsertarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad)
        {
            return Json(await this.servicioPeriodicidad.InsertarPeriodicidad(entitiPeriodicidad));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarPeriodicidad(EntitiPeriodicidad entitiPeriodicidad)
        {
            return Json(await this.servicioPeriodicidad.ActualizarPeriodicidad(entitiPeriodicidad));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarPeriodicidad(int idPeriodicidad)
        {
            return Json(await this.servicioPeriodicidad.EliminarPeriodicidad(idPeriodicidad));
        }

        [HttpGet("[action]/{idPeriodicidad}")]
        public async Task<JsonResult> ObtenerPeriodicidadPorID(int idPeriodicidad)
        {
            return Json(await this.servicioPeriodicidad.ObtenerPeriodicidadPorID(idPeriodicidad));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerPeriodicidad()
        {
            return Json(await this.servicioPeriodicidad.ObtenerPeriodicidad());
        }
    }
}
