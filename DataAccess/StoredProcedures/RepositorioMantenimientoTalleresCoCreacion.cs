
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


    public class RepositorioMantenimientoTalleresCoCreacion : IRepositorioMantenimientoTalleresCoCreacion
    {
        private readonly IContextoBD contextoBD;

        public RepositorioMantenimientoTalleresCoCreacion(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }
        public async Task<DtoRespuestaSP> AgregarMantenimientoTallerCoCreacion(EntitiMantenimientoTallerCoCreacion entitiMantenimientoTallerCoCreacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTipoTaller ", entitiMantenimientoTallerCoCreacion.idTipoTaller);
                data.Add("IdSolucionAsociadaHallazgo ", entitiMantenimientoTallerCoCreacion.idSolucionAsociadaHallazgo);
                data.Add("IdServicioAsociadoHallazgo ", entitiMantenimientoTallerCoCreacion.idServicioAsociadoHallazgo);
                data.Add("NumOficioEnvio ", entitiMantenimientoTallerCoCreacion.numOficioEnvio);
                data.Add("FechaNumOficio ", entitiMantenimientoTallerCoCreacion.fechaNumOficio);
                data.Add("DescripcionGeneral  ", entitiMantenimientoTallerCoCreacion.descripcionGeneral);
                string query = "SPInsertarMantenimientoTallerCoCreacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarMantenimientoTallerCoCreacion(EntitiMantenimientoTallerCoCreacion entitiMantenimientoTallerCoCreacion)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdMantenimientoTalleresCoCreacion", entitiMantenimientoTallerCoCreacion.idMantenimientoTalleresCoCreacion);
                data.Add("IdTipoTaller ", entitiMantenimientoTallerCoCreacion.idTipoTaller);
                data.Add("IdSolucionAsociadaHallazgo ", entitiMantenimientoTallerCoCreacion.idSolucionAsociadaHallazgo);
                data.Add("IdServicioAsociadoHallazgo ", entitiMantenimientoTallerCoCreacion.idServicioAsociadoHallazgo);
                data.Add("NumOficioEnvio ", entitiMantenimientoTallerCoCreacion.numOficioEnvio);
                data.Add("FechaNumOficio ", entitiMantenimientoTallerCoCreacion.fechaNumOficio);
                data.Add("DescripcionGeneral  ", entitiMantenimientoTallerCoCreacion.descripcionGeneral);
                string query = "SPActualizarMantenimientoTallerCoCreacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarMantenimientoTallerCoCreacion(int idMantenimientoTallerCoCreacion)

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
        }


        public async Task<DtoMantenimientoTallerCoCreacion> ObtenerMantenimientoTallerCoCreacionPorID(int idMantenimientoTallerCoCreacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMantenimientoTalleresCoCreacion", idMantenimientoTallerCoCreacion);
                string query = "SPObtenerMantenimientoTallerCoCreacionPorID";

                return await this.contextoBD.ObtenerDato<DtoMantenimientoTallerCoCreacion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoMantenimientoTallerCoCreacion>> ObtenerMantenimientoTallerCoCreacion()
        {
            try
            {
                string query = "SPObtenerMantenimientoTallerCoCreacion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoMantenimientoTallerCoCreacion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoMantenimientoTallerCoCreacion>> ObtenerEtapasTallerCoCreacion(int idTipoTaller)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoTaller", idTipoTaller);
                string query = "SPObtenerEtapasTallerCoCreacion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoMantenimientoTallerCoCreacion>(query, data);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<DtoMantenimientoTallerCoCreacion> ObtenerFechasTallerCoCreacion(int idTipoTaller)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTipoTaller", idTipoTaller);
                string query = "SPObtenerFechasTallerCoCreacion";
                var result = await this.contextoBD.ObtenerDato<DtoMantenimientoTallerCoCreacion>(query, data);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoCantidadDatos> ObtenerCantidadMantenimientoTalleresCoCreacion()
        {
            try
            {
                string query = "SPObtenerCantidadMantenimientoTalleresCoCreacion";
                var result = await this.contextoBD.ObtenerDato<DtoCantidadDatos>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoOrbe>> ObtenerDatosOrbe()
        {
            try
            {
                string query = "SPObtenerOrbe";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoOrbe>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}



