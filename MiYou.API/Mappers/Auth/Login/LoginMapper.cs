using MiYou.API.Models.Auth.Login;
using MiYou.DAL.Entities.Users;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Mappers.Auth.Login
{
    public class LoginMapper : IMapper<User, LoginResponse>
    {
        public LoginResponse Map(User modelToMap)
        {
            return new LoginResponse
            {
                UserId = modelToMap.Id,
                Email = modelToMap.Email
            };
        }
    }
}
