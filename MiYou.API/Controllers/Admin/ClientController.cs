using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Admin.Client;

namespace MiYou.API.Controllers.Admin
{
    [Authorize]
    [ApiController]
    [Route("api/client")]
    public class ClientControler : BaseController
    {
        public ClientControler(IServiceProvider serviceProvider) : base(serviceProvider) { }

        [HttpGet("getAllClients")]
        public async Task<ClientListResponse> GetAllClients()
        {
            return await LoadAsync<ClientListResponse>();
        }
    }
}