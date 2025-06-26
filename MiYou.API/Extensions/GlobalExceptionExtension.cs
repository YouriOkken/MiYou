using Microsoft.AspNetCore.Diagnostics;
using MiYou.Shared.Exceptions;

namespace MiYou.API.Extensions
{
    public static class GlobalExceptionExtension
    {
        public static void AddGlobalExceptionHandling(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
                    var exception = exceptionHandlerPathFeature?.Error;

                    context.Response.ContentType = "application/json";

                    var statusCode = exception is HttpException httpEx
                        ? httpEx.StatusCode
                        : StatusCodes.Status500InternalServerError;

                    var message = exception is HttpException
                        ? exception.Message
                        : "Er is iets misgegaan.";

                    context.Response.StatusCode = statusCode;
                    await context.Response.WriteAsJsonAsync(new { message });
                });
            });
        }
    }
}
