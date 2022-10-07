using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioEtapasTaller
    {
        Task<DtoRespuestaSP> InsertarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller);

        Task<DtoRespuestaSP> EliminarEtapasTaller(int idEtapaTaller);

        Task<DtoEtapasTaller> ObtenerEtapasTallerPorID(int idEtapaTaller);

        Task<List<DtoEtapasTaller>> ObtenerEtapasTaller();
        Task<DtoRespuestaSP> ActualizarEtapasTaller(EntitiEtapasTaller entitiEtapasTaller);

    }
}
