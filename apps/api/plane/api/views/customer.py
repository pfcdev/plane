from rest_framework import viewsets
from plane.api.serializers import CustomerSerializer
from plane.db.models import Customer
from plane.api.permissions import ProjectEntityPermission

class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    model = Customer
    permission_classes = [ProjectEntityPermission]

    def get_queryset(self):
        return Customer.objects.filter(workspace__slug=self.kwargs.get("slug"))

    def perform_create(self, serializer):
        workspace = self.request.user.workspaces.get(
            slug=self.kwargs.get("slug")
        )
        serializer.save(workspace=workspace)
