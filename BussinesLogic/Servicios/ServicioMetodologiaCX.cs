﻿using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioMetodologiaCX
    {

        public SPMetodologiaCX spMetodologiaCX = new SPMetodologiaCX();

        public async Task<DtoRespuestaSP> InsertarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            return await this.spMetodologiaCX.InsertarMetodologiaCX(entitiMetodologiaCX);
        }
        public async Task<DtoRespuestaSP> ActualizarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            return await this.spMetodologiaCX.ActualizarMetodologiaCX(entitiMetodologiaCX);
        }
        public async Task<DtoRespuestaSP> EliminarMetodologiaCX(int idMetodologia)
        {
            return await this.spMetodologiaCX.EliminarMetodologiaCX(idMetodologia);
        }
        public async Task<DtoMetodologiaCX> ObtenerMetodologiaCXPorID(int idMetodologia)
        {
            return await this.spMetodologiaCX.ObtenerMetodologiaCXPorID(idMetodologia);
        }

        public async Task<List<DtoMetodologiaCX>> ObtenerMetodologiaCX()
        {
            return await this.spMetodologiaCX.ObtenerMetodologiaCX();
        }
    }
}
