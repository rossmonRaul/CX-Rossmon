using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;


namespace DataAccess.StoredProcedures
{
    public class RepositorioDirecciones : IRepositorioDirecciones
    {
        private readonly IContextoBD contextoBD;

        public RepositorioDirecciones(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarDirecciones(EntitiDirecciones entitiDirecciones)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Codigo", entitiDirecciones.Codigo);
                data.Add("Direccion", entitiDirecciones.Direccion);

                string query = "SPInsertarDirecciones";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarDireccion(EntitiDirecciones entitiDirecciones)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("Codigo", entitiDirecciones.Codigo);
                data.Add("Direccion", entitiDirecciones.Direccion);
                string query = "SPActualizarDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarDireccion(int idDireccion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdDireccion", idDireccion);
                string query = "SPEliminarDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoDirecciones> ObtenerDireccionPorID(int idDireccion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdDireccion", idDireccion);
                string query = "SPObtenerDireccionPorID";

                return await this.contextoBD.ObtenerDato<DtoDirecciones>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoDirecciones>> ObtenerDirecciones()
        {
            try
            {
                string query = "SPObtenerDirecciones";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoDirecciones>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoDirecciones>> ObtenerDireccionesActivas()
        {
            try
            {
                string query = "SPObtenerDireccionesActivas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoDirecciones>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}
 