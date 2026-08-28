from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    first_selective = models.CharField(max_length=100, null=True, blank=True)
    second_selective = models.CharField(max_length=100, null=True, blank=True)
    group = models.ForeignKey('Group', on_delete=models.CASCADE, null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Schedule(models.Model):
    WEEK_DAYS = (
        ('Monday', 'Понеділок'), ('Tuesday', 'Вівторок'), ('Wednesday', 'Середа'),
        ('Thursday', 'Четвер'), ('Friday', 'Пʼятниця'), ('Saturday', 'Субота'),
    )
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    number = models.IntegerField(default=1)
    day = models.CharField(max_length=10, choices=WEEK_DAYS, default='Monday')
    week = models.IntegerField(default=1)
    teacher = models.CharField(max_length=100)
    aim = models.CharField(max_length=10, choices=(('Lecture', 'Лек.'), ('Practice', 'Лаб.')), default='Lecture')
    type = models.CharField(max_length=10, choices=(('ONLINE', 'Онлайн'), ('OFFLINE', 'Очно')), default='OFFLINE')
    place =  models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.subject} - {self.group.name} - {self.day} - {self.number}"

class SelectiveSubject(models.Model):
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    subject = models.CharField(max_length=100)
    teacher = models.CharField(max_length=100, null=True, blank=True)
    info = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return f"{self.subject} - {self.group.name}"

