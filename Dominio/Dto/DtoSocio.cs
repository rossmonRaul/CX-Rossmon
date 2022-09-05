using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoSocio : DatosAuditoria
    {
        public string IdSocio { get; set; }
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public string TipoPersona { get; set; }
        public int IdTipoPersona { get; set; }
    }

}

