using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioMetodologiaCX
    {
        Task<DtoRespuestaSP> InsertarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX);
        Task<DtoRespuestaSP> ActualizarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX);
        Task<DtoRespuestaSP> EliminarMetodologiaCX(int idMetodologia);
        Task<DtoMetodologiaCX> ObtenerMetodologiaCXPorID(int idMetodologia);
        Task<List<DtoMetodologiaCX>> ObtenerMetodologiaCX();
    }
}
