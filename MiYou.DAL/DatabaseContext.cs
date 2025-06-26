using Microsoft.EntityFrameworkCore;
using MiYou.DAL.Entities;

namespace MiYou.DAL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }
    }
}