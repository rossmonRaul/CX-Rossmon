using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.EstadoHallazgo;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioEstadoHallazgo : IServicioEstadoHallazgo
    {
        private readonly IRepositorioEstadoHallazgo spEstadoHallazgo;
        public ServicioEstadoHallazgo(IRepositorioEstadoHallazgo repositorioCategorias)
        {
            this.spEstadoHallazgo = repositorioCategorias;
        }
        public async Task<List<DtoEstadoHallazgo>> ObtenerEstadoHallazgo()
        {
            return await this.spEstadoHallazgo.ObtenerEstadoHallazgo();
        }

        public async Task<DtoRespuestaSP> InsertarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo)
        {
            return await this.spEstadoHallazgo.InsertarEstadoHallazgo(entitiEstadoHallazgo);
        }
        public async Task<DtoRespuestaSP> ActualizarEstadoHallazgo(EntitiEstadoHallazgo entitiEstadoHallazgo)
        {
            return await this.spEstadoHallazgo.ActualizarEstadoHallazgo(entitiEstadoHallazgo);
        }
        public async Task<DtoRespuestaSP> EliminarEstadoHallazgo(int idEstadoHallazgo)
        {
            return await this.spEstadoHallazgo.EliminarEstadoHallazgo(idEstadoHallazgo);
        }
        public async Task<DtoEstadoHallazgo> ObtenerEstadoHallazgoPorID(int idEstadoHallazgo)
        {
            return await this.spEstadoHallazgo.ObtenerEstadoHallazgoPorID(idEstadoHallazgo);
        }
    }
}

