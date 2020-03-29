from django.db import models
from django.utils.translation import ugettext_lazy as _

from random_word import RandomWords


def _name_game():
    namer = RandomWords()
    return " ".join([namer.get_random_word(maxLength=49) for i in range(0, 2)])


class Game(models.Model):
    name = models.CharField(max_length=100, default=_name_game)
    home = models.PositiveIntegerField()
    away = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("game")
        verbose_name_plural = _("games")
        ordering = ("-created_at",)

    def __str__(self):
        return "{} (#{})".format(self.name, self.pk)
