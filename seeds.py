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

tech_watchlist = Portfolio.objects.create(title="Tech Watchlist", main = False, user = guest)
tech_watchlist.save()
bank_watchlist = Portfolio.objects.create(title="Banks Watchlist", main = False, user = guest)
bank_watchlist.save()

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

stock8 = Stock.objects.create(ticker = "AMZN", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = tech_watchlist)
stock8.save()
stock9 = Stock.objects.create(ticker = "DATA", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = tech_watchlist)
stock9.save()
stock10 = Stock.objects.create(ticker = "MSFT", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = tech_watchlist)
stock10.save()
stock11 = Stock.objects.create(ticker = "IBM", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = tech_watchlist)
stock11.save()
stock12 = Stock.objects.create(ticker = "NFLX", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = tech_watchlist)
stock12.save()

stock13 = Stock.objects.create(ticker = "JPM", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = bank_watchlist)
stock13.save()
stock14 = Stock.objects.create(ticker = "C", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = bank_watchlist)
stock14.save()
stock15 = Stock.objects.create(ticker = "BAC", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = bank_watchlist)
stock15.save()
stock16 = Stock.objects.create(ticker = "GS", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = bank_watchlist)
stock16.save()
stock17 = Stock.objects.create(ticker = "WFC", number_of_shares = 0, purchase_date = "2016-11-22", purchase_price = 0, portfolio = bank_watchlist)
stock17.save()
