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
    public class RepositorioResponsables : IRepositorioResponsables
    {
        private readonly IContextoBD contextoBD;

        public RepositorioResponsables(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarResponsables(EntitiResponsable entitiResponsable)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Nombre", entitiResponsable.Nombre);
                data.Add("IdDireccion", entitiResponsable.IdDireccion);
                data.Add("IdHallazgo", entitiResponsable.IdHallazgo);
                data.Add("Plazo", entitiResponsable.Plazo);
                data.Add("FechaInicio", entitiResponsable.FechaInicio);
                data.Add("IdOrbe", entitiResponsable.IdOrbe);
                data.Add("Avance", entitiResponsable.Avance);
                data.Add("Aceptado", entitiResponsable.Aceptado);
                string query = "SPInsertarResponsable";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarResponsable(EntitiResponsable entitiResponsable)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("Nombre", entitiResponsable.Nombre);
                data.Add("IdResponsable", entitiResponsable.IdResponsable);
                data.Add("IdDireccion", entitiResponsable.IdDireccion);
                data.Add("Plazo", entitiResponsable.Plazo);
                data.Add("FechaInicio", entitiResponsable.FechaInicio);
                data.Add("IdOrbe", entitiResponsable.IdOrbe);
                data.Add("Avance", entitiResponsable.Avance);
                data.Add("Aceptado", entitiResponsable.Aceptado);
                string query = "SPActualizarResponsable";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarResponsable(int idResponsable)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdResponsable", idResponsable);
                string query = "SPEliminarResponsable";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoResponsable> ObtenerResponsablePorId(int idResponsable)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdResponsable", idResponsable);
                string query = "SPObtenerResponsablePorID";

                return await this.contextoBD.ObtenerDato<DtoResponsable>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoResponsable>> ObtenerResponsablesPorIdHallazgo(int idHallazgo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("idHallazgo", idHallazgo);
                string query = "SPObtenerResponsablesPorIdHallazgo";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoResponsable>(query,data);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoResponsable>> ObtenerResponsables()
        {
            try
            {
                string query = "SPObtenerResponsables";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoResponsable>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoResponsable>> ObtenerResponsablesActivos()
        {
            try
            {
                string query = "SPObtenerResponsablesActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoResponsable>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}
