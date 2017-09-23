using System;
using System.IO;

namespace ZCStudio.Documents.Server.Models
{
    public class DocsConfig
    {
        public string RootPath { get; set; } = "Docs";

        public string DefaultMDName { get; set; } = "介绍.md";

        internal string GetDocPath()
        {
            return Path.Combine(AppContext.BaseDirectory, RootPath);
        }

        internal string GetDocPath(string filepath)
        {
            return Path.Combine(GetDocPath(), filepath);
        }
    }
}