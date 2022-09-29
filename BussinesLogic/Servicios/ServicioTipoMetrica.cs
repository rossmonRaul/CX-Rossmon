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
        public readonly IRepositorioTipoMetrica spTipoMetrica;

        public ServicioTipoMetrica(IRepositorioTipoMetrica spTipoMetrica)
        {
            this.spTipoMetrica = spTipoMetrica;
        }

        public async Task<DtoRespuestaSP> InsertarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            return await this.spTipoMetrica.InsertarTipoMetrica(entitiTipoMetrica);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoMetrica(EntitiTipoMetrica entitiTipoMetrica)
        {
            return await this.spTipoMetrica.ActualizarTipoMetrica(entitiTipoMetrica);
        }
        public async Task<DtoRespuestaSP> EliminarTipoMetrica(int idTipoMetrica)
        {
            return await this.spTipoMetrica.EliminarTipoMetrica(idTipoMetrica);
        }
        public async Task<DtoTipoMetrica> ObtenerTipoMetricaPorID(int idTipoMetrica)
        {
            return await this.spTipoMetrica.ObtenerTipoMetricaPorID(idTipoMetrica);
        }

        public async Task<List<DtoTipoMetrica>> ObtenerTiposMetricas()
        {
            return await this.spTipoMetrica.ObtenerTiposMetricas();
        }

        public async Task<List<DtoTipoMetrica>> ObtenerTipoMetricaActivos()
        {
            return await this.spTipoMetrica.ObtenerTiposMetricasActivos();
        }
    }
}
