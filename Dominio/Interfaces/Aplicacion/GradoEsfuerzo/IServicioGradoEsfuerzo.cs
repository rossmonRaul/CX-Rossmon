using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.GradoEsfuerzo
{
    public interface IServicioGradoEsfuerzo
    {
        Task<List<DtoGradosEsfuerzo>> ObtenerGradosEsfuerzo();
        Task<DtoRespuestaSP> InsertarGradosEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo);
        Task<DtoRespuestaSP> ActualizarGradoEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo);
        Task<DtoGradosEsfuerzo> ObtenerGradoEsfuerzoPorID(int idGradoEsfuerzo);
        Task<DtoRespuestaSP> EliminarGradoEsfuerzo(int idGradoEsfuerzo);
    }
}
