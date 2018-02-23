using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace ZCStudio.Documents.Server.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class RequestLoggerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public RequestLoggerMiddleware(RequestDelegate next, ILogger<RequestLoggerMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            _logger.LogInformation("Handling request:{Path}", httpContext.Request.Path);
            await _next.Invoke(httpContext);
            _logger.LogInformation("Finish Handling request:{Path}", httpContext.Request.Path);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class RequestLoggerMiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestLoggerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLoggerMiddleware>();
        }
    }
}
