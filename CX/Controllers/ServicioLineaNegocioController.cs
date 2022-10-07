using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.ServicioLineaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class ServicioLineaNegocioController : Controller
    {
        private readonly IServicioServicioLineaNegocio servicioLineaNegocio;

        public ServicioLineaNegocioController(IServicioServicioLineaNegocio servicioLineaNegocio)
        {
            this.servicioLineaNegocio = servicioLineaNegocio;
        }

    [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerServicioLineaNegocio()
        {
            return Json(await this.servicioLineaNegocio.ObtenerServicioLineaNegocio());
        }
        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerLineasNegociosActivos()
        {
            return Json(await this.servicioLineaNegocio.ObtenerLineaNegocioActivos());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            return Json(await this.servicioLineaNegocio.InsertarServicioLineaNegocio(entitiServicioLineaNegocio));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio)
        {
            return Json(await this.servicioLineaNegocio.ActualizarServicioLineaNegocio(entitiServicioLineaNegocio));
        }


        [HttpGet("[action]/{idServicio}")]
        public async Task<JsonResult> ObtenerServicioLineaNegocioPorID(int idServicio)
        {
            return Json(await this.servicioLineaNegocio.ObtenerServicioLineaNegocioPorID(idServicio));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarServicioLineaNegocio(int idServicio)
        {
            return Json(await this.servicioLineaNegocio.EliminarServicioLineaNegocio(idServicio));
        }

    }
}
