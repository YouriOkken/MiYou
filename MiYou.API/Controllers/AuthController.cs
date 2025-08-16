using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiYou.API.Models.Auth;
using MiYou.API.Models.Auth.Login;
using MiYou.API.Services.Auth;

namespace MiYou.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : BaseController
    {
        private readonly AuthService _authService;

        public AuthController(IServiceProvider serviceProvider, AuthService authService) : base(serviceProvider) 
        { 
            _authService = authService;
        }

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

        [Authorize]
        [HttpPost("logout")]
        public async Task Logout(LogoutRequest request)
        {
            await ProcessAsync<LogoutRequest>(request);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (!string.IsNullOrEmpty(refreshToken))
            {
                var user = await _authService.GetUserOnRefreshToken(refreshToken);
                if (user != null)
                {
                    await _authService.AddJwtAndCookies(user);
                    return Ok();
                } else
                {
                    return Unauthorized();
                }
            }
            return Ok();
        }
    }
}
