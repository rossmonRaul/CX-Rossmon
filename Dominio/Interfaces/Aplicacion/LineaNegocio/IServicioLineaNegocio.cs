using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.LineaNegocio
{
    public interface IServicioLineaNegocio
    {
         Task<DtoRespuestaSP> InsertarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio);

         Task<DtoRespuestaSP> ActualizarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio);

         Task<DtoRespuestaSP> EliminarLineaNegocio(int idLinea);

         Task<DtoLineaNegocio> ObtenerLineaNegocioPorID(int idLinea);

         Task<List<DtoLineaNegocio>> ObtenerLineaNegocio();

    }
}
