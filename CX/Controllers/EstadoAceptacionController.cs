using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.EstadoAceptacion;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;


namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class EstadoAceptacionController : Controller
    {
        private readonly IServicioEstadoAceptacion servicioEstadoAceptacion;

        public EstadoAceptacionController(IServicioEstadoAceptacion servicioEstadoAceptacion)
        {
            this.servicioEstadoAceptacion = servicioEstadoAceptacion;
        }

    [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerEstadoAceptacion()
        {
            return Json(await this.servicioEstadoAceptacion.ObtenerEstadoAceptacion());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            return Json(await this.servicioEstadoAceptacion.InsertarEstadoAceptacion(entitiEstadoAceptacion));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            return Json(await this.servicioEstadoAceptacion.ActualizarEstadoAceptacion(entitiEstadoAceptacion));
        }

        [HttpGet("[action]/{idEstadoAceptacion}")]
        public async Task<JsonResult> ObtenerEstadoAceptacionPorID(int idEstadoAceptacion)
        {
            return Json(await this.servicioEstadoAceptacion.ObtenerEstadoAceptacionPorID(idEstadoAceptacion));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarEstadoAceptacion(int idEstadoAceptacion)
        {
            return Json(await this.servicioEstadoAceptacion.EliminarEstadoAceptacion(idEstadoAceptacion));
        }
    }
}