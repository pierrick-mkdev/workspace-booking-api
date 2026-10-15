using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkSpace.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddImageUrlToResource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Resources",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Resources");
        }
    }
}
