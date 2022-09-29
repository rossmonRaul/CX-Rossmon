﻿using Dapper;
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
{/*
    public class SPMetodologiaCX
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;


        private readonly string obtenerMetodologiaCXQuery = "SPObtenerMetodologiaCX";
        private readonly string insertarMetodologiaCXQuery = "SPInsertarMetodologiaCX";
        private readonly string actualizarMetodologiaCXQuery = "SPActualizarMetodologiaCX";
        private readonly string eliminarMetodologiaCXQuery = "SPEliminarMetodologiaCX";
        private readonly string obtenerMetodologiaCXPorIDQuery = "SPObtenerMetodologiaCXPorID";


        public async Task<DtoRespuestaSP> InsertarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarMetodologiaCXQuery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@Metodologia", entitiMetodologiaCX.metodologia);


                sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);
                sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                await sqlCommand.ExecuteNonQueryAsync();
                dtoRespuestaSP = new DtoRespuestaSP
                {
                    indicador = Convert.ToInt32(sqlCommand.Parameters["@INDICADOR"].Value),
                    mensaje = sqlCommand.Parameters["@MENSAJE"].Value.ToString()
                };

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return dtoRespuestaSP;
        }


        public async Task<DtoRespuestaSP> ActualizarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarMetodologiaCXQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdMetodologia", entitiMetodologiaCX.idMetodologia);
                sqlCommand.Parameters.AddWithValue("@Metodologia", entitiMetodologiaCX.metodologia);


                sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);
                sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                await sqlCommand.ExecuteNonQueryAsync();
                dtoRespuestaSP = new DtoRespuestaSP
                {
                    indicador = Convert.ToInt32(sqlCommand.Parameters["@INDICADOR"].Value),
                    mensaje = sqlCommand.Parameters["@MENSAJE"].Value.ToString()
                };

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return dtoRespuestaSP;
        }

        public async Task<DtoRespuestaSP> EliminarMetodologiaCX(int idMetodologia)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarMetodologiaCXQuery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdMetodologia", idMetodologia);

                sqlCommand.Parameters.Add("@INDICADOR", SqlDbType.Int);
                sqlCommand.Parameters.Add("@MENSAJE", SqlDbType.VarChar, 50);
                sqlCommand.Parameters["@INDICADOR"].Direction = ParameterDirection.Output;
                sqlCommand.Parameters["@MENSAJE"].Direction = ParameterDirection.Output;

                await sqlCommand.ExecuteNonQueryAsync();
                dtoRespuestaSP = new DtoRespuestaSP
                {
                    indicador = Convert.ToInt32(sqlCommand.Parameters["@INDICADOR"].Value),
                    mensaje = sqlCommand.Parameters["@MENSAJE"].Value.ToString()
                };

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return dtoRespuestaSP;

        }

        public async Task<DtoMetodologiaCX> ObtenerMetodologiaCXPorID(int idMetodologia)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdMetodologia", idMetodologia);

                var result = await sqlConnection.QueryAsync<DtoMetodologiaCX>(obtenerMetodologiaCXPorIDQuery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
                value = result.FirstOrDefault();

            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                this.sqlConnection.Close();
            }
            return (DtoMetodologiaCX)Convert.ChangeType(value, typeof(DtoMetodologiaCX));
        }


        public async Task<List<DtoMetodologiaCX>> ObtenerMetodologiaCX()
        {
            List<DtoMetodologiaCX> lista = new List<DtoMetodologiaCX>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoMetodologiaCX>(obtenerMetodologiaCXQuery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        }
    }*/
    public class SPMetodologiaCX : IRepositorioMetodologiaCX
    {
        private readonly IContextoBD contextoBD;

        public SPMetodologiaCX(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("Metodologia", entitiMetodologiaCX.metodologia);

                string query = "SPInsertarMetodologiaCX";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarMetodologiaCX(EntitiMetodologiaCX entitiMetodologiaCX)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdMetodologia", entitiMetodologiaCX.idMetodologia);
                data.Add("Metodologia", entitiMetodologiaCX.metodologia);
                string query = "SPActualizarMetodologiaCX";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarMetodologiaCX(int idMetodologia)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMetodologia", idMetodologia);
                string query = "SPEliminarMetodologiaCX";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoMetodologiaCX> ObtenerMetodologiaCXPorID(int idMetodologia)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdMetodologia", idMetodologia);
                string query = "SPObtenerMetodologiaCXPorID";

                return await this.contextoBD.ObtenerDato<DtoMetodologiaCX>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoMetodologiaCX>> ObtenerMetodologiaCX()
        {
            try
            {
                string query = "SPObtenerMetodologiaCX";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoMetodologiaCX>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
