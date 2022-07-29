using BussinesLogic.Servicios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class LineaNegocioController : Controller
    {

        private readonly ServicioLineaNegocio servicioLineaNegocio = new ServicioLineaNegocio();


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerLineaNegocio()
        {
            return Json(await this.servicioLineaNegocio.ObtenerLineaNegocio());
        }

    }
}
