using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.FaseServicio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class FaseServicioController : Controller
    {
        private readonly IServicioFaseServicio servicioFaseServicios;
        public FaseServicioController(IServicioFaseServicio servicioFaseServicios)
        {
            this.servicioFaseServicios = servicioFaseServicios;
        }

    [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerFaseServicio()
        {
            return Json(await this.servicioFaseServicios.ObtenerFaseServicios());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            return Json(await this.servicioFaseServicios.InsertarFaseServicio(entitiFaseServicio));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            return Json(await this.servicioFaseServicios.ActualizarFaseServicio(entitiFaseServicio));
        }

        [HttpGet("[action]/{idFase}")]
        public async Task<JsonResult> ObtenerFaseServicioPorID(int idFase)
        {
            return Json(await this.servicioFaseServicios.ObtenerFaseServicioPorID(idFase));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarFaseServicio(int idFase)
        {
            return Json(await this.servicioFaseServicios.EliminarFaseServicio(idFase));
        }
    }
}
