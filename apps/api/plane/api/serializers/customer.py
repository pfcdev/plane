from rest_framework import serializers
from plane.db.models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
            "workspace",
        ]
