using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioDirecciones
    {
        public SPDirecciones spDirecciones = new SPDirecciones();

        public async Task<List<DtoDirecciones>> ObtenerDirecciones()
        {
            return await this.spDirecciones.ObtenerDirecciones();
        }

        public async Task<List<DtoDirecciones>> ObtenerDireccionesActivas()
        {
            return await this.spDirecciones.ObtenerDireccionesActivas();
        }
        public async Task<DtoRespuestaSP> InsertarDirecciones(EntitiDirecciones entitiDirecciones)
        {
            return await this.spDirecciones.InsertarDirecciones(entitiDirecciones);
        }

        public async Task<DtoRespuestaSP> ActualizarDireccion(EntitiDirecciones entitiDirecciones)
        {
            return await this.spDirecciones.ActualizarDireccion(entitiDirecciones);
        }

        public async Task<DtoDirecciones> ObtenerDireccionPorID(int idDireccion)
        {
            return await this.spDirecciones.ObtenerDireccionPorID(idDireccion);
        }

        public async Task<DtoRespuestaSP> EliminarDireccion(int idDireccion)
        {
            return await this.spDirecciones.EliminarDireccion(idDireccion);
        }
    }
}
