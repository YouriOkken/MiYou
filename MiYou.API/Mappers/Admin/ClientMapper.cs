using MiYou.API.Models.Admin.Client;
using MiYou.DAL.Entities;
using MiYou.Shared.Interfaces;
using MiYou.Shared.Utilities;

namespace MiYou.API.Mappers.Admin
{
    public class ClientMapper : IMapper<Client, ClientResponse>
    {
        public ClientResponse Map(Client modelToMap)
        {
            return new ClientResponse
            {
                Id = modelToMap.Id,
                ClientSince = modelToMap.ClientSince,
                ContactPerson = modelToMap.ContactPerson,
                Active = modelToMap.Active,
                PaymentStatus = modelToMap.PaymentStatus,
                FullName = StringUtilities.GetFullName(modelToMap.FirstName, modelToMap.MiddleName, modelToMap.LastName)
            };
        }
    }
}
