from rest_framework.routers import SimpleRouter
from amb_app.views import UserViewSet, LoginViewSet, RefreshViewSet, LocationViewSet, RewardViewSet, UserActionHistoryViewSet

routes = SimpleRouter()

routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'users', UserViewSet, basename='users')
routes.register(r'locations', LocationViewSet, basename='locations')
routes.register(r'rewards', RewardViewSet, basename='rewards')
routes.register(r'users-history', UserActionHistoryViewSet, basename='user-history')

urlpatterns = [
    *routes.urls
]
