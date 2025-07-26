from django.db import models
from .base import BaseModel

class Collection(BaseModel):
    project = models.ForeignKey(
        "db.Project", on_delete=models.CASCADE, related_name="collections"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    collection_date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    workspace = models.ForeignKey(
        "db.Workspace", on_delete=models.CASCADE, related_name="collections"
    )

    def __str__(self):
        return f"{self.project.name} - {self.amount}"

    class Meta:
        verbose_name = "Collection"
        verbose_name_plural = "Collections"
        db_table = "collections"
        ordering = ("-collection_date",)
