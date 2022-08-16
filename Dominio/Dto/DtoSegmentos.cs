using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    //MODELO DE SEGMENTOS
    public class DtoSegmentos : DatosAuditoria
    {
        public int IdSegmento { get; set; }
        public int IdSector { get; set; }
        public string Segmento { get; set; }
        public string Sector { get; set; }



    }
}
