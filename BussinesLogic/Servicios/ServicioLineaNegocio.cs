using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioLineaNegocio
    {
        public SPLineaNegocio spLineaNegocio = new SPLineaNegocio();


        public async Task<DtoRespuestaSP> InsertarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            return await this.spLineaNegocio.InsertarLineaNegocio(entitiLineaNegocio);
        }
        public async Task<DtoRespuestaSP> ActualizarLineaNegocio(EntitiLineaNegocio entitiLineaNegocio)
        {
            return await this.spLineaNegocio.ActualizarLineaNegocio(entitiLineaNegocio);
        }
        public async Task<DtoRespuestaSP> EliminarLineaNegocio(int idLinea)
        {
            return await this.spLineaNegocio.EliminarLineaNegocio(idLinea);
        }
        public async Task<DtoLineaNegocio> ObtenerLineaNegocioPorID(int idLinea)
        {
            return await this.spLineaNegocio.ObtenerLineaNegocioPorID(idLinea);
        }

        public async Task<List<DtoLineaNegocio>> ObtenerLineaNegocio()
        {
            return await this.spLineaNegocio.ObtenerLineaNegocio();
        }
    }
}
