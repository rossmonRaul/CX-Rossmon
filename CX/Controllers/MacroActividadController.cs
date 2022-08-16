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
    public class MacroActividadController : Controller
    {
        private readonly ServicioMacroActividad servicioMacroActividad = new ServicioMacroActividad();


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarMacroActividad(EntitiMacroActividad entitiMacroActividad)
        {
            return Json(await this.servicioMacroActividad.InsertarMacroActividad(entitiMacroActividad));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarMacroActividad(EntitiMacroActividad entitiMacroActividad)
        {
            return Json(await this.servicioMacroActividad.ActualizarMacroActividad(entitiMacroActividad));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarMacroActividad(int idMacro)
        {
            return Json(await this.servicioMacroActividad.EliminarMacroActividad(idMacro));
        }

        [HttpGet("[action]/{idMacro}")]
        public async Task<JsonResult> ObtenerMacroActividadPorID(int idMacro)
        {
            return Json(await this.servicioMacroActividad.ObtenerMacroActividadPorID(idMacro));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerMacroActividad()
        {
            return Json(await this.servicioMacroActividad.ObtenerMacroActividad());
        }
    }
}
