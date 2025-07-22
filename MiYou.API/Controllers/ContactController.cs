using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Contact.Add;

namespace MiYou.API.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : BaseController
    {
        public ContactController(IServiceProvider serviceProvider) : base(serviceProvider) { }

        [HttpPost("create")]
        public async Task<IActionResult> AddContact([FromBody] AddContactRequest request)
        {
            await ProcessAsync<AddContactRequest>(request);
            return Ok();
        }

        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("pong");
        }
    }
}
