# Generated by Django 4.1.2 on 2023-06-16 13:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amb_app', '0003_alter_location_options_alter_reward_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_type', models.CharField(choices=[('POINTS_ADDED', 'Points added'), ('POINTS_REMOVED', 'Points removed'), ('REWARD_ORDERED', 'Reward ordered'), ('REWARD_CANCELED', 'Reward canceled'), ('REWARD_GRANTED', 'Reward granted'), ('LOCATION_CHANGED', 'User location has been changed'), ('PERMISSION_CHANGED', 'User permission has been changed'), ('USER_CREATED', 'User has been created'), ('USER_DELETED', 'User has been deleted'), ('USER_EDITED', 'User property has been edited'), ('USER_PASSWORD_CHANGED', 'User password has been changed')], max_length=100)),
                ('action_desc', models.CharField(max_length=400)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]