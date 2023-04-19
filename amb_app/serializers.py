from .models import User, Reward, Location
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['user'] = UserSerializer(self.user).data
        update_last_login(None, self.user)
        return data

class RefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    
    def validate(self, attrs):
        self.token = attrs['refresh']
        
        return super().validate(attrs)
    
    def save(self, **kwargs):
        refresh = RefreshToken(self.token)
        refresh.blacklist()
        
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        
        return data 

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'surename', 'instagram_name', 'password', 'is_staff', 'is_active', 'points', 'location']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            surename=validated_data['surename'],
            instagram_name=validated_data['instagram_name'],
            password=validated_data['password'],
            location=validated_data['location'],
        )
        return user

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'surename', 'is_staff', 'is_active', 'points', 'location_name', 'location_id']

class RewardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reward
        fields = ['id', 'name', 'points_price', 'description', 'reward_img', 'is_available', 'location_name', 'location_id']

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'location']


