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
    public class RepositorioTipoInteraccion : IRepositorioTipoInteraccion
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTipoInteraccion(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoInteraccion", entitiTipoInteraccion.tipoInteraccion);

                string query = "SPInsertarTipoInteraccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoInteraccion", entitiTipoInteraccion.idTipoInteraccion);
                data.Add("TipoInteraccion", entitiTipoInteraccion.tipoInteraccion);
                string query = "SPActualizarTipoInteraccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoInteraccion(int idTipoInteraccion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoInteraccion", idTipoInteraccion);
                string query = "SPEliminarTipoInteraccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoInteraccion> ObtenerTipoInteraccionPorID(int idTipoInteraccion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoInteraccion", idTipoInteraccion);
                string query = "SPObtenerTipoInteraccionPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoInteraccion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccion()
        {
            try
            {
                string query = "SPObtenerTipoInteraccion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoInteraccion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccionActivos()
        {
            try
            {
                string query = "SPObtenerTipoInteraccionActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoInteraccion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
