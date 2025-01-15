using GestionConges.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace GestionConges.Models
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configuration CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy.WithOrigins("http://localhost:3000") // URL de votre frontend React
                                    .AllowAnyMethod() // Autoriser toutes les m�thodes HTTP (GET, POST, etc.)
                                    .AllowAnyHeader() // Autoriser tous les en-t�tes HTTP
                                    .AllowCredentials()); // Autoriser les credentials (cookies, en-t�tes d'authentification)
            });

            // Ajouter les contr�leurs avec options JSON
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                });

            // Configuration du DbContext avec SQL Server
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            var app = builder.Build();

            // Activer CORS avec la politique "AllowAll"
            app.UseCors("AllowAll");

            // Activer le routage
            app.UseRouting();

            // Activer l'autorisation (si n�cessaire)
            app.UseAuthorization();

            // Mapper les contr�leurs
            app.MapControllers();

            // D�marrer l'application
            app.Run();
        }
    }
}