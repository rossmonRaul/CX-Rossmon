using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioGradoImpacto
    {
        Task<DtoRespuestaSP> InsertarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto);
        Task<DtoRespuestaSP> ActualizarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto);
        Task<DtoRespuestaSP> EliminarGradoImpacto(int idGradoImpacto);
        Task<DtoGradoImpacto> ObtenerGradoImpactoPorID(int idGradoImpacto);
        Task<List<DtoGradoImpacto>> ObtenerGradoImpacto();
    }
}
