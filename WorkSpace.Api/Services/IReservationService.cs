using WorkSpace.Api.DTOs;

namespace WorkSpace.Api.Services;

public interface IReservationService
{
    Task<IEnumerable<ReservationDto>> GetAllAsync();
    Task<ReservationDto?> GetByIdAsync(int id);
    Task<IEnumerable<ReservationDto>> GetByResourceIdAsync(int resourceId);
    Task<ReservationDto> CreateAsync(CreateReservationDto createDto);
    Task<bool> CancelAsync(int id);
}