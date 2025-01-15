using System;
using System.ComponentModel.DataAnnotations;

namespace GestionConges.Models
{
    public class Conges
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "La date de début est obligatoire.")]
        public DateTime DateDebut { get; set; }

        [Required(ErrorMessage = "La date de fin est obligatoire.")]
        public DateTime DateFin { get; set; }

        [Required(ErrorMessage = "Le motif est obligatoire.")]
        [StringLength(100, ErrorMessage = "Le motif ne peut pas dépasser 100 caractères.")]
        public string Motif { get; set; } = null!;

        [Required(ErrorMessage = "Le statut est obligatoire.")]
        [StringLength(20, ErrorMessage = "Le statut ne peut pas dépasser 20 caractères.")]
        public string Statut { get; set; } = "En attente";  // Valeur par défaut

        [Required(ErrorMessage = "L'ID de l'employé est obligatoire.")]
        public int EmployeId { get; set; }

        // Propriété de navigation pour Employes
        public Employes Employe { get; set; } = null!;
    }
}