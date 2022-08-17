﻿using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioEstadoAceptacion
    {
        public SPEstadoAceptacion spEstadoAceptacion = new SPEstadoAceptacion();

        public async Task<List<DtoEstadoAceptacion>> ObtenerEstadoAceptacion()
        {
            return await this.spEstadoAceptacion.ObtenerEstadoAceptacion();
        }

        public async Task<DtoRespuestaSP> InsertarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            return await this.spEstadoAceptacion.InsertarEstadoAceptacion(entitiEstadoAceptacion);
        }
        public async Task<DtoRespuestaSP> ActualizarEstadoAceptacion(EntitiEstadoAceptacion entitiEstadoAceptacion)
        {
            return await this.spEstadoAceptacion.ActualizarEstadoAceptacion(entitiEstadoAceptacion);
        }
        public async Task<DtoRespuestaSP> EliminarEstadoAceptacion(int idEstadoAceptacion)
        {
            return await this.spEstadoAceptacion.EliminarEstadoAceptacion(idEstadoAceptacion);
        }
        public async Task<DtoEstadoAceptacion> ObtenerEstadoAceptacionPorID(int idEstadoAceptacion)
        {
            return await this.spEstadoAceptacion.ObtenerEstadoAceptacionPorID(idEstadoAceptacion);
        }
    }
}
