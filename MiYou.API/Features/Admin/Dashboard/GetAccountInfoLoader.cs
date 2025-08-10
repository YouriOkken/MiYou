using Microsoft.EntityFrameworkCore;
using MiYou.API.Models.Admin.Dashboard;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.DAL.Entities.Users;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Features.Admin.Dashboard
{
    public class GetAccountInfoLoader : ILoader<AccountInfoResponse>
    {
        private readonly IContextFactory _contextFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper<User, AccountInfoResponse> _accountInfoMapper;

        public GetAccountInfoLoader(IContextFactory contextFactory,
            IHttpContextAccessor httpContextAccessor,
            IMapper<User, AccountInfoResponse> accountInfoMapper)
        {
            _contextFactory = contextFactory;
            _httpContextAccessor = httpContextAccessor;
            _accountInfoMapper = accountInfoMapper;
        }
        public async Task<AccountInfoResponse> LoadAsync()
        {
            using DatabaseContext context = _contextFactory.Create();
            var userId = int.Parse(_httpContextAccessor.HttpContext?.User.FindFirst("UserId")?.Value);

            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            return _accountInfoMapper.Map(user);
        }
    }
}
