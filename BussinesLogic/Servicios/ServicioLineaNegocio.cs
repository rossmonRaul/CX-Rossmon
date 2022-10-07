using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.LineaNegocio;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioLineaNegocio : IServicioLineaNegocio
    {
        private readonly IRepositorioLineaNegocio repositorioLineaNegocio;
        public ServicioLineaNegocio(IRepositorioLineaNegocio repositorioLineasNegocios)
        {
            this.repositorioLineaNegocio = repositorioLineasNegocios;
        }


        public async Task<DtoRespuestaSP> InsertarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            return await this.repositorioLineaNegocio.InsertarLineaNegocio(entitiLineaNegocio);
        }
        public async Task<DtoRespuestaSP> ActualizarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            return await this.repositorioLineaNegocio.ActualizarLineaNegocio(entitiLineaNegocio);
        }
        public async Task<DtoRespuestaSP> EliminarLineaNegocio(int idLinea)
        {
            return await this.repositorioLineaNegocio.EliminarLineaNegocio(idLinea);
        }
        public async Task<DtoLineaNegocio> ObtenerLineaNegocioPorID(int idLinea)
        {
            return await this.repositorioLineaNegocio.ObtenerLineaNegocioPorID(idLinea);
        }

        public async Task<List<DtoLineaNegocio>> ObtenerLineaNegocio()
        {
            return await this.repositorioLineaNegocio.ObtenerLineaNegocio();
        }


    }
}
