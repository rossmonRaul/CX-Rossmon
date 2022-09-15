using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoTipoMetrica : DatosAuditoria
    {
        public int IdTipoMetrica { get; set; }
        public string Descripcion { get; set; }
        public string Tipo { get; set; }
    }
}
