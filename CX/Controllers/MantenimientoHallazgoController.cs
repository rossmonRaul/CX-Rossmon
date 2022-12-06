using BussinesLogic.Servicios;
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


        [HttpPost("[action]")]
        public async Task<JsonResult> AgregarMantenimientoHallazgo(EntitiHallazgo EntitiHallazgo)
        {
            return Json(await this.servicioMantenimientoHallazgo.AgregarMantenimientoHallazgo(EntitiHallazgo));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarMantenimientoHallazgo(EntitiHallazgo EntitiHallazgo)
        {
            return Json(await this.servicioMantenimientoHallazgo.ActualizarMantenimientoHallazgo(EntitiHallazgo));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarMantenimientoHallazgo(int idMantenimientoHallazgo)
        {
            return Json(await this.servicioMantenimientoHallazgo.EliminarMantenimientoHallazgo(idMantenimientoHallazgo));
        }

        [HttpGet("[action]/{idMantenimientoHallazgo}")]
        public async Task<JsonResult> ObtenerMantenimientoHallazgoPorID(int idMantenimientoHallazgo)
        {
            return Json(await this.servicioMantenimientoHallazgo.ObtenerMantenimientoHallazgoPorID(idMantenimientoHallazgo));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerMantenimientoHallazgo()
        {
            return Json(await this.servicioMantenimientoHallazgo.ObtenerMantenimientoHallazgo());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerGridMantenimientoHallazgo()
        {
            return Json(await this.servicioMantenimientoHallazgo.ObtenerGridMantenimientoHallazgo());
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
