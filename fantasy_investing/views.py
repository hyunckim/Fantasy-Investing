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


class UserRegisterView(AtomicMixin, CreateModelMixin, GenericAPIView):

    serializer_class = UserRegistrationSerializer
    authentication_classes = ()

    def post(self, request):
        """User registration view."""
        return self.create(request)

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




    # def post(self, request):
    #     data = JSONParser().parse(request)
    #     serializer = UserSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer('username', 'first_name', 'last_name').save()
    #         # login_user(request)
    #         return Response(serializer.data)
    #     return Response(serializers.errors, status=422)

# class UserLoginView(APIView):
#
#     def post(self, request):
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return Response(serializer.data)
#         return Response(serializers.errors, status=401)
