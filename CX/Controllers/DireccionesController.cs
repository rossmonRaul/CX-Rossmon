using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Direccion;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class DireccionesController : Controller
    {
        private readonly IServicioDirecciones servicioDirecciones;
        public DireccionesController(IServicioDirecciones servicioDirecciones)
        {
            this.servicioDirecciones = servicioDirecciones;
        }


    [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerDirecciones()
        {
            return Json(await this.servicioDirecciones.ObtenerDirecciones());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerDireccionesActivas()
        {
            return Json(await this.servicioDirecciones.ObtenerDireccionesActivas());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarDirecciones(EntitiDirecciones entitiDirecciones)
        {
            return Json(await this.servicioDirecciones.InsertarDirecciones(entitiDirecciones));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarDireccion(EntitiDirecciones entitiDirecciones)
        {
            return Json(await this.servicioDirecciones.ActualizarDireccion(entitiDirecciones));
        }


        [HttpGet("[action]/{idDireccion}")]
        public async Task<JsonResult> ObtenerDireccionPorID(int idDireccion)
        {
            return Json(await this.servicioDirecciones.ObtenerDireccionPorID(idDireccion));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarDireccion(int idDireccion)
        {
            return Json(await this.servicioDirecciones.EliminarDireccion(idDireccion));
        }
    }
}