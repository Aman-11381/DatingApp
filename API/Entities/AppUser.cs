using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; } 
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; } 
        public byte[] PasswordSalt { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }

        // this is a one to many relationship meaning one user can have many photos
        public ICollection<Photo> Photos { get; set; }

        // there are plenty of methods inside the DateTime class but it doesn't give us an option to calculate age
        // So what we're going to do is extend the functionality of the daytime class so that we can calculate the age based on DOB

        // public int GetAge()
        // {
        //     return DateOfBirth.CalculateAge();
        // }     
    }
}