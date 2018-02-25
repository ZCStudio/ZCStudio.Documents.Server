using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;

namespace ZCStudio.Documents.Server
{
    public class Program
    {
        public static void Main(string[] args) => RunAsync(args).Wait();

        private static Task RunAsync(string[] args)
        {
            var hostConfig = new ConfigurationBuilder()
                            .AddJsonFile(Path.Combine("Config", "hosting.json"), optional: false, reloadOnChange: true)
                            .AddJsonFile(Path.Combine("Config", $"hosting.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json"), optional: true, reloadOnChange: true)
                            .AddEnvironmentVariables()
                            .AddCommandLine(args)
                            .Build();

            var host = new WebHostBuilder()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseKestrel()
                .UseIISIntegration()
                .UseConfiguration(hostConfig)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    var env = hostingContext.HostingEnvironment;
                    config
                        .AddJsonFile(Path.Combine("Config", "appsettings.json"), optional: false, reloadOnChange: true)
                        .AddJsonFile(Path.Combine("Config", $"appsettings.{env.EnvironmentName}.json"), optional: true, reloadOnChange: true)
                        .AddJsonFile(Path.Combine("Config", "server.json"), optional: false, reloadOnChange: true)
                        .AddJsonFile(Path.Combine("Config", $"server.{env.EnvironmentName}.json"), optional: true, reloadOnChange: true);

                    // if (env.IsDevelopment())
                    // {
                    //     var appAssembly = Assembly.Load(new AssemblyName(env.ApplicationName));
                    //     if (appAssembly != null)
                    //     {
                    //         config.AddUserSecrets(appAssembly, optional: true);
                    //     }
                    // }

                    // config.AddEnvironmentVariables();

                    // if (args != null)
                    // {
                    //     config.AddCommandLine(args);
                    // }
                })
                .UseStartup<Startup>()
                .ConfigureLogging(logging => logging.SetMinimumLevel(LogLevel.Warning))
                .UseApplicationInsights()
                .Build();

            var e = host.Services.GetService(typeof(IHostingEnvironment));
            return host.RunAsync();
        }
    }
}