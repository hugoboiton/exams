using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Data.Common;
using MySqlConnector;

namespace exampleAPP
{
    public class setDocument
    {
        public string user { get; set; }
        public string nombre { get; set; }
        public string conte { get; set; }
       
	    public string[] respuesta {get;set;}
        internal AppDb Db { get; set; }

        public setDocument()
        {
        }

        internal setDocument(AppDb db)
        {
            Db = db;
        }

        public async Task SetDocumentAsync()
        {
            var cmd = SetDocumentCmd();
            ReadAll(await cmd.ExecuteReaderAsync());
        }

        private MySqlCommand SetDocumentCmd()
        {
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            // ReSharper disable once PossibleNullReferenceException
            cmd.CommandText = @"call set_documento(@nombre,@contenido,@estado,@user);";
            GetUserParams(cmd);
            return cmd;
        }

        private void ReadAll(DbDataReader reader)
        {
           
            using (reader)
            {
				 while (reader.Read())
                {
                   respuesta = new string[] { "respuesta", reader.GetFieldValue<String>(0) };
                }
                
				
            }
        }
        private void GetUserParams(MySqlCommand cmd)
        {
            //call set_documento(@nombre,@contenido,@estado,@user);
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@nombre",
                DbType = DbType.String,
                Value = nombre,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@contenido",
                DbType = DbType.String,
                Value = conte,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@estado",
                DbType = DbType.Int64,
                Value = 1,
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@user",
                DbType = DbType.String,
                Value = user,
            });
        }
    }
}