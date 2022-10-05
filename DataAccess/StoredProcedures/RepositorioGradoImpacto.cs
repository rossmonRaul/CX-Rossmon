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
    public class RepositorioGradoImpacto : IRepositorioGradoImpacto
    {
        private readonly IContextoBD contextoBD;

        public RepositorioGradoImpacto(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("GradoImpacto", entitiGradoImpacto.gradoImpacto);
               
                string query = "SPInsertarGradoImpacto";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdGradoImpacto", entitiGradoImpacto.idGradoImpacto);
                data.Add("GradoImpacto", entitiGradoImpacto.gradoImpacto);
                string query = "SPActualizarGradoImpacto";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarGradoImpacto(int idGradoImpacto)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdGradoImpacto", idGradoImpacto);
                string query = "SPEliminarGradoImpacto";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoGradoImpacto> ObtenerGradoImpactoPorID(int idGradoImpacto)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdGradoImpacto", idGradoImpacto);
                string query = "SPObtenerGradoImpactoPorID";

                return await this.contextoBD.ObtenerDato<DtoGradoImpacto>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoGradoImpacto>> ObtenerGradoImpacto()
        {
            try
            {
                string query = "SPObtenerGradoImpacto";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoGradoImpacto>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
