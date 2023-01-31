using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BussinesLogic.Servicios;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Cliente;
using Microsoft.AspNetCore.Mvc;

namespace CX.Controllers
{
    [Route("{controller}")]
    [ApiController]
    public class ClienteController : Controller
    {
        private readonly IServicioClientes servicioClientes;

        public ClienteController(IServicioClientes servicioClientes)
        {
            this.servicioClientes = servicioClientes;
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerClientes()
        {
            return Json(await this.servicioClientes.ObtenerClientes());
        }

        [HttpGet("[action]")]
        public async Task<JsonResult> ObtenerClientesActivos()
        {
            return Json(await this.servicioClientes.ObtenerClientesActivos());
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> InsertarCliente(EntitiCliente entitiCliente)
        {
            return Json(await this.servicioClientes.InsertarCliente(entitiCliente));

        }

        [HttpPut("[action]")]
        public async Task<JsonResult> ActualizarCliente(EntitiCliente entitiCliente)
        {
            return Json(await this.servicioClientes.ActualizarCliente(entitiCliente));
        }


        [HttpGet("[action]/{idCliente}")]
        public async Task<JsonResult> ObtenerClientePorID(int idCliente)
        {
            return Json(await this.servicioClientes.ObtenerClientePorID(idCliente));
        }

        [HttpDelete("[action]")]
        public async Task<JsonResult> EliminarCliente(int idCliente)
        {
            return Json(await this.servicioClientes.EliminarCliente(idCliente));
        }
    }
}
