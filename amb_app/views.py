from django.shortcuts import render
from .models import Location, Reward, User
from .serializers import UserSerializer, RewardSerializer, LocationSerializer, LoginSerializer
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
    
class RefreshViewSet(viewsets.ViewSet, RefreshToken):
    permission_classes = (AllowAny,)
    http_method_names = ['post']
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
            

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    permission_classes = (IsAuthenticated,)
    fielter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated']
    ordering = ['-updated']
    serializer_class = UserSerializer
    
    def get_queryset(self):
        if self.request.user_is_superuser:
            return User.objects.all()
        
    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        
        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)
        
        return obj
    
class RewardViewSet(viewsets.ModelViewSet):
    queryset = Reward.objects.all()
    serializer_class = RewardSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    
# Create your views here.

