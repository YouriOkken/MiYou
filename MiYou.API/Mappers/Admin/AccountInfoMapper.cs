using MiYou.API.Models.Admin.Dashboard;
using MiYou.DAL.Entities.Users;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Mappers.Admin
{
    public class AccountInfoMapper : IMapper<User, AccountInfoResponse>
    {
        public AccountInfoResponse Map(User modelToMap)
        {
            return new AccountInfoResponse
            {
                FirstName = modelToMap.FirstName,
                LastName = modelToMap.LastName
            };
        }
    }
}
