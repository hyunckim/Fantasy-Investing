from rest_framework import serializers
from fantasy_investing.models import Stock, Portfolio, Investor, User

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('id', 'title')

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ('ticker', 'purchase_price', 'purchase_date', 'number_of_shares', 'portfolio')

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
        p = Potfolio(title="Current holdings", main=True, user=user)
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
