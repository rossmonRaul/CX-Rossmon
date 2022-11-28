using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Responsables;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioResponsables : IServicioResponsables
    {
        public readonly IRepositorioResponsables repositorioResponsables;

        public ServicioResponsables(IRepositorioResponsables repositorioResponsables)
        {
            this.repositorioResponsables = repositorioResponsables;
        }


        public async Task<List<DtoResponsable>> ObtenerResponsables()
        {
            return await this.repositorioResponsables.ObtenerResponsables();
        }


        public async Task<DtoRespuestaSP> InsertarResponsables(EntitiResponsable entitiResponsables)
        {
            return await this.repositorioResponsables.InsertarResponsables(entitiResponsables);
        }

        public async Task<DtoRespuestaSP> ActualizarResponsable(EntitiResponsable entitiResponsable)
        {
            return await this.repositorioResponsables.ActualizarResponsable(entitiResponsable);
        }

        public async Task<DtoResponsable> ObtenerResponsablePorID(int idResponsable)
        {
            return await this.repositorioResponsables.ObtenerResponsablePorId(idResponsable);
        }

        public async Task<List<DtoResponsable>> ObtenerResponsablesPorIdHallazgo(int idHallazgo)
        {
            return await this.repositorioResponsables.ObtenerResponsablesPorIdHallazgo(idHallazgo);
        }
        public async Task<DtoRespuestaSP> EliminarResponsable(int idResponsables)
        {
            return await this.repositorioResponsables.EliminarResponsable(idResponsables);
        }

        public async Task<List<DtoResponsable>> ObtenerResponsablesActivos()
        {
            return await this.repositorioResponsables.ObtenerResponsablesActivos();
        }
    }
}
