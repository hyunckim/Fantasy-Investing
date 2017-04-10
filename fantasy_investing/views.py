from django.http import HttpResponse, JsonResponse

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from fantasy_investing.serializers import UserRegistrationSerializer, \
    UserLoginSerializer, StockSerializer, InvestorSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from .utils import AtomicMixin
from fantasy_investing.models import Investor
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from fantasy_investing.serializers import CompanySerializer
from yahoo_finance import Share
from fantasy_investing.serializers import PortfolioSerializer, PortfolioFormSerializer
from fantasy_investing.models import Portfolio
from fantasy_investing.serializers import StockPriceSerializer
import datetime
from fantasy_investing.models import Investor, Stock
import pdb

@csrf_exempt


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

def portfolio_index(request):
    try:
        portfolio_list = Portfolio.objects.filter(user = request.user)
    except portfolio_list.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == "GET":
        serializer = PortfolioSerializer(portfolio_list, many=True)
        return JsonResponse(serializer.data, safe=False)

class PortfolioView(CreateModelMixin, GenericAPIView):
    serializer_class = PortfolioFormSerializer
    def post(self, request):
        return self.create(request)
    def delete(self, request):
        p = Portfolio.objects.get(pk=request.POST.get('id', False))
        if p:
            p.delete()
            return HttpResponse(status=200)
        else:
            return HttpResponse("User does not have portfolio", status=404)


def portfolio_detail(request, pk):
    try:
        portfolio = Portfolio.objects.get(pk=pk)
    except portfolio.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == "GET":
        serializer = PortfolioSerializer(portfolio)
        return JsonResponse(serializer.data)

class Company(object):
    def __init__(self, ticker, detail=False):
        company = Share(ticker)

        if detail==True:
            end_date = datetime.date.today().strftime("%Y-%m-%d")
            year_ago = datetime.date.today() - datetime.timedelta(days=365)
            start_date = year_ago.strftime("%Y-%m-%d")
            response  = company.get_historical(start_date, end_date)
            past_year_info = []

            for element in response:
                date = datetime.datetime.strptime(element['Date'], '%Y-%m-%d').strftime('%d-%b-%y')
                past_year_info.append({ 'date': date, 'close': element['Close'] })

            self.ticker = ticker
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

        self.title = company.get_name()
        self.price = company.get_price()

def company_detail(request, ticker):

    company = Company(ticker, detail=True)
    if company.title:

        if request.method == 'GET':
            serializer = CompanySerializer(company)
            return JsonResponse(serializer.data)

    else:
        return HttpResponse(status=404)

class StockView(CreateModelMixin, GenericAPIView):

    serializer_class = StockSerializer

    def post(self, request):
        ticker = request.POST.get('ticker', False)
        purchase_date = request.POST.get('purchase_date', False)
        purchase_price = request.POST.get('purchase_price', False)
        number_of_shares = request.POST.get('number_of_shares', False)
        stock = Stock.objects.create(ticker = ticker, purchase_price = purchase_price,
            purchase_date = purchase_date, number_of_shares = number_of_shares,
            portfolio = Portfolio.objects.get(pk=request.POST.get('portfolio[id]', False)))
        serializer = StockSerializer(stock)
        if serializer.is_valid:
            stock.save()
            return Response(serializer.data)
        else:
            return HttpResponse("Invalid stock", status=404)

    def patch(self, request):
        instance = Stock.objects.get(pk=request.POST.get('id', False))
        instance.ticker = request.POST.get('ticker', instance.ticker)
        instance.purchase_price = request.POST.get('purchase_price', instance.purchase_price)
        instance.purchase_date = request.POST.get('purchase_date', instance.purchase_date)
        instance.number_of_shares = request.POST.get('number_of_shares', instance.number_of_shares)
        serializer = StockSerializer(instance)
        if serializer.is_valid:
            instance.save()
            return Response(serializer.data)
        else:
            return HttpResponse("Invalid stock info", status=404)

    def delete(self, request):
        s = Stock.objects.get(pk=request.POST.get('id', False))
        if s:
            s.delete()

            return HttpResponse(status=200)
        else:
            return HttpResponse("Stock is not in your portfolio", status=404)


class InvestorView(GenericAPIView):

    serializer_class = InvestorSerializer

    def patch(self, request):
        instance = Investor.objects.get(pk=request.POST.get('id', False))
        instance.balance = request.POST.get('balance', instance.balance)
        serializer = InvestorSerializer(instance)
        if serializer.is_valid:
            instance.save()
            return Response(serializer.data)
        else:
            return HttpResponse("Invalid info", status=404)

def stock_price(request, ticker):

    stock = Company(ticker)
    if stock.title:

        if request.method == 'GET':
            serializer = StockPriceSerializer(stock)
            return JsonResponse(serializer.data)

    else:
        return HttpResponse(status=404)
