using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.TiposPersona
{
    public interface IServicioTiposPersona
    {
         Task<List<DtoTipoPersona>> ObtenerTiposPersona();


         Task<DtoRespuestaSP> InsertarTiposPersona(EntitiTipoPersona entitiTiposPersona);


         Task<DtoRespuestaSP> ActualizarTipoPersona(EntitiTipoPersona entitiTipoPersona);


         Task<DtoTipoPersona> ObtenerTipoPersonaPorID(int idTipoPersona);

         Task<DtoRespuestaSP> EliminarTipoPersona(int idTiposPersona);


         Task<List<DtoTipoPersona>> ObtenerTiposPersonaActivos();
    }
}
