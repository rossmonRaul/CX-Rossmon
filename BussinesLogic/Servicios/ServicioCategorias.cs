using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using DataAccess.StoredProcedures;
using Dominio.Interfaces.Aplicacion.Categoria;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Dto;
using Dominio.Entiti;

namespace BussinesLogic.Servicios
{
    public class ServicioCategorias : IServicioCategorias
    {

        private readonly IRepositorioCategorias repositorioCategorias;

        public ServicioCategorias(IRepositorioCategorias repositorioCategorias)
        {
            this.repositorioCategorias = repositorioCategorias;
        }
        #region Selects
        public async Task<List<DtoCategorias>> ObtenerCategorias()
        {
            return await this.repositorioCategorias.ObtenerCategorias();
        }
        public async Task<DtoCategorias> ObtenerCategoriasPorId(int idCategoria)
        {
            return await this.repositorioCategorias.ObtenerCategoriasPorID(idCategoria);
        }



        #endregion
        public async Task<DtoRespuestaSP> InsertarCategoria(EntitiCategoria entitiCategoria)
        {
            return await this.repositorioCategorias.InsertarCategoria(entitiCategoria);
        }
        public async Task<DtoRespuestaSP> ActualizarCategoria(EntitiCategoria entitiCategoria)
        {
            return await this.repositorioCategorias.ActualizarCategoria(entitiCategoria);
        }
        public async Task<DtoRespuestaSP> InactivarCategoria(int idCategoria)
        {
            return await this.repositorioCategorias.EliminarCategoria(idCategoria);
        }


    }
}
