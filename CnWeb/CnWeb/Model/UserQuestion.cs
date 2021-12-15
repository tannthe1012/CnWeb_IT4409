using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Model
{
    public class UserQuestion
    {
        public Guid UserId { get; set; }
        public Guid QuestionId { get; set; }
        public int Status { get; set; }
    }
}
