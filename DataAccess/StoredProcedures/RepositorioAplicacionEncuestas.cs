using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dominio.Interfaces.Infraestructura.BaseDatos;

namespace DataAccess.StoredProcedures
{
    public class RepositorioAplicacionEncuestas : IRepositorioAplicacionEncuestas
    {
        private readonly IContextoBD contextoBD;

        public RepositorioAplicacionEncuestas(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarUsuarioEncuesta(EntitiAplicacionEncuesta entitiAplicacionEncuesta )
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Nombre", entitiAplicacionEncuesta.Nombre);
                data.Add("Apellido", entitiAplicacionEncuesta.Apellido);
                data.Add("Telefono", entitiAplicacionEncuesta.Telefono);
                data.Add("CorreoElectronico", entitiAplicacionEncuesta.CorreoElectronico);
                string query = "SPInsertarUsuarioEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarUsuarioEncuesta(EntitiAplicacionEncuesta entitiAplicacionEncuesta)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdUsuarioEncuesta", entitiAplicacionEncuesta.IdUsuarioEncuesta);
                data.Add("Nombre", entitiAplicacionEncuesta.Nombre);
                data.Add("Apellido", entitiAplicacionEncuesta.Apellido);
                data.Add("Telefono", entitiAplicacionEncuesta.Telefono);
                data.Add("CorreoElectronico", entitiAplicacionEncuesta.CorreoElectronico);
                string query = "SPActualizarUsuariosEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarUsuarioEncuesta(int idUsuarioEncuesta)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdUsuarioEncuesta", idUsuarioEncuesta);
                string query = "SPEliminarUsuarioEncuesta";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoAplicacionEncuesta> ObtenerUsuarioEncuestaPorTelefonoOCorreo(string telefono, string correo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Telefono", telefono);
                data.Add("CorreoElectronico",correo);
                string query = "SPObtenerUsuarioEncuestaPorTelefonoOCorreo";

                return await this.contextoBD.ObtenerDato<DtoAplicacionEncuesta>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

      
    }

}
