from rest_framework import serializers
from django.contrib.auth import authenticate, password_validation
from .models import Schedule, SelectiveSubject

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True) 

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError('Неправильна електронна пошта або пароль')
            if not user.is_active:
                raise serializers.ValidationError('Обліковий запис не активний')
        else:
            raise serializers.ValidationError('Неправильна електронна пошта або пароль')

        data['user'] = user
        return data

class ScheduleSerializer(serializers.ModelSerializer):
    group = serializers.StringRelatedField()
    teacher = serializers.StringRelatedField()

    class Meta:
        model = Schedule
        fields = ['group', 'subject', 'number', 'day', 'week', 'teacher', 'aim', 'type', 'place']

class SelectiveSubjectSerializer(serializers.ModelSerializer):
    group = serializers.StringRelatedField()

    class Meta:
        model = SelectiveSubject
        fields = ['group', 'subject', 'teacher', 'info']

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate(self, data):
        password_validation.validate_password(data['new_password'])
        return data
