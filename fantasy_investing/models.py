from django.db import models

# Create your models here.

class Portfolio(models.Model):
	title = models.CharField(max_length=250);
	# user = models.ForeignKey(User, on_delete=model.CASCADE)

class Stock(models.Model):
    ticker = models.CharField(max_length=10)
    purchase_price = models.FloatField(default=0)
    purchase_date = models.DateField(auto_now=True)
    number_of_shares = models.IntegerField(default=0)
    portfolio = models.ForeignKey(Portfolio, default = 1, on_delete=models.CASCADE)
