# Generated by Django 4.2.1 on 2024-06-05 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("endpoint", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="workflowendpoint",
            name="connection_type",
            field=models.CharField(
                blank=True,
                choices=[
                    ("FILESYSTEM", "FileSystem connector"),
                    ("DATABASE", "Database Connector"),
                    ("API", "API Connector"),
                    ("MANUAL_REVIEW", "Manual Review Queue Connector"),
                ],
                db_comment="Connection type (Filesystem, Database, API or MANUAL_REVIEW)",
            ),
        ),
    ]