from django.db import models
from django.conf import settings
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)

# TODO: Reward for cities and users


class Location(models.Model):
    location = models.CharField(verbose_name='Miasto', max_length=32, unique=True)

    class Meta:
        verbose_name_plural = ("Lokacje")
        verbose_name = ("Lokacja")
        
    def __str__(self):
        return self.location
    
    @classmethod
    def get_default_pk(cls):
        location, created = cls.objects.get_or_create(
            location = "Wrocław"
        )
        return location.pk

class Reward(models.Model):
    """Reawrd model"""
    name = models.CharField(verbose_name='Nazwa', max_length=128, blank=False)
    description = models.TextField(verbose_name='Opis', default="")
    reward_img = models.ImageField(verbose_name='Zdjęcie', upload_to="img_rewards", blank=False, default="img_rewards/not_found.png")
    points_price = models.DecimalField(verbose_name='Koszt (punkty)', max_digits=10, decimal_places=0, blank=False)
    is_available = models.BooleanField(verbose_name='Dostępność', blank=False, default=True)
    location = models.ForeignKey(verbose_name='Sklep', to=Location, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name_plural = ("Nagrody")
        verbose_name = ("Nagroda")
        
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
    email = models.EmailField(verbose_name="E-mail", max_length=255, unique=True)
    is_active = models.BooleanField(verbose_name="Aktywny", default=True)
    staff = models.BooleanField(verbose_name="Pracownik", default=False) 
    admin = models.BooleanField(verbose_name="Admin", default=False)
    name = models.CharField(verbose_name="Imię", max_length=64, blank=False)
    surename = models.CharField(verbose_name="Nazwisko", max_length=64, blank=False)
    instagram_name = models.CharField(verbose_name="Instagram", max_length=64, blank=False, unique=True)
    location = models.ForeignKey(verbose_name="Miasto", to=Location, on_delete=models.CASCADE, blank=True, null=True)
    points = models.IntegerField(verbose_name="Punkty", null=True, default=0)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    class Meta:
        verbose_name_plural = ("Użytkownicy")
        verbose_name = ("Użytkownik")

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