using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IRepositorioAplicacionEncuestas
    {
        Task<DtoRespuestaSP> InsertarUsuarioEncuesta(EntitiAplicacionEncuesta entitiAplicacionEncuesta);
        Task<DtoAplicacionEncuesta> ObtenerUsuarioEncuestaPorTelefonoOCorreo(string telefono, string correo);
        Task<DtoRespuestaSP> EliminarUsuarioEncuesta(int idUsuarioEncuesta);
        Task<DtoRespuestaSP> ActualizarUsuarioEncuesta(EntitiAplicacionEncuesta entitiAplicacionEncuesta);

    }
}
