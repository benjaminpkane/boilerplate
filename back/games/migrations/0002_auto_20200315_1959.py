# Generated by Django 3.0.4 on 2020-03-15 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("games", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(model_name="game", name="serves",),
        migrations.AddField(
            model_name="game",
            name="away",
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="game",
            name="home",
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]
