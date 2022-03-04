from django.db import models


def path_foto(instance, filename):
    return f"ceiling/foto/{instance.__class__.__name__.split('M')[0]}/{filename}"


class CeilingModel(models.Model):
    name = models.CharField('Наименование', max_length=50, default='нет наименования')
    foto = models.ImageField('Фото', upload_to=path_foto)
    price = models.DecimalField('Цена', max_digits=8, decimal_places=2, default=0)

    def __str__(self):
        return self.name


class CorniceModel(CeilingModel):

    class Meta:
        verbose_name = 'Карниз'
        verbose_name_plural = 'Карнизы'


class LightModel(CeilingModel):
    CHANDELIER = 'CH'
    TRACK_AND_SPOT = 'TAS'
    LEDLAMP_AND_POINT = 'LAP'
    LEDPANEL = 'LP'
    LED_STRIP_LIGHT = 'LSL'
    TYPE_IN_LIGHT_CHOICES = [
        ('CHANDELIER', 'люстры'),
        ('TRACK_AND_SPOT', 'треки и споты'),
        ('LEDLAMP_AND_POINT', 'LED-светильники и точечные'),
        ('LEDPANEL', 'LED-панели'),
        ('LED_STRIP_LIGHT', 'LED-ленты и комплектующие'),
    ]
    type_light = models.CharField('Тип', max_length=30, choices=TYPE_IN_LIGHT_CHOICES, default=CHANDELIER)

    class Meta:
        verbose_name = 'Освещение'
        verbose_name_plural = 'Освещение'


class ProfileModel(CeilingModel):

    class Meta:
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профиля'