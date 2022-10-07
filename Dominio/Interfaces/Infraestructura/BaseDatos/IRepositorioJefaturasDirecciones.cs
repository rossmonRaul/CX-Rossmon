using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioJefaturasDirecciones
    {
        Task<List<DtoJefaturaDireccion>> ObtenerJefaturasDireccion();
        Task<DtoJefaturaDireccion> ObtenerJefaturasDireccionPorId(int idJefatura);
        Task<DtoRespuestaSP> EliminarJefaturaDireccion(int idJefatura);
        Task<DtoRespuestaSP> InsertarJefatura(EntitiJefaturas entitiJefaturas);
        Task<DtoRespuestaSP> ActualizarJefatura(EntitiJefaturas entitiJefaturas);
    }
}
