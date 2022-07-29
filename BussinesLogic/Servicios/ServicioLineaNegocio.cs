using DataAccess.StoredProcedures;
using Dominio.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Servicios
{
    public class ServicioLineaNegocio
    {
        public SPLineaNegocio spLineaNegocio = new SPLineaNegocio();

        public async Task<List<DtoLineaNegocio>> ObtenerLineaNegocio()
        {
            return await this.spLineaNegocio.ObtenerLineaNegocio();
        }
    }
}
