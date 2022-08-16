using DataAccess.StoredProcedures;
using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioGradosEsfuerzo
    {
        public SPGradosEsfuerzo spGradosEsfuerzo = new SPGradosEsfuerzo();

        public async Task<List<DtoGradosEsfuerzo>> ObtenerGradosEsfuerzo()
        {
            return await this.spGradosEsfuerzo.ObtenerGradosEsfuerzo();
        }

        public async Task<DtoRespuestaSP> InsertarGradosEsfuerzo(EntitiGradosEsfuerzo entitiGradosEsfuerzo)
        {
            return await this.spGradosEsfuerzo.InsertarGradosEsfuerzo(entitiGradosEsfuerzo);
        }

       
    }
}
