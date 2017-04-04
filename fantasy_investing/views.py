from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from fantasy_investing.models import Company
from fantasy_investing.serializers import CompanySerializer
from yahoo_finance import Share

@csrf_exempt

def company_detail(request, ticker):

    response = Share(ticker)
    if response.get_name():

        if request.method == 'GET':
            company = Company(ticker, response.get_name(), response.get_price())
            serializer = CompanySerializer(company)
            return JsonResponse(serializer.data)

    else:
        return HttpResponse(status=404)
