from django.db import models

class Portfolio(models.Model):
	title = models.CharField=(250);
	user = models.ForeignKey(User, on_delete=model.CASCADE)
class Stock(models.Model):
    ticker = models.CharField(max_length=10)
    purchase_price = models.FloatField(blank=False, default=0)
    purchase_date = models.DateField(auto_now=True)
    number_of_shares = models.IntegerField(blank=False, default=0)
    # portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
