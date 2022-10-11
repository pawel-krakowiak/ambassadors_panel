from django.db import models
from django.conf import settings

class Reward(models.Model):
    """Reawrd model"""
    name = models.CharField(max_length=128, blank=False)
    description = models.TextField(default="")
    reward_img = models.ImageField(upload_to="img_rewards", blank=False, default="img_rewards/not_found.png")
    points_price = models.DecimalField(max_digits=10, decimal_places=0, blank=False)
    is_available = models.BooleanField(blank=False, default=True)
