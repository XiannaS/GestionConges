using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GestionConges.Models
{
    public class Employes
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Le nom est obligatoire.")]
        [StringLength(50, ErrorMessage = "Le nom ne peut pas dépasser 50 caractères.")]
        public string Nom { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le prénom est obligatoire.")]
        [StringLength(50, ErrorMessage = "Le prénom ne peut pas dépasser 50 caractères.")]
        public string Prenom { get; set; } = string.Empty;

        [Required(ErrorMessage = "L'email est obligatoire.")]
        [EmailAddress(ErrorMessage = "L'email n'est pas valide.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Le solde de congés est obligatoire.")]
        public int SoldeConge { get; set; } = 30; // Solde de congés par défaut

        // Propriété de navigation pour les congés
        public ICollection<Conges> Conges { get; set; } = new List<Conges>();
    }
}