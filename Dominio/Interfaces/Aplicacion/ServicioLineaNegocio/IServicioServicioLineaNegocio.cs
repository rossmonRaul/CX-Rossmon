using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.ServicioLineaNegocio
{
    public interface IServicioServicioLineaNegocio
    {

         Task<List<DtoServicioLineaNegocio>> ObtenerServicioLineaNegocio();


         Task<DtoRespuestaSP> InsertarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio);


         Task<DtoRespuestaSP> ActualizarServicioLineaNegocio(EntitiServicioLineaNegocio entitiServicioLineaNegocio);


         Task<DtoServicioLineaNegocio> ObtenerServicioLineaNegocioPorID(int idServicio);

         Task<DtoRespuestaSP> EliminarServicioLineaNegocio(int idServicio);

         Task<List<DtoLineaNegocio>> ObtenerLineaNegocioActivos();

    }
}
