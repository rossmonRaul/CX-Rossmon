using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Canales;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class CanalesController : Controller
    {
        private readonly IServicioCanales servicioCanales;

        public CanalesController(IServicioCanales servicioCanales)
        {
            this.servicioCanales = servicioCanales;
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerCanales()
        {
            return Json(await this.servicioCanales.ObtenerCanales());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarCanales(EntitiCanales entitiCanales)
        {
            return Json(await this.servicioCanales.InsertarCanales(entitiCanales));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarCanales(EntitiCanales entitiCanales)
        {
            return Json(await this.servicioCanales.ActualizarCanales(entitiCanales));
        }

        [HttpGet("[action]/{idCanal}")]
        public async Task<JsonResult> ObtenerCanalesPorID(int idCanal)
        {
            return Json(await this.servicioCanales.ObtenerCanalesPorID(idCanal));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarCanales(int idCanal)
        {
            return Json(await this.servicioCanales.EliminarCanales(idCanal));
        }
    }
}