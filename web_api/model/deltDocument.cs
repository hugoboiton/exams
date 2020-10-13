using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Data.Common;
using MySqlConnector;

namespace exampleAPP
{
    public class deltDocument
    {
        public string user { get; set; }
        public string nombre {get; set; }
          
	    public string[] respuesta {get;set;}
        
        internal AppDb Db { get; set; }

        public deltDocument()
        {
        }

        internal deltDocument(AppDb db)
        {
            Db = db;
        }

        public async Task deltDocumentAsync()
        {
            var cmd = deltDocumentCmd();
            ReadAll(await cmd.ExecuteReaderAsync());
        }

        private MySqlCommand deltDocumentCmd()
        {
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            //call del_documento("archivo_2","hboiton");
            cmd.CommandText = @"call del_documento(@nombre,@user);";
            GetUserParams(cmd);
            return cmd;
        }

        private void ReadAll(DbDataReader reader)
        {
           
            using (reader)
            {
				 while (reader.Read())
                {
                   respuesta = new string[] { "respuesta", reader.GetFieldValue<String>(0)};
                }
            }
        }
        private void GetUserParams(MySqlCommand cmd)
        {
           //call del_documento("archivo_2","hboiton");    
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@nombre",
                DbType = DbType.String,
                Value = nombre,
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