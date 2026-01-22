import uuid
from django.db import models


class Casal(models.Model):
    page_id = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, db_index=True
    )
    nome_do_casal = models.CharField(max_length=100)
    data_de_inicio_relacionamento = models.DateField()
    email = models.EmailField()
    mensagem = models.TextField()
    foto = models.ImageField(upload_to="casais/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
