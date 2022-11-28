using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.EtapaTallerCo
{
    public interface IServicioEtapaTallerCo
    {
        Task<DtoCantidadDatos> ObtenerCantidadEtapasTallerCo();
        Task<List<DtoEtapaTallerCo>> ObtenerEtapasTallerCo(int idTipoTaller);
        Task<DtoEtapaTallerCo> ObtenerFechasTallerCo(int idTipoTaller);
        Task<DtoRespuestaSP> AgregarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo);
        Task<DtoRespuestaSP> ActualizarEtapaTallerCo(EntitiEtapaTallerCo entitiEtapaTallerCo);
        Task<DtoEtapaTallerCo> ObtenerEtapaTallerCoPorID(int idEtapaTallerCo);

    }
}
