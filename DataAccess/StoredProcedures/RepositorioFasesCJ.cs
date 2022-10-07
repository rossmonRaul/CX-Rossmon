using Dapper;
using Dominio.Dto;
using Dominio.Entiti;
using Dominio.Interfaces.Infraestructura.BaseDatos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.StoredProcedures
{
    public class RepositorioFasesCJ : IRepositorioFasesCJ
    {
        private readonly IContextoBD contextoBD;

        public RepositorioFasesCJ(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarFasesCJ(EntitiFaseCJ entitiFaseCJ)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("FaseCustomerJourney", entitiFaseCJ.faseCustomerJourney);
                

                string query = "SPInsertarFasesCJ";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarFasesCJ(EntitiFaseCJ entitiFaseCJ)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdFaseCJ", entitiFaseCJ.idFaseCJ);
                data.Add("FaseCustomerJourney", entitiFaseCJ.faseCustomerJourney);
                string query = "SPActualizarFasesCJ";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarFasesCJ(int idFaseCJ)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdFaseCJ", idFaseCJ);
                string query = "SPEliminarFasesCJ";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoFaseCJ> ObtenerFasesCJPorID(int idFaseCJ)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdFaseCJ", idFaseCJ);
                string query = "SPObtenerFasesCJPorID";

                return await this.contextoBD.ObtenerDato<DtoFaseCJ>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoFaseCJ>> ObtenerFasesCJ()
        {
            try
            {
                string query = "SPObtenerFasesCJ";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoFaseCJ>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
    
}
