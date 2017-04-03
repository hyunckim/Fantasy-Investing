from django.db import models

# Create your models here.

class Portfolio(models.Model):
	title = models.CharField=(250);
	user = models.ForeignKey(User, on_delete=model.CASCADE)
