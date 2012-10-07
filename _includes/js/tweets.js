/* Recent Tweets widget */
function relative_time(c){var b=c.split(" ");c=b[1]+" "+b[2]+", "+b[5]+" "+b[3];var a=Date.parse(c);b=arguments.length>1?arguments[1]:new Date;a=parseInt((b.getTime()-a)/1E3,10);a+=b.getTimezoneOffset()*60;return a<60?"less than a minute ago":a<120?"about a minute ago":a<3600?parseInt(a/60,10).toString()+" minutes ago":a<7200?"about an hour ago":a<86400?"about "+parseInt(a/3600,10).toString()+" hours ago":a<172800?"1 day ago":parseInt(a/86400,10).toString()+" days ago"};

jQuery(document).ready(function ($) {
    $.getJSON('http://api.twitter.com/1/statuses/user_timeline.json?include_rts=true&screen_name={{ site.twitter.username }}&count={{ site.twitter.count }}&callback=?', function (c) {
        for (var b = [], a = 0; a < c.length; a++) {
            var e = c[a].user.screen_name,
                f = c[a].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function (d) {
                    return '<a href="' + d + '">' + d + "</a>"
                }).replace(/\B@([_a-z0-9]+)/ig, function (d) {
                    return d.charAt(0) + '<a href="http://twitter.com/' + d.substring(1) + '">' + d.substring(1) + "</a>"
                });
            b.push('<li><span class="status">' + f + '</span> <a class="time" href="http://twitter.com/' + e + "/statuses/" + c[a].id_str + '">' + relative_time(c[a].created_at) + "</a></li>")
        }
        document.getElementById("tweets").innerHTML = b.join("")
    });
});