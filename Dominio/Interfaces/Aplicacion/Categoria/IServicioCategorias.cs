using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Categoria
{
    public interface IServicioCategorias
    {
        Task<DtoRespuestaSP> InsertarCategoria(EntitiCategoria entitiCategoria);
        Task<DtoRespuestaSP> ActualizarCategoria(EntitiCategoria entitiCategoria);
        Task<DtoRespuestaSP> InactivarCategoria(int idCategoria);
    }
}
