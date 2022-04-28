from django.db import models


def path_foto(instance, filename):
    return f"product/foto/{instance.category}/{filename}"


class Product(models.Model):
    title = models.CharField(max_length=50, default='нет наименования', verbose_name='Наименование')
    foto = models.ImageField(upload_to=path_foto, verbose_name='Фото')
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0, verbose_name='Цена')
    CATEGORIES = (
        (None, 'Быберите тип'),
        ('cornice', 'Карниз'),
        ('profile', 'Профиль'),
        ('Освещение', (
            ('chandelier', 'люстры'),
            ('track_and_spot', 'треки и споты'),
            ('ledlamp_and_point', 'LED-светильники и точечные'),
            ('ledpanel', 'LED-панели'),
            ('led_strip_light', 'LED-ленты и комплектующие'),
        ))
    )
    category = models.CharField(max_length=30, choices=CATEGORIES, verbose_name='Категория')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Товары'
        verbose_name = 'Товар'