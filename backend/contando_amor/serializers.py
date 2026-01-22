from rest_framework import serializers
from contando_amor.models import Casal


class CasalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Casal
        fields = "__all__"
