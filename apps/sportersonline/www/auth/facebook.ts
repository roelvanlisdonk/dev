
export function testFbApi() {
    console.log("Clicked on button!!");
    
    (window as any).fbAsyncInit = function() {
        FB.init({
        appId      : '1890477931239151',
        status     : true,
        xfbml      : false,
        version    : 'v2.8'
        });
        FB.AppEvents.logPageView();

        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response: any) {
                    console.log('Good to see you, ' + response.name + '.');
                });
                FB.api("/me/taggable_friends", function(response: any) {
                    console.log('My friends: ' + response + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     (js as any).src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


    FB.api('/me', function(fbUser: FbUser) {
        console.log('My id: ' + fbUser.id + '.');
        console.log('My name: ' + fbUser.name + '.');

        FB.api("/me/friends", function(response: any) {
            console.log('My friends: ' + response + '.');
        });
    });
}

interface FbUser {
    id: string;
    name: string;
}