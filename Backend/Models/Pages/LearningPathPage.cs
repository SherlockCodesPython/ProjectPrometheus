using System.ComponentModel.DataAnnotations;

namespace PrometheusBackend.Models.Pages
{
    [ContentType(DisplayName = "Learning Path Page", GUID = "00E6D487-E7EC-43A5-B470-93D27F3B02C2", Description = "A page representing a learning path")]
    public class LearningPathPage : PageData
    {
        [Required]
        [Display(Name = "Heading", Description = "The heading for the learning path page")]
        public virtual string Heading { get; set; }

        [Required]
        [Display(Name = "Introduction", Description = "The introduction for the learning path page")]
        public virtual XhtmlString? Introduction { get; set; }
        
        [Required]
        [Display(Name = "Learning Objectives", Description = "The learning objectives for the learning path page")] 
        public virtual XhtmlString? LearningObjectives { get; set; }

        [Display(Name = "Prerequisites", Description = "The prerequisites for the learning path page")]
        public virtual XhtmlString Prerequisites { get; set; }
    }
}
