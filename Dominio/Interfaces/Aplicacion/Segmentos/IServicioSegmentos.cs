using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Segmentos
{
    public interface IServicioSegmentos
    {
        Task<List<DtoSegmentos>> ObtenerSegmentos();


        Task<DtoRespuestaSP> InsertarSegmentos(EntitiSegmentos entitiSegmentos);


        Task<DtoRespuestaSP> ActualizarSegmentos(EntitiSegmentos entitiSegmentos);


        Task<DtoSegmentos> ObtenerSegmentoPorID(int idSegmento);

        Task<DtoRespuestaSP> EliminarSegmento(int idSegmento);
    }
}
