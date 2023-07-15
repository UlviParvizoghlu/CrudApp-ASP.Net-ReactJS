using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Proje1.Models;

namespace Proje1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _employeeContext;

        public EmployeeController(EmployeeContext employeeContext)
        {
            _employeeContext = employeeContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if(_employeeContext.Employees == null)
            {
                return NotFound();
            }
            return await _employeeContext.Employees.ToListAsync();
        }  
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            if(_employeeContext.Employees == null)
            {
                return NotFound();
            }
            var employee = await _employeeContext.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }
            return employee;
        }
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            await _employeeContext.Employees.AddAsync(employee);
            await _employeeContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id },employee);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> PutEmployee(int id, Employee employee)
        {
            if(id != employee.Id)
            {
                return BadRequest();    
            }
            _employeeContext.Entry(employee).State = EntityState.Modified;
            try
            {
                await _employeeContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
            return Ok();
        }
        [HttpDelete]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            if(_employeeContext.Employees == null)
            {
                return NotFound(); 
            }
            var employee = await _employeeContext.Employees.FindAsync(id);
            if(employee == null)
            {
                return BadRequest();
            }
            _employeeContext.Employees.Remove(employee);
            await _employeeContext.SaveChangesAsync();
            return Ok();
        }
    }
}
