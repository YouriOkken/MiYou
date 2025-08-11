using MiYou.API.Models.Auth.Login;
using MiYou.Shared.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MiYou.API.Mappers.Auth.CurrentUser
{
    public class CurrentUserMapper : IMapper<ClaimsPrincipal, LoginResponse>
    {
        public LoginResponse Map(ClaimsPrincipal modelToMap)
        {
            return new LoginResponse
            {
                UserId = int.Parse(modelToMap.FindFirst("UserId")?.Value),
                Email = modelToMap.FindFirst(JwtRegisteredClaimNames.Email)?.Value
            };
        }
    }
}
