using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoMacroActividad : DatosAuditoria
    {
        public int idMacro { get; set; }

        public string macroActividad { get; set; }

    }
}
