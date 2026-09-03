using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using WorkSpace.Api.Data;
using WorkSpace.Api.Services;
using WorkSpace.Api.Exceptions;

var builder = WebApplication.CreateBuilder(args);

// Register AppDbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register controllers and OpenAPI support
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Register Resource & Reservation services
builder.Services.AddScoped<IResourceService, ResourceService>();
builder.Services.AddScoped<IReservationService, ReservationService>();

// Register validators
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

// Register global exception handler and problem details
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();

app.MapOpenApi();
app.MapScalarApiReference();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// Apply EF Core migrations automatically on startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

app.Run();