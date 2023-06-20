from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class Location(models.Model):
    location = models.CharField(verbose_name='Miasto', max_length=32, unique=True)
    location_code = models.CharField(verbose_name='Kod lokacji', max_length=7)

    class Meta:
        verbose_name_plural = "Lokacje"
        verbose_name = "Lokacja"

    def __str__(self):
        return f"({self.location_code}) {self.location}"

    @classmethod
    def get_default_pk(cls):
        location, created = cls.objects.get_or_create(location="Wrocław")
        return location.pk


class Reward(models.Model):
    name = models.CharField(verbose_name='Nazwa', max_length=128, blank=False)
    description = models.TextField(verbose_name='Opis', default="")
    reward_img = models.ImageField(verbose_name='Zdjęcie', upload_to="rewards_img", blank=False,
                                   default="rewards_img/not_found.png")
    points_price = models.DecimalField(verbose_name='Koszt (punkty)', max_digits=10, decimal_places=0, blank=False)
    is_available = models.BooleanField(verbose_name='Dostępność', blank=False, default=True)
    location = models.ForeignKey(verbose_name='Sklep', to=Location, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Nagrody"
        verbose_name = "Nagroda"

    def __str__(self):
        return self.name_with_price()

    def name_with_price(self):
        return f"{self.name} ({self.points_price} punktów)"

    @property
    def location_name(self):
        return self.location.location

    @property
    def location_id(self):
        return self.location.id


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Użytkownik musi mieć adres email!")

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password, **extra_fields):
        user = self.create_user(email, password=password, **extra_fields)
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password=password, **extra_fields)
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
    surname = models.CharField(verbose_name="Nazwisko", max_length=64, blank=False)
    instagram_name = models.CharField(verbose_name="Instagram", max_length=64, blank=False, unique=True)
    location = models.ForeignKey(verbose_name="Miasto", to=Location, on_delete=models.CASCADE, blank=True, null=True)
    points = models.IntegerField(verbose_name="Punkty", null=True, default=0)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname', 'instagram_name']

    class Meta:
        verbose_name_plural = "Użytkownicy"
        verbose_name = "Użytkownik"

    def add_points(self, amount):
        self.points += amount
        self.save()
        UserActionHistory.objects.create(
            user=self,
            action_type='POINTS_ADDED',
            action_desc=f"Points added: {amount}",
        )

    def get_full_name(self):
        return f"{self.name} {self.surname} ({self.email})"

    def get_short_name(self):
        return self.email

    def __str__(self):
        return self.get_full_name()

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def location_name(self):
        return self.location.location

    @property
    def location_id(self):
        return self.location.id

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin


class UserActionHistory(models.Model):
    ACTION_CHOICES = (
        ('USER_NOTE', 'User note'),
        ('POINTS_ADDED', 'Points added'),
        ('POINTS_REMOVED', 'Points removed'),
        ('USER_LOCATION_CHANGED', 'User location has been changed'),
        ('USER_PERMISSION_CHANGED', 'User permission has been changed'),
        ('USER_STATUS_CHANGED', 'User is active/inactive'),
        ('USER_INSTAGRAM_CHANGED', 'User Instagram name changed'),
        ('USER_PASSWORD_CHANGED', 'User password has been changed'),
        ('REWARD_CHANGED', 'Reward changed (ordered/canceled/granted)'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=100, choices=ACTION_CHOICES)
    action_desc = models.CharField(max_length=400)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Historia Użytkowników"
        verbose_name = "Historia Użytkownika"

    def __str__(self):
        return f"[{self.action_type}] {self.action_desc}"


class Order(models.Model):

    class Meta:
        verbose_name_plural = "Zamówienia Nagród"
        verbose_name = "Zamówienie Nagrody"

    ORDER_STATUS_CHOICES = (
        ("ORDER_CREATED", "Order created and awaiting fulfillment"),
        ("ORDER_APPROVED", "Order approved, reward retrieved"),
        ("ORDER_DECLINED", "Order rejected, user points revoked"),
    )

    owner = models.ForeignKey(verbose_name="Zamawiający", to=User, on_delete=models.CASCADE, blank=False, null=False)
    reward = models.ForeignKey(verbose_name="Nagroda", to=Reward, on_delete=models.CASCADE, blank=False, null=False)
    status = models.CharField(max_length=100, choices=ORDER_STATUS_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.status}] {self.owner.get_full_name()} | {self.reward} - {self.timestamp}"
