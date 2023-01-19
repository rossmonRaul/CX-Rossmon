using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoEncuesta : DatosAuditoria
    {
        public int IdEncuesta { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int IdTipoEncuesta { get; set; }
        public string TipoEncuesta { get; set; }
        public int IdFaseCJ { get; set; }
        public string FaseCustomerJourney { get; set; }
        public int IdTipoContactoEncuesta { get; set; }
        public string TipoContactoEncuesta { get; set; }
    }

}

