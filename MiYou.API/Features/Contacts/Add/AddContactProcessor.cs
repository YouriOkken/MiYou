using Microsoft.EntityFrameworkCore;
using MiYou.API.Models.Contact.Add;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.DAL.Entities;
using MiYou.Shared.Exceptions;
using MiYou.Shared.Interfaces;

namespace MiYou.API.Features.Contacts.Add
{
    public class AddContactProcessor : IProcessor<AddContactRequest>
    {
        private readonly IContextFactory _contextFactory;
        
        public AddContactProcessor(IContextFactory contextFactory) 
        {
            _contextFactory = contextFactory;
        }
        
        public async Task ProcessAsync(AddContactRequest request)
        {
            using DatabaseContext _context = _contextFactory.Create();

            if (await _context.Contacts.AnyAsync(c => c.Email == request.Email))
                throw new AlreadyExistsException("Er bestaat helaas al een contact met dit email adres");

            Contact newContact = new Contact
            {
                FirstName = request.FirstName,
                MiddleName = request.MiddleName,
                LastName = request.LastName,
                Email = request.Email,
                Description = request.Description,
            };

            _context.Contacts.Add(newContact);
            await _context.SaveChangesAsync();
        }
    }
}
