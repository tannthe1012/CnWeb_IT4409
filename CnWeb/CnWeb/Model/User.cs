using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CnWeb.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Description { get; set; }
        public string Favorite { get; set; }
        public int Star { get; set; }
        public string Name { get; set; }
        public int CountQuestion { get; set; }
        public int CountAnswer { get; set; }
        public List<Tag> Tags { get; set; }

    }
}
