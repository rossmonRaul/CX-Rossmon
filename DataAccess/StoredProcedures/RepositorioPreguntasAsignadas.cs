using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioPreguntasAsignadas: IRepositorioPreguntasAsignadas
    {
        private readonly IContextoBD contextoBD;

        public RepositorioPreguntasAsignadas(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }



        public async Task<DtoRespuestaSP> AsignarPregunta(EntitiPreguntaAsignada entitiPreguntaAsignada)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEncuesta", entitiPreguntaAsignada.IdEncuesta);
                data.Add("IdPreguntaEncuesta", entitiPreguntaAsignada.IdPreguntaEncuesta);



                string query = "SPAsignarPregunta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> DesasignarPregunta(int idAsignacion)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdAsignacion", idAsignacion);
                string query = "SPDesasignarPregunta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<List<DtoPreguntaAsignada>> ObtenerPreguntasPorIdEncuesta(int idEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEncuesta", idEncuesta);
                string query = "SPObtenerPreguntasPorIdEncuesta";

                return await this.contextoBD.ObtenerListaDeDatos<DtoPreguntaAsignada>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoPreguntasEncuestas>> ObtenerPreguntasNoAsignadasPorIdEncuesta(int idEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdEncuesta", idEncuesta);
                string query = "SPObtenerPreguntasNoAsignadas";

                return await this.contextoBD.ObtenerListaDeDatos<DtoPreguntasEncuestas>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }






    }
}
