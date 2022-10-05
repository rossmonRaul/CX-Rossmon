using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.FaseServicio;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioFaseServicios : IServicioFaseServicio
    {
        public IRepositorioFaseServicios repositorioFaseServicio;

        public ServicioFaseServicios(IRepositorioFaseServicios repositorioFaseServicios)
        {
            this.repositorioFaseServicio = repositorioFaseServicios;
        }

        public async Task<List<DtoFaseServicio>> ObtenerFaseServicios()
        {
            return await this.repositorioFaseServicio.ObtenerFaseServicios();
        }

        public async Task<DtoRespuestaSP> InsertarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            return await this.repositorioFaseServicio.InsertarFaseServicio(entitiFaseServicio);
        }
        public async Task<DtoRespuestaSP> ActualizarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            return await this.repositorioFaseServicio.ActualizarFaseServicio(entitiFaseServicio);
        }
        public async Task<DtoRespuestaSP> EliminarFaseServicio(int idFase)
        {
            return await this.repositorioFaseServicio.EliminarFaseServicio(idFase);
        }
        public async Task<DtoFaseServicio> ObtenerFaseServicioPorID(int idFase)
        {
            return await this.repositorioFaseServicio.ObtenerFaseServicioPorID(idFase);
        }
    }
}
