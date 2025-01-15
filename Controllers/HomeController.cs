using Microsoft.AspNetCore.Mvc;

namespace GestionConges.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}