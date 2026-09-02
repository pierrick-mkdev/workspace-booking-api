using FluentValidation;
using WorkSpace.Api.DTOs;

namespace WorkSpace.Api.Validators;

public class CreateResourceDtoValidator : AbstractValidator<CreateResourceDto>
{
    public CreateResourceDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Resource name is required.")
            .MaximumLength(100)
            .WithMessage("Resource name must not exceed 100 characters.");

        RuleFor(x => x.Capacity)
            .GreaterThan(0)
            .WithMessage("Capacity must be greater than 0.");
    }
}