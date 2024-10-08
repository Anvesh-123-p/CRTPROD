from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
import smtplib
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

def validate_password(password):
    if len(password) < 8:
        return False
    if not re.search("[a-z]", password):
        return False
    if not re.search("[A-Z]", password):
        return False
    if not re.search("[0-9]", password):
        return False
    return True
def sendmail(stu_name,approval_type,old_data,new_data):
    server =smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login("crtproject258@gmail.com","lxiz muyd zast abwg")
    message=stu_name + " has sent a apprval request with type "+approval_type+" changing from "+old_data+" to "+new_data
    server.sendmail("crtproject258@gmail.com","hruthika.sa258@gmail.com",message)
    print("hi")

def sendmail_response(stu_name,approval_type,old_data,new_data):
    server =smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()
    server.login("crtproject258@gmail.com","lxiz muyd zast abwg")
    message=stu_name + " has approved request with type "+approval_type+" changing from "+old_data+" to "+new_data
    server.sendmail("crtproject258@gmail.com","hruthika.sa258@gmail.com",message)
    print("hi")


class UserView(APIView):

    def get(self, request):
        param = request.GET
        email = param.get('email')
        password = param.get('password')

        if email and password:
            try:
                user = User.objects.get(email=email)
                # Directly compare the password
                if user.password == password:
                    if user.status == 'AC':
                        services = User.objects.filter(email=email)
                        response = UserSerializer(services, many=True)
                        return Response({"data": response.data}, status=200)
                    else:
                        return Response({"status": "error", "message": "User is not active"}, status=403)
                else:
                    return Response({"status": "error", "message": "Invalid credentials"}, status=401)
            except User.DoesNotExist:
                return Response({"status": "error", "message": "User not found"}, status=400)

        # Filter users by status and department (for students only)
        if param.get('user_type') == 'ST' and param.get('status') == 'NAC':
            department = param.get('dept')
            queryset = User.objects.filter(
                user_type='ST',
                status='NAC',
                dept=department
            )
            serializer = UserSerializer(queryset, many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)
        if param.get('user_type')  and param.get('dept'):
            department = param.get('dept')
            typpee=param.get('user_type')
            if(typpee=='ST'):
                    queryset = User.objects.filter(
                

                    user_type=typpee,
                    status='AC',
                    dept=department)
            elif(typpee=='HOD'):
                    queryset = User.objects.filter(

                    user_type=typpee,
                    status='AC',
                    dept=department)
            else:
                    queryset = User.objects.filter(
                    ~Q(user_type='ST'),
                    status='AC',
                    dept=department
               

            )
            serializer = UserSerializer(queryset, many=True)
            for i in serializer.data:
                item30 = Subject.objects.filter(faculty_id=i['id'])
                serializere = SubjectSerializer(item30,many=True)
                l=[]
                for j in serializere.data:
                    l.append(j['name'])
                i['subjects']=l


            return Response({"status": "success", "data": serializer.data}, status=200)

        # Filter by specific fields
        if param.get('email'):
            item = get_object_or_404(User, email=param.get('email'))
            serializer = UserSerializer(item)
            
            item30 = Subject.objects.filter(faculty_id=serializer.data['id'])
            serializere = SubjectSerializer(item30,many=True)
            l=[]
            c=[]
            k=[]
            daya=[]
            for j in serializere.data:
                l.append(j['name'])
                daya.append(j['sub_id'])
                if(j['class_id'] not in k):
                    item33 = get_object_or_404(Class, class_id=j['class_id'])        
                    cs = ClassSerializer(item33)
                    h=cs.data
                
                    c.append(str(h['sem'])+str(h['dept'])+"--"+h['sec'])
                    k.append(j['class_id'])


            d=serializer.data
            d['subjects']=l
            d['classes']=c
            print(d)
            print(daya,"(((((((((())))))))))")
            daya2=[]

            for i in daya:
                try:
                    lp33 = get_object_or_404(LessonPlan, subject_id=i)   
                    ls = LessonPlanSerializer(lp33)
                    daya2.append(ls.data['id'])
                except:
                    pass
            print(daya2)
            final=[]
            for i in range(0,len(daya2)):
                sub={'Completed':0,
                'NotStarted':0,
                'Pending':0,
                'Total':0}
                topic30 = Topic.objects.filter(LessonPlan_id=daya2[i])   
                ts = TopicSerializer(topic30,many=True)
                total=len(ts.data)
                sub['Total']=total
                sub['Subject']=l[i]

                for i in ts.data:
                    if(i['status']=='Completed'):
                        sub['Completed']=sub['Completed']+1
                    elif(i['status']=='Pending'):
                        sub['Pending']=sub['Pending']+1
                    elif(i['status']=='Not Started'):
                        sub['NotStarted']=sub['NotStarted']+1

                

                final.append(sub)
                print(final)







            return Response({"status": "success", "data": d,"data2":final}, status=200)
        if param.get('id'):
            item = get_object_or_404(User, id=param.get('id'))
            serializer = UserSerializer(item)
            return Response({"status": "success", "data": serializer.data}, status=200)
        elif param.get('name'):
            item = User.objects.filter(name=param.get('name'))
            serializer = UserSerializer(item, many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)

        elif param.get('college_name'):
            item = User.objects.filter(clg_name=param.get('college_name'))
            serializer = UserSerializer(item, many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)

        elif param.get('ids'):
            ids = param.get('ids').split(',')
            res = []
            for i in ids:
                item = get_object_or_404(User, id=i)
                serializer = UserSerializer(item)
                res.append(serializer.data)
            return Response({"status": "success", "data": res}, status=200)

        elif param.get('dept'):
            item = User.objects.filter(dept=param.get('dept'))
            serializer = UserSerializer(item, many=True)
            return Response({"status": "success", "data": serializer.data}, status=200)

        # Default: return all users
        services = User.objects.all()
        response = UserSerializer(services, many=True)
        return Response({"data": response.data}, status=200)

    def post(self, request):
        data = request.data
    
        try:
            serializer = UserSerializer(data=data)
            if(not validate_password(data['password'])):
                return Response({"message": "Password should have at least 8 characters, including uppercase, lowercase, and a number."}, status=404)


            serializer.is_valid(raise_exception=True)


            user = serializer.save()
            if data.get("user_type") == 'ST':
                if(len(data.get("mobile_number"))!=10):
                    return Response({"status": "error", "message": "Incorrect Mobile Number"}, status=400)

                hod = User.objects.get(user_type='HOD', dept=data["dept"])
                print(hod.email)

                Approval.objects.create(
                    user_email=data["email"],
                    user_name=data["name"],
                    roll_number=data["roll_number"],
                    hod_id=hod,
                    dept=data["dept"],
                    status='pending',
                    approval_type='new_stu_account',
                    old_data="NO ACCOUNT",
                    new_data=data
                )
                try:
                    sendmail(data["name"], 'new_stu_account', "NO ACCOUNT", "New student Account")
                except:
                    pass
            elif data.get("user_type") == 'FAC':
                if(len(data.get("mobile_number"))!=10):
                    return Response({"status": "error", "message": "Incorrect Mobile Number"}, status=400)
                hod = User.objects.get(user_type='HOD', dept=data["dept"])
                print(hod.email)
                user = serializer.save()
                Approval.objects.create(
                    user_email=data["email"],
                    user_name=data["name"],
                    hod_id=hod,
                    dept=data["dept"],
                    status='pending',
                    approval_type='new_fac_account',
                    old_data="NO ACCOUNT",
                    new_data=data
                )
                
                try:
                    sendmail(data["name"], 'New faculty Account', "NO ACCOUNT", new_data)
                except:
                    pass
            

        except User.DoesNotExist:
            return Response({"status": "error", "message": "No HOD found for the department"}, status=404)

        return Response(serializer.data, status=201)


    def patch(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response(
                {"status": "error", "message": "User email is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"status": "error", "message": "User not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

        # Determine the fields to update based on user type
        # existing_values = {
        #     'name': user.name,
        #     'dept': user.dept,
        #     'email': user.email,
        #     'gender': user.gender,
        #     'mobile_number': user.mobile_number,
        #     'password': user.password,
        #     'user_type': user.user_type,
        #     'status': user.status,
        #     'clg_name': user.clg_name,
        #     'class_id': user.class_id,
        #     'profile_photo': user.profile_photo
        # }
        #
        # if user.user_type == 'ST':
        #     existing_values.update({
        #         'roll_number': user.roll_number,
        #         'graduation_year': user.graduation_year
        #     })
        # else:
        #     existing_values.update({
        #
        #         'designation': user.designation,
        #         'qualification': user.qualification,
        #         'experience': user.experience
        #     })
        #
        # # Update existing values with request data
        # updated_fields = {key: value for key, value in request.data.items() if key in existing_values}
        # updated_fields['status'] = existing_values['status']  # Status shouldn't change
        #
        # # Serialize and save the user with updated fields

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": UserSerializer(user).data}, status=200)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=400)

    def delete(self, request):
        param = request.GET
        item = None
        if param.get('id'):
            item = get_object_or_404(User, id=param.get('id'))
        elif param.get('email'):
            item = get_object_or_404(User, email=param.get('email'))
        item.delete()
        return Response({"status": "success", "data": "User Succesfully Deleted"}, status=200)







class FacultyStatsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        dept = request.query_params.get('dept')

        if not dept:
            return Response({"error": "Department not provided"}, status=400)

        # Filter users by department and user type
        faculty_members = User.objects.filter(dept=dept, user_type='FAC')
        print(faculty_members)
        # Get the counts of PhDs and non-PhDs
        total_faculty = faculty_members.count()
        phds = faculty_members.filter(qualification__icontains='phd').count()
        non_phds = total_faculty - 1

        return Response({
            'department': dept,
            'total_faculty': total_faculty,
            'phds': phds,
            'non_phds': non_phds,
        })
    
from django.db.models import Count

class get_faculty_subjects(APIView):
    def get(self, request, *args, **kwargs):
        # Get department from query parameters
        dept = request.query_params.get('dept')

        if not dept:
            return Response({"error": "Department is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Filter subjects in the given department
        subjects = Subject.objects.filter(class_id__dept=dept)
        
        result = {}
        for subject in subjects:
            # Get the faculty handling the current subject
            faculty = User.objects.filter(id=subject.faculty_id_id)  # Using the ID field for filtering
            faculty_names = faculty.values_list('name', flat=True)

            # Add the subject and the associated faculty to the result
            result[subject.name] = {
                'faculty': list(faculty_names),
                'faculty_count': faculty.count()
            }

        return Response(result)

    

class GetPendingSubjects(APIView):
    def get(self, request, *args, **kwargs):
            # Get department from query parameters
            dept = request.query_params.get('dept')

            if not dept:
                return Response({"error": "Department is required"}, status=400)

            # Filter classes belonging to the given department
            classes = Class.objects.filter(dept=dept)

            pending_subjects = []

            for cls in classes:
                # Get all subjects related to the class
                subjects = Subject.objects.filter(class_id=cls)

                for subject in subjects:
                    # Get the lesson plan for the subject
                    try:
                        lesson_plan = LessonPlan.objects.get(subject_id=subject)
                    except LessonPlan.DoesNotExist:
                        continue  # If no lesson plan, skip to the next subject

                    # Check if any topic in the lesson plan has status as 'NS' (Not Started)
                    pending_topics = Topic.objects.filter(LessonPlan_id=lesson_plan, status='NS')

                    print(pending_topics)  # For debugging to check if pending topics are being fetched

                    if pending_topics.exists():
                        # If there's at least one pending topic, add the subject to the list
                        pending_subjects.append({
                            'subject_name': subject.name,
                            'class': f'{cls.sem} - {cls.dept} - {cls.sec}',
                            'pending_topics': list(pending_topics.values('name', 'status', 'target_date'))
                        })

            return Response(pending_subjects)



class GetClassStudentCount(APIView):
    def get(self, request, *args, **kwargs):
        # Get department from query parameters
        dept = request.query_params.get('dept')

        if not dept:
            return Response({"error": "Department is required"}, status=400)

        # Get all classes in the department
        classes = Class.objects.filter(dept=dept)
        
        # Prepare result list
        result = []

        for cls in classes:
            # Count the number of students in each class
            student_count = User.objects.filter(class_id=cls, user_type='ST').count()
            
            # Add class info and student count to the result
            result.append({
                'class_name': f'{cls.sem} - {cls.dept} - {cls.sec}',
                'sem':cls.sem,
                'dept':cls.dept,
                'sec':cls.sec,
                'class_id':cls.class_id,

                'student_count': student_count
            })

        return Response(result)




class GetApprovalStats(APIView):
    def get(self, request, *args, **kwargs):
        dept = request.query_params.get('dept')
        
        if not dept:
            return Response({"error": "Department is required"}, status=400)

        # Get total approvals and counts by type and status for the specified department
        approval_stats = Approval.objects.filter(dept=dept).values('approval_type', 'status').annotate(
            count=Count('approval_id')
        ).order_by('approval_type', 'status')

        # Calculate total approvals
        total_approvals = Approval.objects.filter(dept=dept).count()

        # Prepare the result dictionary
        result = {
            'total': total_approvals,
            'details': {}
        }

        # Populate the result dictionary with counts for each approval type and status
        for item in approval_stats:
            approval_type = item['approval_type']
            status = item['status']
            count = item['count']

            if approval_type not in result['details']:
                result['details'][approval_type] = {
                    'pending': 0,
                    'rejected': 0,
                    'approved': 0
                }
            
            result['details'][approval_type][status] = count

        return Response(result)
    

