from django.http import HttpResponse

from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from fantasy_investing.serializers import UserRegistrationSerializer, UserLoginSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
# from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from .utils import AtomicMixin
from fantasy_investing.models import Investor


class UserRegisterView(AtomicMixin, CreateModelMixin, GenericAPIView):

    serializer_class = UserRegistrationSerializer
    authentication_classes = ()

    def post(self, request):
        self.create(request)
        # investor = Investor.objects.get(u/ser=user)
        # return [user, investor.balance]
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            serializers = UserLoginSerializer(user)
            if user.is_active:
                login(request, user)
                return Response(serializer.data)
        return HttpResponse(status=422)

        return user

class UserLoginView(APIView):

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            serializer = UserLoginSerializer(user)
            if user.is_active:
                login(request, user)
                return Response(serializer.data)
        return HttpResponse(status=422)
