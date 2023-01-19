using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoPreguntaAsignada: DatosAuditoria
    {
        public int idAsignacion { get; set; }
        public int IdPreguntaEncuesta { get; set; }
        public string Pregunta { get; set; }
        public string Tipo { get; set; }
        public string Sigla { get; set; }
        public string TipoMetrica { get; set; }
        public string TipoEncuesta { get; set; }



    }
}
