using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioRespuestasPreguntaEncuesta: IRepositorioRespuestasPreguntasEncuesta
    {
        private readonly IContextoBD contextoBD;

        public RepositorioRespuestasPreguntaEncuesta(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }


        public async Task<DtoRespuestaSP> InsertarRespuestaPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta)
        {
            try
            {


                var result = (dynamic)null;

                if (entitiRespuestasPreguntasEncuesta.Respuestas != null)
                {

                    foreach (string i in entitiRespuestasPreguntasEncuesta.Respuestas)
                    {
                        Dictionary<string, object> data = new Dictionary<string, object>();
                        data.Add("IdPreguntaEncuesta", entitiRespuestasPreguntasEncuesta.IdPreguntaEncuesta);
                        data.Add("Respuesta", i);


                        string query = "SPInsertarRespuestasPregunta";
                        result = await this.contextoBD.EjecutarSP(query, data);

                    }
                }
                else
                {

                    Dictionary<string, object> data = new Dictionary<string, object>();
                    data.Add("IdPreguntaEncuesta", entitiRespuestasPreguntasEncuesta.IdPreguntaEncuesta);
                    data.Add("Respuesta", entitiRespuestasPreguntasEncuesta.Respuesta);


                    string query = "SPInsertarRespuestasPregunta";
                    result = await this.contextoBD.EjecutarSP(query, data);

                }

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task <List<DtoRespuestasPreguntasEncuesta>> ObtenerRespuestasPreguntaEcuestaPorID(int idRespuestasPE)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                string query = "SPObtenerRespuestasPregunta";
                data.Add("IdPreguntaEncuesta", idRespuestasPE);
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoRespuestasPreguntasEncuesta>(query, data);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarRespuestaPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdRespuesta", entitiRespuestasPreguntasEncuesta.IdRespuesta);
                data.Add("Respuesta", entitiRespuestasPreguntasEncuesta.Respuesta);
                data.Add("IdPreguntaEncuesta", entitiRespuestasPreguntasEncuesta.IdPreguntaEncuesta);


                string query = "SPActualizarRespuestasPreguntaEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
