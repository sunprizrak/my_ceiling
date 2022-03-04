from django.views.generic import ListView
from .models import CorniceModel, LightModel, ProfileModel, CeilingModel
from django.core.mail import EmailMessage
from django.conf import settings

from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from .cart import Cart


class HomeView(ListView):
    model = CorniceModel
    template_name = 'main/index.html'
    context_object_name = 'cornice'
    extra_context = {
        'title': 'MY CEILING',
        'ceiling': CeilingModel.objects.all(),
        'light': LightModel.objects.all(),
        'profile': ProfileModel.objects.all(),
    }

    def get(self, request, *args, **kwargs):
        self.product = ''
        self.cart = Cart(request)
        return super(HomeView, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['cart'] = self.cart
        context['product'] = self.product
        return context

    def post(self, request, *args, **kwargs):
        query_dict = request.POST
        cart = Cart(request)
        product = None
        if 'product_id' in query_dict:
            product = get_object_or_404(CeilingModel, id=int(query_dict.__getitem__('product_id')))
        if query_dict.__getitem__('name') == 'add':
            cart.add(product=product,
                     quantity=int(query_dict.__getitem__('quantity')),
                     update_quantity=False)
            data = {
                'total_price': str(cart.get_total_price()),
            }
            return JsonResponse(data)
        elif query_dict.__getitem__('name') == 'remove':
            cart.remove(product)
            data = {'id': product.id,
                    'total_price': str(cart.get_total_price()),
                    }
            return JsonResponse(data)
        elif query_dict.__getitem__('name') == 'order':
            username = query_dict.__getitem__('form[0][value]')
            user_phone = query_dict.__getitem__('form[1][value]')
            message = cart.get_order_for_email() + f'Phone заказчика: {user_phone}'
            from_email = settings.DEFAULT_FROM_EMAIL
            email = EmailMessage(subject=f'Заказ от {username}', body=message, from_email=from_email,
                                 to=['sunprizrak@gmail.com'], )
            email.send(fail_silently=False)
            cart.clear()
            return render(request, self.template_name)
