from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserAdminCreationForm, UserAdminChangeForm
from .models import Reward, Location

admin.site.site_header = "justVAPE Admin"
admin.site.site_title = "justVAPE Ambassadors Panel"
admin.site.index_title = "Welcome to justVAPE Ambassadors Panel"

User = get_user_model()
admin.site.unregister(Group)

class UserAdmin(BaseUserAdmin):
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm
    
    list_display = ['name', 'surename', 'email', 'instagram_name', 'admin']
    list_filter = ['admin']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'surename', 'instagram_name')}),
        ('Permissions', {'fields': ('admin', 'staff')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'surename', 'instagram_name', 'password', 'password_2', 'location', 'points', 'admin', 'staff', 'is_active',)
            }),
        )
    search_fields = ['email']
    ordering = ['admin', 'email']
    filter_horizontal = ()
    
admin.site.register(User, UserAdmin)

@admin.register(Reward)
class RewardAdmin(admin.ModelAdmin):
    list_filter = ['points_price']
    search_fields = ['name']
    
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_filter = ['location']
    
    