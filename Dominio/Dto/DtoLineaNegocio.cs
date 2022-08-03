using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoLineaNegocio : DatosAuditoria
    {
        public int idLinea { get; set; }

        public string lineaNegocio { get; set; }


    }
}
