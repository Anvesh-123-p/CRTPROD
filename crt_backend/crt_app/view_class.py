from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import *
from .serializers import *


class ClassDetailView(APIView):
    def get(self, request, *args, **kwargs):
        class_id = request.query_params.get('class_id')
        dept_id=request.query_params.get('dept')
        if dept_id:
            queryset = Class.objects.filter(

            dept=dept_id
        )
            serializer = ClassSerializer(queryset, many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)


        if not class_id:
            services = Class.objects.all()
            response = ClassSerializer(services, many=True)
            print(response)
            return Response({"data": response.data}, status=200)

        else:
            class_id = request.query_params.get('class_id')

            if not class_id:
                return Response({"error": "Class ID is required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                # Fetch the class object
                cls = Class.objects.get(class_id=class_id)

                # Count total subjects for the class
                subjects = Subject.objects.filter(class_id=class_id)
                total_subjects = subjects.count()

                # Initialize counters
                total_lesson_plans = 0
                active_lesson_plans = 0
                inactive_lesson_plans = 0

                # Iterate through subjects to count lesson plans
                for sub in subjects:
                    lesson_plans = LessonPlan.objects.filter(subject_id=sub)
                    total_lesson_plans += lesson_plans.count()
                    active_lesson_plans += lesson_plans.filter(status='AC').count()
                    inactive_lesson_plans += lesson_plans.filter(status='IA').count()

                # Prepare the result dictionary
                result = {
                    'total_subjects': total_subjects,
                    'total_lesson_plans': total_lesson_plans,
                    'active_lesson_plans': active_lesson_plans,
                    'inactive_lesson_plans': inactive_lesson_plans
                }

                return Response(result)
            except Class.DoesNotExist:
                return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        # Create a new class
        print("Hye")
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        # Partially update a class
        class_id = request.data.get('class_id')
        if not class_id:
            return Response({"error": "class_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            class_instance = Class.objects.get(class_id=class_id)
        except Class.DoesNotExist:
            return Response({"error": "Class not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClassSerializer(class_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        # Delete a class
        class_id = request.query_params.get('class_id')
        if not class_id:
            return Response({"error": "class_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            class_instance = Class.objects.get(class_id=class_id)
            class_name=str(class_instance.sem)+" - "+class_instance.dept+" - "+class_instance.sec
            class_instance.delete()
            return Response({"status": "success", "data": "class with name "+class_name+" deleted succesfully"}, status=200)
        except Class.DoesNotExist:
            return Response({"error": "Class not found."}, status=status.HTTP_404_NOT_FOUND)
