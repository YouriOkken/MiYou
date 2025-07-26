using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.AI;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace MiYou.API.Controllers
{
    [ApiController]
    [Route("api/ai")]
    public class AIController : BaseController
    {
        public AIController(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }

        [HttpPost("code-debug")]
        public async Task<IActionResult> DebugCode([FromBody] AiRequest request)
        {
            return await LoadAsync<AiRequest, IActionResult>(request);
        }
    }
}
