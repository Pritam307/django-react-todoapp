from rest_framework import serializers


class AddTodoSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
