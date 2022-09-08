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
    public class TipoEncuestaController : Controller
    {
        private readonly ServicioTipoEncuesta servicioTipoEncuesta = new ServicioTipoEncuesta();


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta)
        {
            return Json(await this.servicioTipoEncuesta.InsertarTipoEncuesta(entitiTipoEncuesta));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoEncuesta(EntitiTipoEncuesta entitiTipoEncuesta)
        {
            return Json(await this.servicioTipoEncuesta.ActualizarTipoEncuesta(entitiTipoEncuesta));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoEncuesta(int idTipoEncuesta)
        {
            return Json(await this.servicioTipoEncuesta.EliminarTipoEncuesta(idTipoEncuesta));
        }

        [HttpGet("[action]/{idTipoEncuesta}")]
        public async Task<JsonResult> ObtenerTipoEncuestaPorID(int idTipoEncuesta)
        {
            return Json(await this.servicioTipoEncuesta.ObtenerTipoEncuestaPorID(idTipoEncuesta));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTiposEncuestas()
        {
            return Json(await this.servicioTipoEncuesta.ObtenerTipoEncuesta());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoEncuestaActivos()
        {
            return Json(await this.servicioTipoEncuesta.ObtenerTipoEncuestaActivos());
        }
    }
}
