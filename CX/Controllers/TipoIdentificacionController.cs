using BussinesLogic.Servicios;
using Dominio.Entiti;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Interfaces.Aplicacion.TipoIdentificacion;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class TipoIdentificacionController : Controller
    {
        private readonly IServicioTipoIdentificacion servicioTipoIdentificacion;

        public TipoIdentificacionController(IServicioTipoIdentificacion servicioTipoIdentificacion)
        {
            this.servicioTipoIdentificacion = servicioTipoIdentificacion;
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoIdentificacion(EntitiTipoIdentificacion entitiTipoIdentificacion)
        {
            return Json(await this.servicioTipoIdentificacion.InsertarTipoIdentificacion(entitiTipoIdentificacion));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoIdentificacion(EntitiTipoIdentificacion entitiTipoIdentificacion)
        {
            return Json(await this.servicioTipoIdentificacion.ActualizarTipoIdentificacion(entitiTipoIdentificacion));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoIdentificacion(int idTipoIdentificacion)
        {
            return Json(await this.servicioTipoIdentificacion.EliminarTipoIdentificacion(idTipoIdentificacion));
        }

        [HttpGet("[action]/{idTipoIdentificacion}")]
        public async Task<JsonResult> ObtenerTipoIdentificacionPorID(int idTipoIdentificacion)
        {
            return Json(await this.servicioTipoIdentificacion.ObtenerTipoIdentificacionPorID(idTipoIdentificacion));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoIdentificacion()
        {
            return Json(await this.servicioTipoIdentificacion.ObtenerTipoIdentificacion());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoIdentificacionActivos()
        {
            return Json(await this.servicioTipoIdentificacion.ObtenerTipoIdentificacionActivos());
        }
    }
}
