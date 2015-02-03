(function($) {
    $.fn.ibslider = function(options) {
        options = $.extend( $.fn.ibslider.defaults, options );

        return this.each( function() {
            var that = $(this);
            $(options.tagItem+':first', that).addClass('index');
            if ($(options.tagItem, that).length > 1){
                $(options.tagItem, that).each(function(i){
                    $(this).attr('index', i + 1);
                });
                setInterval(function(){
                    var item = $(options.tagItem+'.index', that);
                    var next = null;
                    item.removeClass('index');
                    if (item.attr('index') == $(options.tagItem, that).length)
                        next = $(options.tagItem+':first', that);
                    else
                        next = item.next();
                    next.addClass('index');
                }, 3000);
            }
        });
    }

    $.fn.ibslider.defaults = {
        tagItem: 'li'
    }
}( jQuery ));

(function($) {
    $.fn.ibmap = function(options) {
        var setting = $.extend({}, this.ibmap.defaults, options);
        var that = this;
        var _lat = 10.776111, _lng = 106.695833;
        if (!setting.lat) setting.lat = _lat;
        if (!setting.lng) setting.lng = _lng;
        var img = '/themes/ib_new/resources/images/pin/pin_target.png';

        function load_maps(){
            var myLatlng = new google.maps.LatLng(setting.lat, setting.lng);
            var mapOptions = {
                center: myLatlng,
                zoom: 12,
                scrollwheel: false,
                mapTypeId: setting.satellite ? google.maps.MapTypeId.HYBRID : google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById(that.attr('id')),
                mapOptions);

            marker = new MarkerWithLabel({
                position: myLatlng,
                map: map,
                //icon:img,
                draggable: setting.draggable,
                animation: google.maps.Animation.DROP
            });

            $.isFunction( setting.latLng ) && setting.latLng(setting.lat, setting.lng);

            $.isFunction( setting.onComplete ) && setting.onComplete(map, marker);

            google.maps.event.addListener(marker, 'dragend', function () {
                var pos = marker.getPosition();
                $.isFunction( setting.latLng ) && setting.latLng(pos.k, pos.B);
            });

            if (setting.draggable){
                google.maps.event.addListener(map, 'click', function(event) {
                    marker.setPosition(event.latLng);
                    $.isFunction( setting.latLng ) && setting.latLng(event.latLng.k, event.latLng.B);
                });
            }

        }

        google.maps.event.addDomListener(window, 'load', load_maps);

        function setMap(){
            alert('aa');
        }
    }

    $.fn.ibmap.defaults = {
        lat:10.776111,
        lng:106.695833,
        zoom:14,
        satellite: false,
        draggable: true,
        latLng: null, // callback return latLng when click or change
        onComplete: null,
        markers: null
    }
}( jQuery ));

iFunc = {
    showMsg: function(msg){
        $('#ib-message-content').html(msg);
        $('#ib-message-modal').modal('show');
    }
}