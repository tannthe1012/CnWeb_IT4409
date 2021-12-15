using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Model
{
    public class Question
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime ModifyTime { get; set; }
        public int View { get; set; }
        public List<Tag> Tags { get; set; }
        //public string Tags { get; set; }
        public int CountAnswer { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public int CountVote { get; set; }
        public int CountLike { get; set; }
        public int CountDislike { get; set; }
        public List<Answer> Answers { get; set; }
        public int StatusLike { get; set; } = 0;
    }
}
