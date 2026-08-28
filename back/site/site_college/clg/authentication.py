from typing import Optional

from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication, AuthUser
from rest_framework_simplejwt.tokens import Token


class AccessCookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access = request.COOKIES.get("access")
        if access:
            validated = self.get_validated_token(access)
            return self.get_user(validated), validated
        return None