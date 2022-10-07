using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioMetodologiaCX : IRepositorioMetodologiaCX
    {
        private readonly IContextoBD contextoBD;

        public RepositorioMetodologiaCX(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Metodologia", entitiMetodologiaCX.metodologia);

                string query = "SPInsertarMetodologiaCX";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdMetodologia", entitiMetodologiaCX.idMetodologia);
                data.Add("Metodologia", entitiMetodologiaCX.metodologia);
                string query = "SPActualizarMetodologiaCX";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarMetodologiaCX(int idMetodologia)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMetodologia", idMetodologia);
                string query = "SPEliminarMetodologiaCX";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoMetodologiaCX> ObtenerMetodologiaCXPorID(int idMetodologia)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMetodologia", idMetodologia);
                string query = "SPObtenerMetodologiaCXPorID";

                return await this.contextoBD.ObtenerDato<DtoMetodologiaCX>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoMetodologiaCX>> ObtenerMetodologiaCX()
        {
            try
            {
                string query = "SPObtenerMetodologiaCX";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoMetodologiaCX>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
