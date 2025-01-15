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
        public DbSet<CertificatMedical> CertificatsMedicaux { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Relation Conge - Employe (N-1)
            modelBuilder.Entity<Conges>()
                .HasOne(c => c.Employe)
                .WithMany()  
                .HasForeignKey(c => c.EmployeId)
                .OnDelete(DeleteBehavior.Cascade); // Suppression en cascade

            // Relation CertificatMedical - Employe (N-1)
            modelBuilder.Entity<CertificatMedical>()
                .HasOne(c => c.Employe)
                .WithMany()  
                .HasForeignKey(c => c.EmployeId)
                .OnDelete(DeleteBehavior.Cascade); // Suppression en cascade

            base.OnModelCreating(modelBuilder);
        }
    }
}