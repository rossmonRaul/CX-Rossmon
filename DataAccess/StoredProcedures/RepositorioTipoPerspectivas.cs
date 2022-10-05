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
    public class RepositorioTipoPerspectivas : IRepositorioTipoPerspectivas
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTipoPerspectivas(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoPerspectiva", entitiTipoPerspectivas.tipoPerspectiva);

                string query = "SPInsertarTipoPerspectivas";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoPerspectiva", entitiTipoPerspectivas.idTipoPerspectiva);
                data.Add("TipoPerspectiva", entitiTipoPerspectivas.tipoPerspectiva);
                string query = "SPActualizarTipoPerspectivas";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoPerspectivas(int idTipoPerspectivas)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoPerspectiva", idTipoPerspectivas);
                string query = "SPEliminarTipoPerspectivas";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoPerspectivas> ObtenerTipoPerspectivasPorID(int idTipoPerspectivas)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoPerspectiva", idTipoPerspectivas);
                string query = "SPObtenerTipoPerspectivasPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoPerspectivas>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivas()
        {
            try
            {
                string query = "SPObtenerTipoPerspectivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoPerspectivas>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivasActivos()
        {
            try
            {
                string query = "SPObtenerTipoPerspectivasActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoPerspectivas>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
