from graphene_django import DjangoObjectType

from games.models import Game


class GameType(DjangoObjectType):
    class Meta:
        model = Game
        only_fields = (
            "id",
            "name",
            "home",
            "away",
            "created_at",
        )
        use_connection = True
