using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkSpace.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddUserEmailToReservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "ReservedBy",
                table: "Reservations",
                newName: "UserEmail");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ResourceId",
                table: "Reservations",
                column: "ResourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Resources_ResourceId",
                table: "Reservations",
                column: "ResourceId",
                principalTable: "Resources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Resources_ResourceId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_ResourceId",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "UserEmail",
                table: "Reservations",
                newName: "ReservedBy");

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Reservations",
                type: "text",
                nullable: true);
        }
    }
}
