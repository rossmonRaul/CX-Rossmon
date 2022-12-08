using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.RespuestasPreguntaEncuesta;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace BussinesLogic.Servicios
{
    public class ServicioRespuestasPreguntaEncuesta: IServicioRespuestasPreguntaEncuesta
    {
        public readonly IRepositorioRespuestasPreguntasEncuesta repositorioRespuestasPreguntasEncuesta;

        public ServicioRespuestasPreguntaEncuesta(IRepositorioRespuestasPreguntasEncuesta repositorioRespuestasPreguntasEncuesta)
        {
            this.repositorioRespuestasPreguntasEncuesta = repositorioRespuestasPreguntasEncuesta;
        }


        public async Task<DtoRespuestaSP> InsertarRespuestaPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta)
        {
            return await this.repositorioRespuestasPreguntasEncuesta.InsertarRespuestaPreguntaEncuesta(entitiRespuestasPreguntasEncuesta);
        }


        public async Task <List<DtoRespuestasPreguntasEncuesta>> ObtenerRespuestasPreguntaEncuestaPorID(int idRespuestasPE)
        {
            return await this.repositorioRespuestasPreguntasEncuesta.ObtenerRespuestasPreguntaEcuestaPorID(idRespuestasPE);
        }

        public async Task<DtoRespuestaSP> ActualizarRespuestasPreguntaEncuesta(EntitiRespuestasPreguntasEncuesta entitiRespuestasPreguntasEncuesta)
        {
            return await this.repositorioRespuestasPreguntasEncuesta.ActualizarRespuestaPreguntaEncuesta(entitiRespuestasPreguntasEncuesta);
        }

    }
}
