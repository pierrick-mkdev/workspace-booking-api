using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using WorkSpace.Api.DTOs;
using WorkSpace.Api.Services;

namespace WorkSpace.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController  : ControllerBase
{
    private readonly IReservationService _reservationService;
    private readonly IValidator<CreateReservationDto> _validator;

    public ReservationsController(
        IReservationService reservationService,
        IValidator<CreateReservationDto> validator)
    {
        _reservationService = reservationService;
        _validator = validator;
    }

    // GET: api/reservations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReservationDto>>> GetReservations()
    {
        var reservations = await _reservationService.GetAllAsync();
        return Ok(reservations);
    }

    // GET: api/reservations/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ReservationDto>> GetReservation(int id)
    {
        var reservation = await _reservationService.GetByIdAsync(id);
        if (reservation == null)
        {
            return NotFound();
        }

        return Ok(reservation);
    }

    // GET: api/reservations/resource/1
    [HttpGet("resource/{resourceId}")]
    public async Task<ActionResult<IEnumerable<ReservationDto>>> GetReservationsByResource(int resourceId)
    {
        var reservations = await _reservationService.GetByResourceIdAsync(resourceId);
        return Ok(reservations);
    }

    // POST: api/reservations
    [HttpPost]
    public async Task<ActionResult<ReservationDto>> CreateReservation([FromBody] CreateReservationDto createDto)
    {
        var validationResult = await _validator.ValidateAsync(createDto);
        
        if (!validationResult.IsValid)
        {
            // Converts validation errors into ASP.NET Core's standard ModelState dictionary
            return BadRequest(validationResult.ToDictionary());
        }
        
        try
        {
            var createdReservation = await _reservationService.CreateAsync(createDto);
            return CreatedAtAction(nameof(GetReservation), new { id = createdReservation.Id }, createdReservation);
        }
        catch (InvalidOperationException ex)
        {
            // Returns an HTTP 400 Bad Request error
            return BadRequest(new { message = ex.Message });
        }
    }

    // DELETE: api/reservations/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> CancelReservation(int id)
    {
        var cancelled = await _reservationService.CancelAsync(id);
        if (!cancelled)
        {
            return NotFound();
        }

        return NoContent();
    }
}