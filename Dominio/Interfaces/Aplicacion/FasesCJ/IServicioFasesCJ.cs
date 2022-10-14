using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.FasesCJ
{
    public interface IServicioFasesCJ
    {
        Task<DtoRespuestaSP> InsertarFasesCJ(EntitiFaseCJ entitiFaseCJ);

        Task<DtoRespuestaSP> ActualizarFasesCJ(EntitiFaseCJ entitiFaseCJ);

        Task<DtoFaseCJ> ObtenerFasesCJPorID(int idFaseCJ);
        Task<DtoRespuestaSP> EliminarFasesCJ(int idFaseCJ);

        Task<List<DtoFaseCJ>> ObtenerFasesCJ();
    }
}
