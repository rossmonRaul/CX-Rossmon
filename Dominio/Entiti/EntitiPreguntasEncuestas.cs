using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiPreguntasEncuestas
    {
        public int IdPreguntaEncuesta { get; set; }
        public string Pregunta { get; set; }
        public int idTipoPregunta { get; set; }
        public int idFaseCJ { get; set; }
        public int idTipoEncuesta { get; set; }
        public int idTipoMetrica { get; set; }
        public int idTipoPerspectiva { get; set; }
        public int ?idTipoIndicador { get; set; }
        public int idTipoContactoEncuesta { get; set; }
        public int idTipoInteraccion { get; set; }
    }
}
