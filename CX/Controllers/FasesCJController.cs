using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.FasesCJ;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class FasesCJController : Controller
    {
        private readonly IServicioFasesCJ servicioFasesCJ;

        public FasesCJController(IServicioFasesCJ servicioFasesCJ)
        {
            this.servicioFasesCJ = servicioFasesCJ;
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerFasesCJ()
        {
            return Json(await this.servicioFasesCJ.ObtenerFasesCJ());
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarFasesCJ(EntitiFaseCJ entitiFasesCJ)
        {
            return Json(await this.servicioFasesCJ.InsertarFasesCJ(entitiFasesCJ));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarFasesCJ(EntitiFaseCJ entitiFasesCJ)
        {
            return Json(await this.servicioFasesCJ.ActualizarFasesCJ(entitiFasesCJ));
        }


        [HttpGet("[action]/{idFasesCJ}")]
        public async Task<JsonResult> ObtenerFasesCJPorID(int idFasesCJ)
        {
            return Json(await this.servicioFasesCJ.ObtenerFasesCJPorID(idFasesCJ));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarFasesCJ(int idFasesCJ)
        {
            return Json(await this.servicioFasesCJ.EliminarFasesCJ(idFasesCJ));
        }
    }
}
