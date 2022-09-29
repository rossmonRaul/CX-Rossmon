using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoTaller;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class TipoTallerController : Controller
    {
        private readonly IServicioTipoTaller servicioTipoTaller;

        public TipoTallerController(IServicioTipoTaller servicioTipoTaller)
        {
            this.servicioTipoTaller = servicioTipoTaller;
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoTaller(EntitiTipoTaller entitiTipoTaller)
        {
            return Json(await this.servicioTipoTaller.InsertarTipoTaller(entitiTipoTaller));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoTaller(EntitiTipoTaller entitiTipoTaller)
        {
            return Json(await this.servicioTipoTaller.ActualizarTipoTaller(entitiTipoTaller));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoTaller(int idTipoTaller)
        {
            return Json(await this.servicioTipoTaller.EliminarTipoTaller(idTipoTaller));
        }

        [HttpGet("[action]/{idTipoTaller}")]
        public async Task<JsonResult> ObtenerTipoTallerPorID(int idTipoTaller)
        {
            return Json(await this.servicioTipoTaller.ObtenerTipoTallerPorID(idTipoTaller));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoTaller()
        {
            return Json(await this.servicioTipoTaller.ObtenerTipoTaller());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoTallerActivos()
        {
            return Json(await this.servicioTipoTaller.ObtenerTipoTallerActivos());
        }
    }
}
