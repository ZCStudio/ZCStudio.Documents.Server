using System.Collections.Generic;

namespace ZCStudio.Documents.Server.Models
{
    public class Home
    {
        public IEnumerable<DocCard> DocCards { get; set; }
    }
}