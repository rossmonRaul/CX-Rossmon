using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    
    public class RepositorioTipoTaller : IRepositorioTipoTaller
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTipoTaller(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoTaller(EntitiTipoTaller entitiTipoTaller)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoTaller", entitiTipoTaller.tipoTaller);

                string query = "SPInsertarTipoTaller";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoTaller(EntitiTipoTaller entitiTipoTaller)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoTaller", entitiTipoTaller.idTipoTaller);
                data.Add("TipoTaller", entitiTipoTaller.tipoTaller);
                string query = "SPActualizarTipoTaller";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoTaller(int idTipoTaller)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoTaller", idTipoTaller);
                string query = "SPEliminarTipoTaller";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoTaller> ObtenerTipoTallerPorID(int idTipoTaller)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoTaller", idTipoTaller);
                string query = "SPObtenerTipoTallerPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoTaller>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoTaller>> ObtenerTipoTaller()
        {
            try
            {
                string query = "SPObtenerTiposTalleres";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoTaller>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoTaller>> ObtenerTipoTallerActivos()
        {
            try
            {
                string query = "SPObtenerTalleresActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoTaller>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
