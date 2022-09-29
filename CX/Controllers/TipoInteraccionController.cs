using BussinesLogic.Servicios;
using Dominio.Entiti;
using Microsoft.AspNetCore.Mvc;
using Dominio.Interfaces.Aplicacion.TipoInteraccion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class TipoInteraccionController : Controller
    {
        private readonly IServicioTipoInteraccion servicioTipoInteraccion;

        public TipoInteraccionController(IServicioTipoInteraccion servicioTipoInteraccion)
        {
            this.servicioTipoInteraccion = servicioTipoInteraccion;
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            return Json(await this.servicioTipoInteraccion.InsertarTipoInteraccion(entitiTipoInteraccion));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            return Json(await this.servicioTipoInteraccion.ActualizarTipoInteraccion(entitiTipoInteraccion));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoInteraccion(int idTipoInteraccion)
        {
            return Json(await this.servicioTipoInteraccion.EliminarTipoInteraccion(idTipoInteraccion));
        }

        [HttpGet("[action]/{idTipoInteraccion}")]
        public async Task<JsonResult> ObtenerTipoInteraccionPorID(int idTipoInteraccion)
        {
            return Json(await this.servicioTipoInteraccion.ObtenerTipoInteraccionPorID(idTipoInteraccion));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoInteraccion()
        {
            return Json(await this.servicioTipoInteraccion.ObtenerTipoInteraccion());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoInteraccionActivos()
        {
            return Json(await this.servicioTipoInteraccion.ObtenerTipoInteraccionActivos());
        }
    }
}
