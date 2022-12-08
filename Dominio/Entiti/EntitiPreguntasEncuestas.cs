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
        public string sigla { get; set; }
        public string tipoIndicador { get; set; }
        public string descripcion { get; set; }
        public string tipoEncuesta { get; set; }
        public int estado { get; set; }


        public int idTipoEncuesta { get; set; }
        public int idFase { get; set; }
        public int idTipoMetrica { get; set; }
        public int idTipoPerspectiva { get; set; }
        public int idTipoIndicador { get; set; }
        public int idTipoContactoEncuesta { get; set; }
        public int idTipoInteraccion { get; set; }
    }
}
