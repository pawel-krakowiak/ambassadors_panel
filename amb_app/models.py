from django.db import models
from django.conf import settings
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)


class Reward(models.Model):
    """Reawrd model"""
    name = models.CharField(max_length=128, blank=False)
    description = models.TextField(default="")
    reward_img = models.ImageField(upload_to="img_rewards", blank=False, default="img_rewards/not_found.png")
    points_price = models.DecimalField(max_digits=10, decimal_places=0, blank=False)
    is_available = models.BooleanField(blank=False, default=True)
    
    def __str__(self):
        return self.name_with_price()
    
    def name_with_price(self):
        return f"{self.name} ({self.points_price} punktów)"

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) 
    admin = models.BooleanField(default=False)
    name = models.CharField(max_length=64, blank=False)
    surename = models.CharField(max_length=64, blank=False)
    instagram_name = models.CharField(max_length=64, blank=False)
    
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def get_full_name(self):
        return f"{self.name} {self.surename} ({self.email})"

    def get_short_name(self):
        return self.email
    
    def __str__(self):
        return self.get_full_name()
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True
    
    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True
    
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff
    
    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin