using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioTipoIndicador : IRepositorioTipoIndicador
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTipoIndicador(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoIndicador", entitiTipoIndicador.TipoIndicador);
                data.Add("Sigla", entitiTipoIndicador.Sigla);
                data.Add("Minimo", entitiTipoIndicador.Minimo);
                data.Add("Maximo", entitiTipoIndicador.Maximo);

                string query = "SPInsertarTipoIndicador";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoIndicador", entitiTipoIndicador.IdTipoIndicador);
                data.Add("TipoIndicador", entitiTipoIndicador.TipoIndicador);
                data.Add("Sigla", entitiTipoIndicador.Sigla);
                data.Add("Minimo", entitiTipoIndicador.Minimo);
                data.Add("Maximo", entitiTipoIndicador.Maximo);
                string query = "SPActualizarTipoIndicador";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<DtoRespuestaSP> ActualizarValorIndicador(EntitiValorIndicador entitiValorIndicador)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdClasificacion", entitiValorIndicador.IdClasificacion);
                data.Add("Clasificacion", entitiValorIndicador.Clasificacion);
               
                string query = "SPActualizarClasificacionIndicador";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<DtoRespuestaSP> EliminarTipoIndicador(int idTipoIndicador)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoIndicador", idTipoIndicador);
                string query = "SPEliminarTipoIndicador";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoIndicador> ObtenerTipoIndicadorPorID(int idTipoIndicador)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoIndicador", idTipoIndicador);
                string query = "SPObtenerTipoIndicadorPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoIndicador>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoValorIndicador>>ObtenerValoresIndicadorPorID(int idTipoIndicador)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoIndicador", idTipoIndicador);
                string query = "SPObtenerValoresIndicadorPorId";

                return await this.contextoBD.ObtenerListaDeDatos<DtoValorIndicador>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoIndicador>> ObtenerTiposIndicadores()
        {
            try
            {
                string query = "SPObtenerTiposIndicadores";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoIndicador>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoIndicador>> ObtenerTiposIndicadoresActivos()
        {
            try
            {
                string query = "SPObtenerIndicadoresActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoIndicador>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
