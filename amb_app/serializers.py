from .models import User, Reward, Location
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login

class LoginSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)
        
        refresh = self.get_token(self.user)
        
        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_Login(None, self.user)

        return data
            
        return data

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'points', 'name', 'surename', 'instagram_name', 'location', 'is_active', 'admin', 'staff', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'udated']
        
class RewardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reward
        fields = ['id', 'name', 'points_price', 'description', 'reward_img', 'is_available', 'location']

class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'location']
