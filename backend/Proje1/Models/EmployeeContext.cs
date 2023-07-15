using Microsoft.EntityFrameworkCore;

namespace Proje1.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options) 
        {
            
        }
        public DbSet<Employee> Employees { get; set; } 
    }
}
