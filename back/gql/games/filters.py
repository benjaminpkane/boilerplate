from django.db.models import Q
import django_filters

from games.models import Game


class GameFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search")

    class Meta:
        model = Game
        fields = ()

    def filter_search(self, queryset, name, value):
        return queryset.filter(Q(name__icontains=value))
