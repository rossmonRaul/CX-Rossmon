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
        public readonly IRepositorioSocios repositorioSocios;

        public ServicioSocios(IRepositorioSocios repositorioSocios)
        {
            this.repositorioSocios = repositorioSocios;
        }


        public async Task<List<DtoSocio>> ObtenerSocios()
        {
            return await this.repositorioSocios.ObtenerSocios();
        }

        public async Task<List<DtoTipoPersona>> ObtenerTiposPersona()
        {
            return await this.repositorioSocios.ObtenerTiposPersona();
        }

        public async Task<DtoRespuestaSP> InsertarSocios(EntitiSocio entitiSocios)
        {
            return await this.repositorioSocios.InsertarSocios(entitiSocios);
        }

        public async Task<DtoRespuestaSP> ActualizarSocio(EntitiSocio entitiSocio)
        {
            return await this.repositorioSocios.ActualizarSocio(entitiSocio);
        }

        public async Task<DtoSocio> ObtenerSocioPorID(int idSocio)
        {
            return await this.repositorioSocios.ObtenerSocioPorId(idSocio);
        }
        public async Task<DtoRespuestaSP> EliminarSocio(int idSocios)
        {
            return await this.repositorioSocios.EliminarSocio(idSocios);
        }

        public async Task<List<DtoSocio>> ObtenerSociosActivos()
        {
            return await this.repositorioSocios.ObtenerSociosActivos();
        }
    }
}
