using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioTipoInteraccion
    {
        public SPTipoInteraccion spTipoInteraccion = new SPTipoInteraccion();

        public async Task<DtoRespuestaSP> InsertarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            return await this.spTipoInteraccion.InsertarTipoInteraccion(entitiTipoInteraccion);
        }
        public async Task<DtoRespuestaSP> ActualizarTipoInteraccion(EntitiTipoInteraccion entitiTipoInteraccion)
        {
            return await this.spTipoInteraccion.ActualizarTipoInteraccion(entitiTipoInteraccion);
        }
        public async Task<DtoRespuestaSP> EliminarTipoInteraccion(int idTipoInteraccion)
        {
            return await this.spTipoInteraccion.EliminarTipoInteraccion(idTipoInteraccion);
        }
        public async Task<DtoTipoInteraccion> ObtenerTipoInteraccionPorID(int idTipoInteraccion)
        {
            return await this.spTipoInteraccion.ObtenerTipoInteraccionPorID(idTipoInteraccion);
        }

        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccion()
        {
            return await this.spTipoInteraccion.ObtenerTipoInteraccion();
        }

        public async Task<List<DtoTipoInteraccion>> ObtenerTipoInteraccionActivos()
        {
            return await this.spTipoInteraccion.ObtenerTipoInteraccionActivos();
        }
    }
}
