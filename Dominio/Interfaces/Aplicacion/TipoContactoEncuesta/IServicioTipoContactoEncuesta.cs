using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.TipoContactoEncuesta
{
    public interface IServicioTipoContactoEncuesta
    {
         Task<DtoRespuestaSP> InsertarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta);

         Task<DtoRespuestaSP> ActualizarTipoContactoEncuesta(EntitiTipoContactoEncuesta entitiTipoContactoEncuesta);

         Task<DtoRespuestaSP> EliminarTipoContactoEncuesta(int idTipoContactoEncuesta);

         Task<DtoTipoContactoEncuesta> ObtenerTipoContactoEncuestaPorID(int idTipoContactoEncuesta);


         Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuesta();


         Task<List<DtoTipoContactoEncuesta>> ObtenerTipoContactoEncuestaActivos();
    }
}
