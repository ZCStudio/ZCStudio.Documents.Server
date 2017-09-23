using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.IO;
using ZCStudio.Documents.Server.Models;

namespace ZCStudio.Documents.Server.Controllers
{
    public class DocumentController : Controller
    {
        private DocsConfig docsConfig;

        public DocumentController(IOptionsSnapshot<DocsConfig> docsConfigOptionsAccessor)
        {
            docsConfig = docsConfigOptionsAccessor.Value;
        }

        public IActionResult Index(string docName)
        {
            //if (string.IsNullOrEmpty(docName))
            //{
            //    return View("/Home/Error");
            //}
            ViewData["Title"] = docName;
            return View();
        }

        public IActionResult DocPage(string docName, string filepath)
        {
            string docDirPath = docsConfig.GetDocPath(docName);

            if (!Directory.Exists(docDirPath))
            {
                throw new FileNotFoundException(docDirPath);
            }
            if (string.IsNullOrEmpty(filepath) || filepath == docsConfig.DefaultMDName)
            {
                filepath = Path.Combine(docName, docsConfig.DefaultMDName);
            }
            ViewData["Title"] = docName;
            return View(new DocumentContent { Name = docName, FilePath = filepath });
        }
    }
}