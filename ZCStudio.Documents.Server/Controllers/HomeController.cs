using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using ZCStudio.Documents.Server.Configuration;
using ZCStudio.Documents.Server.Models;

namespace ZCStudio.Documents.Server.Controllers
{
    public class HomeController : Controller
    {
        public List<DocCard> docCards;
        public Config config;

        public HomeController(IOptionsSnapshot<List<DocCard>> docCardsOptionsAccessor, IOptionsSnapshot<Config> configOptionsAccessor)
        {
            docCards = docCardsOptionsAccessor.Value;
            config = configOptionsAccessor.Value;
        }

        public IActionResult Index()
        {
            var home = new Home()
            {
                DocCards = docCards
            };

            return View(home);
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Feedback()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}