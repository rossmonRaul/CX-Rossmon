using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TiposPersona;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class TipoPersonaController : Controller
    {
        private readonly IServicioTiposPersona servicioTiposPersona;

        public TipoPersonaController(IServicioTiposPersona servicioTipoPersona)
        {
            this.servicioTiposPersona = servicioTipoPersona;
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTiposPersona()
        {
            return Json(await this.servicioTiposPersona.ObtenerTiposPersona());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTiposPersonaActivos()
        {
            return Json(await this.servicioTiposPersona.ObtenerTiposPersonaActivos());
        }
        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoPersona(EntitiTipoPersona entitiTipoPersona)
        {
            return Json(await this.servicioTiposPersona.InsertarTiposPersona(entitiTipoPersona));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoPersona(EntitiTipoPersona entitiTipoPersona)
        {
            return Json(await this.servicioTiposPersona.ActualizarTipoPersona(entitiTipoPersona));
        }


        [HttpGet("[action]/{idTipoPersona}")]
        public async Task<JsonResult> ObtenerTipoPersonaPorID(int idTipoPersona)
        {
            return Json(await this.servicioTiposPersona.ObtenerTipoPersonaPorID(idTipoPersona));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoPersona(int idTipoPersona)
        {
            return Json(await this.servicioTiposPersona.EliminarTipoPersona(idTipoPersona));
        }
    }
}
