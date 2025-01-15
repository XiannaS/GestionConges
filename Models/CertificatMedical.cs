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
        public string Commentaire { get; set; } = string.Empty; // Initialisation par défaut

        // Clé étrangère pour Employes
        public int EmployeId { get; set; }

        // Propriété de navigation pour Employes (nullable)
        public Employes? Employe { get; set; } // Rendre nullable

        public CertificatMedical()
        {
            Commentaire = string.Empty; // Initialisation dans le constructeur
        }
    }
}