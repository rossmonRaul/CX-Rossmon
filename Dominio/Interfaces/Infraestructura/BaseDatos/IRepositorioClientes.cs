using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioClientes
    {
        Task<List<DtoCliente>> ObtenerClientes();
        Task<DtoRespuestaSP> InsertarCliente(EntitiCliente entitiSocios);
        Task<DtoRespuestaSP> ActualizarCliente(EntitiCliente entitiCliente);
        Task<DtoCliente> ObtenerClientePorID(int idCliente);
        Task<DtoRespuestaSP> EliminarCliente(int idCliente);
        Task<List<DtoCliente>> ObtenerClientesActivos();
    }
}
