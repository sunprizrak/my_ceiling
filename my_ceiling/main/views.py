from django.views.generic import ListView
from .models import CorniceModel, LightModel, ProfileModel, CeilingModel

from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
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
        self.cart = Cart(request)
        query_dict = request.POST
        self.product = get_object_or_404(CeilingModel, id=int(query_dict.__getitem__('product_id')))
        if query_dict.__getitem__('name') == 'add':
            self.cart.add(product=self.product,
                          quantity=int(query_dict.__getitem__('quantity')),
                          update_quantity=False)
            data = {
                'total_price': str(self.cart.get_total_price()),
            }
            return JsonResponse(data)
        elif query_dict.__getitem__('name') == 'remove':
            self.cart.remove(self.product)
            data = {'id': self.product.id,
                    'total_price': str(self.cart.get_total_price()),
                    }
            return JsonResponse(data)

