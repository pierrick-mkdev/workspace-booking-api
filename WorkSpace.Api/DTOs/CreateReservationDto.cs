namespace WorkSpace.Api.DTOs;

public class CreateReservationDto
{
    public int ResourceId { get; set; }
    public string UserEmail { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}