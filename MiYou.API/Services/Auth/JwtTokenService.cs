using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MiYou.DAL.Entities.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace MiYou.API.Services.Auth
{
    public class JwtTokenService
    {
        public async Task<string> GenerateAccessToken(User user)
        {
            // TODO: Deze tijdelijk vars weghalen
            string jwtKey = "ThisIsASecretKeyForJwtThatIsLongEnough12345";
            string jwtIssuer = "MiYou";
            string jwtAudience = "MiYouUsers";
            int AccessTokenExpiryMinutes = 3000;

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("UserId", user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(AccessTokenExpiryMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}
