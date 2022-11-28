using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

public class RepositorioParticipantesEquipoTrabajo : IRepositorioParticipantesEquipoTrabajo
{
    private readonly IContextoBD contextoBD;

    public RepositorioParticipantesEquipoTrabajo(IContextoBD contextoBD)
    {
        this.contextoBD = contextoBD;
    }

    public async Task<DtoRespuestaSP> InsertarParticipanteEquipoTrabajo(EntitiParticipanteEquipoTrabajo entitiParticipante)
    {
        try
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data.Add("IdTallerCoCreacion", entitiParticipante.IdTallerCoCreacion);
            data.Add("NombreParticipante", entitiParticipante.NombreParticipante);
            data.Add("IdDireccion", entitiParticipante.IdDireccion);
            data.Add("IdFaseCJ", entitiParticipante.IdFaseCJ);
            data.Add("Asistencia", entitiParticipante.Asistencia);
            string query = "SPInsertarParticipanteEquipoTrabajo";

            return await this.contextoBD.EjecutarSP(query, data);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<DtoRespuestaSP> ActualizarParticipante(EntitiParticipanteEquipoTrabajo entitiParticipante)
    {
        try
        {
            Dictionary<string, object> data = new Dictionary<string, object>();

            data.Add("IdParticipante", entitiParticipante.IdParticipante);
            data.Add("IdTallerCoCreacion", entitiParticipante.IdTallerCoCreacion);
            data.Add("NombreParticipante", entitiParticipante.NombreParticipante);
            data.Add("IdDireccion", entitiParticipante.IdDireccion);
            data.Add("IdFaseCJ", entitiParticipante.IdFaseCJ);
            data.Add("Asistencia", entitiParticipante.Asistencia);
            string query = "SPActualizarParticipanteEquipoTrabajo";

            return await this.contextoBD.EjecutarSP(query, data);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<DtoRespuestaSP> EliminarParticipante(int idParticipante)

    {
        try
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data.Add("IdParticipante", idParticipante);
            string query = "SPEliminarParticipanteEquipoTrabajo";

            return await this.contextoBD.EjecutarSP(query, data);
        }
        catch (Exception)
        {
            throw;
        }
    }


    public async Task<DtoParticipanteEquipoTrabajo> ObtenerParticipantePorID(int idParticipante)
    {
        try
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data.Add("IdParticipante", idParticipante);
            string query = "SPObtenerParticipantePorID";

            return await this.contextoBD.ObtenerDato<DtoParticipanteEquipoTrabajo>(query, data);
        }
        catch (Exception)
        {
            throw;
        }
    }
    public async Task<List<DtoParticipanteEquipoTrabajo>> ObtenerEquipoTrabajoPorIdTaller(int idTallerCoCreacion)
    {
        try
        {
            Dictionary<string, object> data = new Dictionary<string, object>();
            data.Add("IdTallerCoCreacion", idTallerCoCreacion);
            string query = "SPObtenerEquipoTrabajoPorIDTallerCoCreacion";

            return await this.contextoBD.ObtenerListaDeDatos<DtoParticipanteEquipoTrabajo>(query, data);
        }
        catch (Exception)
        {
            throw;
        }
    }


}