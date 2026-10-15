using Microsoft.AspNetCore.Mvc;
using WorkSpace.Api.Services;

namespace WorkSpace.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IJwtService _jwtService;

    public AuthController(IJwtService jwtService)
    {
        _jwtService = jwtService;
    }

    /// <summary>
    /// Endpoint Demo : generates a valid JWT token based on the selected role
    /// </summary>
    [HttpPost("demo-token")]
    public IActionResult GetDemoToken([FromQuery] string role = "Admin")
    {
        var isAdmin = role.Equals("Admin", StringComparison.OrdinalIgnoreCase);
        var selectedRole = isAdmin ? "Admin" : "User";
        var email = isAdmin ? "admin@demo.com" : "user@demo.com";
        var userId = isAdmin ? "demo-admin-id" : "demo-user-id";

        var token = _jwtService.GenerateToken(userId, email, selectedRole);

        return Ok(new
        {
            token,
            email,
            role = selectedRole
        });
    }
}