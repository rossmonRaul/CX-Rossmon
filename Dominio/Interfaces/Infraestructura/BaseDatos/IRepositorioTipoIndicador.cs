using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioTipoIndicador
    {
        Task<DtoRespuestaSP> InsertarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador);
        Task<DtoRespuestaSP> ActualizarTipoIndicador(EntitiTipoIndicador entitiTipoIndicador);
        Task<DtoRespuestaSP> ActualizarValorIndicador(EntitiValorIndicador entitiValorIndicador);
        Task<DtoRespuestaSP> EliminarTipoIndicador(int idTipoIndicador);
        Task<DtoTipoIndicador> ObtenerTipoIndicadorPorID(int idTipoIndicador);
        Task<List<DtoValorIndicador>> ObtenerValoresIndicadorPorID(int idTipoIndicador);
        Task<List<DtoTipoIndicador>> ObtenerTiposIndicadores();
        Task<List<DtoTipoIndicador>> ObtenerTiposIndicadoresActivos();

    }
}
