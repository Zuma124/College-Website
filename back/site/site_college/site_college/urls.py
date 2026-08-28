from clg.views import ScheduleView, SelectiveSubjectView, LoginView, ChangePasswordView, LogoutView, RefreshTokenCookieView
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', RefreshTokenCookieView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/schedule/', ScheduleView.as_view(), name='schedule'),
    path('api/selective_subject/', SelectiveSubjectView.as_view(), name='selective_subject'),
    path('api/change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('api/logout/', LogoutView.as_view(), name='logout')
]


