using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Sectores;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class SectoresController : Controller
    {

        private readonly IServicioSectores servicioSectores;

        public SectoresController(IServicioSectores servicioSectores)
        {
            this.servicioSectores = servicioSectores;
        }

    [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerSectores()
        {
            return Json(await this.servicioSectores.ObtenerSectores());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerSectoresActivos()
        {
            return Json(await this.servicioSectores.ObtenerSectoresActivos());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarSectores(EntitiSectores entitiSectores)
        {
            return Json(await this.servicioSectores.InsertarSectores(entitiSectores));
        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarSector(EntitiSectores entitiSectores)
        {
            return Json(await this.servicioSectores.ActualizarSectores(entitiSectores));
        }


        [HttpGet("[action]/{idSector}")]
        public async Task<JsonResult> ObtenerSectorPorID(int idSector)
        {
            return Json(await this.servicioSectores.ObtenerSectoresPorID(idSector));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarSector(int idSector)
        {
            return Json(await this.servicioSectores.EliminarSector(idSector));
        }


    }
}
