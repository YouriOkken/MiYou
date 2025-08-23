using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Auth;
using MiYou.API.Models.Auth.Login;
using MiYou.API.Models.Auth.Refresh;
using MiYou.API.Services.Auth;

namespace MiYou.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        public AuthController(IServiceProvider serviceProvider) : base(serviceProvider) { }

        [Authorize]
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

        [HttpPost("refresh")]
        public async Task<LoginResponse> Refresh()
        {
            var refreshTokenFromCookies = Request.Cookies["refreshToken"];
            RefreshRequest request = new RefreshRequest
            {
                RefreshToken = refreshTokenFromCookies
            };

            return await ProcessAsync<RefreshRequest, LoginResponse>(request);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task Logout(LogoutRequest request)
        {
            await ProcessAsync<LogoutRequest>(request);
        }
    }
}
