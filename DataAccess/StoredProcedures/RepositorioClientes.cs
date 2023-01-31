using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{

    public class RepositorioClientes : IRepositorioClientes
    {
        private readonly IContextoBD contextoBD;

        public RepositorioClientes(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarCliente(EntitiCliente entitiCliente)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Nombre", entitiCliente.Nombre);
                data.Add("Telefono", entitiCliente.Telefono);
                data.Add("CorreoElectronico", entitiCliente.CorreoElectronico);
                data.Add("IdCanal", entitiCliente.IdCanal);
                data.Add("IdSegmento", entitiCliente.IdSegmento);
                data.Add("IdCategoria", entitiCliente.IdCategoria);
                data.Add("IdServicio", entitiCliente.IdServicio);
                data.Add("IdFaseCJ", entitiCliente.IdFaseCJ);
                data.Add("IdSocio", entitiCliente.IdSocio);
                string query = "SPInsertarClienteEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarCliente(EntitiCliente entitiCliente)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdClienteEncuesta", entitiCliente.IdCliente); 
                data.Add("Nombre", entitiCliente.Nombre);
                data.Add("Telefono", entitiCliente.Telefono);
                data.Add("CorreoElectronico", entitiCliente.CorreoElectronico);
                data.Add("IdCanal", entitiCliente.IdCanal);
                data.Add("IdSegmento", entitiCliente.IdSegmento);
                data.Add("IdCanategoria", entitiCliente.IdCategoria);
                data.Add("IdServicio", entitiCliente.IdServicio);
                data.Add("IdFaseCJ", entitiCliente.IdFaseCJ);
                data.Add("IdSocio", entitiCliente.IdSocio);
                string query = "SPActualizarClienteEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarCliente(int idCliente)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdClienteEncuesta", idCliente);
                string query = "SPEliminarClienteEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoCliente> ObtenerClientePorID(int idCliente)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdClienteEncuesta", idCliente);
                string query = "SPObtenerClienteEncuestaPorID";

                return await this.contextoBD.ObtenerDato<DtoCliente>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoCliente>> ObtenerClientes()
        {
            try
            {
                string query = "SPObtenerClientesEncuesta";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoCliente>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoCliente>> ObtenerClientesActivos()
        {
            try
            {
                string query = "SPObtenerClientesEncuestaActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoCliente>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }

}
