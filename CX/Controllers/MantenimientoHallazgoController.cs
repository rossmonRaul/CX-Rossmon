using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.MantenimientoHallazgo;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class MantenimientoHallazgoController : Controller
    {
        private readonly IServicioMantenimientoHallazgo servicioMantenimientoHallazgo;
        public MantenimientoHallazgoController(IServicioMantenimientoHallazgo servicioMantenimientoHallazgo)
        {
            this.servicioMantenimientoHallazgo = servicioMantenimientoHallazgo;
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerCantidadMantenimientoHallazgo()
        {
            return Json(await this.servicioMantenimientoHallazgo.ObtenerCantidadMantenimientoHallazgo());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerDatosOrbe()
        {
            return Json(await this.servicioMantenimientoHallazgo.ObtenerDatosOrbe());
        }
    }
}
