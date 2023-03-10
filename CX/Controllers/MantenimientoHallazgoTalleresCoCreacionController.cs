using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.MantenimientoTalleresCoCreacion;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TC.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class MantenimientoTalleresCoCreacionController : Controller
    {
        private readonly IServicioMantenimientoTalleresCoCreacion servicioMantenimientoTalleresCoCreacion;
        public MantenimientoTalleresCoCreacionController(IServicioMantenimientoTalleresCoCreacion servicioMantenimientoTalleresCoCreacion)
        {
            this.servicioMantenimientoTalleresCoCreacion = servicioMantenimientoTalleresCoCreacion;
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> AgregarMantenimientoTallerCoCreacion(EntitiMantenimientoTallerCoCreacion entitiMantenimientoTallerCoCreacion)
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.AgregarMantenimientoTallerCoCreacion(entitiMantenimientoTallerCoCreacion));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarMantenimientoTallerCoCreacion(EntitiMantenimientoTallerCoCreacion entitiMantenimientoTallerCoCreacion)
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.ActualizarMantenimientoTallerCoCreacion(entitiMantenimientoTallerCoCreacion));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarMantenimientoTallerCoCreacion(int idMantenimientoTalleresCoCreacion)
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.EliminarMantenimientoTallerCoCreacion(idMantenimientoTalleresCoCreacion));
        }

        [HttpGet("[action]/{idMantenimientoTalleresCoCreacion}")]
        public async Task<JsonResult> ObtenerMantenimientoTallerCoCreacionPorID(int idMantenimientoTalleresCoCreacion)
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.ObtenerMantenimientoTallerCoCreacionPorID(idMantenimientoTalleresCoCreacion));
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerMantenimientoTallerCoCreacion()
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.ObtenerMantenimientoTallerCoCreacion());
        }

        [HttpGet("[action]/{idTipoTaller}")]
        public async Task<JsonResult> ObtenerEtapasTallerCoCreacion(int idTipoTaller)
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.ObtenerEtapasTallerCoCreacion(idTipoTaller));
        }
        [HttpGet("[action]/{idTipoTaller}")]
        public async Task<JsonResult> ObtenerFechasTallerCoCreacion(int idTipoTaller)
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.ObtenerFechasTallerCoCreacion(idTipoTaller));
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerCantidadMantenimientoTalleresCoCreacion()
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.ObtenerCantidadMantenimientoTalleresCoCreacion());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerDatosOrbe()
        {
            return Json(await this.servicioMantenimientoTalleresCoCreacion.ObtenerDatosOrbe());
        }

    }
}
