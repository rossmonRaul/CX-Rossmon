using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.ParticipantesEquipoTrabajo;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class ParticipanteController : Controller
    {
        private readonly IServicioParticipantesEquipoTrabajo servicioParticipanteEquipoTrabajo;

        public ParticipanteController(IServicioParticipantesEquipoTrabajo servicioParticipanteEquipoTrabajo)
        {
            this.servicioParticipanteEquipoTrabajo = servicioParticipanteEquipoTrabajo;
        }


        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarParticipanteEquipoTrabajo(EntitiParticipanteEquipoTrabajo entitiParticipante)
        {
            return Json(await this.servicioParticipanteEquipoTrabajo.InsertarParticipanteEquipoTrabajo(entitiParticipante));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarParticipante(EntitiParticipanteEquipoTrabajo entitiParticipante)
        {
            return Json(await this.servicioParticipanteEquipoTrabajo.ActualizarParticipante(entitiParticipante));
        }


        [HttpGet("[action]/{idParticipante}")]
        public async Task<JsonResult> ObtenerParticipantePorID(int idParticipante)
        {
            return Json(await this.servicioParticipanteEquipoTrabajo.ObtenerParticipantePorID(idParticipante));
        }

        [HttpGet("[action]/{idTallerCoCreacion}")]
        public async Task<JsonResult> ObtenerEquipoTrabajoPorIdTaller(int idTallerCoCreacion)
        {
            return Json(await this.servicioParticipanteEquipoTrabajo.ObtenerEquipoTrabajoPorIdTaller(idTallerCoCreacion));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarParticipante(int idParticipante)
        {
            return Json(await this.servicioParticipanteEquipoTrabajo.EliminarParticipante(idParticipante));
        }
    }
}

