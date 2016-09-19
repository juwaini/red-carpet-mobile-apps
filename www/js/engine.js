//var path = "http://embeddedsystemsresearch.net/proto_app/php";
var path = "http://localhost:3000";
//var path = "http://chilllaweh.site50.net/posto/php";
var signUpHP = '';

// This function will be invoke on apps startup
function onLoad() 
{
    document.addEventListener("deviceready", onDeviceReady, false);
}

// This function will be invoke after device is ready
function onDeviceReady() {

    // Register the event listener
    // This event is to detect if user press back button (on android)
    // If user press back button and user is at login page..system will popup dialog message to exit
    document.addEventListener("backbutton", function(e){
        if($.mobile.activePage.is('#login_page')){
            e.preventDefault();
            $("#exitDialog").click();
        }
        else {
            navigator.app.backHistory()
        }
    }, false);


}

// All functions after apps is ready is declared here
$(document).ready(function(){    

    // This function is invoke on Login button click
    $("#btnLogin").click(function(){	
        username=$("#txtHpNbr").val();
        password=$("#txtPassword").val();

        var formData = {
            username : username, 
            password : password
        };
        
        if(username != null && password != null)
        {
            $.ajax({
                beforeSend: function() { $.mobile.loading('show', {
                    text: "Loading...",
                    textVisible: "textVisible",
                    theme: "b",
                    html: ""}); }, //Show spinner
                complete: function() { $.mobile.loading('hide'); }, //Hide spinner
                crossOrigin: true,
                crossDomain: true,
                type: "POST",
                url: path+"/login",
                dataType: "json",
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function(data)
                {   
                    if(data == 0)
                    {
                        alert("Login error");  
                    }
                    if(data == 2)
                    {
                        alert("Wrong phone number");  
                    }
                    if(data == 3)
                    {
                        alert("wrong password");  
                    }
                    else
                    {                        
                        $.mobile.changePage("#signin_page");
                    }
                }

            });
        }

        else
            $("#loginDialog").click();
    });

    /* Send ajax request to server and save user into DB */
    $("#btnSignUp").click(function(){

        fName = $("#txtFName").val();
        lname = $("#txtLName").val();
        email = $("#txtEmail").val();
        pswd = $("#txtPswd").val();
        Cpswd = $("#txtConfirmPswd").val();

        var formData = {
            customer_hp_nbr : signUpHP, 
            customer_fname : fName, 
            customer_lname : lname,
            customer_email : email,
            customer_pswd : pswd,
            customer_register_date : "2014-10-14",
            customer_operator : "C"
        };

        if(fName != null && lname != null && email != null  && pswd != null && Cpswd != null && pswd == Cpswd && 
           $("#cbxTermNCond").is(":checked") == true)
        {
            $.ajax({
                beforeSend: function() { $.mobile.loading('show', {
                    text: "Loading...",
                    textVisible: "textVisible",
                    theme: "b",
                    html: ""}); }, //Show spinner
                complete: function() { $.mobile.loading('hide'); }, //Hide spinner
                crossOrigin: true,
                crossDomain: true,
                type: "POST",
                url: path+"/user",
                dataType: "json",
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function(data)
                {   
                    if(data == 1)
                    {
                        $.mobile.changePage("#signin_page");
                    }
                    else
                    {
                        alert("Fail Insert Data");   
                    }
                }

            });
        }

        else
            alert("Fail");
    });  /* End Signup button event */

    /* Send ajax request and check user phone number*/ // But for now the system only grab user phone number..not yet validate it
    $("#btnCheckNbr").click(function(){	

        signUpHP = $("#HphoneN").val();

        if(signUpHP != '' )
        {
            /* This ajax call is to send phone number to api checking its operator */
            /*$.ajax({
                beforeSend: function() { $.mobile.loading('show', {
                    text: "Loading...",
                    textVisible: "textVisible",
                    theme: "b",
                    html: ""}); }, //Show spinner
                complete: function() { $.mobile.loading('hide'); }, //Hide spinner
                crossOrigin: true,
                crossDomain: true,
                type: "POST",
                url: path+"/user",
                dataType: "json",
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function(data)
                {   
                    var response = JSON.stringify(data);
                    alert(data); // Can use direct
                    alert(response);
                }

            }); */ 
            alert("Registration Code: 141092 ");
            $("#btnNext").closest('.ui-btn').show();
            $("#btnCheckNbr").closest('.ui-btn').hide();
        }

        else
            alert("Please Insert Mobile Number");
        return false;
    }); /* End of Check Number event*/

    // This function is invoke if user click yes in exit apps dialog message.
    // This function exit the apps
    $("#exitB").click(function(){	
        navigator.app.exitApp();
    });

    /* On page show CheckNumber page*/
    $( '#checkNbr_page' ).on( 'pagebeforeshow',function(event){
        $("#btnNext").closest('.ui-btn').hide();
    });

    return false;
});

