using BussinesLogic.Servicios;
using Dominio.Entiti;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class LineaNegocioController : Controller
    {
        private readonly ServicioLineaNegocio servicioLineaNegocio = new ServicioLineaNegocio();


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
                return Json(await this.servicioLineaNegocio.InsertarLineaNegocio(entitiLineaNegocio));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            return Json(await this.servicioLineaNegocio.ActualizarLineaNegocio(entitiLineaNegocio));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarLineaNegocio(int idLinea)
        {
            return Json(await this.servicioLineaNegocio.EliminarLineaNegocio(idLinea));
        }

        [HttpGet("[action]/{idLinea}")]
        public async Task<JsonResult> ObtenerLineaNegocioPorID(int idLinea)
        {
           return Json(await this.servicioLineaNegocio.ObtenerLineaNegocioPorID(idLinea));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerLineaNegocio()
        {
            return Json(await this.servicioLineaNegocio.ObtenerLineaNegocio());
        }

    }
}
