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
    public class SegmentosController : Controller
    {
        private readonly ServicioSegmentos servicioSegmentos = new ServicioSegmentos();

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerSegmentos()
        {
            return Json(await this.servicioSegmentos.ObtenerSegmentos());
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            return Json(await this.servicioSegmentos.InsertarSegmentos(entitiSegmentos));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            return Json(await this.servicioSegmentos.ActualizarSegmentos(entitiSegmentos));
        }


        [HttpGet("[action]/{idSegmento}")]
        public async Task<JsonResult> ObtenerSegmentoPorID(int idSegmento)
        {
            return Json(await this.servicioSegmentos.ObtenerSegmentoPorID(idSegmento));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarSegmento(int idSegmento)
        {
            return Json(await this.servicioSegmentos.EliminarSegmento(idSegmento));
        }

    }
}
