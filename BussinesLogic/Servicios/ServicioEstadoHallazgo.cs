using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioEstadoHallazgo
    {
        public SPEstadoHallazgo spEstadoHallazgo = new SPEstadoHallazgo();

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

