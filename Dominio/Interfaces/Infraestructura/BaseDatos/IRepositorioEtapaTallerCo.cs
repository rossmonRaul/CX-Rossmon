using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioEtapaTallerCo
    {
        Task<DtoCantidadDatos> ObtenerCantidadEtapasTallerCo();
        Task<List<DtoEtapaTallerCo>> ObtenerEtapasTallerCo(int idTipoTaller, int idTallerCoCreacion);
        Task<DtoEtapaTallerCo> ObtenerFechasTallerCo(int idTipoTaller, int idTallerCoCreacion);
        Task<DtoRespuestaSP> AgregarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo);
        Task<DtoRespuestaSP> ActualizarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo);
        Task<DtoEtapaTallerCo> ObtenerEtapaTallerCoPorID(int idEtapaTallerCo);

        // Task<DtoRespuestaSP> EliminarMantenimientoTallerCoCreacion(int idMantenimientoTallerCoCreacion);

    }
}
