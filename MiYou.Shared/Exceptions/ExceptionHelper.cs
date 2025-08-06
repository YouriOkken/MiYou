using Microsoft.AspNetCore.Http;

namespace MiYou.Shared.Exceptions
{
    // Base exception
    public abstract class HttpException : Exception
    {
        public abstract int StatusCode { get; }

        protected HttpException(string message) : base(message) { }
    }

    public class AlreadyExistsException : HttpException
    {
        public override int StatusCode => StatusCodes.Status409Conflict;

        public AlreadyExistsException(string message) : base(message) { }
    }

    public class WrongCredentials : HttpException
    {
        public override int StatusCode => StatusCodes.Status401Unauthorized;

        public WrongCredentials(string message) : base(message) { }
    }

    public class EmailDeliveryException : HttpException
    {
        public override int StatusCode => StatusCodes.Status400BadRequest;

        public EmailDeliveryException(string message) : base(message) { }
    }
}
