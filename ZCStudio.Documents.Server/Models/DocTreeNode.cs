using System.Collections.Generic;
using System.IO;

namespace ZCStudio.Documents.Server.Models
{
    public class DocTreeNode
    {
        public DocTreeNode(string rootPath, FileSystemInfo sysinfo)
        {
            Name = sysinfo.Name;
            Children = new List<DocTreeNode>();
            if (sysinfo.FullName.IndexOf(rootPath) == 0)
            {
                FilePath = sysinfo.FullName.Substring(rootPath.Length).Trim(Path.DirectorySeparatorChar);
            }
            if (sysinfo is FileInfo)
            {
                var docname = Path.GetFileNameWithoutExtension(sysinfo.Name);
                DocName = docname.Substring(docname.IndexOf('.') + 1);
            }
        }

        public DocTreeNode(string rootPath, DirectoryInfo directory) : this(rootPath, directory as FileSystemInfo)
        {
        }

        public DocTreeNode(string rootPath, FileInfo file) : this(rootPath, file as FileSystemInfo)
        {
        }

        public string Id => FilePath;

        public string Name { get; set; }

        public string FilePath { get; set; }

        public string DocName { get; } = string.Empty;

        public string ParentId
        {
            get
            {
                return Path.GetDirectoryName(FilePath);
            }
        }

        //public bool IsLeaf => Children == null;

        public List<DocTreeNode> Children { get; private set; }

        internal void AppendNode(DocTreeNode newnode)
        {
            if (null == Children)
            {
                Children = new List<DocTreeNode>();
            }
            Children.Add(newnode);
        }
    }
}