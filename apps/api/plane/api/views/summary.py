from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from plane.db.models import Customer, Collection, Project
from plane.api.permissions import ProjectEntityPermission

class CollectionSummaryView(APIView):
    permission_classes = [ProjectEntityPermission]

    def get(self, request, slug):
        workspace = self.request.user.workspaces.get(slug=slug)
        
        # Get all customers in the workspace
        customers = Customer.objects.filter(workspace=workspace)
        
        summary_data = []

        for customer in customers:
            # Get all projects for the customer
            projects = Project.objects.filter(customer=customer)
            
            total_project_price = projects.aggregate(total=Sum('price'))['total'] or 0
            total_collected_amount = Collection.objects.filter(project__in=projects).aggregate(total=Sum('amount'))['total'] or 0
            
            remaining_amount = total_project_price - total_collected_amount
            
            summary_data.append({
                'customer_id': customer.id,
                'customer_name': customer.name,
                'total_project_price': total_project_price,
                'total_collected_amount': total_collected_amount,
                'remaining_amount': remaining_amount
            })
            
        return Response(summary_data)
