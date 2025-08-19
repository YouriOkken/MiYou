using Microsoft.EntityFrameworkCore;
using MiYou.API.Models.Admin.Client;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.DAL.Entities;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Features.Admin.Clients
{
    public class GetAllClientsLoader : ILoader<ClientListResponse>
    {
        private readonly IContextFactory _contextFactory;
        private readonly IMapper<Client, ClientResponse> _clientMapper;

        public GetAllClientsLoader(IContextFactory contextFactory,
            IMapper<Client, ClientResponse> clientMapper)
        {
            _contextFactory = contextFactory;
            _clientMapper = clientMapper;
        }
        public async Task<ClientListResponse> LoadAsync()
        {
            using DatabaseContext context = _contextFactory.Create();

            var clients = await context.Clients
                .AsNoTracking()
                .ToListAsync();

            var mappedClients = clients
                .Select(client => _clientMapper.Map(client))
                .ToList();

            return new ClientListResponse
            {
                ClientList = mappedClients
            };
        }
    }
}