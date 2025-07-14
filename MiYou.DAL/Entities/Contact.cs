using System.ComponentModel.DataAnnotations;

namespace MiYou.DAL.Entities
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string? CompanyName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 10)] // Stringlength is iets krachtiger, en kan je min en max length meegeven
        public string Idea { get; set; }

        [StringLength(1000, MinimumLength = 0)] // Stringlength is iets krachtiger, en kan je min en max length meegeven
        public string? AdditionalInfo { get; set; }
    }
}
