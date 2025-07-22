using System.ComponentModel.DataAnnotations;

namespace MiYou.API.Models.Contact.Add
{
    public class AddContactRequest
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(10)]
        public string? MiddleName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 10)] // Stringlength is iets krachtiger, en kan je min en max length meegeven
        public string Description { get; set; }

    }
}
