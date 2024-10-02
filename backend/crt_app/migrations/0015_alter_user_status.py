# Generated by Django 3.2.25 on 2024-09-23 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crt_app', '0014_alter_class_sec'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(choices=[('NAC', 'Not Active'), ('AC', 'Active')], default='NAC', max_length=4),
        ),
    ]
