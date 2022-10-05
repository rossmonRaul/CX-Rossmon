using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoMetrica;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoMetrica : IServicioTipoMetrica
    {
        public readonly IRepositorioTipoMetrica repositorioTipoMetrica;

        public ServicioTipoMetrica(IRepositorioTipoMetrica repositorioTipoMetrica)
        {
            this.repositorioTipoMetrica = repositorioTipoMetrica;
        }

        public async Task<DtoRespuestaSP> InsertarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            return await this.repositorioTipoMetrica.InsertarTipoMetrica(entitiTipoMetrica);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            return await this.repositorioTipoMetrica.ActualizarTipoMetrica(entitiTipoMetrica);
        }
        public async Task<DtoRespuestaSP> EliminarTipoMetrica(int idTipoMetrica)
        {
            return await this.repositorioTipoMetrica.EliminarTipoMetrica(idTipoMetrica);
        }
        public async Task<DtoTipoMetrica> ObtenerTipoMetricaPorID(int idTipoMetrica)
        {
            return await this.repositorioTipoMetrica.ObtenerTipoMetricaPorID(idTipoMetrica);
        }

        public async Task<List<DtoTipoMetrica>> ObtenerTiposMetricas()
        {
            return await this.repositorioTipoMetrica.ObtenerTiposMetricas();
        }

        public async Task<List<DtoTipoMetrica>> ObtenerTipoMetricaActivos()
        {
            return await this.repositorioTipoMetrica.ObtenerTiposMetricasActivos();
        }
    }
}
