from rest_framework import serializers
from fantasy_investing.models import Stock, Portfolio, Investor, User
from yahoo_finance import Share


class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = "__all__"

class PortfolioSerializer(serializers.ModelSerializer):
    stocks = StockSerializer(
        source="get_stocks",
        many=True
    )

    class Meta:
        model = Portfolio
        fields = ('id', 'title', 'main', 'stocks')

class PortfolioFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = ('id', 'title', 'main', 'user')

    def create(self, validated_data):
        portfolio = Portfolio.objects.create(**validated_data)
        portfolio.save()
        return portfolio

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
        p = Portfolio(title="Current Holdings", main=True, user=user)
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
        fields = ('id', 'username', 'investor')
