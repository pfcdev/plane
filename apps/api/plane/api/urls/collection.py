from django.urls import path
from plane.api.views import CollectionViewSet

urlpatterns = [
    path(
        "workspaces/<str:slug>/collections/",
        CollectionViewSet.as_view({"get": "list", "post": "create"}),
        name="collections",
    ),
    path(
        "workspaces/<str:slug>/collections/<uuid:pk>/",
        CollectionViewSet.as_view(
            {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
        ),
        name="collection-detail",
    ),
]
