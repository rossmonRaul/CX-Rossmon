using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TalleresCoCreacion;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class TallerCoCreacionController : Controller
    {
        private readonly IServicioTalleresCoCreacion servicioTalleresCoCreacion;

        public TallerCoCreacionController(IServicioTalleresCoCreacion servicioTalleresCoCreacion)
        {
            this.servicioTalleresCoCreacion = servicioTalleresCoCreacion;
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTalleresCoCreacion()
        {
            return Json(await this.servicioTalleresCoCreacion.ObtenerTalleresCoCreacion());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTalleresCoCreacionActivos()
        {
            return Json(await this.servicioTalleresCoCreacion.ObtenerTalleresCoCreacionActivos());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTallerCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion)
        {
            return Json(await this.servicioTalleresCoCreacion.InsertarTalleresCoCreacion(entitiTallerCoCreacion));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTallerCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion)
        {
            return Json(await this.servicioTalleresCoCreacion.ActualizarTallerCoCreacion(entitiTallerCoCreacion));
        }


        [HttpGet("[action]/{idTallerCoCreacion}")]
        public async Task<JsonResult> ObtenerTallerCoCreacionPorID(int idTallerCoCreacion)
        {
            return Json(await this.servicioTalleresCoCreacion.ObtenerTallerCoCreacion(idTallerCoCreacion));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTallerCoCreacion(int idTallerCoCreacion)
        {
            return Json(await this.servicioTalleresCoCreacion.EliminarTallerCoCreacion(idTallerCoCreacion));
        }
    }
}
