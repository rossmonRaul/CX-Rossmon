using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioFormularioPreguntas : IRepositorioFormularioPreguntas
    {
        private readonly IContextoBD contextoBD;

        public RepositorioFormularioPreguntas(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }
          public async Task <List<DtoRespuestasPreguntasEncuesta>> ObtenerPreguntaRespuestaPorID(int idPreguntaEncuesta)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                string query = "SPObtenerRespuestaPreguntaTexto";
                data.Add("IdPreguntaEncuesta", idPreguntaEncuesta);
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoRespuestasPreguntasEncuesta>(query, data);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

   
    

