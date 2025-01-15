using Microsoft.EntityFrameworkCore;
using GestionConges.Models;

namespace GestionConges.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employes> Employes { get; set; }
        public DbSet<Conges> Conges { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Relation Conge - Employe (N-1)
            modelBuilder.Entity<Conges>()
                .HasOne(c => c.Employe)
                .WithMany() // Si vous n'avez pas de collection dans Employes, laissez vide
                .HasForeignKey(c => c.EmployeId)
                .OnDelete(DeleteBehavior.Cascade); // Suppression en cascade

            base.OnModelCreating(modelBuilder);
        }
    }
}