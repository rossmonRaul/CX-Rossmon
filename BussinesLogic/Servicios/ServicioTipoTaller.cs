using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoTaller
    {
        public SPTipoTaller spTipoTaller = new SPTipoTaller();

        public async Task<DtoRespuestaSP> InsertarTipoTaller(EntitiTipoTaller entitiTipoTaller)
        {
            return await this.spTipoTaller.InsertarTipoTaller(entitiTipoTaller);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoTaller(EntitiTipoTaller entitiTipoTaller)
        {
            return await this.spTipoTaller.ActualizarTipoTaller(entitiTipoTaller);
        }
        public async Task<DtoRespuestaSP> EliminarTipoTaller(int idTipoTaller)
        {
            return await this.spTipoTaller.EliminarTipoTaller(idTipoTaller);
        }
        public async Task<DtoTipoTaller> ObtenerTipoTallerPorID(int idTipoTaller)
        {
            return await this.spTipoTaller.ObtenerTipoTallerPorID(idTipoTaller);
        }

        public async Task<List<DtoTipoTaller>> ObtenerTipoTaller()
        {
            return await this.spTipoTaller.ObtenerTipoTaller();
        }

        public async Task<List<DtoTipoTaller>> ObtenerTipoTallerActivos()
        {
            return await this.spTipoTaller.ObtenerTipoTallerActivos();
        }
    }
}
