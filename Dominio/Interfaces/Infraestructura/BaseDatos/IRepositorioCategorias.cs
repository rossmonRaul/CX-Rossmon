using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioCategorias
    {
        Task<DtoRespuestaSP> InsertarCategoria(EntitiCategoria entitiCategorias);

        Task<DtoRespuestaSP> ActualizarCategoria(EntitiCategoria entitiCategorias);

        Task<DtoRespuestaSP> EliminarCategoria(int idCategorias);
        Task<DtoCategorias> ObtenerCategoriasPorID(int idCategoria);
        Task<List<DtoCategorias>> ObtenerCategorias();
    }
}
