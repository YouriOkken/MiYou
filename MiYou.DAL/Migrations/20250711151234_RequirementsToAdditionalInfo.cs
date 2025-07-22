using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiYou.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RequirementsToAdditionalInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Requirements",
                table: "Contacts",
                newName: "additionalInfo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "additionalInfo",
                table: "Contacts",
                newName: "Requirements");
        }
    }
}
