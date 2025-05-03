using Microsoft.EntityFrameworkCore;
using Models;

namespace backend;

public class TabloidDbContext : DbContext
{
    public TabloidDbContext(DbContextOptions<TabloidDbContext> options) : base(options) { }
    public DbSet<Story> Stories { get; set; }
}
