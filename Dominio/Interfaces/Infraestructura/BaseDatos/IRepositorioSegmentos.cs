using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioSegmentos
    {
        Task<List<DtoSegmentos>> ObtenerSegmentos();
        Task<DtoRespuestaSP> InsertarSegmentos(EntitiSegmentos entitiSegmentos);
        Task<DtoRespuestaSP> ActualizarSegmentos(EntitiSegmentos entitiSegmento);
        Task<DtoSegmentos> ObtenerSegmentosPorID(int idSegmento);
        Task<DtoRespuestaSP> EliminarSegmento(int idSegmento);
    }
}
