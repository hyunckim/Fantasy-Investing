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
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        investor = Investor(user=user, balance=100000)
        if user.save():
            investor.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=15)

class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = ('id', 'balance', 'user')
