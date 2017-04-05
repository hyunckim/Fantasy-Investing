from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save

class Portfolio(models.Model):
    title = models.CharField(max_length=250)
    pass
	# user = models.ForeignKey(User, on_delete=model.CASCADE)

class Stock(models.Model):
    ticker = models.CharField(max_length=10)
    purchase_price = models.FloatField(default=0)
    purchase_date = models.DateField(auto_now=True)
    number_of_shares = models.IntegerField(default=0)
    portfolio = models.ForeignKey(Portfolio, default = 1, on_delete=models.CASCADE)

class Investor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.IntegerField(default=100000)
