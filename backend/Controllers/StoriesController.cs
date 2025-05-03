using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using backend;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class StoriesController : ControllerBase
{
    private readonly TabloidDbContext _context;
    public StoriesController(TabloidDbContext context) => _context = context;

    [HttpGet]
    public async Task<IEnumerable<Story>> GetAll() => await _context.Stories.ToListAsync();

    [HttpPost]
    public async Task<ActionResult<Story>> Create(Story story)
    {
        _context.Stories.Add(story);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = story.Id }, story);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var story = await _context.Stories.FindAsync(id);
        if (story == null) return NotFound();

        _context.Stories.Remove(story);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
