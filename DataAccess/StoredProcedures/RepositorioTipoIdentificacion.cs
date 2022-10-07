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
    public class RepositorioTipoIdentificacion : IRepositorioTipoIdentificacion
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTipoIdentificacion(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTipoIdentificacion(EntitiTipoIdentificacion entitiTipoIdentificacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("TipoIdentificacion", entitiTipoIdentificacion.tipoIdentificacion);


                string query = "SPInsertarTipoIdentificacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTipoIdentificacion(EntitiTipoIdentificacion entitiTipoIdentificacion)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoIdentificacion", entitiTipoIdentificacion.idTipoIdentificacion);
                data.Add("TipoIdentificacion", entitiTipoIdentificacion.tipoIdentificacion);
                string query = "SPActualizarTipoIdentificacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTipoIdentificacion(int idTipoIdentificacion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoIdentificacion", idTipoIdentificacion);
                string query = "SPEliminarTipoIdentificacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTipoIdentificacion> ObtenerTipoIdentificacionPorID(int idTipoIdentificacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoIdentificacion", idTipoIdentificacion);
                string query = "SPObtenerTipoIdentificacionPorID";

                return await this.contextoBD.ObtenerDato<DtoTipoIdentificacion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTipoIdentificacion>> ObtenerTipoIdentificacion()
        {
            try
            {
                string query = "SPObtenerTipoIdentificacion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoIdentificacion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTipoIdentificacion>> ObtenerTipoIdentificacionActivos()
        {
            try
            {
                string query = "SPObtenerTipoIdentificacionActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTipoIdentificacion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }

}
