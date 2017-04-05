from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from fantasy_investing.serializers import PortfolioSerializer
from fantasy_investing.models import Portfolio
# Create your views here.

@csrf_exempt

def portfolio_detail(request, pk):
    try:
        portfolio = Portfolio.objects.get(pk=pk)
    except Portfolio.DoesNotExist:  
        return HttpResponse(status=404)

    if request.method == "GET":
        serializer = PortfolioSerializer(portfolio)
        return JsonResponse(serializer.data)