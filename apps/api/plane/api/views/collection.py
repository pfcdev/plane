from rest_framework import viewsets
from plane.api.serializers import CollectionSerializer
from plane.db.models import Collection
from plane.api.permissions import ProjectEntityPermission

class CollectionViewSet(viewsets.ModelViewSet):
    serializer_class = CollectionSerializer
    model = Collection
    permission_classes = [ProjectEntityPermission]

    def get_queryset(self):
        return Collection.objects.filter(workspace__slug=self.kwargs.get("slug"))

    def perform_create(self, serializer):
        workspace = self.request.user.workspaces.get(
            slug=self.kwargs.get("slug")
        )
        serializer.save(workspace=workspace)
