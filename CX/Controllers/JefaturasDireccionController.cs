using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Direccion;
using Dominio.Interfaces.Aplicacion.Jefatura;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class JefaturasDireccionController : Controller
    {
        private readonly IServicioJefaturaDireccion servicioJefaturaDireccion;
        private readonly IServicioDirecciones servicioDirecciones;

        public JefaturasDireccionController(IServicioJefaturaDireccion servicioJefaturaDireccion)
        {
            this.servicioJefaturaDireccion = servicioJefaturaDireccion;
        }

    [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerJefaturasDireccion()
        {
            return Json(await servicioJefaturaDireccion.ObtenerJefaturasDireccion());
        }
        [HttpGet("[action]")]
        public async Task<JsonResult> Cargacombo()
        {
            return Json(await servicioDirecciones.ObtenerDireccionesActivas());
        }
        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarJefaturaDireccion(int idJefatura)
        {
            return Json(await servicioJefaturaDireccion.EliminarJefaturasDireccion(idJefatura));
        }
        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarJefaturaDireccion(EntitiJefaturas entitiJefaturas)
        {
            return Json(await servicioJefaturaDireccion.InsertarJefaturaDireccion(entitiJefaturas));
        }
        [HttpGet("[action]/{idJefatura}")]
        public async Task<JsonResult> ObtenerJefaturaDireccionPorId(int idJefatura)
        {
            return Json(await servicioJefaturaDireccion.ObtenerJefaturaDireccionPorId(idJefatura));
        }
        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarJefatura(EntitiJefaturas entitiJefaturas)
        {
            return Json(await servicioJefaturaDireccion.ActualizarJefatura(entitiJefaturas));
        }
    }
}