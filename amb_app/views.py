from django.shortcuts import render
from rest_framework.decorators import action
from .models import Location, Reward, User, UserActionHistory
from .serializers import UserSerializer, RewardSerializer, LocationSerializer, LoginSerializer, RefreshSerializer, UserActionHistorySerializer
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.permissions import IsAuthenticated

class LoginViewSet(viewsets.ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as token_error:
            raise InvalidToken(token_error.args[0])
    
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
class RefreshViewSet(viewsets.ModelViewSet):
    serializer_class = RefreshSerializer
    http_method_names = ['post']
    permission_classes = (IsAuthenticated,)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as token_error:
            raise InvalidToken(token_error.args[0])
        
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    permission_classes = (IsAuthenticated,)
    fielter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']
    serializer_class = UserSerializer
    
    def get_queryset(self):
        if self.request.user.is_admin:
            return User.objects.all()
        
    def get_object(self):
        obj = User.objects.get(pk=self.kwargs[self.lookup_field])
        self.check_object_permissions(self.request, obj)
        
        return obj

    @action(detail=False, methods=['get'])
    def get_user_info(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class RewardViewSet(viewsets.ModelViewSet):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    
class UserActionHistoryViewSet(viewsets.ModelViewSet):
    queryset = UserActionHistory.objects.all()
    serializer_class = UserActionHistorySerializer
# Create your views here.

