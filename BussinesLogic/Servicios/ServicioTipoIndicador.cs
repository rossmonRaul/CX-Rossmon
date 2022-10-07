using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TipoIndicador;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoIndicador : IServicioTipoIndicador
    {
        public readonly IRepositorioTipoIndicador repositorioTipoIndicador;

        public ServicioTipoIndicador(IRepositorioTipoIndicador repositorioTipoIndicador)
        {
            this.repositorioTipoIndicador = repositorioTipoIndicador;
        }
        public async Task<DtoRespuestaSP> InsertarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            return await this.repositorioTipoIndicador.InsertarTipoIndicador(entitiTipoIndicador);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador)
        {
            return await this.repositorioTipoIndicador.ActualizarTipoIndicador(entitiTipoIndicador);
        }
        public async Task<DtoRespuestaSP> ActualizarValorIndicador(EntitiValorIndicador entitiValorIndicador)
        {
            return await this.repositorioTipoIndicador.ActualizarValorIndicador(entitiValorIndicador);
        }
        public async Task<DtoRespuestaSP> EliminarTipoIndicador(int idTipoIndicador)
        {
            return await this.repositorioTipoIndicador.EliminarTipoIndicador(idTipoIndicador);
        }
        public async Task<DtoTipoIndicador> ObtenerTipoIndicadorPorID(int idTipoIndicador)
        {
            return await this.repositorioTipoIndicador.ObtenerTipoIndicadorPorID(idTipoIndicador);
        }
        public async Task<List<DtoValorIndicador>> ObtenerValoresIndicadorPorID(int idTipoIndicador)
        {
            return await this.repositorioTipoIndicador.ObtenerValoresIndicadorPorID(idTipoIndicador);
        }

        public async Task<List<DtoTipoIndicador>> ObtenerTipoIndicador()
        {
            return await this.repositorioTipoIndicador.ObtenerTiposIndicadores();
        }

        public async Task<List<DtoTipoIndicador>> ObtenerTipoIndicadorActivos()
        {
            return await this.repositorioTipoIndicador.ObtenerTiposIndicadoresActivos();
        }
    }
}
