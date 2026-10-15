using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkSpace.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveIsAvailableFromResource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAvailable",
                table: "Resources");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAvailable",
                table: "Resources",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
