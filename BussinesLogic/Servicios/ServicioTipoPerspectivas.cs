using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoPerspectivas
    {
        public SPTipoPerspectivas spTipoPerspectivas = new SPTipoPerspectivas();

        public async Task<DtoRespuestaSP> InsertarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            return await this.spTipoPerspectivas.InsertarTipoPerspectivas(entitiTipoPerspectivas);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            return await this.spTipoPerspectivas.ActualizarTipoPerspectivas(entitiTipoPerspectivas);
        }
        public async Task<DtoRespuestaSP> EliminarTipoPerspectivas(int idTipoPerspectivas)
        {
            return await this.spTipoPerspectivas.EliminarTipoPerspectivas(idTipoPerspectivas);
        }
        public async Task<DtoTipoPerspectivas> ObtenerTipoPerspectivasPorID(int idTipoPerspectivas)
        {
            return await this.spTipoPerspectivas.ObtenerTipoPerspectivasPorID(idTipoPerspectivas);
        }

        public async Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivas()
        {
            return await this.spTipoPerspectivas.ObtenerTipoPerspectivas();
        }

        public async Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivasActivos()
        {
            return await this.spTipoPerspectivas.ObtenerTipoPerspectivasActivos();
        }
    }
}
