from django.contrib.auth.password_validation import validate_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .serializers import LoginSerializer, ScheduleSerializer, SelectiveSubjectSerializer, ChangePasswordSerializer
from .models import Schedule, SelectiveSubject

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request' : request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            response = Response({
                'user' : {
                    'name' : user.name,
                    'group' : user.group.name
                }
            })
            response.set_cookie(
                key = 'access',
                value=str(access),
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=300
            )

            response.set_cookie(
                key='refresh',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=86400
            )

            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ScheduleView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if user.group is None:
            return Response({'Неіснуюча група.'}, status=status.HTTP_400_BAD_REQUEST)
        if user.group == 'teacher':
            schedule = Schedule.objects.filter(group=user.group, teacher=user.name).order_by('day', 'number')
            serializer = ScheduleSerializer(schedule, many=True)
            return Response(serializer.data)
        schedule = Schedule.objects.filter(group=user.group).order_by('day', 'number')
        serializer = ScheduleSerializer(schedule, many=True)
        return Response(serializer.data)

class SelectiveSubjectView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.group is None:
            return Response({"Неіснуюча група."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            first_selected = SelectiveSubject.objects.get(group=user.group, subject=user.first_selective)
            second_selected = SelectiveSubject.objects.get(group=user.group, subject=user.second_selective)
            first_serializer = SelectiveSubjectSerializer(first_selected)
            second_serializer = SelectiveSubjectSerializer(second_selected)
            return Response({'selected_subjects' : {
                'first_selected' : first_serializer.data,
                'second_selected' : second_serializer.data
            }})
        except:
            selective_subject = SelectiveSubject.objects.filter(group=user.group).order_by('group', 'subject')
            serializer = SelectiveSubjectSerializer(selective_subject, many=True)
            return Response({"available_subjects" : serializer.data})

    def put(self, request):
        first_id = request.data.get('first_selective_id')
        second_id = request.data.get('second_selective_id')

        if not first_id or not second_id:
            return Response({"Потрібно обрати два предмети."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            first_selected = SelectiveSubject.objects.get(id = first_id)
            second_selected = SelectiveSubject.objects.get(id = second_id)
        except:
            return Response({"Обрано неіснуючі предмети."}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        user.first_selective=first_selected.name
        user.second_selective=second_selected.name
        user.save()
        return Response({
            "first_selected" : user.first_selective,
            "second_selected" : user.second_selective
        })

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        user=request.user
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            print(type(new_password))
            if not user.check_password(old_password):
                return Response({"old_password" : "Неправильний пароль"}, status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            return Response({"response" : "Новий пароль встановлено"})

        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.COOKIES.get("refresh")
            if not refresh_token:
                return Response({"response": "Refresh token відсутній"}, status.HTTP_400_BAD_REQUEST)

            RefreshToken(refresh_token).blacklist()
            response = Response({"response" : "Вихід з акаунту успішно виконано"})
            response.delete_cookie("access", samesite="Lax")
            response.delete_cookie("refresh", samesite="Lax")
            return response

        except TokenError: return Response({"response": "Refresh token не дійсний"}, status.HTTP_400_BAD_REQUEST)

class RefreshTokenCookieView(APIView):
    def post(self, request):
        try:
            refresh_token = request.COOKIES.get("refresh")
            if not refresh_token:
                return Response({"response": "Refresh token відсутній"}, status.HTTP_400_BAD_REQUEST)
            refresh = RefreshToken(refresh_token)
            response = Response({'response' : 'Access оновлено'})
            response.set_cookie(
                key='access',
                value=refresh.access_token,
                httponly=True,
                secure=True,
                samesite='Lax',
                max_age=300
            )
            return response
        except TokenError: return Response({"response": "Refresh token не дійсний"}, status.HTTP_400_BAD_REQUEST)
