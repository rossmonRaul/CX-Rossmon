using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoValorIndicador : DatosAuditoria
    {
        public int IdClasificacion { get; set; }
        public int IdTipoIndicador { get; set; }
        public string Clasificacion { get; set; }
        public int Valor { get; set; }
    }
}
