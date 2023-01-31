using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Cliente;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioClientes : IServicioClientes
    {
        public readonly IRepositorioClientes repositorioClientes;

        public ServicioClientes(IRepositorioClientes repositorioClientes)
        {
            this.repositorioClientes = repositorioClientes;
        }


        public async Task<List<DtoCliente>> ObtenerClientes()
        {
            return await this.repositorioClientes.ObtenerClientes();
        }



        public async Task<DtoRespuestaSP> InsertarCliente(EntitiCliente entitiClientes)
        {
            return await this.repositorioClientes.InsertarCliente(entitiClientes);
        }

        public async Task<DtoRespuestaSP> ActualizarCliente(EntitiCliente entitiCliente)
        {
            return await this.repositorioClientes.ActualizarCliente(entitiCliente);
        }

        public async Task<DtoCliente> ObtenerClientePorID(int idCliente)
        {
            return await this.repositorioClientes.ObtenerClientePorID(idCliente);
        }
        public async Task<DtoRespuestaSP> EliminarCliente(int idCliente)
        {
            return await this.repositorioClientes.EliminarCliente(idCliente);
        }

        public async Task<List<DtoCliente>> ObtenerClientesActivos()
        {
            return await this.repositorioClientes.ObtenerClientesActivos();
        }
    }
}
