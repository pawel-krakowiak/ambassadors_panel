# Generated by Django 4.1.2 on 2022-11-02 11:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amb_app', '0002_user_points_alter_user_admin_alter_user_email_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='location',
            options={'verbose_name': 'Lokacja', 'verbose_name_plural': 'Lokacje'},
        ),
        migrations.AlterModelOptions(
            name='reward',
            options={'verbose_name': 'Nagroda', 'verbose_name_plural': 'Nagrody'},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'Użytkownik', 'verbose_name_plural': 'Użytkownicy'},
        ),
        migrations.AlterField(
            model_name='location',
            name='location',
            field=models.CharField(max_length=32, unique=True, verbose_name='Miasto'),
        ),
        migrations.AlterField(
            model_name='reward',
            name='description',
            field=models.TextField(default='', verbose_name='Opis'),
        ),
        migrations.AlterField(
            model_name='reward',
            name='is_available',
            field=models.BooleanField(default=True, verbose_name='Dostępność'),
        ),
        migrations.AlterField(
            model_name='reward',
            name='location',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='amb_app.location', verbose_name='Sklep'),
        ),
        migrations.AlterField(
            model_name='reward',
            name='name',
            field=models.CharField(max_length=128, verbose_name='Nazwa'),
        ),
        migrations.AlterField(
            model_name='reward',
            name='points_price',
            field=models.DecimalField(decimal_places=0, max_digits=10, verbose_name='Koszt (punkty)'),
        ),
        migrations.AlterField(
            model_name='reward',
            name='reward_img',
            field=models.ImageField(default='rewards_img/not_found.png', upload_to='rewards_img', verbose_name='Zdjęcie'),
        ),
    ]
