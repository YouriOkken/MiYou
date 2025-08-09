using Microsoft.EntityFrameworkCore;
using MiYou.DAL.Entities;
using MiYou.DAL.Entities.Users;

namespace MiYou.DAL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<User> Users { get; set; }
    }
}