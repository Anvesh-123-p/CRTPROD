from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import College
from .serializers import CollegeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework import status
import smtplib
from django.core.exceptions import ValidationError
import random
import string



def generate_reset_code():
        code = ''.join(random.choices(string.digits, k=6))
        return code
def send_reset_email(email, reset_code):
        # Send an email with the reset code using smtplib
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login("crtproject258@gmail.com", "lxiz muyd zast abwg")
        subject = "Password Reset Code"
        message = f"Subject: {subject}\n\nYour New Password is {reset_code}. Please enter this password to login and update in edit profile navigation."
        server.sendmail("crtproject258@gmail.com", email, message)
        server.quit()
class PasswordForgetView(APIView):
    def get(self, request):
        email = request.query_params.get('email')
        try:
                
            user = User.objects.get(email=email)
            print(user)
        except User.DoesNotExist:
            raise ValidationError("No user with this email address exists.")
        if user:
            try:
                reset_code = generate_reset_code()
                user.password = reset_code+"Reset@12"
                send_reset_email(email, reset_code+"@12ResetPassword34")
                user.save()
                return Response({"message": "Password Reset Successful"}, status=status.HTTP_200_OK)
            except ValidationError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        