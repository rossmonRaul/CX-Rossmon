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
    public class RepositorioSocios : IRepositorioSocios
    {
        private readonly IContextoBD contextoBD;

        public RepositorioSocios(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarSocios(EntitiSocio entitiSocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Nombre", entitiSocio.Nombre);
                data.Add("Cedula", entitiSocio.Cedula);
                data.Add("Correo", entitiSocio.Correo);
                data.Add("Telefono", entitiSocio.Telefono);
                data.Add("IdTipoPersona", entitiSocio.IdTipoPersona);
                string query = "SPInsertarSocios";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarSocio(EntitiSocio entitiSocio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdSocio", entitiSocio.IdSocio);
                data.Add("Nombre", entitiSocio.Nombre);
                data.Add("Cedula", entitiSocio.Cedula);
                data.Add("Correo", entitiSocio.Correo);
                data.Add("Telefono", entitiSocio.Telefono);
                data.Add("IdTipoPersona", entitiSocio.IdTipoPersona);
                string query = "SPActualizarSocios";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarSocio(int idSocio)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSocio", idSocio);
                string query = "SPEliminarSocios";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoSocio> ObtenerSocioPorId(int idSocio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSocio", idSocio);
                string query = "SPObtenerSociosPorID";

                return await this.contextoBD.ObtenerDato<DtoSocio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoSocio>> ObtenerSocios()
        {
            try
            {
                string query = "SPObtenerSocios";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoSocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoSocio>> ObtenerSociosActivos()
        {
            try
            {
                string query = "SPObtenerSociosActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoSocio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoPersona>> ObtenerTiposPersona()
        {
            try
            {
                string query = "SPObtenerTiposPersona";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoPersona>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}
