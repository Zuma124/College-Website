from .models import User, Group, Schedule, SelectiveSubject
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms
from import_export import resources
from import_export.admin import ExportMixin

class CustomUserChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'name', 'first_selective', 'second_selective', 'group', 'is_active', 'is_staff')

class CustomUserCreationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('email', 'name', 'first_selective', 'second_selective', 'group', 'is_active', 'is_staff')

class CustomUserResource(resources.ModelResource):
    class Meta:
        model = User
        fields = ('id', 'group__name', 'name', 'first_selective', 'second_selective')

class CustomUserAdmin(ExportMixin, UserAdmin):
    add_form = CustomUserCreationForm
    resource_class = CustomUserResource
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'name', 'is_staff', 'is_active', 'first_selective', 'second_selective', 'group')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'name')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('name', 'first_selective', 'second_selective', 'group')}),
        ('Permissions', {'fields': ('is_active', 'is_staff')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password', 'first_selective', 'second_selective', 'group', 'is_active', 'is_staff'),
        }),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Group)
admin.site.register(Schedule)
admin.site.register(SelectiveSubject)