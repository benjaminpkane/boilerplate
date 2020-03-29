# back/gql/notes/mutations.py
from graphene import Boolean, Field, ID, InputObjectType, Int, Mutation, String
from rest_framework import serializers

from games.models import Game

from .types import GameType


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            "id",
            "name",
            "home",
            "away",
            "created_at",
        )


class GameInputType(InputObjectType):
    home = Int()
    away = Int()


class GameCreate(Mutation):
    class Arguments:
        input = GameInputType(required=True)

    game = Field(GameType)

    @classmethod
    def mutate(cls, root, info, **data):
        serializer = GameSerializer(data=data.get("input"))
        serializer.is_valid(raise_exception=True)
        return GameCreate(game=serializer.save())


class GameDelete(Mutation):
    class Arguments:
        id = ID(required=True)

    ok = Boolean()

    @classmethod
    def mutate(cls, root, info, **data):
        game = Game.objects.get(id=data.get("id"))
        game.delete()
        return GameDelete(ok=True)
