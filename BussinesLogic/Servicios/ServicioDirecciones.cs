using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Aplicacion.Direccion;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioDirecciones : IServicioDirecciones
    {
        private readonly IRepositorioDirecciones repositorioDirecciones;

        public ServicioDirecciones(IRepositorioDirecciones repositorioDirecciones)
        {
            this.repositorioDirecciones = repositorioDirecciones;
        }
        public async Task<List<DtoDirecciones>> ObtenerDirecciones()
        {
            return await this.repositorioDirecciones.ObtenerDirecciones();
        }

        public async Task<List<DtoDirecciones>> ObtenerDireccionesActivas()
        {
            return await this.repositorioDirecciones.ObtenerDireccionesActivas();
        }
        public async Task<DtoRespuestaSP> InsertarDirecciones(EntitiDirecciones entitiDirecciones)
        {
            return await this.repositorioDirecciones.InsertarDirecciones(entitiDirecciones);
        }

        public async Task<DtoRespuestaSP> ActualizarDireccion(EntitiDirecciones entitiDirecciones)
        {
            return await this.repositorioDirecciones.ActualizarDireccion(entitiDirecciones);
        }

        public async Task<DtoDirecciones> ObtenerDireccionPorID(int idDireccion)
        {
            return await this.repositorioDirecciones.ObtenerDireccionPorID(idDireccion);
        }

        public async Task<DtoRespuestaSP> EliminarDireccion(int idDireccion)
        {
            return await this.repositorioDirecciones.EliminarDireccion(idDireccion);
        }
    }
}
