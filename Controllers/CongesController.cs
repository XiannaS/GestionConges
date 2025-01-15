using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionConges.Data;
using GestionConges.Models;
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
            // Inclure les données liées (Employe)
            return await _context.Conges
                .Include(c => c.Employe)
                .ToListAsync();
        }

        // GET: api/Conges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Conges>> GetConge(int id)
        {
            // Inclure les données liées (Employe)
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
            // Log des données reçues
            Console.WriteLine("Données reçues pour l'ajout d'un congé :");
            Console.WriteLine($"ID Employé : {conge.EmployeId}");
            Console.WriteLine($"Date de début : {conge.DateDebut}");
            Console.WriteLine($"Date de fin : {conge.DateFin}");
            Console.WriteLine($"Motif : {conge.Motif}");
            Console.WriteLine($"Statut : {conge.Statut}");

            try
            {
                _context.Conges.Add(conge);
                await _context.SaveChangesAsync();

                // Log de succès
                Console.WriteLine("Congé ajouté avec succès !");
                Console.WriteLine($"ID du congé ajouté : {conge.Id}");

                return CreatedAtAction("GetConge", new { id = conge.Id }, conge);
            }
            catch (Exception ex)
            {
                // Log de l'erreur
                Console.Error.WriteLine("Erreur lors de l'ajout du congé :");
                Console.Error.WriteLine(ex.Message);
                Console.Error.WriteLine(ex.StackTrace);

                return StatusCode(500, "Une erreur interne est survenue lors de l'ajout du congé.");
            }
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

            _context.Conges.Remove(conge);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CongeExists(int id)
        {
            return _context.Conges.Any(e => e.Id == id);
        }
    }
}