using MiYou.API.Extensions;
using MiYou.API.Middleware;
using MiYou.API.Services;
using MiYou.Shared.Utilities;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration
    .AddUserSecrets<Program>()
    .AddEnvironmentVariables();

// Add services to the container.
builder.Services.AddDatabaseContextFactoryConfiguration(builder.Configuration);
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCamelCaseJsonSerialization();
builder.Services.AddLoaderServices();
builder.Services.AddProcessorServices();
builder.Services.AddMapperServices();
builder.Services.AddContextServices();
builder.Services.AddCustomServices();

builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddScoped<EmailService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://miyou.nl")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.AddGlobalExceptionHandling();
app.UseCors("AllowLocalhost");
app.UseMiddleware<LanguageMiddleware>(); // voor goede translation
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();