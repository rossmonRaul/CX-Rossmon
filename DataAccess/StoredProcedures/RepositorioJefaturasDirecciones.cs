using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioJefaturasDirecciones : IRepositorioJefaturasDirecciones
    {
        private readonly IContextoBD contextoBD;

        public RepositorioJefaturasDirecciones(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarJefatura(EntitiJefaturas entitiJefaturas)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdDireccion", entitiJefaturas.IdDireccion);
                data.Add("Codigo", entitiJefaturas.Codigo);
                data.Add("Jefatura", entitiJefaturas.Jefatura);

                string query = "SPInsertarJefaturaPorDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarJefatura(EntitiJefaturas entitiJefaturas)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdJefatura", entitiJefaturas.IdJefatura);
                data.Add("IdDireccion", entitiJefaturas.IdDireccion);
                data.Add("Codigo", entitiJefaturas.Codigo);
                data.Add("Jefatura", entitiJefaturas.Jefatura);
                string query = "SPModificarJefaturaDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarJefaturaDireccion(int idJefatura)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdJefatura", idJefatura);
                string query = "SPEliminarJefaturaPorDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoJefaturaDireccion> ObtenerJefaturasDireccionPorId(int idJefatura)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdJefatura", idJefatura);
                string query = "SPObtenerJefaturaPorID";

                return await this.contextoBD.ObtenerDato<DtoJefaturaDireccion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoJefaturaDireccion>> ObtenerJefaturasDireccion()
        {
            try
            {
                string query = "SPObtenerJefaturasPorDireccion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoJefaturaDireccion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
