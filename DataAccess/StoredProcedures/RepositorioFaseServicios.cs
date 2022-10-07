using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioFaseServicios : IRepositorioFaseServicios
    {
        private readonly IContextoBD contextoBD;

        public RepositorioFaseServicios(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("FaseServicio", entitiFaseServicio.faseServicio);


                string query = "SPInsertarFaseDeServicio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdFase", entitiFaseServicio.idFase);
                data.Add("Fase", entitiFaseServicio.faseServicio);
                string query = "SPActualizarFaseServicio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarFaseServicio(int idFase)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdFase", idFase);
                string query = "SPEliminarFaseServicio";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoFaseServicio> ObtenerFaseServicioPorID(int idFase)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdFase", idFase);
                string query = "SPObtenerFaseServicioPorID";

                return await this.contextoBD.ObtenerDato<DtoFaseServicio>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoFaseServicio>> ObtenerFaseServicios()
        {
            try
            {
                string query = "SPObtenerFaseServicios";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoFaseServicio>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}
