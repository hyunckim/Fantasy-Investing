from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from fantasy_investing.serializers import CompanySerializer
from yahoo_finance import Share
import datetime

@csrf_exempt

class Company(object):
    def __init__(self, ticker):
        company = Share(ticker)
        end_date = datetime.date.today().strftime("%Y-%m-%d")
        year_ago = datetime.date.today() - datetime.timedelta(days=365)
        start_date = year_ago.strftime("%Y-%m-%d")
        response  = company.get_historical(start_date, end_date)
        past_year_info = []


        for date in response:
            past_year_info.append([date['Date'], date['Close']])

        self.ticker = ticker
        self.title = company.get_name()
        self.price = company.get_price()
        self.prev_close = company.get_prev_close()
        self.year_high = company.get_year_high()
        self.year_low = company.get_year_low()
        self.change = company.get_change()
        self.percent_change = company.get_percent_change()
        self.volume = company.get_volume()
        self.dividend = company.get_dividend_yield()
        self.earning_share = company.get_earnings_share()
        self.past_year_info = past_year_info



def company_detail(request, ticker):

    response = Share(ticker)
    if response.get_name():

        if request.method == 'GET':
            company = Company(ticker)
            serializer = CompanySerializer(company)
            return JsonResponse(serializer.data)

    else:
        return HttpResponse(status=404)
