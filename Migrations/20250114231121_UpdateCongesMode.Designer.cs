﻿// <auto-generated />
using System;
using GestionConges.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GestionConges.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250114231121_UpdateCongesMode")]
    partial class UpdateCongesMode
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GestionConges.Models.Conges", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateDebut")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateFin")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmployeId")
                        .HasColumnType("int");

                    b.Property<int?>("EmployesId")
                        .HasColumnType("int");

                    b.Property<string>("Motif")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Statut")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("Id");

                    b.HasIndex("EmployeId");

                    b.HasIndex("EmployesId");

                    b.ToTable("Conges");
                });

            modelBuilder.Entity("GestionConges.Models.Employes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nom")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Prenom")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("SoldeConge")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Employes");
                });

            modelBuilder.Entity("GestionConges.Models.Conges", b =>
                {
                    b.HasOne("GestionConges.Models.Employes", "Employe")
                        .WithMany()
                        .HasForeignKey("EmployeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GestionConges.Models.Employes", null)
                        .WithMany("Conges")
                        .HasForeignKey("EmployesId");

                    b.Navigation("Employe");
                });

            modelBuilder.Entity("GestionConges.Models.Employes", b =>
                {
                    b.Navigation("Conges");
                });
#pragma warning restore 612, 618
        }
    }
}
