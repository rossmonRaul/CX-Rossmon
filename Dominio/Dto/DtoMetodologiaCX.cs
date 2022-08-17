using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoMetodologiaCX : DatosAuditoria
    {
        public int idMetodologia { get; set; }

        public string metodologia { get; set; }
    }
}
