using BussinesLogic.Servicios;
using Dominio.Entiti;
using Microsoft.AspNetCore.Mvc;
using System;
using Dominio.Interfaces.Aplicacion.TipoIndicador;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class TipoIndicadorController : Controller
    {
        private readonly IServicioTipoIndicador servicioTipoIndicador;

        public TipoIndicadorController(IServicioTipoIndicador servicioTipoIndicador)
        {
            this.servicioTipoIndicador = servicioTipoIndicador;
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            return Json(await this.servicioTipoIndicador.InsertarTipoIndicador(entitiTipoIndicador));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            return Json(await this.servicioTipoIndicador.ActualizarTipoIndicador(entitiTipoIndicador));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarValorIndicador(EntitiValorIndicador entitiValorIndicador)
        {
            return Json(await this.servicioTipoIndicador.ActualizarValorIndicador(entitiValorIndicador));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarTipoIndicador(int idTipoIndicador)
        {
            return Json(await this.servicioTipoIndicador.EliminarTipoIndicador(idTipoIndicador));
        }

        [HttpGet("[action]/{idTipoIndicador}")]
        public async Task<JsonResult> ObtenerTipoIndicadorPorID(int idTipoIndicador)
        {
            return Json(await this.servicioTipoIndicador.ObtenerTipoIndicadorPorID(idTipoIndicador));
        }



        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTiposIndicadores()
        {
            return Json(await this.servicioTipoIndicador.ObtenerTipoIndicador());
        }

        [HttpGet("[action]/{idTipoIndicador}")]
        public async Task<JsonResult> ObtenerValoresIndicadorPorID(int idTipoIndicador)
        {
            return Json(await this.servicioTipoIndicador.ObtenerValoresIndicadorPorID(idTipoIndicador));
        }


        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerTipoIndicadorActivos()
        {
            return Json(await this.servicioTipoIndicador.ObtenerTipoIndicadorActivos());
        }
    }
}
