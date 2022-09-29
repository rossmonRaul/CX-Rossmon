using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.ServicioSocio
{
    public interface IServicioServicioSocio
    {
         Task<List<DtoServicioSocio>> ObtenerServicioSocio();

         Task<List<DtoServicioSocio>> ObtenerServicioSocioActivos();


         Task<DtoRespuestaSP> InsertarServicioSocio(EntitiServicioSocio entitiServicioSocio);


         Task<DtoRespuestaSP> ActualizarServicioSocio(EntitiServicioSocio entitiServicioSocio);


         Task<DtoServicioSocio> ObtenerServicioSocioPorID(int entitiServicioSocio);

         Task<DtoRespuestaSP> EliminarServicioSocio(int entitiServicioSocio);

    }
}
