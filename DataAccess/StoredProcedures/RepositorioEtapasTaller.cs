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
    public class RepositorioEtapasTaller : IRepositorioEtapasTaller
    {
        private readonly IContextoBD contextoBD;

        public RepositorioEtapasTaller(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("EtapaTaller", entitiEtapasTaller.etapaTaller);
                data.Add("IdTipoTaller", entitiEtapasTaller.idTipoTaller);

                string query = "SPInsertarEtapasTaller";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdEtapaTaller", entitiEtapasTaller.idEtapaTaller);
                data.Add("EtapaTaller", entitiEtapasTaller.etapaTaller);
                data.Add("IdTipoTaller", entitiEtapasTaller.idTipoTaller);
                string query = "SPActualizarEtapaTaller";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarEtapasTaller(int idEtapaTaller)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEtapaTaller", idEtapaTaller);
                string query = "SPEliminarEtapaTaller";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoEtapasTaller> ObtenerEtapasTallerPorID(int idEtapaTaller)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEtapaTaller", idEtapaTaller);
                string query = "SPObtenerEtapaTipoTallerPorID";

                return await this.contextoBD.ObtenerDato<DtoEtapasTaller>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoEtapasTaller>> ObtenerEtapasTaller()
        {
            try
            {
                string query = "SPObtenerEtapaTipoTaller";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEtapasTaller>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
   


}
