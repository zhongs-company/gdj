var ScrollFix = require('scrollfix')

module.exports = function(Vue) {

    //函数节流
    function throttle(fn, interval) {
        var interval = interval ? interval : 100;
        var canRun = true;
        return function() {
            var _this = this;
            if (!canRun) return;
            canRun = false;
            setTimeout(function() {
                fn.apply(_this, arguments);
                canRun = true;
            }, interval)
        }
    }

    //获取元素距离滚动元素的距离
    function offsetTop(element) {
        var top = element.offsetTop;
        var parent = element.offsetParent;

        while (parent != null) {
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }

        return top;
    }


    //用来处理上拉 加载更多；
    Vue.directive('pull', {
        bind: function(el, binding, vnode) {

            var { _vue } = binding.value;
            // console.log(_vue);
            el.addEventListener('scroll', throttle(function() {

                var scroll_h = el.scrollHeight;
                var view_h = el.offsetHeight;
                var scroll_top = el.scrollTop;

                //整个列表的高度 - ( 滚动的高度 + 盒子的高度 )&& store.state.hbtv.list.isLoad
                if ((scroll_h - view_h - scroll_top < 200) && _vue.isPull) {
                    _vue.$store.commit('YXKCK_GET_LIST_NOPULL');

                    if (_vue.req.typeId) {
                        _vue.getElnCourse({ m: "getPage", typeId: _vue.req.typeId });
                        return;
                    }

                    if (_vue.req.keyword) {
                        _vue.getElnCourse({
                            m: "searchByKeywordPage",
                            keyword: _vue.req.keyword
                        });
                        return;
                    }

                    _vue.getElnCourse({ m: "getPage" });

                    console.log('上拉指令');
                }
            }), false);
        }
    });

    //处理ios列表滚动
    Vue.directive('scroll', {
        inserted: function(el) {
            new ScrollFix(el);
        }
    });

   Vue.directive('focus', {
        componentUpdated: function(el) {
           el.focus();
        }
    });


};
