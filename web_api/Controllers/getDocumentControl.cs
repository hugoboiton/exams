using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace exampleAPP.Controllers
{
    [ApiController]
    [Route("/api/getDocument")]
    public class getDocumentControl : ControllerBase
    {       
        
      // POST api/async
		[HttpPost]
		public async Task<IActionResult> Post([FromBody]getDocument body)
		{
			using (var db = new AppDb())
			{
				await db.Connection.OpenAsync();
				body.Db = db;
				await body.getDocumentAsync();
				return new OkObjectResult(body.listRespuesta);
			}
		}
      
    }
}
