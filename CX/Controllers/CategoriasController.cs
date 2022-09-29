using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Categoria;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class CategoriasController : Controller
    {
        private readonly IServicioCategorias servicioCategorias;
        public CategoriasController(IServicioCategorias servicioCategorias)
        {
            this.servicioCategorias = servicioCategorias;
        }

        /*
        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerCategorias()
        {
            return Json(await this.servicioCategorias.ObtenerCategorias());
        }

        [HttpGet("[action]/{idCategoria}")]
        public async Task<JsonResult> ObtenerCategoriasPorId(int idCategoria)
        {
            return Json(await this.servicioCategorias.ObtenerCategoriasPorId(idCategoria));
        }*/

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarCategoria(EntitiCategoria entitiCategoria)
        {
            return Json(await this.servicioCategorias.InsertarCategoria(entitiCategoria));
        }
        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarCategoria(EntitiCategoria entitiCategoria)
        {
            return Json(await this.servicioCategorias.ActualizarCategoria(entitiCategoria));
        }
        [HttpDelete("[action]")]
        public async Task<JsonResult> InactivarCategoria(int idCategoria)
        {
            return Json(await this.servicioCategorias.InactivarCategoria(idCategoria));
        }
    }
}
