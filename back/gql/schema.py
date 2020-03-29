from graphene import Argument, Field, ID, ObjectType, Schema
from graphene_django.filter import DjangoFilterConnectionField
from graphene_subscriptions.events import CREATED, DELETED

from games.models import Game

from .games.filters import GameFilter
from .games.mutations import GameCreate, GameDelete
from .games.types import GameType


class Mutation(ObjectType):
    game_create = GameCreate.Field()
    game_delete = GameDelete.Field()


class Query(ObjectType):
    games = DjangoFilterConnectionField(GameType, filterset_class=GameFilter)
    game = Field(GameType, id=Argument(ID, required=True))

    def resolve_games(root, info, **kwargs):
        return Game.objects.all()

    def resolve_game(root, info, **kwargs):
        return Game.objects.get(id=kwargs.get("id"))


class Subscription(ObjectType):
    game_created = Field(GameType)
    game_deleted = Field(GameType)

    def resolve_game_created(root, info):
        return root.filter(
            lambda event: event.operation == CREATED
            and isinstance(event.instance, Game)
        ).map(lambda event: event.instance)

    def resolve_game_deleted(root, info):
        return root.filter(
            lambda event: event.operation == DELETED
            and isinstance(event.instance, Game)
        ).map(lambda event: event.instance)


schema = Schema(query=Query, mutation=Mutation, subscription=Subscription)
