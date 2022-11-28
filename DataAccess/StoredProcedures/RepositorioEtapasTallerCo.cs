
using Dapper;
//using DataAccess.Conexion;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
//using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{

   
    public class RepositorioEtapasTallerCo : IRepositorioEtapaTallerCo
    {
        private readonly IContextoBD contextoBD;

        public RepositorioEtapasTallerCo(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }
        public async Task<DtoRespuestaSP> AgregarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo )
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoTaller ", entitiEtapaTallerCo.idTipoTaller);
                data.Add("IdMacro ", entitiEtapaTallerCo.idMacro);
                data.Add("Observacion ", entitiEtapaTallerCo.observacion);
                string query = "SPInsertarEtapaTallerCo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdEtapaTallerCo", entitiEtapaTallerCo.idEtapaTallerCo);
                data.Add("IdTipoTaller ", entitiEtapaTallerCo.idTipoTaller);
                data.Add("IdMacro ", entitiEtapaTallerCo.idMacro);
                data.Add("Observacion ", entitiEtapaTallerCo.observacion);
                string query = "SPActualizarEtapaTallerCo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

       /* public async Task<DtoRespuestaSP> EliminarMantenimientoTallerCoCreacion(int idMantenimientoTallerCoCreacion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMantenimientoTalleresCoCreacion", idMantenimientoTallerCoCreacion);
                string query = "SPEliminarMantenimientoTallerCoCreacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }*/


        public async Task<DtoEtapaTallerCo> ObtenerEtapaTallerCoPorID(int idEtapaTallerCo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEtapaTallerCo", idEtapaTallerCo);
                string query = "SPObtenerEtapaTallerCoPorID";

                return await this.contextoBD.ObtenerDato<DtoEtapaTallerCo>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoEtapaTallerCo>> ObtenerEtapasTallerCo(int idTipoTaller)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoTaller", idTipoTaller);
                string query = "SPObtenerEtapasTallerCoCreacion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoEtapaTallerCo>(query,data);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<DtoEtapaTallerCo> ObtenerFechasTallerCo(int idTipoTaller)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoTaller", idTipoTaller);
                string query = "SPObtenerFechasTallerCoCreacion";
                var result = await this.contextoBD.ObtenerDato<DtoEtapaTallerCo>(query, data);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoCantidadDatos> ObtenerCantidadEtapasTallerCo()
        {
            try
            {
                string query = "SPObtenerCantidadEtapasTallerCo";
                var result = await this.contextoBD.ObtenerDato<DtoCantidadDatos>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
     
    }
}

        

