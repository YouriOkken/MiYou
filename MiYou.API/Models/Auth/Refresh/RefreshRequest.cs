using System.ComponentModel.DataAnnotations;

namespace MiYou.API.Models.Auth.Refresh
{
    public class RefreshRequest
    {
        [Required]
        public string refreshToken { get; set; }
    }
}
