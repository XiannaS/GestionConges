using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionConges.Data;
using GestionConges.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GestionConges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CongesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Conges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Conges>>> GetConges()
        {
            return await _context.Conges
                .Include(c => c.Employe)
                .ToListAsync();
        }

        // GET: api/Conges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Conges>> GetConge(int id)
        {
            var conge = await _context.Conges
                .Include(c => c.Employe)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (conge == null)
            {
                return NotFound();
            }

            return conge;
        }

        // POST: api/Conges
        [HttpPost]
        public async Task<ActionResult<Conges>> PostConge([FromBody] Conges conge)
        {
            // Vérifier si l'employé existe
            var employe = await _context.Employes.FindAsync(conge.EmployeId);
            if (employe == null)
            {
                return NotFound("Employé non trouvé.");
            }

            // Calculer la durée du congé
            var dureeConge = (conge.DateFin - conge.DateDebut).Days;

            // Vérifier si le solde de congés est suffisant
            if (employe.SoldeConge < dureeConge)
            {
                return BadRequest("Solde de congés insuffisant.");
            }

            // Ajouter le congé
            _context.Conges.Add(conge);

            // Mettre à jour le solde de congés de l'employé
            employe.SoldeConge -= dureeConge;
            _context.Entry(employe).State = EntityState.Modified;

            // Sauvegarder les modifications
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConge", new { id = conge.Id }, conge);
        }

        // PUT: api/Conges/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConge(int id, Conges conge)
        {
            if (id != conge.Id)
            {
                return BadRequest();
            }

            _context.Entry(conge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CongeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Conges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConge(int id)
        {
            var conge = await _context.Conges.FindAsync(id);
            if (conge == null)
            {
                return NotFound();
            }

            // Récupérer l'employé associé
            var employe = await _context.Employes.FindAsync(conge.EmployeId);
            if (employe == null)
            {
                return NotFound("Employé non trouvé.");
            }

            // Calculer la durée du congé
            var dureeConge = (conge.DateFin - conge.DateDebut).Days;

            // Restaurer le solde de congés de l'employé
            employe.SoldeConge += dureeConge;
            _context.Entry(employe).State = EntityState.Modified;

            // Supprimer le congé
            _context.Conges.Remove(conge);

            // Sauvegarder les modifications
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CongeExists(int id)
        {
            return _context.Conges.Any(e => e.Id == id);
        }
    }
}