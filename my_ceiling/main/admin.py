from django.contrib import admin
from .models import CorniceModel, LightModel, ProfileModel


@admin.register(CorniceModel)
class CeilingAdmin(admin.ModelAdmin):
    list_display = ('name', 'foto', 'price')


@admin.register(LightModel)
class CeilingAdmin(admin.ModelAdmin):
    list_display = ('name', 'type_light', 'foto', 'price')


@admin.register(ProfileModel)
class CeilingAdmin(admin.ModelAdmin):
    list_display = ('name', 'foto', 'price')