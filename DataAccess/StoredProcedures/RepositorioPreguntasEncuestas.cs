using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioPreguntasEncuestas: IRepositorioPreguntasEncuestas
    {
        private readonly IContextoBD contextoBD;

        public RepositorioPreguntasEncuestas(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }



        public async Task<DtoRespuestaSP> InsertarPreguntaEncuesta(EntitiPreguntasEncuestas entitiPreguntasEncuestas)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Pregunta", entitiPreguntasEncuestas.Pregunta);
                data.Add("IdTipoEncuesta", entitiPreguntasEncuestas.idTipoEncuesta);
                data.Add("IdTipoMetrica", entitiPreguntasEncuestas.idTipoMetrica);
                data.Add("IdTipoPerspectiva", entitiPreguntasEncuestas.idTipoPerspectiva);
                data.Add("IdTipoIndicador", entitiPreguntasEncuestas.idTipoIndicador);
                data.Add("IdTipoPregunta", entitiPreguntasEncuestas.idTipoPregunta);
                data.Add("IdTipoContactoEncuesta", entitiPreguntasEncuestas.idTipoContactoEncuesta);
                data.Add("IdTipoIteraccion", entitiPreguntasEncuestas.idTipoInteraccion);
                data.Add("Estado", entitiPreguntasEncuestas.estado);


                string query = "SPInsertarPreguntaEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoPreguntasEncuestas> ObtenerPreguntaPorID(int idPregunta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdPreguntaEncuesta", idPregunta);
                string query = "SPObtenerPreguntaPorID";

                return await this.contextoBD.ObtenerDato<DtoPreguntasEncuestas>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoPreguntasEncuestas> ObtenerUltimoIdPregunta()
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                //data.Add("IdPreguntaEncuesta", idPregunta);
                string query = "SPObtenerUltimoIdPreguntas";

                return await this.contextoBD.ObtenerDato<DtoPreguntasEncuestas>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<List<DtoPreguntasEncuestas>> ObtenerPregunta()
        {
            try
            {
                string query = "SPObtenerPreguntas";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoPreguntasEncuestas>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoRespuestaSP> ActualizarPregunta(EntitiPreguntasEncuestas entitiPreguntasEncuestas)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdPreguntaEncuesta", entitiPreguntasEncuestas.IdPreguntaEncuesta);
                data.Add("Pregunta", entitiPreguntasEncuestas.Pregunta);
                data.Add("IdTipoIndicador", entitiPreguntasEncuestas.idTipoIndicador);
                data.Add("IdTipoMetrica", entitiPreguntasEncuestas.idTipoMetrica);
                data.Add("IdTipoEncuesta", entitiPreguntasEncuestas.idTipoEncuesta);
                string query = "SPActualizarPreguntaEncuestas";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }



        public async Task<DtoRespuestaSP> EliminarPreguntaEncuesta(int idPreguntaEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdPreguntaEncuesta", idPreguntaEncuesta);
                string query = "SPEliminarPreguntaEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

      
    }
}
