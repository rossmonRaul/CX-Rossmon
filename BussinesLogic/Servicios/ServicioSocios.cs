using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Socio;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioSocios : IServicioSocios
    {
        public readonly IRepositorioSocios spSocios;

        public ServicioSocios(IRepositorioSocios spSocios)
        {
            this.spSocios = spSocios;
        }


        public async Task<List<DtoSocio>> ObtenerSocios()
        {
            return await this.spSocios.ObtenerSocios();
        }

        public async Task<List<DtoTipoPersona>> ObtenerTiposPersona()
        {
            return await this.spSocios.ObtenerTiposPersona();
        }

        public async Task<DtoRespuestaSP> InsertarSocios(EntitiSocio entitiSocios)
        {
            return await this.spSocios.InsertarSocios(entitiSocios);
        }

        public async Task<DtoRespuestaSP> ActualizarSocio(EntitiSocio entitiSocio)
        {
            return await this.spSocios.ActualizarSocio(entitiSocio);
        }

        public async Task<DtoSocio> ObtenerSocioPorID(int idSocio)
        {
            return await this.spSocios.ObtenerSocioPorId(idSocio);
        }
        public async Task<DtoRespuestaSP> EliminarSocio(int idSocios)
        {
            return await this.spSocios.EliminarSocio(idSocios);
        }

        public async Task<List<DtoSocio>> ObtenerSociosActivos()
        {
            return await this.spSocios.ObtenerSociosActivos();
        }
    }
}
