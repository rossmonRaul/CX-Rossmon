using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.AplicacionEncuesta;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class AplicacionEncuestaController : Controller
    {
        private readonly IServicioAplicacionEncuestas servicioAplicacionEncuestas;

        public AplicacionEncuestaController(IServicioAplicacionEncuestas servicioAplicacionEncuestas)
        {
            this.servicioAplicacionEncuestas = servicioAplicacionEncuestas;
        }

      

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarUsuarioEncuesta(EntitiAplicacionEncuesta entitiAplicacionEncuesta)
        {
            return Json(await this.servicioAplicacionEncuestas.InsertarUsuarioEncuesta(entitiAplicacionEncuesta));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarUsuarioEncuesta(EntitiAplicacionEncuesta entitiAplicacionEncuesta)
        {
            return Json(await this.servicioAplicacionEncuestas.ActualizarUsuarioEncuesta(entitiAplicacionEncuesta));
        }


        [HttpGet("[action]/{telefono}/{correo}")]
        public async Task<JsonResult> ObtenerUsuarioEncuestaPorTelefonoOCorreo(string telefono, string correo)
        {
            return Json(await this.servicioAplicacionEncuestas.ObtenerUsuarioEncuestaPorTelefonoOCorreo(telefono,correo));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarUsuarioEncuesta(int idUsuarioEncuesta)
        {
            return Json(await this.servicioAplicacionEncuestas.EliminarUsuarioEncuesta(idUsuarioEncuesta));
        }
    }
}
