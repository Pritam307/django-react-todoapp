from django.db import models

# Create your models here.


class TodoModel(models.Model):
    name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    from_date = models.DateTimeField()
    to_date = models.DateTimeField()
    details = models.TextField(max_length=100)
    status = models.CharField(max_length=30)

    class Meta:
        db_table = "todo"
