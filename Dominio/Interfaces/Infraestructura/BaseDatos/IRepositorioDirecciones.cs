using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioDirecciones
    {
        Task<List<DtoDirecciones>> ObtenerDirecciones();
        Task<List<DtoDirecciones>> ObtenerDireccionesActivas();
        Task<DtoRespuestaSP> InsertarDirecciones(EntitiDirecciones entitiDirecciones);
        Task<DtoRespuestaSP> ActualizarDireccion(EntitiDirecciones entitiDirecciones);
        Task<DtoDirecciones> ObtenerDireccionPorID(int idDireccion);
        Task<DtoRespuestaSP> EliminarDireccion(int idDireccion);
    }
}
