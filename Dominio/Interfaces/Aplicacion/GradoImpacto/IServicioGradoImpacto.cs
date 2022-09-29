using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.GradoImpacto
{
    public interface IServicioGradoImpacto
    {
        Task<DtoRespuestaSP> InsertarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto);
        Task<DtoRespuestaSP> ActualizarGradoImpacto(EntitiGradoImpacto entitiGradoImpacto);
        Task<DtoRespuestaSP> EliminarGradoImpacto(int idGradoImpacto);
        Task<DtoGradoImpacto> ObtenerGradoImpactoPorID(int idGradoImpacto);
        Task<List<DtoGradoImpacto>> ObtenerGradoImpacto();
    }
}
