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
    public class RepositorioCategorias : IRepositorioCategorias
    {
        private readonly IContextoBD contextoBD;

        public RepositorioCategorias(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarCategoria(EntitiCategoria entitiCategorias)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Categoria", entitiCategorias.Categoria);
                data.Add("Rango", entitiCategorias.Rango);

                string query = "SPInsertarCategoria";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarCategoria(EntitiCategoria entitiCategorias)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("Categoria", entitiCategorias.Categoria);
                data.Add("Rango", entitiCategorias.Rango);
                string query = "SPActualizarCategoria";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarCategoria(int idCategoria)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdCategoria", idCategoria);
                string query = "SPEliminarCategoria";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoCategorias> ObtenerCategoriasPorID(int idCategoria)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdCategoria", idCategoria);
                string query = "SPObtenerCategoriaPorID";

                return await this.contextoBD.ObtenerDato<DtoCategorias>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoCategorias>> ObtenerCategorias()
        {
            try
            {
                string query = "SPObtenerCategorias";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoCategorias>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
