using System;
using System.Collections.Generic;
using System.Text;

namespace Dominio.Dto
{
    public class DtoResponsable : DatosAuditoria
    {
        public int IdResponsable { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public int IdDireccion { get; set; }
        public int Plazo { get; set; }
        public DateTime FechaInicio { get; set; }
        public char Orbe { get; set; }
        public int Avance { get; set; }
        public int Aceptado { get; set; }
        public int IdHallazgo { get; set; }
    }

}

