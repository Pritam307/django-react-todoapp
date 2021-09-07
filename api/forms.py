from django import forms


class AddTodoForm(forms.Form):
    name = forms.CharField(max_length=30)
    created_at = forms.CharField(max_length=30)
    from_date = forms.CharField(max_length=30)
    to_date = forms.CharField(max_length=30)
    details = forms.CharField(max_length=100)
    status = forms.CharField(max_length=30)
