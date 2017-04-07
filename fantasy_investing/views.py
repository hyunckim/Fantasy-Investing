from django.http import HttpResponse, JsonResponse

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from fantasy_investing.serializers import UserRegistrationSerializer, UserLoginSerializer, StockSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
# from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from .utils import AtomicMixin
from fantasy_investing.models import Investor
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from fantasy_investing.serializers import CompanySerializer
from yahoo_finance import Share
import datetime
from fantasy_investing.models import Investor

# @csrf_exempt

def auth(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        serializer = UserLoginSerializer(user)
        if user.is_active:
            login(request, user)
            return Response(serializer.data)
    return HttpResponse("Invalid credentials", status=422)


class UserRegisterView(AtomicMixin, CreateModelMixin, GenericAPIView):

    serializer_class = UserRegistrationSerializer
    authentication_classes = ()

    def post(self, request):
        self.create(request)
        return auth(request)

class UserSessionView(APIView):

    def post(self, request):
        return auth(request)

    def delete(self, request):
        if request.user:
            logout(request)
            return HttpResponse(status=200)
        else:
            return HttpResponse("There is no user to log out", status=404)

class Company(object):
    def __init__(self, ticker):
        company = Share(ticker)
        end_date = datetime.date.today().strftime("%Y-%m-%d")
        year_ago = datetime.date.today() - datetime.timedelta(days=365)
        start_date = year_ago.strftime("%Y-%m-%d")
        response  = company.get_historical(start_date, end_date)
        past_year_info = []

        for element in response:
            date = datetime.datetime.strptime(element['Date'], '%Y-%m-%d').strftime('%d-%b-%y')
            past_year_info.append({ 'date': date, 'close': element['Close'] })

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
        self.EPS_next_quarter = company.get_EPS_estimate_next_quarter()
        self.EPS_next_year = company.get_EPS_estimate_next_year()
        self.EPS_estimate_curr_year = company.get_price_EPS_estimate_current_year()
        self.EPS_estimate_next_year = company.get_price_EPS_estimate_next_year()
        self.earnings_growth_ratio = company.get_price_earnings_growth_ratio()

def company_detail(request, ticker):

    response = Share(ticker)
    if response.get_name():

        if request.method == 'GET':
            company = Company(ticker)
            serializer = CompanySerializer(company)
            return JsonResponse(serializer.data)

    else:
        return HttpResponse(status=404)

class StockView(CreateModelMixin, GenericAPIView):

    serializer_class = StockSerializer

    def post(self, request):
        return self.create(request)

    def patch(self, request):
        return self.update(request)

    def delete(self, request):
        s = Stock.objects.get(pk=request.DELETE['id'])
        if s:
            Stock.objects.delete(s)
            return HttpResponse(status=200)
        else:
            return HttpResponse("Stock is not in your portfolio", status=404)
