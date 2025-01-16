using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionConges.Data;
using GestionConges.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestionConges.Controllers
{
    // Définit le chemin de base pour les routes de ce contrôleur (ex: /api/Employes)
    [Route("api/[controller]")]
    // Indique que ce contrôleur est un contrôleur API (active des fonctionnalités comme la validation automatique)
    [ApiController]
    public class EmployesController : ControllerBase
    {
        // Contexte de base de données pour interagir avec Entity Framework Core
        private readonly ApplicationDbContext _context;

        // Constructeur pour injecter le contexte de base de données via l'injection de dépendances
        public EmployesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employes
        // Récupère tous les employés
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employes>>> GetEmployes()
        {
            // Retourne la liste de tous les employés de manière asynchrone
            return await _context.Employes.ToListAsync();
        }

        // GET: api/Employes/5
        // Récupère un employé spécifique par son ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Employes>> GetEmploye(int id)
        {
            // Recherche l'employé dans la base de données par son ID de manière asynchrone
            var employe = await _context.Employes.FindAsync(id);

            // Si l'employé n'est pas trouvé, retourne une réponse HTTP 404 (Not Found)
            if (employe == null)
            {
                return NotFound();
            }

            // Retourne l'employé trouvé
            return employe;
        }

        // POST: api/Employes
        // Ajoute un nouvel employé
        [HttpPost]
        public async Task<ActionResult<Employes>> PostEmploye(Employes employe)
        {
            // Ajoute l'employé à la base de données
            _context.Employes.Add(employe);
            // Sauvegarde les modifications dans la base de données de manière asynchrone
            await _context.SaveChangesAsync();

            // Retourne une réponse HTTP 201 (Created) avec l'URL de l'employé créé et l'objet employé
            return CreatedAtAction(nameof(GetEmploye), new { id = employe.Id }, employe);
        }

        // PUT: api/Employes/5
        // Met à jour un employé existant par son ID
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmploye(int id, Employes employe)
        {
            // Vérifie si l'ID dans l'URL correspond à l'ID de l'employé
            if (id != employe.Id)
            {
                // Si ce n'est pas le cas, retourne une réponse HTTP 400 (Bad Request)
                return BadRequest();
            }

            // Marque l'entité comme modifiée pour qu'Entity Framework Core la mette à jour
            _context.Entry(employe).State = EntityState.Modified;

            try
            {
                // Sauvegarde les modifications dans la base de données de manière asynchrone
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Gère les conflits de concurrence (si un autre utilisateur a modifié l'employé en même temps)
                if (!_context.Employes.Any(e => e.Id == id))
                {
                    // Si l'employé n'existe plus, retourne une réponse HTTP 404 (Not Found)
                    return NotFound();
                }
                else
                {
                    // Sinon, relance l'exception pour la gérer ailleurs
                    throw;
                }
            }

            // Retourne une réponse HTTP 204 (No Content) pour indiquer que la mise à jour a réussi
            return NoContent();
        }

        // DELETE: api/Employes/5
        // Supprime un employé par son ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmploye(int id)
        {
            // Recherche l'employé dans la base de données par son ID de manière asynchrone
            var employe = await _context.Employes.FindAsync(id);

            // Si l'employé n'est pas trouvé, retourne une réponse HTTP 404 (Not Found)
            if (employe == null)
            {
                return NotFound();
            }

            // Supprime l'employé de la base de données
            _context.Employes.Remove(employe);
            // Sauvegarde les modifications dans la base de données de manière asynchrone
            await _context.SaveChangesAsync();

            // Retourne une réponse HTTP 204 (No Content) pour indiquer que la suppression a réussi
            return NoContent();
        }
    }
}