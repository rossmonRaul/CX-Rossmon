using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.TipoIdentificacion
{
    public interface IServicioTipoIdentificacion
    {

         Task<DtoRespuestaSP> InsertarTipoIdentificacion(EntitiTipoIdentificacion entitiTipoIdentificacion);

         Task<DtoRespuestaSP> ActualizarTipoIdentificacion(EntitiTipoIdentificacion entitiTipoIdentificacion);

         Task<DtoRespuestaSP> EliminarTipoIdentificacion(int idTipoIdentificacion);

         Task<DtoTipoIdentificacion> ObtenerTipoIdentificacionPorID(int idTipoIdentificacion);

         Task<List<DtoTipoIdentificacion>> ObtenerTipoIdentificacion();

         Task<List<DtoTipoIdentificacion>> ObtenerTipoIdentificacionActivos();
    }
}
