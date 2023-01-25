using Stoelendans.Data;

namespace PutridGroveAPI.Helpers;

using Microsoft.EntityFrameworkCore;
using PutridGroveAPI.Entities;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;
    public DbSet<User> Users { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<ItemPayoff> ItemPayoffs { get; set; }


    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserEntityConfiguration());
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // in memory database used for simplicity, change to a real db for production applications
        options.UseNpgsql(Configuration.GetConnectionString("PutridGroveAPIDatabase"));
    }
}