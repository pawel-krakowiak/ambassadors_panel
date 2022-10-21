# Generated by Django 4.1.2 on 2022-10-21 14:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=32, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Reward',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('description', models.TextField(default='')),
                ('reward_img', models.ImageField(default='img_rewards/not_found.png', upload_to='img_rewards')),
                ('points_price', models.DecimalField(decimal_places=0, max_digits=10)),
                ('is_available', models.BooleanField(default=True)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='amb_app.location')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('is_active', models.BooleanField(default=True)),
                ('staff', models.BooleanField(default=False)),
                ('admin', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=64)),
                ('surename', models.CharField(max_length=64)),
                ('instagram_name', models.CharField(max_length=64, unique=True)),
                ('location', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='amb_app.location')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
