from .project import urlpatterns as project_patterns
from .state import urlpatterns as state_patterns
from .issue import urlpatterns as issue_patterns
from .cycle import urlpatterns as cycle_patterns
from .module import urlpatterns as module_patterns
from .intake import urlpatterns as intake_patterns
from .member import urlpatterns as member_patterns
from .asset import urlpatterns as asset_patterns
from .user import urlpatterns as user_patterns
from .customer import urlpatterns as customer_patterns
from .collection import urlpatterns as collection_patterns
from .summary import urlpatterns as summary_patterns

urlpatterns = [
    *asset_patterns,
    *project_patterns,
    *state_patterns,
    *issue_patterns,
    *cycle_patterns,
    *module_patterns,
    *intake_patterns,
    *member_patterns,
    *user_patterns,
    *customer_patterns,
    *collection_patterns,
    *summary_patterns,
]
