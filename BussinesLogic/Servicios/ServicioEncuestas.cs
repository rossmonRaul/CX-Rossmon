using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Encuesta;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioEncuestas : IServicioEncuestas
    {
        public readonly IRepositorioEncuestas repositorioEncuestas;

        public ServicioEncuestas(IRepositorioEncuestas repositorioEncuestas)
        {
            this.repositorioEncuestas = repositorioEncuestas;
        }


        public async Task<List<DtoEncuesta>> ObtenerEncuestas()
        {
            return await this.repositorioEncuestas.ObtenerEncuestas();
        }


        public async Task<DtoRespuestaSP> InsertarEncuestas(EntitiEncuesta entitiEncuestas)
        {
            return await this.repositorioEncuestas.InsertarEncuestas(entitiEncuestas);
        }

        public async Task<DtoRespuestaSP> ActualizarEncuesta(EntitiEncuesta entitiEncuesta)
        {
            return await this.repositorioEncuestas.ActualizarEncuesta(entitiEncuesta);
        }

        public async Task<DtoEncuesta> ObtenerEncuestaPorID(int idEncuesta)
        {
            return await this.repositorioEncuestas.ObtenerEncuestaPorId(idEncuesta);
        }
        public async Task<DtoRespuestaSP> EliminarEncuesta(int idEncuestas)
        {
            return await this.repositorioEncuestas.EliminarEncuesta(idEncuestas);
        }

        public async Task<List<DtoEncuesta>> ObtenerEncuestasActivas()
        {
            return await this.repositorioEncuestas.ObtenerEncuestasActivas();
        }
    }
}
