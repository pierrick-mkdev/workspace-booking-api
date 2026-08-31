var builder = WebApplication.CreateBuilder(args);

// Add controllers and OpenAPI support
builder.Services.AddControllers();
builder.Services.AddOpenApi();

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