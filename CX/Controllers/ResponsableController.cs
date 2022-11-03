using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Responsables;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class ResponsableController : Controller
    {
        private readonly IServicioResponsables servicioResponsables;

        public ResponsableController(IServicioResponsables servicioResponsables)
        {
            this.servicioResponsables = servicioResponsables;
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerResponsables()
        {
            return Json(await this.servicioResponsables.ObtenerResponsables());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerResponsablesActivos()
        {
            return Json(await this.servicioResponsables.ObtenerResponsablesActivos());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarResponsable(EntitiResponsable entitiResponsable)
        {
            return Json(await this.servicioResponsables.InsertarResponsables(entitiResponsable));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarResponsable(EntitiResponsable entitiResponsable)
        {
            return Json(await this.servicioResponsables.ActualizarResponsable(entitiResponsable));
        }


        [HttpGet("[action]/{idResponsable}")]
        public async Task<JsonResult> ObtenerResponsablePorID(int idResponsable)
        {
            return Json(await this.servicioResponsables.ObtenerResponsablePorID(idResponsable));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarResponsable(int idResponsable)
        {
            return Json(await this.servicioResponsables.EliminarResponsable(idResponsable));
        }
    }
}
