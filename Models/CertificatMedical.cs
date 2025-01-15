using System;
using System.ComponentModel.DataAnnotations;

namespace GestionConges.Models
{
    public class CertificatMedical
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime DateDebut { get; set; }

        [Required]
        public DateTime DateFin { get; set; }

        [Required]
        public string Commentaire { get; set; } = string.Empty;

        // Clé étrangère pour Employes
        public int EmployeId { get; set; }

        // Propriété de navigation pour Employes (nullable)
        public Employes? Employe { get; set; }

        // Chemin du fichier PDF
        public string? FilePath { get; set; }

        public CertificatMedical()
        {
            Commentaire = string.Empty;
        }
    }
}