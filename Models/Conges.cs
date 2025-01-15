using System;
using System.ComponentModel.DataAnnotations;

namespace GestionConges.Models
{
    public class Conges
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime DateDebut { get; set; }

        [Required]
        public DateTime DateFin { get; set; }

        [Required, StringLength(100)]
        public string Motif { get; set; } = null!;

        [Required, StringLength(20)]
        public string Statut { get; set; } = "En attente"; // Valeur par défaut

        [Required]
        public int EmployeId { get; set; }

        // Propriété de navigation pour Employes
        public Employes Employe { get; set; } = null!;
    }
}