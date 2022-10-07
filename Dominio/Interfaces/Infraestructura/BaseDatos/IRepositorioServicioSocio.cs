using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioServicioSocio
    {
        Task<List<DtoServicioSocio>> ObtenerServicioSocio();
        Task<List<DtoServicioSocio>> ObtenerServicioSocioActivos();
        Task<DtoRespuestaSP> InsertarServicioSocio(EntitiServicioSocio entitiServicioSocio);
        Task<DtoRespuestaSP> ActualizarServicioSocio(EntitiServicioSocio entitiServicioSocio);
        Task<DtoServicioSocio> ObtenerServicioSocioPorID(int idServicioSocio);
        Task<DtoRespuestaSP> EliminarServicioSocio(int idServicioSocio);
    }
}
