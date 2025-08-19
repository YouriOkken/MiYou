using MiYou.Shared.Enums;

namespace MiYou.API.Models.Admin.Client
{
    public class ClientResponse
    {
        public int Id { get; set; }
        public DateOnly ClientSince { get; set; }
        public string ContactPerson { get; set; }
        public bool Active { get; set; }
        public string FullName { get; set; }
        public PaymentStatusEnum PaymentStatus { get; set; }
    }

    public class ClientListResponse
    {
        public List<ClientResponse> ClientList { get; set; } = new List<ClientResponse>();
    }
}