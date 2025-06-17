using Xunit;
using Microsoft.EntityFrameworkCore;
using backend;
using Controllers;
using Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

public class StoriesControllerTests
{
    private TabloidDbContext GetInMemoryDb()
    {
        var options = new DbContextOptionsBuilder<TabloidDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) 
            .Options;
        return new TabloidDbContext(options);
    }

    [Fact]
    public async Task GetAll_ReturnsAllStories()
    {
        // Arrange
        var db = GetInMemoryDb();
        db.Stories.Add(new Story { Id = 1, Title = "Test A", Content = "X", Department = "News" });
        db.Stories.Add(new Story { Id = 2, Title = "Test B", Content = "Y", Department = "Sport" });
        db.SaveChanges();

        var controller = new StoriesController(db);

        // Act
        var result = await controller.GetAll();

        // Assert
        Assert.Collection(result,
            story => Assert.Equal("Test A", story.Title),
            story => Assert.Equal("Test B", story.Title));
    }

    [Fact]
    public async Task Create_AddsStoryToDatabase()
    {
        // Arrange
        var db = GetInMemoryDb();
        var controller = new StoriesController(db);
        var newStory = new Story
        {
            Title = "New Story",
            Content = "Test content",
            Department = "Tech"
        };

        // Act
        var result = await controller.Create(newStory);

        // Assert
        var createdAt = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnedStory = Assert.IsType<Story>(createdAt.Value);
        Assert.Equal("New Story", returnedStory.Title);
        Assert.Single(db.Stories);
    }

    [Fact]
    public async Task Delete_RemovesExistingStory()
    {
        // Arrange
        var db = GetInMemoryDb();
        db.Stories.Add(new Story
        {
            Id = 1,
            Title = "Delete Me",
            Content = "To be deleted",
            Department = "Crime"
        });
        db.SaveChanges();
        var controller = new StoriesController(db);

        // Act
        var result = await controller.Delete(1);

        // Assert
        Assert.IsType<NoContentResult>(result);
        Assert.Empty(db.Stories);
    }

    [Fact]
    public async Task Delete_ReturnsNotFound_IfStoryDoesNotExist()
    {
        // Arrange
        var db = GetInMemoryDb();
        var controller = new StoriesController(db);

        // Act
        var result = await controller.Delete(999);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }
}
