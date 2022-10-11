from django import forms
from django.contrib.auth.forms import get_user_model
from django.contrib.auth.forms import ReadOnlyPasswordHashField

User = get_user_model()

class RegisterForm(forms.ModelForm):
    """
    Default form
    """
    
    password = forms.CharField(widget=forms.PasswordInput)
    password_2 = forms.CharField(label='Comfirm Password', widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ['email']
        
    def clean_email(self):
        """Verify email is available"""
        email = self.cleaned_data.get('email')
        qs = User.objects.filter(email=email)
        if qs.exists():
            raise forms.ValidationError("Ten email jest już zajęty")
        return email


    def clean(self):
        """Checks if paswords match"""
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_2 = cleaned_data.get("password_2")
        if password is not None and password != password_2:
            self.add_error("password_2", "Hasła różnią się od siebie :-/")
        return cleaned_data
    
class AuserAdminCreationForm(forms.ModelForm):
    """
    A form for creating new users. Includes all the required
    fields, plus a repeated password.
    """
    password = forms.CharField(widget=forms.PasswordInput)
    password_2 = forms.CharField(label='Comfirm Password', widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ['email']
        
    def clean(self):
        """Checks if paswords match"""
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_2 = cleaned_data.get("password_2")
        if password is not None and password != password_2:
            self.add_error("password_2", "Your passwords must match")
        return cleaned_data

    def save(self, commit=True):
        # Save the provided passwd in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user
    
class UserAdminChangeForm(forms.Modelform):
    """A form for updating users. Includes all the fields on
    the user, but replaces the passwd field with admin's
    password hash display field.
    """

    password = ReadOnlyPasswordHashField()
    
    class meta:
        model = User
        fields = ['email', 'password', 'is_active', 'admin']
        
    def clean_password(self):
        """Regardless of what the user provides, return the initial value.
        This is done here, rather than on the field, because the
        field does not have access to the initial value
        """
        return self.initial["password"]
            