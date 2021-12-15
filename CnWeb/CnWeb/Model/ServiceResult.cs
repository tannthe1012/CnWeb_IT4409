using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Model
{
    public class ServiceResult
    {
        public Boolean IsValid { get; set; } = true;

        public string Message { get; set; } = string.Empty;

        public List<Tag> Tags { get; set; }
    }
}
