using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.FasesCJ;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioFasesCJ : IServicioFasesCJ
    {
        public IRepositorioFasesCJ repositorioFasesCJ;

        public ServicioFasesCJ(IRepositorioFasesCJ repositorioFasesCJ)
        {
            this.repositorioFasesCJ = repositorioFasesCJ;
        }

        public async Task<List<DtoFaseCJ>> ObtenerFasesCJ()
        {
            return await this.repositorioFasesCJ.ObtenerFasesCJ();
        }

        public async Task<DtoRespuestaSP> InsertarFasesCJ(EntitiFaseCJ entitiFasesCJ)
        {
            return await this.repositorioFasesCJ.InsertarFasesCJ(entitiFasesCJ);
        }
        public async Task<DtoRespuestaSP> ActualizarFasesCJ(EntitiFaseCJ entitiFasesCJ)
        {
            return await this.repositorioFasesCJ.ActualizarFasesCJ(entitiFasesCJ);
        }
        public async Task<DtoRespuestaSP> EliminarFasesCJ(int idFase)
        {
            return await this.repositorioFasesCJ.EliminarFasesCJ(idFase);
        }
        public async Task<DtoFaseCJ> ObtenerFasesCJPorID(int idFase)
        {
            return await this.repositorioFasesCJ.ObtenerFasesCJPorID(idFase);
        }
    }
}
