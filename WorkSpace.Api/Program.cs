using Microsoft.EntityFrameworkCore;
using WorkSpace.Api.Data;
using WorkSpace.Api.Services;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

// Register AppDbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers and OpenAPI support
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddScoped<IResourceService, ResourceService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

var app = builder.Build();

// Enable OpenAPI endpoint in development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();