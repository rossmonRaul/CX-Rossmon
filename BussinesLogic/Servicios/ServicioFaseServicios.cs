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
        public IRepositorioFaseServicios spFaseServicio;

        public ServicioFaseServicios(IRepositorioFaseServicios repositorioFaseServicios)
        {
            this.spFaseServicio = repositorioFaseServicios;
        }

        public async Task<List<DtoFaseServicio>> ObtenerFaseServicios()
        {
            return await this.spFaseServicio.ObtenerFaseServicios();
        }

        public async Task<DtoRespuestaSP> InsertarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            return await this.spFaseServicio.InsertarFaseServicio(entitiFaseServicio);
        }
        public async Task<DtoRespuestaSP> ActualizarFaseServicio(EntitiFaseServicio entitiFaseServicio)
        {
            return await this.spFaseServicio.ActualizarFaseServicio(entitiFaseServicio);
        }
        public async Task<DtoRespuestaSP> EliminarFaseServicio(int idFase)
        {
            return await this.spFaseServicio.EliminarFaseServicio(idFase);
        }
        public async Task<DtoFaseServicio> ObtenerFaseServicioPorID(int idFase)
        {
            return await this.spFaseServicio.ObtenerFaseServicioPorID(idFase);
        }
    }
}
