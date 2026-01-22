from contando_amor.models import Casal
from contando_amor.serializers import CasalSerializer
from rest_framework import viewsets


class CasalViewSet(viewsets.ModelViewSet):
    queryset = Casal.objects.all()
    serializer_class = CasalSerializer

    lookup_field = "page_id"
