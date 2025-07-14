using Microsoft.EntityFrameworkCore;
using MiYou.API.Models.Contact.Add;
using MiYou.API.Services;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.DAL.Entities;
using MiYou.Shared.Exceptions;
using MiYou.Shared.Interfaces;
using MiYou.Shared.Utilities;

namespace MiYou.API.Features.Contacts.Add
{
    public class AddContactProcessor : IProcessor<AddContactRequest>
    {
        private readonly IContextFactory _contextFactory;
        private readonly EmailService _emailService;
        
        public AddContactProcessor(IContextFactory contextFactory, EmailService emailService) 
        {
            _contextFactory = contextFactory;
            _emailService = emailService;
        }
        
        public async Task ProcessAsync(AddContactRequest request)
        {
            using DatabaseContext _context = _contextFactory.Create();

            if (await _context.Contacts.AnyAsync(c => c.Email == request.Email))
                throw new AlreadyExistsException("Er is helaas al contact gemaakt met ons via dit email adres.");

            if (string.IsNullOrWhiteSpace(request.AdditionalInfo))
                request.AdditionalInfo = "-"; // om gelijkheid te maken, anders heeft de ene klant niks en de ander een -

            if (string.IsNullOrWhiteSpace(request.CompanyName))
                request.CompanyName = "-"; // om gelijkheid te maken, anders heeft de ene klant niks en de ander een -

            Contact newContact = new Contact
            {
                Name = request.Name,
                CompanyName = request.CompanyName,
                Email = request.Email,
                Idea = request.Idea,
                additionalInfo = request.AdditionalInfo,
            };

            _context.Contacts.Add(newContact);
            await _context.SaveChangesAsync();

            await _emailService.SendEmailAsync("contact@miyou.nl", "Nieuw contact", EmailTemplates.GenerateContactEmailHtml(request.Name, request.CompanyName, request.Email, request.Idea, request.AdditionalInfo));
        }
    }
}
