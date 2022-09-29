using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.EtapasTaller;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class EtapasTallerController : Controller
    {
        private readonly IServicioEtapasTaller servicioEtapasTaller;
        public EtapasTallerController(IServicioEtapasTaller servicioEtapasTaller)
        {
            this.servicioEtapasTaller = servicioEtapasTaller;
        }

    [HttpPost("[action]")]
        public async Task<JsonResult> InsertarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller)
        {
            return Json(await this.servicioEtapasTaller.InsertarEtapasTaller(entitiEtapasTaller));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller)
        {
            return Json(await this.servicioEtapasTaller.ActualizarEtapasTaller(entitiEtapasTaller));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarEtapasTaller(int idEtapaTaller)
        {
            return Json(await this.servicioEtapasTaller.EliminarEtapasTaller(idEtapaTaller));
        }

        [HttpGet("[action]/{idEtapaTaller}")]
        public async Task<JsonResult> ObtenerEtapasTallerPorID(int idEtapaTaller)
        {
            return Json(await this.servicioEtapasTaller.ObtenerEtapasTallerPorID(idEtapaTaller));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerEtapasTaller()
        {
            return Json(await this.servicioEtapasTaller.ObtenerEtapasTaller());
        }
    }
}
