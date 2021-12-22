using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{   
    // this table attribute is added because we want that when entity framework creates this table of photo entity it should call it 
    // photos
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        // the below two attributes have been added for fully defining the relationship between the photos and app user
        public AppUser AppUser { get; set; }    
        public int AppUserId { get; set; }
    }
}