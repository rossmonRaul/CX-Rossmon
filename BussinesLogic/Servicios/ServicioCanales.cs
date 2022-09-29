﻿using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using Dominio.Interfaces.Aplicacion.Canales;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioCanales : IServicioCanales
    {
        private readonly IRepositorioCanales spCanales;

        public ServicioCanales(IRepositorioCanales spCanales)
        {
            this.spCanales = spCanales;
        }

        public async Task<List<DtoCanales>> ObtenerCanales()
        {
            return await this.spCanales.ObtenerCanales();
        }

        public async Task<DtoRespuestaSP> InsertarCanales(EntitiCanales entitiCanales)
        {
            return await this.spCanales.InsertarCanales(entitiCanales);
        }
        public async Task<DtoRespuestaSP> ActualizarCanales(EntitiCanales entitiCanales)
        {
            return await this.spCanales.ActualizarCanales(entitiCanales);
        }
        public async Task<DtoRespuestaSP> EliminarCanales(int idCanal)
        {
            return await this.spCanales.EliminarCanales(idCanal);
        }
        public async Task<DtoCanales> ObtenerCanalesPorID(int idCanal)
        {
            return await this.spCanales.ObtenerCanalesPorID(idCanal);
        }
    }
}

