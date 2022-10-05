using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioTipoMetrica : IRepositorioTipoMetrica
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTipoMetrica(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Descripcion", entitiTipoMetrica.Descripcion);
                data.Add("Tipo", entitiTipoMetrica.Tipo);

                string query = "SPInsertarTipoMetrica";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoMetrica", entitiTipoMetrica.IdTipoMetrica);
                data.Add("Descripcion", entitiTipoMetrica.Descripcion);
                data.Add("Tipo", entitiTipoMetrica.Tipo);
                string query = "SPActualizarTipoMetrica";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoMetrica(int idTipoMetrica)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoMetrica", idTipoMetrica);
                string query = "SPEliminarTipoMetrica";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoMetrica> ObtenerTipoMetricaPorID(int idTipoMetrica)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoMetrica", idTipoMetrica);
                string query = "SPObtenerTipoMetricaPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoMetrica>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoMetrica>> ObtenerTiposMetricas()
        {
            try
            {
                string query = "SPObtenerTiposMetricas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoMetrica>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoMetrica>> ObtenerTiposMetricasActivos()
        {
            try
            {
                string query = "SPObtenerMetricasActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoMetrica>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
