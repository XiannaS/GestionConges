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
            return await _context.Conges.Include(c => c.Employe).ToListAsync();
        }

        // GET: api/Conges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Conges>> GetConge(int id)
        {
            var conge = await _context.Conges.Include(c => c.Employe).FirstOrDefaultAsync(c => c.Id == id);
            return conge == null ? NotFound() : conge;
        }

        // POST: api/Conges
        [HttpPost]
        public async Task<ActionResult<Conges>> PostConge([FromBody] Conges conge)
        {
            var employe = await _context.Employes.FindAsync(conge.EmployeId);
            if (employe == null) return NotFound("Employé non trouvé.");

            var dureeConge = (conge.DateFin - conge.DateDebut).Days;
            if (employe.SoldeConge < dureeConge) return BadRequest("Solde de congés insuffisant.");

            _context.Conges.Add(conge);
            employe.SoldeConge -= dureeConge;
            _context.Entry(employe).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetConge", new { id = conge.Id }, conge);
        }

        // PUT: api/Conges/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConge(int id, Conges conge)
        {
            if (id != conge.Id) return BadRequest();

            _context.Entry(conge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Conges.Any(e => e.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Conges/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConge(int id)
        {
            var conge = await _context.Conges.FindAsync(id);
            if (conge == null) return NotFound();

            var employe = await _context.Employes.FindAsync(conge.EmployeId);
            if (employe == null) return NotFound("Employé non trouvé.");

            var dureeConge = (conge.DateFin - conge.DateDebut).Days;
            employe.SoldeConge += dureeConge;
            _context.Entry(employe).State = EntityState.Modified;

            _context.Conges.Remove(conge);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}