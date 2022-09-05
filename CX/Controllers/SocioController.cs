using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class SocioController : Controller
    {
        private readonly ServicioSocios servicioSocios = new ServicioSocios();

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerSocios()
        {
            return Json(await this.servicioSocios.ObtenerSocios());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerSociosActivos()
        {
            return Json(await this.servicioSocios.ObtenerSociosActivos());
        }
        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTiposPersona()
        {
            return Json(await this.servicioSocios.ObtenerTiposPersona());
        }
        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarSocio(EntitiSocio entitiSocio)
        {
            return Json(await this.servicioSocios.InsertarSocios(entitiSocio));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarSocio(EntitiSocio entitiSocio)
        {
            return Json(await this.servicioSocios.ActualizarSocio(entitiSocio));
        }


        [HttpGet("[action]/{idSocio}")]
        public async Task<JsonResult> ObtenerSocioPorID(int idSocio)
        {
            return Json(await this.servicioSocios.ObtenerSocioPorID(idSocio));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarSocio(int idSocio)
        {
            return Json(await this.servicioSocios.EliminarSocio(idSocio));
        }
    }
}
