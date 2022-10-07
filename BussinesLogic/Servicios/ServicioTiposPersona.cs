using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.TiposPersona;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTiposPersona : IServicioTiposPersona
    {
        public readonly IRepositorioTiposPersona repositorioTiposPersona;

        public ServicioTiposPersona(IRepositorioTiposPersona repositorioTiposPersona)
        {
            this.repositorioTiposPersona = repositorioTiposPersona;
        }

        public async Task<List<DtoTipoPersona>> ObtenerTiposPersona()
        {
            return await this.repositorioTiposPersona.ObtenerTiposPersona();
        }

        public async Task<DtoRespuestaSP> InsertarTiposPersona(EntitiTipoPersona entitiTiposPersona)
        {
            return await this.repositorioTiposPersona.InsertarTiposPersona(entitiTiposPersona);
        }

        public async Task<DtoRespuestaSP> ActualizarTipoPersona(EntitiTipoPersona entitiTipoPersona)
        {
            return await this.repositorioTiposPersona.ActualizarTipoPersona(entitiTipoPersona);
        }

        public async Task<DtoTipoPersona> ObtenerTipoPersonaPorID(int idTipoPersona)
        {
            return await this.repositorioTiposPersona.ObtenerTipoPersonaPorId(idTipoPersona);
        }
        public async Task<DtoRespuestaSP> EliminarTipoPersona(int idTiposPersona)
        {
            return await this.repositorioTiposPersona.EliminarTipoPersona(idTiposPersona);
        }

        public async Task<List<DtoTipoPersona>> ObtenerTiposPersonaActivos()
        {
            return await this.repositorioTiposPersona.ObtenerTiposPersonaActivos();
        }
    }
}
