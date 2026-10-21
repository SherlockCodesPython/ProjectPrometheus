using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace PrometheusBackend.Models.Pages
{
    [ContentType(DisplayName = "Home Page", GUID = "d3b07384-d9a0-4f3b-8f3b-8f3b8f3b8f3b", Description = "The home page of the website")]
    public class HomePage : PageData
    {
        [Display(Name = "Topic Heading", Description = "The heading for the topic section")]
        public virtual string? TopicHeading { get; set; }

        [Display(Name = "Description", Description = "The description for the topic section")]
        public virtual string? Description { get; set; }
        
        [Display(Name = "Main Body", Description = "The main body content for the home page")]
        public virtual XhtmlString? MainBody { get; set; }
    }
}
