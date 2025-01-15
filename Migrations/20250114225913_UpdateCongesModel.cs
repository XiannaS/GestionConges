using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestionConges.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCongesModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Statut",
                table: "Conges",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Motif",
                table: "Conges",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "EmployesId",
                table: "Conges",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Conges_EmployesId",
                table: "Conges",
                column: "EmployesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Conges_Employes_EmployesId",
                table: "Conges",
                column: "EmployesId",
                principalTable: "Employes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Conges_Employes_EmployesId",
                table: "Conges");

            migrationBuilder.DropIndex(
                name: "IX_Conges_EmployesId",
                table: "Conges");

            migrationBuilder.DropColumn(
                name: "EmployesId",
                table: "Conges");

            migrationBuilder.AlterColumn<string>(
                name: "Statut",
                table: "Conges",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Motif",
                table: "Conges",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);
        }
    }
}
