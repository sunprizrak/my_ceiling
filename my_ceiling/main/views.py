from django.views.generic import ListView
from .models import CorniceModel, LightModel, ProfileModel


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


class HomeView(ListView):
    model = CorniceModel
    template_name = 'main/index.html'
    context_object_name = 'cornice'
    extra_context = {
        'title': 'MY CEILING',
    }

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['light'] = LightModel.objects.all()
        context['profile'] = ProfileModel.objects.all()
        return context
