using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Model
{
    public class UserTag
    {
        public Guid UserId { get; set; }
        public List<Tag> Tags { get; set; }
    }
}
