using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.MetodologiaCX;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class MetodologiaCXController : Controller
    {
        private readonly IServicioMetodologiaCX servicioMetodologiaCX;

        public MetodologiaCXController(IServicioMetodologiaCX servicioMetodologiaCX)
        {
            this.servicioMetodologiaCX = servicioMetodologiaCX;
        }

    [HttpPost("[action]")]
        public async Task<JsonResult> InsertarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            return Json(await this.servicioMetodologiaCX.InsertarMetodologiaCX(entitiMetodologiaCX));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            return Json(await this.servicioMetodologiaCX.ActualizarMetodologiaCX(entitiMetodologiaCX));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarMetodologiaCX(int idMetodologia)
        {
            return Json(await this.servicioMetodologiaCX.EliminarMetodologiaCX(idMetodologia));
        }

        [HttpGet("[action]/{idMetodologia}")]
        public async Task<JsonResult> ObtenerMetodologiaCXPorID(int idMetodologia)
        {
            return Json(await this.servicioMetodologiaCX.ObtenerMetodologiaCXPorID(idMetodologia));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerMetodologiaCX()
        {
            return Json(await this.servicioMetodologiaCX.ObtenerMetodologiaCX());
        }
    }
}
