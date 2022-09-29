using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Interfaces.Aplicacion.GradoEsfuerzo;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioGradosEsfuerzo : IServicioGradoEsfuerzo
    {
        private readonly IRepositorioGradosEsfuerzo spGradosEsfuerzo;

        public ServicioGradosEsfuerzo(IRepositorioGradosEsfuerzo repositorioGradosEsfuerzo)
        {
            this.spGradosEsfuerzo = repositorioGradosEsfuerzo;
        }
        public async Task<List<DtoGradosEsfuerzo>> ObtenerGradosEsfuerzo()
        {
            return await this.spGradosEsfuerzo.ObtenerGradosEsfuerzo();
        }

        public async Task<DtoRespuestaSP> InsertarGradosEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            return await this.spGradosEsfuerzo.InsertarGradosEsfuerzo(entitiGradosEsfuerzo);
        }
        public async Task<DtoRespuestaSP> ActualizarGradoEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            return await this.spGradosEsfuerzo.ActualizarGradoEsfuerzo(entitiGradosEsfuerzo);
        }

        public async Task<DtoGradosEsfuerzo> ObtenerGradoEsfuerzoPorID(int idGradoEsfuerzo)
        {
            return await this.spGradosEsfuerzo.ObtenerGradoEsfuerzoPorID(idGradoEsfuerzo);
        }

        public async Task<DtoRespuestaSP> EliminarGradoEsfuerzo(int idGradoEsfuerzo)
        {
            return await this.spGradosEsfuerzo.EliminarGradoEsfuerzo(idGradoEsfuerzo);
        }

    }
}
