from django.contrib import admin
from .models import Reward

@admin.register(Reward)
class RewardAdmin(admin.ModelAdmin):
    list_filter = ['points_price']
    search_fields = ['name']
