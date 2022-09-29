using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.EtapasTaller
{
    public interface IServicioEtapasTaller
    {
        Task<DtoRespuestaSP> InsertarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller);
        Task<DtoRespuestaSP> ActualizarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller);
        Task<DtoRespuestaSP> EliminarEtapasTaller(int idEtapaTaller);
        Task<DtoEtapasTaller> ObtenerEtapasTallerPorID(int idEtapaTaller);
        Task<List<DtoEtapasTaller>> ObtenerEtapasTaller();
    }
}
