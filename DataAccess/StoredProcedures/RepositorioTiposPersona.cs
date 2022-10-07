using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioTiposPersona : IRepositorioTiposPersona
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTiposPersona(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTiposPersona(EntitiTipoPersona entitiTipoPersona)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoPersona", entitiTipoPersona.TipoPersona);

                string query = "SPInsertarTiposPersona";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoPersona(EntitiTipoPersona entitiTipoPersona)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoPersona", entitiTipoPersona.IdTipoPersona);
                data.Add("TipoPersona", entitiTipoPersona.TipoPersona);
                string query = "SPActualizarTiposPersona";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoPersona(int idTipoPersona)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoPersona", idTipoPersona);
                string query = "SPEliminarTiposPersona";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoPersona> ObtenerTipoPersonaPorId(int idTipoPersona)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoPersona", idTipoPersona);
                string query = "SPObtenerTiposPersonaPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoPersona>(query, data);
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
        public async Task<List<DtoTipoPersona>> ObtenerTiposPersonaActivos()
        {
            try
            {
                string query = "SPObtenerTiposPersonaActivos";
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
