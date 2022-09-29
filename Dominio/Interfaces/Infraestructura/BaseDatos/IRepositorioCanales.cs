using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioCanales
    {
        Task<List<DtoCanales>> ObtenerCanales();

        Task<DtoRespuestaSP> InsertarCanales(EntitiCanales entitiCanales);

        Task<DtoRespuestaSP> ActualizarCanales(EntitiCanales entitiCanales);

        Task<DtoRespuestaSP> EliminarCanales(int idCanal);

        Task<DtoCanales> ObtenerCanalesPorID(int idCanal);


    }
}
