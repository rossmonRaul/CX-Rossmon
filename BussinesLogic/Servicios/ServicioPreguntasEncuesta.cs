using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Interfaces.Aplicacion.Jefatura;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Aplicacion.PreguntasEncuesta;

namespace BussinesLogic.Servicios
{
    public class ServicioPreguntasEncuesta: IServicioPreguntasEncuesta
    {
        public readonly IRepositorioPreguntasEncuestas repositorioPreguntasEncuesta;

        public ServicioPreguntasEncuesta(IRepositorioPreguntasEncuestas repositorioPreguntasEncuestas)
        {
            this.repositorioPreguntasEncuesta = repositorioPreguntasEncuestas;
        }

        public async Task<DtoRespuestaSP> ActualizarPregunta(EntitiPreguntasEncuestas entitiPreguntas)
        {
            return await this.repositorioPreguntasEncuesta.ActualizarPregunta(entitiPreguntas);
        }

        public async Task<DtoRespuestaSP> EliminarPreguntaEncuesta(int idPreguntaEncuesta)
        {
            return await this.repositorioPreguntasEncuesta.EliminarPreguntaEncuesta(idPreguntaEncuesta);
        }

        public async Task<DtoRespuestaSP> InsertarPregunta(EntitiPreguntasEncuestas entitiPreguntas)
        {
            return await this.repositorioPreguntasEncuesta.InsertarPreguntaEncuesta(entitiPreguntas);
        }

        public async Task<List<DtoPreguntasEncuestas>> ObtenerPregunta()
        {
            return await this.repositorioPreguntasEncuesta.ObtenerPregunta();
        }

        public async Task<DtoPreguntasEncuestas> ObtenerPreguntaPorID(int idPregunta)
        {
            return await this.repositorioPreguntasEncuesta.ObtenerPreguntaPorID(idPregunta);
        }

        public async Task<DtoPreguntasEncuestas> ObtenerUltimoIdPregunta()
        {
            return await this.repositorioPreguntasEncuesta.ObtenerUltimoIdPregunta();
        }
    }
}
