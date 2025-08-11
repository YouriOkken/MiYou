using MiYou.API.Models.Auth.Login;
using MiYou.Shared.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MiYou.API.Features.Auth.CurrentUser
{
    public class CurrentUserLoader : ILoader<LoginResponse>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper<ClaimsPrincipal, LoginResponse> _currentUserMapper;

        public CurrentUserLoader(
            IHttpContextAccessor httpContextAccessor,
            IMapper<ClaimsPrincipal, LoginResponse> currentUserMapper)
        {
            _httpContextAccessor = httpContextAccessor;
            _currentUserMapper = currentUserMapper;
        }

        public async Task<LoginResponse> LoadAsync()
        {
            var user = _httpContextAccessor.HttpContext?.User;

            if (user == null || user.Identity == null || !user.Identity.IsAuthenticated)
            {
                return null;
            }

            var userId = user.FindFirst("UserId")?.Value;
            var email = user.FindFirst(JwtRegisteredClaimNames.Email)?.Value;

            if (userId != null)
            {
                var mappedUser = _currentUserMapper.Map(user);
                return mappedUser;
            }

            return null;
        }

    }
}
