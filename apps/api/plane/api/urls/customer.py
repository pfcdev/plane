from django.urls import path
from plane.api.views import CustomerViewSet

urlpatterns = [
    path(
        "workspaces/<str:slug>/customers/",
        CustomerViewSet.as_view({"get": "list", "post": "create"}),
        name="customers",
    ),
    path(
        "workspaces/<str:slug>/customers/<uuid:pk>/",
        CustomerViewSet.as_view(
            {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
        ),
        name="customer-detail",
    ),
]
