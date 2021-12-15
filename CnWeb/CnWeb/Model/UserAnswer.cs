using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Model
{
    public class UserAnswer
    {
        public Guid UserId { get; set; }
        public Guid AnswerId { get; set; }
        public int Status { get; set; }
    }
}
