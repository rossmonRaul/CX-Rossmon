using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioTalleresCoCreacion : IRepositorioTalleresCoCreacion
    {
        private readonly IContextoBD contextoBD;

        public RepositorioTalleresCoCreacion(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarTalleresCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("DescripcionGeneral", entitiTallerCoCreacion.DescripcionGeneral);
                data.Add("OficioAutoriza", entitiTallerCoCreacion.OficioAutoriza);
                data.Add("IdTipoTaller", entitiTallerCoCreacion.IdTipoTaller);
                data.Add("IdServicio", entitiTallerCoCreacion.IdServicio);
                data.Add("FechaTaller", entitiTallerCoCreacion.FechaTaller);
                string query = "SPInsertarTalleresCoCreacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarTallerCoCreacion(EntitiTallerCoCreacion entitiTallerCoCreacion)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdTallerCoCreacion", entitiTallerCoCreacion.IdTallerCoCreacion);
                data.Add("DescripcionGeneral", entitiTallerCoCreacion.DescripcionGeneral);
                data.Add("OficioAutoriza", entitiTallerCoCreacion.OficioAutoriza);
                data.Add("IdTipoTaller", entitiTallerCoCreacion.IdTipoTaller);
                data.Add("IdServicio", entitiTallerCoCreacion.IdServicio);
                data.Add("IdServicio", entitiTallerCoCreacion.IdServicio);
                string query = "SPActualizarTalleresCoCreacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarTallerCoCreacion(int idTallerCoCreacion)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTallerCoCreacion", idTallerCoCreacion);
                string query = "SPEliminarTalleresCoCreacion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoTallerCoCreacion> ObtenerTallerCoCreacion(int idTallerCoCreacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdTallerCoCreacion", idTallerCoCreacion);
                string query = "SPObtenerTalleresCoCreacionPorID";

                return await this.contextoBD.ObtenerDato<DtoTallerCoCreacion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoTallerCoCreacion>> ObtenerTalleresCoCreacion()
        {
            try
            {
                string query = "SPObtenerTalleresCoCreacion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTallerCoCreacion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoTallerCoCreacion>> ObtenerTalleresCoCreacionActivos()
        {
            try
            {
                string query = "SPObtenerTalleresCoCreacionActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoTallerCoCreacion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }

}
