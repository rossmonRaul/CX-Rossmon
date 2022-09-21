using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoTipoIndicador : DatosAuditoria
    {
        public int IdTipoIndicador { get; set; }
        public string TipoIndicador { get; set; }
        public string Sigla { get; set; }
        public int Minimo { get; set; }
        public int Maximo { get; set; }
        public int IdClasificacion { get; set; }
    }
}
