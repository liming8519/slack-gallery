 var xmlhttp = new XMLHttpRequest();
        var apiurl = "https://api.instagram.com/v1/media/popular?access_token=1075466.1677ed0.07e7f544d7dd41c1a7abb2295cd35a9a&callback=?"

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                arr = JSON.parse(xmlhttp.responseText);
                displayPhotos(arr);
                lightboxTrigger(arr);

            }
        };
        xmlhttp.open("GET", apiurl, true);
        xmlhttp.send();
        //     function requestPhotos(callback){
        //          var xmlhttp = new XMLHttpRequest();
        //     var apiurl = "https://api.instagram.com/v1/media/popular?access_token=1075466.1677ed0.07e7f544d7dd41c1a7abb2295cd35a9a&callback=?"

        //     xmlhttp.onreadystatechange = function() {
        //         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //             var arr = JSON.parse(xmlhttp.responseText);
        //             //displayPhotos(arr);
        //             //lightboxTrigger(arr); 

        //         }
        //     };
        //             xmlhttp.open("GET", apiurl, true);
        //     xmlhttp.send();
        // }


        function displayPhotos(arr) {
            var result = "";
            var i;
            for (i = 0; i < arr.data.length; i++) {
                result += '<li data-pid = ' + i + '> <img src =' + arr.data[i].images.low_resolution.url + '></li>';
            }

            document.getElementById("photo-gallery").innerHTML = result;
        }

        function lightboxTrigger(arr) {
            var pid;
            var img = document.getElementsByTagName("li");
            for (var i = 0, len = img.length; i < len; i++) {
                img[i].onclick = function(e) {
                    pid = e.target.parentNode.getAttribute('data-pid');
                    //console.log(pid);
                    lightboxDisplay(pid, arr);
                    lightbox = document.getElementById("lightbox");
                    lightbox.style.display = "block";
                };
            }
        }

        function lightboxDisplay(pid, arr) {
        	console.log(pid);
            var result = "";
            result = '<img src = "' + arr.data[pid].images.standard_resolution.url + '" data-pid = ' + pid + '>';
            lbimg = document.getElementById("lightbox-img");
            lbimg.innerHTML = result;
            var text = arr.data[pid].caption.text;
            lbtext = document.getElementById("lightbox-text");
            lbtext.innerHTML = '<p>' + text + '</p>';
        }

        var closebtn = document.getElementById("closebtn");
        closebtn.onclick = function() {
            lightbox.style.display = "none";
        }

        var leftbtn = document.getElementById("leftbtn");
        leftbtn.onclick = function(e) {
            var img = e.target.parentNode.childNodes[7].childNodes[0];
            var pid = img.getAttribute('data-pid');
            console.log(pid);
            if (pid > 0) {
            	pid--;
                lightboxDisplay(pid, arr);
            }
        }

        var rightbtn = document.getElementById("rightbtn");
        rightbtn.onclick = function(e) {
            var img = e.target.parentNode.childNodes[7].childNodes[0];
            var pid = img.getAttribute('data-pid');
           
            if (pid < arr.data.length - 1) {
            	pid++;
                lightboxDisplay(pid, arr);
            }
        }