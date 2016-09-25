from django.http import HttpResponse
from project.django_ext.react_helpers import render


def home(request):
    rendered = render(
        'Test.jsx'
    )
    return HttpResponse(str(rendered))
