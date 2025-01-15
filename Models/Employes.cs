using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GestionConges.Models
{
    public class Employes
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string Nom { get; set; } = string.Empty;

        [Required, StringLength(50)]
        public string Prenom { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public int SoldeConge { get; set; } = 30; // Solde de congés par défaut

        // Propriété de navigation pour les congés
        public ICollection<Conges> Conges { get; set; } = new List<Conges>();
    }
}