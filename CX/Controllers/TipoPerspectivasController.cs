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
    public class TipoPerspectivasController : Controller
    {
        private readonly ServicioTipoPerspectivas servicioTipoPerspectivas = new ServicioTipoPerspectivas();


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            return Json(await this.servicioTipoPerspectivas.InsertarTipoPerspectivas(entitiTipoPerspectivas));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            return Json(await this.servicioTipoPerspectivas.ActualizarTipoPerspectivas(entitiTipoPerspectivas));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoPerspectivas(int idTipoPerspectivas)
        {
            return Json(await this.servicioTipoPerspectivas.EliminarTipoPerspectivas(idTipoPerspectivas));
        }

        [HttpGet("[action]/{idTipoPerspectivas}")]
        public async Task<JsonResult> ObtenerTipoPerspectivasPorID(int idTipoPerspectivas)
        {
            return Json(await this.servicioTipoPerspectivas.ObtenerTipoPerspectivasPorID(idTipoPerspectivas));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoPerspectivas()
        {
            return Json(await this.servicioTipoPerspectivas.ObtenerTipoPerspectivas());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoPerspectivasActivos()
        {
            return Json(await this.servicioTipoPerspectivas.ObtenerTipoPerspectivasActivos());
        }
    }
}
