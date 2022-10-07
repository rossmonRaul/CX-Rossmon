using BussinesLogic.Servicios;
using Dominio.Entiti;
using Microsoft.AspNetCore.Mvc;
using Dominio.Interfaces.Aplicacion.TipoMetrica;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class TipoMetricaController : Controller
    {
        private readonly IServicioTipoMetrica servicioTipoMetrica;

        public TipoMetricaController(IServicioTipoMetrica servicioTipoMetrica)
        {
            this.servicioTipoMetrica = servicioTipoMetrica;
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            return Json(await this.servicioTipoMetrica.InsertarTipoMetrica(entitiTipoMetrica));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            return Json(await this.servicioTipoMetrica.ActualizarTipoMetrica(entitiTipoMetrica));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoMetrica(int idTipoMetrica)
        {
            return Json(await this.servicioTipoMetrica.EliminarTipoMetrica(idTipoMetrica));
        }

        [HttpGet("[action]/{idTipoMetrica}")]
        public async Task<JsonResult> ObtenerTipoMetricaPorID(int idTipoMetrica)
        {
            return Json(await this.servicioTipoMetrica.ObtenerTipoMetricaPorID(idTipoMetrica));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTiposMetricas()
        {
            return Json(await this.servicioTipoMetrica.ObtenerTiposMetricas());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTiposMetricasActivos()
        {
            return Json(await this.servicioTipoMetrica.ObtenerTipoMetricaActivos());
        }
    }
}
