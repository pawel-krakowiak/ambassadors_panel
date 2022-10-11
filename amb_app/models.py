from django.db import models
from django.conf import settings
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

# TODO: Reward for cities and users


class Location(models.Model):
    location = models.CharField(max_length=32, unique=True)

class Reward(models.Model):
    """Reawrd model"""
    name = models.CharField(max_length=128, blank=False)
    description = models.TextField(default="")
    reward_img = models.ImageField(upload_to="img_rewards", blank=False, default="img_rewards/not_found.png")
    points_price = models.DecimalField(max_digits=10, decimal_places=0, blank=False)
    is_available = models.BooleanField(blank=False, default=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=False)
    
    def __str__(self):
        return self.name_with_price()
    
    def name_with_price(self):
        return f"{self.name} ({self.points_price} punktów)"

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("Użytkownik musi mieć adres email!")
        
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
    
        return user
    
    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(email, password=password)
        user.staff = True
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(email, password=password)
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) 
    admin = models.BooleanField(default=False)
    name = models.CharField(max_length=64, blank=False)
    surename = models.CharField(max_length=64, blank=False)
    instagram_name = models.CharField(max_length=64, blank=False, unique=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=False)
    
    objects = UserManager()
    
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