
using Dapper;
//using DataAccess.Conexion;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
//using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{

   
      public class RepositorioMantenimientoHallazgo :IRepositorioMantenimientoHallazgo{
        private readonly IContextoBD contextoBD;

        public RepositorioMantenimientoHallazgo(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }
        public async Task<DtoRespuestaSP> AgregarMantenimientoHallazgo(EntitiHallazgo entitiMantenimientoHallazgo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
 
                data.Add("IdSolucionAsociadaHallazgo", entitiMantenimientoHallazgo.idSolucionAsociadaHallazgo );
                data.Add("IdGradoImpacto", entitiMantenimientoHallazgo.idGradoImpacto );
                data.Add("IdEstadoHallazgo", entitiMantenimientoHallazgo.idEstadoHallazgo );
                data.Add("IdPeriodicidadEntregaAvances", entitiMantenimientoHallazgo.idPeriodicidadEntregaAvances );
                data.Add("IdFaseCJ", entitiMantenimientoHallazgo.idFaseCJ );
                data.Add("IdServicioAsociadoHallazgo", entitiMantenimientoHallazgo.idServicioAsociadoHallazgo );
                data.Add("IdGradoEsfuerzo", entitiMantenimientoHallazgo.idGradoEsfuerzo );
                data.Add("NumOficioEnvio", entitiMantenimientoHallazgo.numOficioEnvio );
                data.Add("IdTallerCoCreacion", entitiMantenimientoHallazgo.idTallerCoCreacion);
                data.Add("IdMacroActividadAsociadaHallazgo", entitiMantenimientoHallazgo.idMacroActividadAsociadaHallazgo );
                data.Add("IdEstadoAceptacion", entitiMantenimientoHallazgo.idEstadoAceptacion );
                data.Add("PorcentajeGeneral", entitiMantenimientoHallazgo.porcentajeGeneral );
                data.Add("DetalleGeneralHallazgo", entitiMantenimientoHallazgo.detalleGeneralHallazgo );
                data.Add("DetalleEspecificoHallazgo", entitiMantenimientoHallazgo.detalleEspecificoHallazgo );
                //data.Add("Anotacion ", entitiMantenimientoHallazgo.anotacion );
                string query = "SPInsertarGridMantenimientoHallazgo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarMantenimientoHallazgo(EntitiHallazgo entitiMantenimientoHallazgo)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdMantenimientoHallazgo  ", entitiMantenimientoHallazgo.idMantenimientoHallazgo);
                data.Add("IdSolucionAsociadaHallazgo", entitiMantenimientoHallazgo.idSolucionAsociadaHallazgo);
                data.Add("IdGradoImpacto", entitiMantenimientoHallazgo.idGradoImpacto);
                data.Add("IdEstadoHallazgo", entitiMantenimientoHallazgo.idEstadoHallazgo);
                data.Add("IdPeriodicidadEntregaAvances", entitiMantenimientoHallazgo.idPeriodicidadEntregaAvances);
                data.Add("IdFaseCJ", entitiMantenimientoHallazgo.idFaseCJ);
                data.Add("IdServicioAsociadoHallazgo", entitiMantenimientoHallazgo.idServicioAsociadoHallazgo);
                data.Add("IdGradoEsfuerzo", entitiMantenimientoHallazgo.idGradoEsfuerzo);
                data.Add("NumOficioEnvio", entitiMantenimientoHallazgo.numOficioEnvio);
                data.Add("IdTallerCoCreacion", entitiMantenimientoHallazgo.idTallerCoCreacion);
                data.Add("IdMacroActividadAsociadaHallazgo", entitiMantenimientoHallazgo.idMacroActividadAsociadaHallazgo);
                data.Add("IdEstadoAceptacion", entitiMantenimientoHallazgo.idEstadoAceptacion);
                data.Add("PorcentajeGeneral", entitiMantenimientoHallazgo.porcentajeGeneral);
                data.Add("DetalleGeneralHallazgo", entitiMantenimientoHallazgo.detalleGeneralHallazgo);
                data.Add("DetalleEspecificoHallazgo", entitiMantenimientoHallazgo.detalleEspecificoHallazgo );
                //data.Add("Anotacion ", entitiMantenimientoHallazgo.anotacion );
                string query = "SPActualizarGridMantenimientoHallazgo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarMantenimientoHallazgo(int idMantenimientoHallazgo)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMantenimientoHallazgo", idMantenimientoHallazgo);
                string query = "SPEliminarGridHallazgo";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


       public async Task<DtoHallazgo> ObtenerMantenimientoHallazgoPorID(int idMantenimientoHallazgo)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMantenimientoHallazgo", idMantenimientoHallazgo);
                string query = "SPObtenerGridMantenimientoHallazgoPorID";

                return await this.contextoBD.ObtenerDato<DtoHallazgo>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoHallazgo>> ObtenerMantenimientoHallazgo()
        {
            try
            {
                string query = "SPObtenerMantenimientoHallazgo";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoHallazgo>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoGridHallazgo>> ObtenerGridMantenimientoHallazgo()
        {
            try
            {
                string query = "SPObtenerGridHallazgo";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoGridHallazgo>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<List<DtoHallazgo>> ObtenerMantenimientoHallazgoActivos()
        {
            try
            {
                string query = "SPObtenerMantenimientoHallazgoActivos";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoHallazgo>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<DtoCantidadDatos> ObtenerCantidadMantenimientoHallazgo()
        {
            try
            {
                string query = "SPObtenerCantidadMantenimientoHallazgo";
                var result = await this.contextoBD.ObtenerDato<DtoCantidadDatos>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
     
        public async Task<List<DtoOrbe>> ObtenerDatosOrbe()
        {
            try
            {
                string query = "SPObtenerOrbe";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoOrbe>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
        

}