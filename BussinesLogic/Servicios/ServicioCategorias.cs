using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;

namespace BussinesLogic.Servicios
{
    public class ServicioCategorias
    {

        public SPCategorias categorias = new SPCategorias();

        #region Selects
        public async Task<List<DtoCategorias>> ObtenerCategorias()
        {
            return await this.categorias.ObtenerCategorias();
        }
        public async Task<DtoCategorias> ObtenerCategoriasPorId(int idCategoria)
        {
            return await this.categorias.ObtenerCategoriasPorID(idCategoria);
        }



        #endregion
        public async Task<DtoRespuestaSP> InsertarCategoria(EntitiCategoria entitiCategoria)
        {
            return await this.categorias.InsertarCategoria(entitiCategoria);
        }
        public async Task<DtoRespuestaSP> ActualizarCategoria(EntitiCategoria entitiCategoria)
        {
            return await this.categorias.ActualizarCategoria(entitiCategoria);
        }
        public async Task<DtoRespuestaSP> InactivarCategoria(int idCategoria)
        {
            return await this.categorias.EliminarCategoria(idCategoria);
        }


    }
}
