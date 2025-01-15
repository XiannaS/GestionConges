using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GestionConges.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Threading.Tasks;
using GestionConges.Data;

namespace GestionConges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificatMedicalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CertificatMedicalController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CertificatMedical>>> GetCertificatsMedicaux()
        {
            return await _context.CertificatsMedicaux
                .Include(c => c.Employe) // Inclure les données liées (Employe)
                .ToListAsync();
        }
        // POST: api/CertificatMedical
        [HttpPost]
        public async Task<IActionResult> CreateCertificatMedical([FromForm] CertificatMedical certificat, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Aucun fichier n'a été uploadé.");
            }

            // Générer un nom de fichier unique
            var fileName = Path.GetFileNameWithoutExtension(file.FileName);
            var extension = Path.GetExtension(file.FileName);
            var newFileName = $"{fileName}_{DateTime.Now:yyyyMMddHHmmss}{extension}";
            var filePath = Path.Combine(_env.WebRootPath, "uploads", newFileName);

            // Créer le dossier s'il n'existe pas
            Directory.CreateDirectory(Path.Combine(_env.WebRootPath, "uploads"));

            // Enregistrer le fichier sur le serveur
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Enregistrer le chemin du fichier dans la base de données
            certificat.FilePath = $"/uploads/{newFileName}";

            _context.CertificatsMedicaux.Add(certificat);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Certificat médical ajouté avec succès.", id = certificat.Id });
        }
    }
}