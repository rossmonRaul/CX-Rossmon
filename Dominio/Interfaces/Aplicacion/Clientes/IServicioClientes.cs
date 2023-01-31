using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Cliente
{
    public interface IServicioClientes
    {
         Task<List<DtoCliente>> ObtenerClientes();
         Task<DtoRespuestaSP> InsertarCliente(EntitiCliente entitiClientes);
         Task<DtoRespuestaSP> ActualizarCliente(EntitiCliente entitiCliente);
         Task<DtoCliente> ObtenerClientePorID(int idCliente);
         Task<DtoRespuestaSP> EliminarCliente(int idClientes);
         Task<List<DtoCliente>> ObtenerClientesActivos();
    }
}
