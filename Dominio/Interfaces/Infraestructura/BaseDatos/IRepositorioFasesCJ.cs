using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioFasesCJ
    {
        Task<DtoRespuestaSP> InsertarFasesCJ(EntitiFaseCJ entitiFaseCJ);
        Task<DtoRespuestaSP> ActualizarFasesCJ(EntitiFaseCJ entitiFaseCJ);
        Task<DtoRespuestaSP> EliminarFasesCJ(int idFaseCJ);
        Task<DtoFaseCJ> ObtenerFasesCJPorID(int idFaseCJ);
        Task<List<DtoFaseCJ>> ObtenerFasesCJ();
    }
}
