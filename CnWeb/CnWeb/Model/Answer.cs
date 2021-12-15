using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Model
{
    public class Answer
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime ModifyTime { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public Guid QuestionId { get; set; }
        public int CountLike { get; set; }
        public int Like { get; set; }
        public int CountDislike { get; set; }
        public int StatusLike { get; set; } = 0;
    }
}
