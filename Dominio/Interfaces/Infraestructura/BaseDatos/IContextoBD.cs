using Dominio.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Infraestructura.BaseDatos
{
    public interface IContextoBD
    {
        Task<DtoRespuestaSP> EjecutarSP(string query, Dictionary<string, object> data = null);
        Task<T> ObtenerDato<T>(string sqlQuery, Dictionary<string, object> data = null);
        Task<List<T>> ObtenerListaDeDatos<T>(string sqlQuery, Dictionary<string, object> data = null);
    }
}
