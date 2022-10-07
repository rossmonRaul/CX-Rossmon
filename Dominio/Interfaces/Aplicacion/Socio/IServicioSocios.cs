using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.Socio
{
    public interface IServicioSocios
    {
         Task<List<DtoSocio>> ObtenerSocios();

         Task<List<DtoTipoPersona>> ObtenerTiposPersona();

         Task<DtoRespuestaSP> InsertarSocios(EntitiSocio entitiSocios);

         Task<DtoRespuestaSP> ActualizarSocio(EntitiSocio entitiSocio);

         Task<DtoSocio> ObtenerSocioPorID(int idSocio);

         Task<DtoRespuestaSP> EliminarSocio(int idSocios);

         Task<List<DtoSocio>> ObtenerSociosActivos();
    }
}
