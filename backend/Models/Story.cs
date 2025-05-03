namespace Models;

public class Story
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string Department { get; set; } = null!;
}
