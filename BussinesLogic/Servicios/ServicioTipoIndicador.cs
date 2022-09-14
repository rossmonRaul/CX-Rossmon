using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoIndicador
    {
        public SPTipoIndicador spTipoIndicador = new SPTipoIndicador();

        public async Task<DtoRespuestaSP> InsertarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            return await this.spTipoIndicador.InsertarTipoIndicador(entitiTipoIndicador);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            return await this.spTipoIndicador.ActualizarTipoIndicador(entitiTipoIndicador);
        }
        public async Task<DtoRespuestaSP> ActualizarValorIndicador(EntitiValorIndicador entitiValorIndicador)
        {
            return await this.spTipoIndicador.ActualizarValorIndicador(entitiValorIndicador);
        }
        public async Task<DtoRespuestaSP> EliminarTipoIndicador(int idTipoIndicador)
        {
            return await this.spTipoIndicador.EliminarTipoIndicador(idTipoIndicador);
        }
        public async Task<DtoTipoIndicador> ObtenerTipoIndicadorPorID(int idTipoIndicador)
        {
            return await this.spTipoIndicador.ObtenerTipoIndicadorPorID(idTipoIndicador);
        }
        public async Task<List<DtoValorIndicador>> ObtenerValoresIndicadorPorID(int idTipoIndicador)
        {
            return await this.spTipoIndicador.ObtenerValoresIndicadorPorID(idTipoIndicador);
        }

        public async Task<List<DtoTipoIndicador>> ObtenerTipoIndicador()
        {
            return await this.spTipoIndicador.ObtenerTiposIndicadores();
        }

        public async Task<List<DtoTipoIndicador>> ObtenerTipoIndicadorActivos()
        {
            return await this.spTipoIndicador.ObtenerTiposIndicadoresActivos();
        }
    }
}
