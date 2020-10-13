using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System.Data.Common;
using MySqlConnector;

namespace exampleAPP
{
    public class getDocument
    {
        public string user { get; set; }
          
	    private string[] respuesta {get;set;}

        public List<string[]> listRespuesta {get;set;}

        internal AppDb Db { get; set; }

        public getDocument()
        {
        }

        internal getDocument(AppDb db)
        {
            Db = db;
        }

        public async Task getDocumentAsync()
        {
            var cmd = getDocumentCmd();
            ReadAll(await cmd.ExecuteReaderAsync());
        }

        private MySqlCommand getDocumentCmd()
        {
            var cmd = Db.Connection.CreateCommand() as MySqlCommand;
            // call get_documentos(@user1);
            cmd.CommandText = @"call get_documentos(@user);";
            GetUserParams(cmd);
            return cmd;
        }

        private void ReadAll(DbDataReader reader)
        {
           listRespuesta = new List<string[]>();
            using (reader)
            {
				 while (reader.Read())
                {
                   respuesta = new string[] { "respuesta", reader.GetFieldValue<String>(0) ,reader.GetFieldValue<String>(1) };
                   listRespuesta.Add(respuesta);
                }
            }
        }
        private void GetUserParams(MySqlCommand cmd)
        {
            //call set_documento(@nombre,@contenido,@estado,@user);
           
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@user",
                DbType = DbType.String,
                Value = user,
            });
        }
    }
}