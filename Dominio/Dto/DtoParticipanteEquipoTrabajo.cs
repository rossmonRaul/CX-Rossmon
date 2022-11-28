using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoParticipanteEquipoTrabajo : DatosAuditoria
    {
        public int IdParticiante { get; set; }
        public string NombreParticipante { get; set; }
        public string Direccion { get; set; }
        public int IdDireccion { get; set; }
        public int idFaseCJ { get; set; }
        public string FaseCustomerJourney { get; set; }
        public bool Asistencia { get; set; }
        public int IdTallerCoCreacion { get; set; }
    }
}
