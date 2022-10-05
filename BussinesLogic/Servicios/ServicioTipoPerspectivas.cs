using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoPerspectivas;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoPerspectivas: IServicioTipoPerspectivas
    {
        public readonly IRepositorioTipoPerspectivas repositorioTipoPerspectivas;
        public ServicioTipoPerspectivas(IRepositorioTipoPerspectivas repositorioTipoPerspectivas)
        {
            this.repositorioTipoPerspectivas = repositorioTipoPerspectivas;
        }
        public async Task<DtoRespuestaSP> InsertarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            return await this.repositorioTipoPerspectivas.InsertarTipoPerspectivas(entitiTipoPerspectivas);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoPerspectivas(EntitiTipoPerspectivas entitiTipoPerspectivas)
        {
            return await this.repositorioTipoPerspectivas.ActualizarTipoPerspectivas(entitiTipoPerspectivas);
        }
        public async Task<DtoRespuestaSP> EliminarTipoPerspectivas(int idTipoPerspectivas)
        {
            return await this.repositorioTipoPerspectivas.EliminarTipoPerspectivas(idTipoPerspectivas);
        }
        public async Task<DtoTipoPerspectivas> ObtenerTipoPerspectivasPorID(int idTipoPerspectivas)
        {
            return await this.repositorioTipoPerspectivas.ObtenerTipoPerspectivasPorID(idTipoPerspectivas);
        }

        public async Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivas()
        {
            return await this.repositorioTipoPerspectivas.ObtenerTipoPerspectivas();
        }

        public async Task<List<DtoTipoPerspectivas>> ObtenerTipoPerspectivasActivos()
        {
            return await this.repositorioTipoPerspectivas.ObtenerTipoPerspectivasActivos();
        }
    }
}
