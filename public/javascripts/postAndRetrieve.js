/**
 * Created by karol on 4/23/2016.
 */

var ref = new Firebase("https://techroot.firebaseio.com/");
var provider = ref.getAuth().provider;
var uid = ref.getAuth().uid;
var ref2 = new Firebase("https://techroot.firebaseio.com/users/"+uid)
var ref3 = new Firebase("https://techroot.firebaseio.com/images/");
//console.log(ref.getAuth().provider)
//problemas: qd provider é password, como recuperar o nome para uma variavel

function verify(id){

}


function retrieve(){
    ref3.on("value", function(sanapshot){
        console.log(snapshot.val())
        for( var elem in snapshot.val()){
            console.log("desespero"+elem)
            var $node = $("<div class= 'Tile' >" +
                "<div class= 'thumbnail'>" +
                "<img class= 'profile_pic' src = '/images/silvio.png'>" +
                "</div> " +
                "<p class = 'post_name'>" + "</p>" +
                "<p>" + snapshot.val()[elem].caption + "</p>" +
                "<img src = '/images/aviao.jpg'>" +
                " </div>");
            //console.log(snapshot.val()[elem].uid);
            var ref2 = new Firebase("https://techroot.firebaseio.com/users/"+snapshot.val()[elem].uid);
            console.log("blablalba"+snapshot.val()[elem].uid)
            ref2.on("value",function (snapshot2){
                $node.children(".post_name").text(snapshot2.val().email);
                console.log(snapshot2.val().name);

            })
            $("#profile_wall").append($node);
        }

    })
}


function post(){
    var name = getName(provider);
    var caption = document.getElementById("post_msg").value;
    var message = {
        uid: uid,
        name: name,
        caption: caption ,
        stats: {
            likes: 0,
            timestamp: new Date().getTime()
        }
    }
    ref3.push(message);

}
var getName =function (provider){
    var name;
    switch(provider){
        case "password":
            name = ref.getAuth().password.email;
            break;
        case "google":
            name = ref.getAuth().google.displayName;
            break;

        case "github":
            name = ref.getAuth().github.username;
            break;
    }
    return name;
}


//console.log(getName(provider))
$(document).ready(function(){

    //console.log($("#get_name").valueOf())
    var x = getName(provider)
    //console.log(x)

    $("#submit_post").on("click", post);

    ref3.on("value", function(snapshot){
        console.log(snapshot.val())
        for( var elem in snapshot.val()){
            console.log("desespero"+elem)
            var $node = $("<div class= 'Tile' >" +
                "<div class= 'thumbnail'>" +
                "<img class= 'profile_pic' src = '/images/silvio.png'>" +
                "</div> " +
                "<p class = 'post_name'>" +snapshot.val()[elem].name+ "</p>" +
                "<p>" + snapshot.val()[elem].caption + "</p>" +
                "<img src = '/images/aviao.jpg'>" +
                " </div>");
            //console.log(snapshot.val()[elem].uid);
            var ref2 = new Firebase("https://techroot.firebaseio.com/users/"+snapshot.val()[elem].uid);
            console.log("blablalba"+snapshot.val()[elem].uid)
            ref2.on("value",function (snapshot2){
                $node.children(".post_name").text(snapshot2.val().email);
                console.log(snapshot2.val().name);

            })
            $("#profile_wall").append($node);
        }

    })
})