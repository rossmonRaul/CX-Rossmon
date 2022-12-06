using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Entiti
{
    public class EntitiParticipanteEquipoTrabajo
    {
        public int IdParticipante { get; set; }
        public string NombreParticipante { get; set; }
        public int IdDireccion { get; set; }
        public int IdFaseCJ { get; set; }
        public int Asistencia { get; set; }
        public int IdTallerCoCreacion { get; set; }
    }
}
