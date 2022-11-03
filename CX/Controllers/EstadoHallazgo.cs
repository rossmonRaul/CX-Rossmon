using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.EstadoHallazgo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class EstadoHallazgoController : Controller
    {
        private readonly IServicioEstadoHallazgo servicioEstadoHallazgo;

        public EstadoHallazgoController(IServicioEstadoHallazgo servicioEstadoHallazgo)
        {
            this.servicioEstadoHallazgo = servicioEstadoHallazgo;
        }

    [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerEstadoHallazgo()
        {
            return Json(await this.servicioEstadoHallazgo.ObtenerEstadoHallazgo());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo)
        {
            return Json(await this.servicioEstadoHallazgo.InsertarEstadoHallazgo(entitiEstadoHallazgo));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo)
        {
            return Json(await this.servicioEstadoHallazgo.ActualizarEstadoHallazgo(entitiEstadoHallazgo));
        }

        [HttpGet("[action]/{idEstadoHallazgo}")]
        public async Task<JsonResult> ObtenerEstadoHallazgoPorID(int idEstadoHallazgo)
        {
            return Json(await this.servicioEstadoHallazgo.ObtenerEstadoHallazgoPorID(idEstadoHallazgo));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarEstadoHallazgo(int idEstadoHallazgo)
        {
            return Json(await this.servicioEstadoHallazgo.EliminarEstadoHallazgo(idEstadoHallazgo));
        }
    }
}