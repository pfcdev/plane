from django.urls import path
from plane.api.views import CollectionSummaryView

urlpatterns = [
    path(
        "workspaces/<str:slug>/collection-summary/",
        CollectionSummaryView.as_view(),
        name="collection-summary",
    ),
]
