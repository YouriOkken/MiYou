using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiYou.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AdditionalInfoWithCapital : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "additionalInfo",
                table: "Contacts",
                newName: "AdditionalInfo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AdditionalInfo",
                table: "Contacts",
                newName: "additionalInfo");
        }
    }
}
