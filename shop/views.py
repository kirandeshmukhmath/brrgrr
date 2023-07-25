from django.shortcuts import render, redirect 
from django.contrib.auth.models import User, auth
from django.contrib import messages
from django.http import JsonResponse
from django.http import HttpResponse
import pandas as pd

# Create your views here.
def welcome(request):   
    return render(request, 'home.html')

def gift(request):
    return render(request, 'gift.html')

def home(request):
    return render(request, 'inpage.html')

def custom(request):
    return render(request, 'custome.html')

def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username = username, password = password)

        if user is not None:
            auth.login(request, user)
            return redirect('home')
        else:
            messages.info(request, 'Invalid username or password')
            return redirect('signin')
    else:
        return render(request, 'login.html')

def signup(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']

        if password == confirm_password:
            if User.objects.filter(username=username).exists():
                messages.info(request, 'username exists')
                return redirect('signup')
            else:
                user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
                user.set_password(password)
                user.save()
                print('SUCCESS')
                return redirect('signin')

    else:
        return render(request, 'register.html')

def location(request):

    return render(request, 'location.html')
    
def signout(request):
        auth.logout(request)
        return redirect('signin')


# views.py


def add_to_cart(request):
    if request.method == 'POST':
        cart_data = request.json()
        request.session['cart'] = cart_data
        return JsonResponse({'message': 'Cart items added successfully.'})


# views.py cart to xl
# from django.http import JsonResponse

# def add_to_cart(request):
#     if request.method == "POST":
#         cart_data = request.json()
#         request.session["cart"] = cart_data
#         return JsonResponse({"message": "Cart items added successfully."})




# from django.http import HttpResponse

# def export_cart_to_excel(request):
#     cart_data = request.session.get('cart', [])

#     # Create a DataFrame from the cart_data
#     df = pd.DataFrame(cart_data)

#     # Create a response with the Excel file content
#     response = HttpResponse(content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
#     response["Content-Disposition"] = "attachment; filename=cart_items.xlsx"

#     # Write the DataFrame to the response as an Excel file
#     df.to_excel(response, index=False)

#     return response

import pandas as pd
from django.http import HttpResponse, JsonResponse

def add_to_cart(request):
    if request.method == "POST":
        try:
            cart_data = request.json()
            request.session["cart"] = cart_data
            return JsonResponse({"message": "Cart items added successfully."})
        except:
            return JsonResponse({"message": "Error adding cart items."})

import xlsxwriter
import pandas as pd
from django.http import HttpResponse, JsonResponse

def export_cart_to_excel(request):
    cart_data = request.session.get('cart', [])

    if not cart_data:
        return JsonResponse({"message": "Cart is empty."})

    # Create a DataFrame from the cart_data
    df = pd.DataFrame(cart_data)

    # Create a response with the Excel file content
    response = HttpResponse(content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    response["Content-Disposition"] = "attachment; filename=cart_items.xlsx"

    # Create a new Excel workbook and add a worksheet
    workbook = xlsxwriter.Workbook(response, {'in_memory': True})
    worksheet = workbook.add_worksheet()

    # Write the DataFrame to the worksheet as Excel rows
    for row_num, row_data in df.iterrows():
        worksheet.write_row(row_num, 0, row_data)

    # Close the workbook to finalize the Excel file
    workbook.close()

    return response
