using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.EtapaTallerCo;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class EtapasTallerCoController : Controller
    {
        private readonly IServicioEtapaTallerCo servicioEtapasTallerCo;
        public EtapasTallerCoController(IServicioEtapaTallerCo servicioEtapasTallerCo)
        {
            this.servicioEtapasTallerCo = servicioEtapasTallerCo;
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> AgregarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo)
        {
            return Json(await this.servicioEtapasTallerCo.AgregarEtapaTallerCo(entitiEtapaTallerCo));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo)
        {
            return Json(await this.servicioEtapasTallerCo.ActualizarEtapaTallerCo(entitiEtapaTallerCo));
        }
        /*
        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarMantenimientoTallerCoCreacion(int idMantenimientoTalleresCoCreacion)
        {
            return Json(await this.servicioEtapasTallerCo.EliminarMantenimientoTallerCoCreacion(idMantenimientoTalleresCoCreacion));
        }*/

        [HttpGet("[action]/{idEtapaTallerCo}")]
        public async Task<JsonResult> ObtenerEtapaTallerCoPorID(int idEtapaTallerCo)
        {
            return Json(await this.servicioEtapasTallerCo.ObtenerEtapaTallerCoPorID(idEtapaTallerCo));
        }

        [HttpGet("[action]/{idTipoTaller}")]
        public async Task<JsonResult> ObtenerEtapasTallerCo(int idTipoTaller)
        {
            return Json(await this.servicioEtapasTallerCo.ObtenerEtapasTallerCo(idTipoTaller));
        }

        [HttpGet("[action]/{idTipoTaller}")]
        public async Task<JsonResult> ObtenerFechasTallerCo(int idTipoTaller)
        {
            return Json(await this.servicioEtapasTallerCo.ObtenerFechasTallerCo(idTipoTaller));
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerCantidadEtapasTallerCo()
        {
            return Json(await this.servicioEtapasTallerCo.ObtenerCantidadEtapasTallerCo());
        }

    }
}
