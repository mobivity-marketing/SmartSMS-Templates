// //////////////////////////////////////////////////////////////////////////////////////////////
// Vertically Centered Bootstrap Modal
// //////////////////////////////////////////////////////////////////////////////////////////////

var modalVerticalCenterClass = ".modal";
function centerModals($element) {
    var $modals;
    if ($element.length) {
        $modals = $element;
    } else {
        $modals = $(modalVerticalCenterClass + ':visible');
    }
    $modals.each( function(i) {
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
    });
}
$(modalVerticalCenterClass).on('show.bs.modal', function(e) {
    centerModals($(this));
});
$(window).on('resize', centerModals);

// //////////////////////////////////////////////////////////////////////////////////////////////
// Countdown Timer JS
// //////////////////////////////////////////////////////////////////////////////////////////////

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    Util.convertMS = function convertMS(ms) {
        var d, h, m, s;

        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        return {
            d: d,
            h: h,
            m: m,
            s: s
        };
    };

    Util.addZ = function addZ(n) {
        if (!n) return "0";
        return (n < 10 ? '0' : '') + n;
    };

    Util.formatTime = function formatTime(obj) {
        if (obj.d > 0) {
            return Util.addZ(obj.d) + "D " + Util.addZ(obj.h) + "H";
        }
        if (obj.h > 0) {
            return Util.addZ(obj.h) + "H " + Util.addZ(obj.m) + "M";
        }
        return Util.addZ(obj.m) + ":" + Util.addZ(obj.s);
    };

    return Util;
}();

var Countdown = function () {
    function Countdown(endTime, $element) {
        _classCallCheck(this, Countdown);

        this.now = moment();
        this.end = moment().add(endTime);
        this.diff = this.end.diff(this.now);
        this.$el = $element;
        this.svg = Snap(this.$el.find("svg")[0]);
        this.progress = this.svg.select("#progress");
        this.$txt = this.$el.find(".c-text");
        this.initCircle();
        this.initTimer();
    }

    Countdown.prototype.initCircle = function initCircle() {
        var self = this;
        self.progress.attr({
            strokeDasharray: '0, 301.44'
        });
        Snap.animate(0, 301.44, function (value) {
            self.progress.attr({
                'stroke-dasharray': value + ', 301.44'
            });
        }, self.diff);
    };

    Countdown.prototype.initTimer = function initTimer() {
        var self = this;
        self.timer = setInterval(function () {
            self.now = moment();
            self.diff = self.end.diff(self.now);
            if (self.diff > 0) {
                self.$txt.text(Util.formatTime(Util.convertMS(self.diff)));
            } else {
                self.$txt.text("0:00");
                clearInterval(self.timer);
            }
        }, 200);
    };

    return Countdown;
}();