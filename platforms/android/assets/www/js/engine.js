//var path = "http://embeddedsystemsresearch.net/proto_app/php";
var path = "http://10.5.50.42/RCDB/rcdb/routes";
//var path = "http://chilllaweh.site50.net/posto/php";

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
                type: "POST",
                url: path+"/login.php",
                dataType: 'json',
                data: "username="+username+" & password="+password,
                success: function(data)
                {   
                    if(data.success == "true")
                    {
                        //user = data.user;
                        $.mobile.changePage("#reload_page");
                    }
                    else 
                    {
                        $("#loginDialog").click();
                    }

                }

            });
        }

        else
            $("#loginDialog").click();
    });  

    $("#btnSignUp").click(function(){
        
        fName = $("#txtFName").val();
        lname = $("#txtLName").val();
        email = $("#txtEmail").val();
        pswd = $("#txtPswd").val();
        Cpswd = $("#txtConfirmPswd").val();

        var formData = {
            customer_hp_nbr : "01122169490", 
            customer_fname : fName, 
            customer_lname : lname,
            customer_email : email,
            customer_pswd : pswd,
            customer_register_date : "2014-10-14",
            customer_operator : "C"
        }

        alert(formData.customer_hp_nbr);
        if(fName != null && lname != null && email != null  && pswd != null && Cpswd != null && pswd == Cpswd)
        {
            $.ajax({
                beforeSend: function() { $.mobile.loading('show', {
                    text: "Loading...",
                    textVisible: "textVisible",
                    theme: "b",
                    html: ""}); }, //Show spinner
                complete: function() { $.mobile.loading('hide'); }, //Hide spinner
                crossOrigin: true,
                type: "POST",
                url: path+"/tryInsert.js",
                dataType: 'json',
                data: formData,
                success: function(data)
                {   
                    alert("In");

                }

            });
        }

        else
            alert("Fail");
    });  

    // This function is invoke on Reload button click
    $("#reload").click(function(){	

        hpNumber=$("#hpNumber").val();
        deno=$('input:radio[name=dino]:checked').val();
        //alert(hpNumber);
        //alert(deno);

        $.ajax({
            beforeSend: function() { $.mobile.loading('show', {
                text: "Loading...",
                textVisible: "textVisible",
                theme: "b",
                html: ""}); }, //Show spinner

            crossDomain: true,
            crossOrigin: true,
            type: "POST",
            url: path+"/topUp_pinless.php",
            dataType: 'json',
            data: "hpNo="+hpNumber+"&reloadValue="+deno,
            success: function(data)
            {  
                if(data.success == 1) //Using new API (26/9/2014 17:28)
                {
                    $.ajax({
                        complete: function() { $.mobile.loading('hide'); }, //Hide spinner
                        crossOrigin: true,
                        type: "POST",
                        url: path+"/transaction_insert.php",
                        dataType: 'json',
                        data: "hp="+hpNumber+" & deno="+deno+"&latitude="+latitude+"&longitude="+longitude,
                        success: function(data)
                        {    

                            if(data.success == "true")
                            {
                                viewAccBalance();
                                $("#passButton").click();


                            }
                            else 
                            {
                                $("#failButton").click();
                            }
                        }

                    }); 
                }
                else
                {
                    $("#failButton").click();
                }
            } 
        }); 
        return false;
    }); 

    // This function is invoke if user click yes in exit apps dialog message.
    // This function exit the apps
    $("#exitB").click(function(){	
        navigator.app.exitApp();
    });

    return false;
});

// By default, on show transaction_page.. the apps will show last 10 transaction
$(document).on("pageshow","#transaction_page",function(){

    $('#log').val("last10").selectmenu('refresh');

    $.ajax({
        beforeSend: function() { $.mobile.loading('show', {
            text: "Loading...",
            textVisible: "textVisible",
            theme: "b",
            html: ""}); }, //Show spinner
        complete: function() { $.mobile.loading('hide'); }, //Hide spinner
        crossOrigin: true,
        type: "POST",
        url: path+"/last10.php",
        dataType: "json",
        //data: "user="+user,
        success: function(data)
        {   
            viewTransaction(data);
        }

    });
    return false;

});

// On show profile_page, the apps will user data from server
$(document).on("pageshow","#profile_page",function(){

    $.ajax({
        beforeSend: function() { $.mobile.loading('show', {
            text: "Loading...",
            textVisible: "textVisible",
            theme: "b",
            html: ""}); }, //Show spinner
        complete: function() { $.mobile.loading('hide'); }, //Hide spinner
        crossDomain: true,
        crossOrigin: true,
        type: "POST",
        url: path+"/profile.php",
        dataType: "json",
        //data: "user="+user,
        success: function(data)
        {    
            if(data.success == "false")
            {
                $("#errorButton").click();
            }
            else
            {
                $("#merchantID").text(data[0]);
                $("#name").text(data[1]);
                $("#companyName").text(data[2]);
                $("#companyReg").text(data[3]);
                $("#address").text(data[4]);
                $("#postcode").text(data[5]);
                $("#state").text(data[6]);
                $("#bankName").text(data[7]);
                $("#accHolder").text(data[8]);
                $("#accNumber").text(data[9]);
            }
        }

    });

    return false;

});