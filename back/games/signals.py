from django.db.models.signals import post_save, post_delete
from graphene_subscriptions.signals import (
    post_save_subscription,
    post_delete_subscription,
)

from games.models import Game


post_save.connect(post_save_subscription, sender=Game, dispatch_uid="games_post_save")
post_delete.connect(
    post_delete_subscription, sender=Game, dispatch_uid="games_post_delete"
)
