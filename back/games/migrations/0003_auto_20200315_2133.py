# Generated by Django 3.0.4 on 2020-03-15 21:33

from django.db import migrations, models
import games.models


class Migration(migrations.Migration):

    dependencies = [
        ("games", "0002_auto_20200315_1959"),
    ]

    operations = [
        migrations.AlterField(
            model_name="game",
            name="name",
            field=models.CharField(default=games.models._name_game, max_length=100),
        ),
    ]
