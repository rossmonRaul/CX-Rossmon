using BussinesLogic.Servicios;
using Dominio.Entiti;
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
    public class GradoImpactoController : Controller
    {

        private readonly ServicioGradoImpacto servicioGradoImpacto = new ServicioGradoImpacto();


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto)
        {
            return Json(await this.servicioGradoImpacto.InsertarGradoImpacto(entitiGradoImpacto));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto)
        {
            return Json(await this.servicioGradoImpacto.ActualizarGradoImpacto(entitiGradoImpacto));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarGradoImpacto(int idGradoImpacto)
        {
            return Json(await this.servicioGradoImpacto.EliminarGradoImpacto(idGradoImpacto));
        }

        [HttpGet("[action]/{idGradoImpacto}")]
        public async Task<JsonResult> ObtenerGradoImpactoPorID(int idGradoImpacto)
        {
            return Json(await this.servicioGradoImpacto.ObtenerGradoImpactoPorID(idGradoImpacto));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerGradoImpacto()
        {
            return Json(await this.servicioGradoImpacto.ObtenerGradoImpacto());
        }
    }
}
