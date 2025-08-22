using MiYou.Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace MiYou.DAL.Entities
{
    public class Client
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
        public DateOnly ClientSince { get; set; }

        [Required]
        [StringLength(100)]
        public string ContactPerson { get; set; }

        [Required]
        public bool Active { get; set; }

        [Required]
        public PaymentStatusEnum PaymentStatus { get; set; }
    }
}
