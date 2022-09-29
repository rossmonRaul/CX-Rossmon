using BussinesLogic.Servicios;
using Dominio.Entiti;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Interfaces.Aplicacion.TipoContactoEncuesta;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class TipoContactoEncuestaController : Controller
    {
        private readonly IServicioTipoContactoEncuesta servicioTipoContactoEncuesta;

        public TipoContactoEncuestaController(IServicioTipoContactoEncuesta servicioTipoContactoEncuesta)
        {
            this.servicioTipoContactoEncuesta = servicioTipoContactoEncuesta;
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            return Json(await this.servicioTipoContactoEncuesta.InsertarTipoContactoEncuesta(entitiTipoContactoEncuesta));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta)
        {
            return Json(await this.servicioTipoContactoEncuesta.ActualizarTipoContactoEncuesta(entitiTipoContactoEncuesta));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoContactoEncuesta(int idTipoContactoEncuesta)
        {
            return Json(await this.servicioTipoContactoEncuesta.EliminarTipoContactoEncuesta(idTipoContactoEncuesta));
        }

        [HttpGet("[action]/{idTipoContactoEncuesta}")]
        public async Task<JsonResult> ObtenerTipoContactoEncuestaPorID(int idTipoContactoEncuesta)
        {
            return Json(await this.servicioTipoContactoEncuesta.ObtenerTipoContactoEncuestaPorID(idTipoContactoEncuesta));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoContactoEncuesta()
        {
            return Json(await this.servicioTipoContactoEncuesta.ObtenerTipoContactoEncuesta());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoContactoEncuestaActivos()
        {
            return Json(await this.servicioTipoContactoEncuesta.ObtenerTipoContactoEncuestaActivos());
        }
    }
}
