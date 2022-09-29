using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using Dominio.Interfaces.Aplicacion.Jefatura;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioJefaturaDireccion:IServicioJefaturaDireccion
    {
        private readonly IRepositorioJefaturasDirecciones SPJefaturasDirecciones;
        public ServicioJefaturaDireccion(IRepositorioJefaturasDirecciones repositorioJefaturasDirecciones)
        {
            this.SPJefaturasDirecciones = repositorioJefaturasDirecciones;
        }
        public async Task<List<DtoJefaturaDireccion>> ObtenerJefaturasDireccion()
        {
            return await SPJefaturasDirecciones.ObtenerJefaturasDireccion();
        }
        public async Task<DtoRespuestaSP> EliminarJefaturasDireccion(int idJefatura)
        {
            return await SPJefaturasDirecciones.EliminarJefaturaDireccion(idJefatura);
        }
        public async Task<DtoRespuestaSP> InsertarJefaturaDireccion(EntitiJefaturas entitiJefatura)
        {
            return await SPJefaturasDirecciones.InsertarJefatura(entitiJefatura);
        }
        public async Task<DtoJefaturaDireccion> ObtenerJefaturaDireccionPorId(int idJefatura)
        {
            return await SPJefaturasDirecciones.ObtenerJefaturasDireccionPorId(idJefatura);
        }
        public async Task<DtoRespuestaSP> ActualizarJefatura(EntitiJefaturas entitiJefaturas)
        {
            return await SPJefaturasDirecciones.ActualizarJefatura(entitiJefaturas);
        }
    }
}
