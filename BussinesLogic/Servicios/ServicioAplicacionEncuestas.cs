using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.AplicacionEncuesta;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioAplicacionEncuestas : IServicioAplicacionEncuestas
    {
        public readonly IRepositorioAplicacionEncuestas repositorioAplicacionEncuestas;

        public ServicioAplicacionEncuestas(IRepositorioAplicacionEncuestas repositorioAplicacionEncuestas)
        {
            this.repositorioAplicacionEncuestas = repositorioAplicacionEncuestas;
        }

        public async Task<DtoRespuestaSP> InsertarUsuarioEncuesta(EntitiAplicacionEncuesta entitiAplicacionEncuesta)
        {
            return await this.repositorioAplicacionEncuestas.InsertarUsuarioEncuesta(entitiAplicacionEncuesta);
        }

        public async Task<DtoRespuestaSP> ActualizarUsuarioEncuesta(EntitiAplicacionEncuesta entitiAplicacionEncuesta)
        {
            return await this.repositorioAplicacionEncuestas.ActualizarUsuarioEncuesta(entitiAplicacionEncuesta);
        }

        public async Task<DtoAplicacionEncuesta> ObtenerUsuarioEncuestaPorTelefonoOCorreo(string telefono, string correo)
        {
            return await this.repositorioAplicacionEncuestas.ObtenerUsuarioEncuestaPorTelefonoOCorreo(telefono,correo);
        }
        public async Task<DtoRespuestaSP> EliminarUsuarioEncuesta(int idUsuarioEncuesta)
        {
            return await this.repositorioAplicacionEncuestas.EliminarUsuarioEncuesta(idUsuarioEncuesta);
        }

      
    }
}
