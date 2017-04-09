from rest_framework import serializers
from fantasy_investing.models import Stock, Portfolio, Investor, User
from yahoo_finance import Share


# class PortfolioIndexSerializer(serializers.Serializer):
#     portfolios = serializers.ListField(default=[])

class StockSerializer(serializers.ModelSerializer):

    current_price = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()

    class Meta:
        model = Stock
        # fields = ('ticker', 'purchase_price', 'purchase_date', 'number_of_shares')
        fields = '__all__'

    def create(self, validated_data):
        stock = Stock.objects.create(**validated_data)
        stock.save()
        return stock

    def update(self, instance, validated_data):
        instance.ticker = validated_data.get('ticker', instance.ticker)
        instance.purchase_price = validated_data.get('purchase_price', instance.purchase_price)
        instance.purchase_date = validated_data.get('purchase_date', instance.purchase_date)
        instance.number_of_shares = validated_data.get('number_of_shares', instance.number_of_shares)
        instance.save()
        return instance

    def get_current_price(self, obj):
        stock = Share(obj.ticker)
        return float(stock.get_price())

    def get_title(self, obj):
        stock = Share(obj.ticker)
        return stock.get_name()

class PortfolioSerializer(serializers.ModelSerializer):
    stocks = StockSerializer(
        source="get_stocks",
        many=True
    )
    class Meta:
        model = Portfolio
        fields = ('id', 'title', 'main', 'stocks')

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        investor = Investor(user=user, balance=100000)
        user.save()
        investor.save()
        p = Portfolio(title="Current holdings", main=True, user=user)
        p.save()
        return user

class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = '__all__'

class UserLoginSerializer(serializers.ModelSerializer):

    investor = InvestorSerializer()

    class Meta:
        model = User
        fields = ('username', 'investor')

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
    EPS_next_quarter = serializers.CharField(max_length=10)
    EPS_next_year = serializers.CharField(max_length=10)
    EPS_estimate_curr_year = serializers.CharField(max_length=10)
    EPS_estimate_next_year = serializers.CharField(max_length=10)
    earnings_growth_ratio = serializers.CharField(max_length=10)