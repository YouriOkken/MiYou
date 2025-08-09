using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Auth;
using MiYou.API.Models.Auth.Login;

namespace MiYou.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        public AuthController(IServiceProvider serviceProvider) : base(serviceProvider) { }

        [HttpGet("getCurrentUser")]
        public async Task<LoginResponse> GetCurrentUser()
        {
            return await LoadAsync<LoginResponse>();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<LoginResponse> Login([FromBody] LoginRequest request)
        {
            return await ProcessAsync<LoginRequest, LoginResponse>(request);
        }

        [HttpPost("logout")]
        public async Task Logout(LogoutRequest request)
        {
            await ProcessAsync<LogoutRequest>(request);
        }
    }
}
