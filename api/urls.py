from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
from .views import get_todo_list, add_new_todo, delete_todo_view, edit_todo_view

urlpatterns = [
    path('get_list', get_todo_list, name="get_list"),
    path('add_todo', add_new_todo, name="add_todo"),
    path('delete_todo', delete_todo_view, name="delete_todo"),
    path('edit_todo', edit_todo_view, name="edit_todo"),
]
