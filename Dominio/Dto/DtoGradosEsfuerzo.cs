using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    
    public class DtoGradosEsfuerzo : DatosAuditoria
    {
        public int IdGradoEsfuerzo { get; set; }
        public string GradoEsfuerzo { get; set; }
        public string Codigo { get; set; }

    }
}
