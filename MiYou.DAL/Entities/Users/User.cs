using System.ComponentModel.DataAnnotations;

namespace MiYou.DAL.Entities.Users
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string? MiddleName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string? RefreshToken { get; set; }

        public DateTimeOffset? RefreshTokenExpiryTime { get; set; }
    }
}
