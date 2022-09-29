using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Canales
{
    public interface IServicioCanales
    {
         Task<List<DtoCanales>> ObtenerCanales();

         Task<DtoRespuestaSP> InsertarCanales(EntitiCanales entitiCanales);

         Task<DtoRespuestaSP> ActualizarCanales(EntitiCanales entitiCanales);

         Task<DtoRespuestaSP> EliminarCanales(int idCanal);

         Task<DtoCanales> ObtenerCanalesPorID(int idCanal);
    }
}
