using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.ServicioSocio;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class ServicioSocioController : Controller
    {
        private readonly IServicioServicioSocio servicioSocio;

        public ServicioSocioController(IServicioServicioSocio servicioSocio)
        {
            this.servicioSocio = servicioSocio;
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerServicioSocio()
        {
            return Json(await this.servicioSocio.ObtenerServicioSocio());
        }
        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerServicioSocioActivos()
        {
            return Json(await this.servicioSocio.ObtenerServicioSocioActivos());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            return Json(await this.servicioSocio.InsertarServicioSocio(entitiServicioSocio));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarServicioSocio(EntitiServicioSocio entitiServicioSocio)
        {
            return Json(await this.servicioSocio.ActualizarServicioSocio(entitiServicioSocio));
        }


       [HttpGet("[action]/{idServicioSocio}")]
        public async Task<JsonResult> ObtenerServicioSocioPorID(int idServicioSocio)
        {
            return Json(await this.servicioSocio.ObtenerServicioSocioPorID(idServicioSocio));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarServicioSocio(int idServicioSocio)
        {
            return Json(await this.servicioSocio.EliminarServicioSocio(idServicioSocio));
        }

    }
}
