using System.ComponentModel.DataAnnotations;

namespace PrometheusBackend.Models.Pages
{
    [ContentType(DisplayName = "Lesson Page", GUID = "4EF24253-A5F3-491A-8719-E3A58DBCCD6B", Description = "A page representing a lesson")]
    public class LessonPage : PageData
    {
        [Required]
        [Display(Name = "Heading", Description = "The heading for the lesson page")]        
        public virtual string Heading { get; set; }

        [Display(Name = "Introduction", Description = "The introduction for the lesson page")]
        public virtual string Introduction { get; set; }

        [Required]
        [Display(Name = "Main Body", Description = "The main body content for the lesson page")]
        public virtual XhtmlString Mainbody { get; set; }
    }
}
