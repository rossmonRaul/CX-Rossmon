using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioTiposPersona
    {
        Task<List<DtoTipoPersona>> ObtenerTiposPersona();
        Task<DtoRespuestaSP> InsertarTiposPersona(EntitiTipoPersona entitiTipoPersona);
        Task<DtoTipoPersona> ObtenerTipoPersonaPorId(int idTipoPersona);
        Task<DtoRespuestaSP> EliminarTipoPersona(int idTipoPersona);
        Task<DtoRespuestaSP> ActualizarTipoPersona(EntitiTipoPersona entitiTipoPersona);
        Task<List<DtoTipoPersona>> ObtenerTiposPersonaActivos();
    }
}
