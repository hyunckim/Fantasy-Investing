import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")
django.setup()

from django.contrib.auth.models import User
from fantasy_investing.models import Investor, Stock, Portfolio

# User.objects.all().delete()
# Investor.objects.all().delete()
# Portfolio.objects.all().delete()
# Stock.objects.all().delete()

# guest = User.objects.create(username = "Guest", password = "password")

guest = User.objects.get(username = "Guest")
guest_portfolio = Portfolio.objects.get(main = True)

# guest_portfolio = Portfolio.objects.create(title = "Current Holdings", main = True, user = guest)

stock1 = Stock.objects.create(ticker = "AAPL", number_of_shares = 50, purchase_date = "2017-1-26", purchase_price = 121.94, portfolio = guest_portfolio)
stock1.save()
stock2 = Stock.objects.create(ticker = "KMI", number_of_shares = 240, purchase_date = "2017-2-3", purchase_price = 22.94, portfolio = guest_portfolio)
stock2.save()
stock3 = Stock.objects.create(ticker = "MS", number_of_shares = 125, purchase_date = "2016-10-21", purchase_price = 33.44, portfolio = guest_portfolio)
stock3.save()
stock4 = Stock.objects.create(ticker = "GOOGL", number_of_shares = 10, purchase_date = "2017-3-17", purchase_price = 872.37, portfolio = guest_portfolio)
stock4.save()
stock5 = Stock.objects.create(ticker = "FB", number_of_shares = 54, purchase_date = "2016-4-15", purchase_price = 109.64, portfolio = guest_portfolio)
stock5.save()
stock6 = Stock.objects.create(ticker = "GILD", number_of_shares = 71, purchase_date = "2017-2-3", purchase_price = 72.34, portfolio = guest_portfolio)
stock6.save()
stock7 = Stock.objects.create(ticker = "GM", number_of_shares = 143, purchase_date = "2016-11-22", purchase_price = 33.81, portfolio = guest_portfolio)
stock7.save()   
