using System;
using System.Collections.Generic;
using System.Data;

using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Dto;
using Dominio.Entiti;

namespace DataAccess.StoredProcedures
{
    public class RepositorioGradosEsfuerzo : IRepositorioGradosEsfuerzo
    {
        private readonly IContextoBD contextoBD;

        public RepositorioGradosEsfuerzo(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarGradosEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Codigo", entitiGradosEsfuerzo.Codigo);
                data.Add("GradoEsfuerzo", entitiGradosEsfuerzo.GradoEsfuerzo);

                string query = "SPInsertarGradosEsfuerzo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarGradoEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdGradoEsfuerzo", entitiGradosEsfuerzo.IdGradoEsfuerzo);
                data.Add("Codigo", entitiGradosEsfuerzo.Codigo);
                data.Add("GradoEsfuerzo", entitiGradosEsfuerzo.GradoEsfuerzo);
                string query = "SPActualizarGradoEsfuerzo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarGradoEsfuerzo(int idGradoEsfuerzo)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdGradoEsfuerzo", idGradoEsfuerzo);
                string query = "SPEliminarGradoEsfuerzo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoGradosEsfuerzo> ObtenerGradoEsfuerzoPorID(int idGradoEsfuerzo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdGradoEsfuerzo", idGradoEsfuerzo);
                string query = "SPObtenerGradoEsfuerzoPorID";

                return await this.contextoBD.ObtenerDato<DtoGradosEsfuerzo>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoGradosEsfuerzo>> ObtenerGradosEsfuerzo()
        {
            try
            {
                string query = "SPObtenerGradosEsfuerzo";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoGradosEsfuerzo>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}