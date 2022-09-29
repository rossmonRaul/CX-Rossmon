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
    public class SPJefaturasDirecciones
    {
        BdConexion bdConexion = new BdConexion();
        private SqlCommand sqlCommand;
        private SqlConnection sqlConnection;

        private readonly string obtenerjefaturasdireccionquery = "SPObtenerJefaturasPorDireccion";
        private readonly string eliminarjefaturadireccionquery = "SPEliminarJefaturaPorDireccion";
        private readonly string insertarnuevajefaturaquery = "SPInsertarJefaturaPorDireccion";
        private readonly string actualizarjefaturaquery = "SPModificarJefaturaDireccion";
        private readonly string obtenerjefaturasdireccionporidquery = "SPObtenerJefaturaPorID";
        public async Task<List<DtoJefaturaDireccion>> ObtenerJefaturasDireccion()
        {
            List<DtoJefaturaDireccion> lista = new List<DtoJefaturaDireccion>();
            try
            {

                using (var connection = new SqlConnection(bdConexion.connectionString))
                {
                    var result = await connection.QueryAsync<DtoJefaturaDireccion>(obtenerjefaturasdireccionquery, commandType: System.Data.CommandType.StoredProcedure);
                    lista = result.ToList();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return lista;
        } 
        public async Task<DtoJefaturaDireccion> ObtenerJefaturasDireccionPorId(int idJefatura)
        {
            object value = new object();
            try
            {

                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();

                DynamicParameters queryParameters = new DynamicParameters();
                queryParameters.Add("@IdJefatura", idJefatura);

                var result = await sqlConnection.QueryAsync<DtoJefaturaDireccion>(obtenerjefaturasdireccionporidquery, queryParameters, commandType: System.Data.CommandType.StoredProcedure);
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
            return (DtoJefaturaDireccion)Convert.ChangeType(value, typeof(DtoJefaturaDireccion));
        }
        public async Task<DtoRespuestaSP> EliminarJefaturaDireccion(int idJefatura)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(eliminarjefaturadireccionquery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdJefatura", idJefatura);

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
        public async Task<DtoRespuestaSP> InsertarJefatura(EntitiJefaturas entitiJefaturas)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(insertarnuevajefaturaquery, sqlConnection); //cambiar SP 
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdDireccion", entitiJefaturas.IdDireccion);
                sqlCommand.Parameters.AddWithValue("@Codigo", entitiJefaturas.Codigo);
                sqlCommand.Parameters.AddWithValue("@Jefatura", entitiJefaturas.Jefatura);

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
        public async Task<DtoRespuestaSP> ActualizarJefatura(EntitiJefaturas entitiJefaturas)
        {
            DtoRespuestaSP dtoRespuestaSP = new DtoRespuestaSP();
            try
            {
                sqlConnection = new SqlConnection(bdConexion.connectionString);
                sqlConnection.Open();
                sqlCommand = new SqlCommand(actualizarjefaturaquery, sqlConnection);
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

                sqlCommand.Parameters.AddWithValue("@IdJefatura", entitiJefaturas.IdJefatura);
                sqlCommand.Parameters.AddWithValue("@IdDireccion", entitiJefaturas.IdDireccion);
                sqlCommand.Parameters.AddWithValue("@Codigo", entitiJefaturas.Codigo);
                sqlCommand.Parameters.AddWithValue("@Jefatura", entitiJefaturas.Jefatura);

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
    }*/
    public class SPJefaturasDirecciones : IRepositorioJefaturasDirecciones
    {
        private readonly IContextoBD contextoBD;

        public SPJefaturasDirecciones(IContextoBD contextoBD)
        {
            this.contextoBD = contextoBD;
        }

        public async Task<DtoRespuestaSP> InsertarJefatura(EntitiJefaturas entitiJefaturas)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdDireccion", entitiJefaturas.IdDireccion);
                data.Add("Codigo", entitiJefaturas.Codigo);
                data.Add("Jefatura", entitiJefaturas.Jefatura);

                string query = "SPInsertarJefaturaPorDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> ActualizarJefatura(EntitiJefaturas entitiJefaturas)
        {

            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();

                data.Add("IdJefatura", entitiJefaturas.IdJefatura);
                data.Add("IdDireccion", entitiJefaturas.IdDireccion);
                data.Add("Codigo", entitiJefaturas.Codigo);
                data.Add("Jefatura", entitiJefaturas.Jefatura);
                string query = "SPModificarJefaturaDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DtoRespuestaSP> EliminarJefaturaDireccion(int idJefatura)

        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdJefatura", idJefatura);
                string query = "SPEliminarJefaturaPorDireccion";

                return await this.contextoBD.EjecutarSP(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DtoJefaturaDireccion> ObtenerJefaturasDireccionPorId(int idJefatura)
        {
            try
            {
                Dictionary<string, object> data = new Dictionary<string, object>();
                data.Add("IdJefatura", idJefatura);
                string query = "SPObtenerJefaturaPorID";

                return await this.contextoBD.ObtenerDato<DtoJefaturaDireccion>(query, data);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DtoJefaturaDireccion>> ObtenerJefaturasDireccion()
        {
            try
            {
                string query = "SPObtenerJefaturasPorDireccion";
                var result = await this.contextoBD.ObtenerListaDeDatos<DtoJefaturaDireccion>(query);

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
