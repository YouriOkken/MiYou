using System.ComponentModel.DataAnnotations;

namespace MiYou.DAL.Entities.Users
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string? RefreshToken { get; set; }

        public DateTimeOffset? RefreshTokenExpiryTime { get; set; }
    }
}
