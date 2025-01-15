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
    public class EmployesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Employes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employes>>> GetEmployes()
        {
            return await _context.Employes.ToListAsync();
        }

        // GET: api/Employes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employes>> GetEmploye(int id)
        {
            var employe = await _context.Employes.FindAsync(id);

            if (employe == null)
            {
                return NotFound();
            }

            return employe;
        }

        // POST: api/Employes
        [HttpPost]
        public async Task<ActionResult<Employes>> PostEmploye(Employes employe)
        {
            _context.Employes.Add(employe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmploye", new { id = employe.Id }, employe);
        }

        // PUT: api/Employes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmploye(int id, Employes employe)
        {
            if (id != employe.Id)
            {
                return BadRequest();
            }

            _context.Entry(employe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeExists(id))
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

        // DELETE: api/Employes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmploye(int id)
        {
            var employe = await _context.Employes.FindAsync(id);
            if (employe == null)
            {
                return NotFound();
            }

            _context.Employes.Remove(employe);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeExists(int id)
        {
            return _context.Employes.Any(e => e.Id == id);
        }
    }
}