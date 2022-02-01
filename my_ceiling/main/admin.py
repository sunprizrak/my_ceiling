from django.contrib import admin
from .models import CorniceModel, LightModel, ProfileModel


@admin.register(CorniceModel)
class CeilingAdmin(admin.ModelAdmin):
    list_display = ('price', 'foto')


@admin.register(LightModel)
class CeilingAdmin(admin.ModelAdmin):
    list_display = ('type_light', 'price', 'foto')


@admin.register(ProfileModel)
class CeilingAdmin(admin.ModelAdmin):
    list_display = ('price', 'foto')