from django.apps import AppConfig

class FantasyInvestingConfig(AppConfig):
    name = 'fantasy_investing'

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        from . import signals
