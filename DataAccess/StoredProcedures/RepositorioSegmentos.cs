using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioSegmentos : IRepositorioSegmentos
    {
        private readonly IContextoBD contextoBD;

        public RepositorioSegmentos(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarSegmentos(EntitiSegmentos entitiSegmentos)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Segmento", entitiSegmentos.Segmento);
                data.Add("IdSector", entitiSegmentos.IdSector);

                string query = "SPInsertarSegmentos";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarSegmentos(EntitiSegmentos entitiSegmento)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdSegmento", entitiSegmento.IdSegmento);
                data.Add("Segmento", entitiSegmento.Segmento);
                data.Add("IdSector", entitiSegmento.IdSector);
                string query = "SPActualizarSegmento";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarSegmento(int idSegmento)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSegmento", idSegmento);
                string query = "SPEliminarSegmento";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoSegmentos> ObtenerSegmentosPorID(int idSegmento)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdSegmento", idSegmento);
                string query = "SPObtenerSegmentoPorID";

                return await this.contextoBD.ObtenerDato<DtoSegmentos>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoSegmentos>> ObtenerSegmentos()
        {
            try
            {
                string query = "SPObtenerSegmentos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoSegmentos>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
