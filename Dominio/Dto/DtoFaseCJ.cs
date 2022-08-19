using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoFaseCJ : DatosAuditoria
    {
        public int idFaseCJ { get; set; }

        public string faseCustomerJourney { get; set; }
    }
}
