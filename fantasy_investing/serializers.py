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
    prev_close = serializers.FloatField(default=0)
    year_high = serializers.FloatField(default=0)
    year_low = serializers.FloatField(default=0)
    change = serializers.FloatField(default=0)
    percent_change = serializers.CharField(max_length=100)
    volume = serializers.IntegerField(default=0)
    dividend = serializers.FloatField(default=0)
    earning_share = serializers.FloatField(default=0)
    past_year_info = serializers.ListField(default=[])
