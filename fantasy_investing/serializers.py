from rest_framework import serializers
from fantasy_investing.models import Stock, Portfolio

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('id', 'title', 'stock_set')

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'purchase_price', 'purchase_date', 'number_of_shares', 'portfolio')
