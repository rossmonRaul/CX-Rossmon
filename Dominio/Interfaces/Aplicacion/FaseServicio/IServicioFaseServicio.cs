using Dominio.Dto;
using Dominio.Entiti;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dominio.Interfaces.Aplicacion.FaseServicio
{
    public interface IServicioFaseServicio
    {
        Task<List<DtoFaseServicio>> ObtenerFaseServicios();
        Task<DtoRespuestaSP> InsertarFaseServicio(EntitiFaseServicio entitiFaseServicio);
        Task<DtoRespuestaSP> ActualizarFaseServicio(EntitiFaseServicio entitiFaseServicio);
        Task<DtoRespuestaSP> EliminarFaseServicio(int idFase);
        Task<DtoFaseServicio> ObtenerFaseServicioPorID(int idFase);
    }
}
