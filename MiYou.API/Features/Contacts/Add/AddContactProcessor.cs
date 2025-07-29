using Microsoft.EntityFrameworkCore;
using MiYou.API.Models.Contact.Add;
using MiYou.API.Services;
using MiYou.DAL;
using MiYou.DAL.ContextFactory;
using MiYou.DAL.Entities;
using MiYou.Shared.Exceptions;
using MiYou.Shared.Interfaces;
using MiYou.Shared.Utilities;
using MiYou.Shared.Resources;

namespace MiYou.API.Features.Contacts.Add
{
    public class AddContactProcessor : IProcessor<AddContactRequest>
    {
        private readonly IContextFactory _contextFactory;
        private readonly EmailService _emailService;

        public AddContactProcessor(IContextFactory contextFactory,
            EmailService emailService) 
        {
            _contextFactory = contextFactory;
            _emailService = emailService;
        }

        public async Task ProcessAsync(AddContactRequest request)
        {
            using DatabaseContext _context = _contextFactory.Create();
            using var transaction = await _context.Database.BeginTransactionAsync(); // tijdelijke opslag van alle databaseacties tot commit of rollback

            if (await _context.Contacts.AnyAsync(c => c.Email == request.Email))
                throw new AlreadyExistsException(Resources.Error_Contact_EmailExists);

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
                AdditionalInfo = request.AdditionalInfo,
            };

            _context.Contacts.Add(newContact);

            bool internalMailSent = await _emailService.SendEmailAsync("contact@miyou.nl", "Nieuw contact", EmailTemplates.GenerateContactEmailHtml(request.Name, request.CompanyName, request.Email, request.Idea, request.AdditionalInfo));
            bool externalMailSent = await _emailService.SendEmailAsync(request.Email, "Contact bevestiging", EmailTemplates.ContactConfirmationTemplate(request.Name));
            if (internalMailSent && externalMailSent)
            {
                await _context.SaveChangesAsync(); // sla de wijzigingen op binnen de transactie
                await transaction.CommitAsync();   // commit alles definitief naar de database
            } else
            {
                await transaction.RollbackAsync();
                throw new EmailDeliveryException("Email kon niet worden bereikt. Heeft u het goede email adres ingevuld?");
            }
        }
    }
}
