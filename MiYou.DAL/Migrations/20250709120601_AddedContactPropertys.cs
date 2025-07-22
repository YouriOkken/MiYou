using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MiYou.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddedContactPropertys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "MiddleName",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Contacts",
                newName: "CompanyName");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Contacts",
                newName: "Idea");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Contacts",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Requirements",
                table: "Contacts",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "Requirements",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "Idea",
                table: "Contacts",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "CompanyName",
                table: "Contacts",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Contacts",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MiddleName",
                table: "Contacts",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);
        }
    }
}
