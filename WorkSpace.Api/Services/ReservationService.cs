using Microsoft.EntityFrameworkCore;
using WorkSpace.Api.Data;
using WorkSpace.Api.DTOs;
using WorkSpace.Api.Models;

namespace WorkSpace.Api.Services;

public class ReservationService : IReservationService
{
    private readonly AppDbContext _context;

    public ReservationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ReservationDto>> GetAllAsync()
    {
        return await _context.Reservations
            .Include(r => r.Resource)
            .Select(r => new ReservationDto
            {
                Id = r.Id,
                ResourceId = r.ResourceId,
                ResourceName = r.Resource != null ? r.Resource.Name : string.Empty,
                UserEmail = r.UserEmail,
                StartTime = r.StartTime,
                EndTime = r.EndTime
            })
            .ToListAsync();
    }

    public async Task<ReservationDto?> GetByIdAsync(int id)
    {
        var reservation = await _context.Reservations
            .Include(r => r.Resource)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (reservation == null) return null;

        return new ReservationDto
        {
            Id = reservation.Id,
            ResourceId = reservation.ResourceId,
            ResourceName = reservation.Resource?.Name ?? string.Empty,
            UserEmail = reservation.UserEmail,
            StartTime = reservation.StartTime,
            EndTime = reservation.EndTime
        };
    }

    public async Task<IEnumerable<ReservationDto>> GetByResourceIdAsync(int resourceId)
    {
        return await _context.Reservations
            .Include(r => r.Resource)
            .Where(r => r.ResourceId == resourceId)
            .Select(r => new ReservationDto
            {
                Id = r.Id,
                ResourceId = r.ResourceId,
                ResourceName = r.Resource != null ? r.Resource.Name : string.Empty,
                UserEmail = r.UserEmail,
                StartTime = r.StartTime,
                EndTime = r.EndTime
            })
            .ToListAsync();
    }

    public async Task<ReservationDto> CreateAsync(CreateReservationDto createDto)
    {
        // Check if the resource exist and is available
        var resource = await _context.Resources.FindAsync(createDto.ResourceId);
        
        if (resource == null || !resource.IsAvailable)
        {
            throw new InvalidOperationException("The requested resource does not exist or is not available.");
        }

        // Check for overlapping reservations in Database
        bool hasOverlap = await _context.Reservations.AnyAsync(r =>
            r.ResourceId == createDto.ResourceId &&
            createDto.StartTime < r.EndTime &&
            createDto.EndTime > r.StartTime);

        if (hasOverlap)
        {
            throw new InvalidOperationException("The resource is already reserved for this time slot.");
        }

        var reservation = new Reservation
        {
            ResourceId = createDto.ResourceId,
            UserEmail = createDto.UserEmail,
            StartTime = createDto.StartTime.ToUniversalTime(),
            EndTime = createDto.EndTime.ToUniversalTime()
        };

        _context.Reservations.Add(reservation);
        await _context.SaveChangesAsync();

        return new ReservationDto
        {
            Id = reservation.Id,
            ResourceId = reservation.ResourceId,
            ResourceName = resource.Name,
            UserEmail = reservation.UserEmail,
            StartTime = reservation.StartTime,
            EndTime = reservation.EndTime
        };
    }

    public async Task<bool> CancelAsync(int id)
    {
        var reservation = await _context.Reservations.FindAsync(id);
        
        if (reservation == null) return false;

        _context.Reservations.Remove(reservation);
        await _context.SaveChangesAsync();
        return true;
    }
}