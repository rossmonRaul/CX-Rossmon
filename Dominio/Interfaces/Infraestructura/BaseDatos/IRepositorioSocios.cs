using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioSocios
    {
        Task<List<DtoSocio>> ObtenerSocios();
        Task<List<DtoTipoPersona>> ObtenerTiposPersona();
        Task<DtoRespuestaSP> InsertarSocios(EntitiSocio entitiSocio);
        Task<DtoSocio> ObtenerSocioPorId(int idSocio);
        Task<DtoRespuestaSP> EliminarSocio(int idSocio);
        Task<DtoRespuestaSP> ActualizarSocio(EntitiSocio entitiSocio);
        Task<List<DtoSocio>> ObtenerSociosActivos();
    }
}
