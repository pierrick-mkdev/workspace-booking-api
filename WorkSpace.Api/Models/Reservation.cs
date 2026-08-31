namespace WorkSpace.Api.Models;

public class Reservation
{
    public int Id { get; set; }
    public int ResourceId { get; set; }
    public string ReservedBy { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string? Note { get; set; }
}