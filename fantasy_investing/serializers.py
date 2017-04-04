from rest_framework import serializers
from fantasy_investing.models import Stock, Portfolio

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('id', 'title')

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'purchase_price', 'purchase_date', 'number_of_shares', 'portfolio')

class CompanySerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=10)
    title = serializers.CharField(max_length=100)
    price = serializers.FloatField(default=0)
