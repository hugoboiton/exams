using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace exampleAPP.Controllers
{
    [ApiController]
    [Route("/api/setDocument")]
    public class setDocumentControl : ControllerBase
    {       
        
      // POST api/async
		[HttpPost]
		public async Task<IActionResult> Post([FromBody]setDocument body)
		{

			using (var db = new AppDb())
			{
				await db.Connection.OpenAsync();
				body.Db = db;
				await body.SetDocumentAsync();
				return new OkObjectResult(body.respuesta);
			}
		}
      
    }
}
