using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Jefatura
{
    public interface IServicioJefaturaDireccion
    {
         Task<List<DtoJefaturaDireccion>> ObtenerJefaturasDireccion();

         Task<DtoRespuestaSP> EliminarJefaturasDireccion(int idJefatura);

         Task<DtoRespuestaSP> InsertarJefaturaDireccion(EntitiJefaturas entitiJefatura);

         Task<DtoJefaturaDireccion> ObtenerJefaturaDireccionPorId(int idJefatura);
  
         Task<DtoRespuestaSP> ActualizarJefatura(EntitiJefaturas entitiJefaturas);

    }
}
