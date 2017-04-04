from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.views.generic import View
from .forms import UserForm

class UserFormView(View):
    # form_class = UserForm
    # template_name = 'fantasy_investing/login_form.html'

    def get(self, request):
        username = request.GET['username']
        password = request.GET


        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        user = {}
        user['username'] = request.POST['username']
        user['password'] = request.POST['password']
        user['email'] = request.POST['email']
        user['balance'] = request.POST['balance']

        if user.save()
            return render()
