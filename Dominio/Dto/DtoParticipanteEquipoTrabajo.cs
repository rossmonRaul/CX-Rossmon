using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoParticipanteEquipoTrabajo : DatosAuditoria
    {
        public int IdParticipante { get; set; }
        public string NombreParticipante { get; set; }
        public string Direccion { get; set; }
        public int IdDireccion { get; set; }
        public int IdFaseCJ { get; set; }
        public string FaseCustomerJourney { get; set; }
        public int Asistencia { get; set; }
        public int IdTallerCoCreacion { get; set; }
    }
}
