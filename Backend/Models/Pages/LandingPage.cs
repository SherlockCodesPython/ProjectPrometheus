using System.ComponentModel.DataAnnotations;

namespace PrometheusBackend.Models.Pages
{
    [ContentType(
        GUID = "e1f3c5d4-8b6a-4f2e-9c3b-1a2b3c4d5e6f",
        DisplayName = "Lesson Page")]
    public class LandingPage : PageData
    {
        [Display(Name = "Lesson Number", Description = "Enter the number of the lesson", Order = 10)]
        [Required]
        [Range(1, 100)]
        public virtual int LessonNumber { get; set; }
        [Display(Name = "Learning Objectives", Description = "Enter the learning objectives of the lesson", Order = 20)]
        [Required]
        public virtual XhtmlString? LearningObjectives { get; set; }

        [Display(Name = "Estimated Minutes", Description = "Enter the estimated time for the lesson", Order = 30)]
        [Range(1, 300)]
        public virtual int? EstimatedMinutes { get; set; }

        [Display(Name = "Lesson Content", Description = "Enter the content of the lesson", Order = 40)]
        public virtual XhtmlString? LessonContent { get; set; }

    }
}
