using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoTaller;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoTaller : IServicioTipoTaller
    {
        private readonly IRepositorioTipoTaller repositorioTipoTaller;

        public ServicioTipoTaller(IRepositorioTipoTaller repositorioTipoTaller)
        {
            this.repositorioTipoTaller = repositorioTipoTaller;
        }

        public async Task<DtoRespuestaSP> InsertarTipoTaller(EntitiTipoTaller entitiTipoTaller)
        {
            return await this.repositorioTipoTaller.InsertarTipoTaller(entitiTipoTaller);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoTaller(EntitiTipoTaller entitiTipoTaller)
        {
            return await this.repositorioTipoTaller.ActualizarTipoTaller(entitiTipoTaller);
        }
        public async Task<DtoRespuestaSP> EliminarTipoTaller(int idTipoTaller)
        {
            return await this.repositorioTipoTaller.EliminarTipoTaller(idTipoTaller);
        }
        public async Task<DtoTipoTaller> ObtenerTipoTallerPorID(int idTipoTaller)
        {
            return await this.repositorioTipoTaller.ObtenerTipoTallerPorID(idTipoTaller);
        }

        public async Task<List<DtoTipoTaller>> ObtenerTipoTaller()
        {
            return await this.repositorioTipoTaller.ObtenerTipoTaller();
        }

        public async Task<List<DtoTipoTaller>> ObtenerTipoTallerActivos()
        {
            return await this.repositorioTipoTaller.ObtenerTipoTallerActivos();
        }
    }
}
