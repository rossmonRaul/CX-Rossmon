using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.MetodologiaCX;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioMetodologiaCX : IServicioMetodologiaCX
    {

        private readonly IRepositorioMetodologiaCX repositorioMetodologiaCX;
        public ServicioMetodologiaCX(IRepositorioMetodologiaCX repositorioMetodologiaCX)
        {
            this.repositorioMetodologiaCX = repositorioMetodologiaCX;
        }
        public async Task<DtoRespuestaSP> InsertarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            return await this.repositorioMetodologiaCX.InsertarMetodologiaCX(entitiMetodologiaCX);
        }
        public async Task<DtoRespuestaSP> ActualizarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            return await this.repositorioMetodologiaCX.ActualizarMetodologiaCX(entitiMetodologiaCX);
        }
        public async Task<DtoRespuestaSP> EliminarMetodologiaCX(int idMetodologia)
        {
            return await this.repositorioMetodologiaCX.EliminarMetodologiaCX(idMetodologia);
        }
        public async Task<DtoMetodologiaCX> ObtenerMetodologiaCXPorID(int idMetodologia)
        {
            return await this.repositorioMetodologiaCX.ObtenerMetodologiaCXPorID(idMetodologia);
        }

        public async Task<List<DtoMetodologiaCX>> ObtenerMetodologiaCX()
        {
            return await this.repositorioMetodologiaCX.ObtenerMetodologiaCX();
        }
    }
}
