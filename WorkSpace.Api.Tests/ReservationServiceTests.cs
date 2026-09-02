using Microsoft.EntityFrameworkCore;
using WorkSpace.Api.Data;
using WorkSpace.Api.DTOs;
using WorkSpace.Api.Models;
using WorkSpace.Api.Services;

namespace WorkSpace.Api.Tests;

public class ReservationServiceTests
{
    private AppDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Isolated base for each test
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task CreateAsync_ShouldCreateReservation_WhenSlotIsAvailable()
    {
        // Arrange
        using var context = GetInMemoryDbContext();
        
        var resource = new Resource { Id = 1, Name = "Meeting Room A", Capacity = 10, IsAvailable = true };
        context.Resources.Add(resource);
        await context.SaveChangesAsync();

        var service = new ReservationService(context);

        var dto = new CreateReservationDto
        {
            ResourceId = 1,
            UserEmail = "test@example.com",
            StartTime = DateTime.UtcNow.AddHours(1),
            EndTime = DateTime.UtcNow.AddHours(2)
        };

        // Act
        var result = await service.CreateAsync(dto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Meeting Room A", result.ResourceName);
        Assert.Equal(1, await context.Reservations.CountAsync());
    }

    [Fact]
    public async Task CreateAsync_ShouldThrowException_WhenOverlappingReservationExists()
    {
        // Arrange
        using var context = GetInMemoryDbContext();

        var resource = new Resource { Id = 1, Name = "Meeting Room A", Capacity = 10, IsAvailable = true };
        context.Resources.Add(resource);

        // Existing reservation : 10h00 -> 12h00
        var existingReservation = new Reservation
        {
            ResourceId = 1,
            UserEmail = "existing@example.com",
            StartTime = new DateTime(2026, 9, 2, 10, 0, 0, DateTimeKind.Utc),
            EndTime = new DateTime(2026, 9, 2, 12, 0, 0, DateTimeKind.Utc)
        };
        context.Reservations.Add(existingReservation);
        await context.SaveChangesAsync();

        var service = new ReservationService(context);

        // Overlapping reservation attempt : 11h00 -> 13h00
        var overlappingDto = new CreateReservationDto
        {
            ResourceId = 1,
            UserEmail = "new@example.com",
            StartTime = new DateTime(2026, 9, 2, 11, 0, 0, DateTimeKind.Utc),
            EndTime = new DateTime(2026, 9, 2, 13, 0, 0, DateTimeKind.Utc)
        };

        // Act & Assert
        var exception = await Assert.ThrowsAsync<InvalidOperationException>(() =>
            service.CreateAsync(overlappingDto));

        Assert.Equal("The resource is already reserved for this time slot.", exception.Message);
    }
}