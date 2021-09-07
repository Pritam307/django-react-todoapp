from os import name
from .forms import AddTodoForm
import json
from datetime import datetime
from django.db import models
from django.shortcuts import render
from .models import TodoModel
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token


def get_todo_list(request):
    todo_db = TodoModel.objects.all()
    result = []
    for item in todo_db:
        obj = {
            "id": item.id,
            "name": item.name,
            "created_at": item.created_at.strftime("%d %b, %Y"),
            "from_date": item.from_date.strftime("%d %b, %Y"),
            "to_date": item.to_date.strftime("%d %b, %Y"),
            "details": item.details,
            "status": item.status
        }
        result.append(obj)

    return JsonResponse(
        {
            "status": "success",
            "data": result,
            "csrf_token": get_token(request)
        },
        safe=False
    )


@csrf_exempt
def add_new_todo(request):
    if request.method == "POST":
        data = json.loads(request.body)
        # print(data)
        new_todo = TodoModel.objects.create(
            name=data['name'],
            created_at=datetime.now(),
            from_date=datetime.strptime(data['startDate'], "%Y-%m-%d"),
            to_date=datetime.strptime(data['endDate'], "%Y-%m-%d"),
            details=data['details'],
            status=data['status']
        )
        result = {
            "id": new_todo.id,
            "name": new_todo.name,
            "created_at": new_todo.created_at.strftime("%d %b, %Y"),
            "from_date": new_todo.from_date.strftime("%d %b, %Y"),
            "to_date": new_todo.to_date.strftime("%d %b, %Y"),
            "details": new_todo.details,
            "status": new_todo.status
        }
        print(result)

        return JsonResponse(
            {
                "status": "success",
                "data": result
            },
            safe=False
        )
    return JsonResponse(
        {
            "status": "error",
        },
        safe=False
    )


@csrf_exempt
def delete_todo_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        if TodoModel.objects.filter(id=data['id']).exists():
            TodoModel.objects.get(id=data['id']).delete()
            return JsonResponse(
                {
                    "status": "success",
                },
                safe=False
            )
        else:
            return JsonResponse(
                {
                    "status": "error",
                },
                safe=False
            )


@csrf_exempt
def edit_todo_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        if TodoModel.objects.filter(id=data['id']).exists():
            todo = TodoModel.objects.get(id=data['id'])
            if 'name' in data:
                todo.name = data['name']
            if 'startDate' in data:
                todo.from_date = datetime.strptime(
                    data['startDate'], "%Y-%m-%d")
            if 'endDate' in data:
                todo.end_date = datetime.strptime(data['endDate'], "%Y-%m-%d")
            if 'details' in data:
                todo.details = data['details']
            if 'status' in data:
                todo.status = data['status']

            todo.save()

            result = {
                "id": todo.id,
                "name": todo.name,
                "created_at": todo.created_at.strftime("%d %b, %Y"),
                "from_date": todo.from_date.strftime("%d %b, %Y"),
                "to_date": todo.to_date.strftime("%d %b, %Y"),
                "details": todo.details,
                "status": todo.status
            }
            # TodoModel.objects.get(id=data['id']).delete()
            return JsonResponse(
                {
                    "status": "success",
                    "data": result
                },
                safe=False
            )
        else:
            return JsonResponse(
                {
                    "status": "error",
                },
                safe=False
            )
