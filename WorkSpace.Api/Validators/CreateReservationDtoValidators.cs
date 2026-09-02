using WorkSpace.Api.DTOs;
using FluentValidation;

namespace WorkSpace.Api.Validators;

public class CreateReservationDtoValidator : AbstractValidator<CreateReservationDto>
{
    public CreateReservationDtoValidator()
    {
        RuleFor(x => x.ResourceId)
            .GreaterThan(0)
            .WithMessage("ResourceId must be greater than 0.");

        RuleFor(x => x.UserEmail)
            .NotEmpty()
            .WithMessage("User email is required.")
            .EmailAddress()
            .WithMessage("A valid email address is required.");

        RuleFor(x => x.StartTime)
            .NotEmpty()
            .WithMessage("Start time is required.");

        RuleFor(x => x.EndTime)
            .NotEmpty()
            .WithMessage("End time is required.")
            .GreaterThan(x => x.StartTime)
            .WithMessage("End time must be later than start time.");
    }
}