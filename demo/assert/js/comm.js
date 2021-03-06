/**
 * Created by Administrator on 2017/9/28.
 */
var comm = {
    type: function(t) {
        var e = Object.prototype.toString.call(t),
            o = e.split(" ")[1];
        return o.substring(0, o.length - 1).toLocaleLowerCase() || -1
    },
    judge: {
        MAX_SAFE_INTEGER: 9007199254740991,
        isEmptyObject: function(t) {
            var e = !0;
            for (var o in t) if (t.hasOwnProperty(o)) {
                e = !1;
                break
            }
            return e
        },
        isObject: function(t) {
            var e = typeof t;
            return !! t && ("object" == e || "function" == e)
        },
        isObjectLike: function() {
            return !! value && "object" == typeof value
        },
        isLength: function(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= this.MAX_SAFE_INTEGER
        },
        isArray: function() {
            nativeIsArray
        }
    },
    extend: {
        deepCopy: function(t, e, o) {
            var e = e || {};
            for (var n in t) t.hasOwnProperty(n) && ("object" == typeof t[n] ? (e[n] = t[n].constructor === Array ? [] : {},
                deepCopy(t[n], e[n], !0)) : e[n] = t[n]);
            return e
        }
    },
    randomNum: function(t, e) {
        if (! (e < t)) return Math.floor(Math.random() * (e - t) + t)
    },
    ajax: {
        ajaxStart: function(t) {
            $(document).ajaxStart(t)
        },
        ajaxComplete: function(t) {
            $(document).ajaxComplete(t)
        },
        ajaxError: function(t) {
            $(document).ajaxError(t)
        },
        commAjax: function(t) {
            var e = new Date * comm.randomNum(1, 10);
            t.url && ( - 1 != t.url.indexOf("?") ? t.url += "&timestamp =" + e: t.url += "?timestamp =" + e);
            var o = {
                url: t.url,
                type: t.type || "get",
                data: t.data || {},
                timeout: 12e5,
                error: t.errorFn || null,
                success: t.successFn
            };
            return t && $.extend(o, t),
                $.ajax(o)
        }
    },
    layer: {
		dialog: function(t) {
			var e = {
				type: t.type||1,
				title: t.title,
				content: t.content,
				closeBtn: 1,
				scrollbar: 1,
				area: t.area || ["200px", "200px"]
			};
			if (t.btn && t.methods && comm.type("array" === t.btn) && (e.btn = t.btn, "array" === comm.type(t.methods))) for (var o = t.btn.length,
				                                                                                                                  n = t.methods,
				                                                                                                                  a = 0; a < o; a++) 0 == a ? e.yes = n[0] : e["btn" + (a + 1)] = n[a];
			$.extend(e, t);
			layer.config({
				skin: 'layui-layer-lan'
			});
			return layer.open(e);
		},

		/**
		 *
		 * @param content: 内容
		 * @param options：一个配置对象
		 * @param okFn：确认的回调函数
		 */
		alert: function(content, options, okFn) {
			layer.alert(content, options, okFn)
		},

		/**
		 *
		 * @param t：内容
		 * @param e：配置
		 * @param o：确定按钮的回调
		 * @param n：取消按钮的回调
		 */
		confirm: function(t, e, o, n) {
			layer.confirm(t, e, o, n)
		},
		msg: function(t, e, o) {
			layer.msg(t, e, o)
		},
		tips: function(t, e, o) {
			layer.tips(t, e, o)
		},
		close: function(t) {
			layer.close(t)
		},
		photos: function(t, e) {
			var o = {
				anim: 5
			};
			e && $.extend(o, e),
				t.url ? comm.ajax.commAjax({
					url: t.url,
					successFn: function(t) {
						o.photos = t,
							layer.photos(o)
					}
				}) : t.id && (o.photos = id, layer.photos(o))
		}
	},
    escapeHTML: function(t) {
        return t.replace(/<[\/\!]*[^<>]*>/gi, "")
    },
    validateCode: function(t, e) {
        function o(t, e) {
            return Math.floor(Math.random() * (e - t) + t)
        }
        function n(t, e) {
            return "rgb(" + o(t, e) + "," + o(t, e) + "," + o(t, e) + ")"
        }
        function a() {
            ctx = u.get(0).getContext("2d"),
                ctx.textBaseline = "bottom",
                ctx.fillStyle = n(180, 240),
                ctx.fillRect(0, 0, pic_width, pic_height),
                m = r(ctx),
                i(ctx),
                l(ctx)
        }
        function r(t) {
            for (var a = "",
                     r = 0; r < e; r++) {
                var i = (pic_width - 10) / e * r + 10,
                    l = o(pic_height / 2, pic_height),
                    c = o( - 45, 45),
                    u = s[o(0, p)],
                    a = a + u;
                t.fillStyle = n(10, 100),
                    t.font = o(16, 40) + "px SimHei",
                    t.translate(i, l),
                    t.rotate(c * Math.PI / 180),
                    t.fillText(u, 0, 0),
                    t.rotate( - c * Math.PI / 180),
                    t.translate( - i, -l)
            }
            return a
        }
        function i(t) {
            for (var a = 0; a < e; a++) t.strokeStyle = n(90, 180),
                t.beginPath(),
                t.moveTo(o(0, pic_width), o(0, pic_height)),
                t.lineTo(o(0, pic_width), o(0, pic_height)),
                t.stroke()
        }
        function l(t) {
            for (var a = 0; a < 10 * e; a++) t.fillStyle = n(0, 255),
                t.beginPath(),
                t.arc(o(0, pic_width), o(0, pic_height), 1, 0, 2 * Math.PI),
                t.fill()
        }
        function c(t) {
            t.preventDefault(),
                t.stopPropagation(),
                a()
        }
        var u = $("#" + t),
            s = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            p = s.length,
            m = "123";
        return pic_width = u.width(),
            pic_height = u.height(),
            $(u).on("click", c).triggerHandler("click"),
        {
            getContent: function() {
                return m.toLowerCase()
            },
            getNewCode: function() {
                $(u).trigger("click")
            }
        }
    },
    scrollEvent: function() {
        $(this).scrollTop() > 150 ? $("#scrollTop").fadeIn() : $("#scrollTop").fadeOut()
    },
    scroll: function() {
        $(window).bind("scroll.scrollTop", comm.debounce(comm.scrollEvent, 300))
    },
    scrollToTop: function() {
        $(window).unbind("scroll.scrollTop"),
            $("html,body").animate({
                    scrollTop: 0
                },
                600),
            $("#scrollTop").animate({
                    bottom: "3000px"
                },
                600,
                function() {
                    $(this).hide().css({
                        bottom: "2em"
                    }),
                        $(window).bind("scroll.scrollTop", comm.debounce(comm.scrollEvent, 300))
                })
    },
    scrollToElement: function(t, e) {
        var o = $("#" + t).offset().top;
        e && !isNaN(parseInt(e)) && (o += e),
            $("html,body").animate({
                    scrollTop: o + "px"
                },
                600)
    },
    debounce: function(t, e, o) {
        var n, a, r, i, l, c = function() {
            var u = comm.now() - i;
            u < e && u >= 0 ? n = setTimeout(c, e - u) : (n = null, o || (l = t.apply(r, a), n || (r = a = null)))
        };
        return function() {
            r = this,
                a = arguments,
                i = comm.now();
            var u = o && !n;
            return n || (n = setTimeout(c, e)),
            u && (l = t.apply(r, a), r = a = null),
                l
        }
    },
    now: Date.now ||
    function() {
        return (new Date).getTime()
    },
    throttle: function(t, e, o) {
        var n, a, r, i = null,
            l = 0;
        o || (o = {});
        var c = function() {
            l = !1 === o.leading ? 0 : _.now(),
                i = null,
                r = t.apply(n, a),
            i || (n = a = null)
        };
        return function() {
            var u = comm.now();
            l || !1 !== o.leading || (l = u);
            var s = e - (u - l);
            return n = this,
                a = arguments,
                s <= 0 || s > e ? (i && (clearTimeout(i), i = null), l = u, r = t.apply(n, a), i || (n = a = null)) : i || !1 === o.trailing || (i = setTimeout(c, s)),
                r
        }
    },
    scrollEvent: function() {
        $(this).scrollTop() > 150 ? $("#scrollTop").fadeIn() : $("#scrollTop").fadeOut()
    },
    scroll: function() {
        $(window).bind("scroll.scrollTop", comm.debounce(comm.scrollEvent, 300))
    },
    scrollToTop: function() {
        $(window).unbind("scroll.scrollTop"),
            $("html,body").animate({
                    scrollTop: 0
                },
                600),
            $("#scrollTop").animate({
                    bottom: "3000px"
                },
                600,
                function() {
                    $(this).hide().css({
                        bottom: "2em"
                    }),
                        $(window).bind("scroll.scrollTop", comm.debounce(comm.scrollEvent, 300))
                })
    },
    debounce: function(t, e, o) {
        var n, a, r, i, l, c = function() {
            var u = comm.now() - i;
            u < e && u >= 0 ? n = setTimeout(c, e - u) : (n = null, o || (l = t.apply(r, a), n || (r = a = null)))
        };
        return function() {
            r = this,
                a = arguments,
                i = comm.now();
            var u = o && !n;
            return n || (n = setTimeout(c, e)),
            u && (l = t.apply(r, a), r = a = null),
                l
        }
    },
    now: Date.now ||
    function() {
        return (new Date).getTime()
    },
    throttle: function(t, e, o) {
        var n, a, r, i = null,
            l = 0;
        o || (o = {});
        var c = function() {
            l = !1 === o.leading ? 0 : comm.now(),
                i = null,
                r = t.apply(n, a),
            i || (n = a = null)
        };
        return function() {
            var u = comm.now();
            l || !1 !== o.leading || (l = u);
            var s = e - (u - l);
            return n = this,
                a = arguments,
                s <= 0 || s > e ? (i && (clearTimeout(i), i = null), l = u, r = t.apply(n, a), i || (n = a = null)) : i || !1 === o.trailing || (i = setTimeout(c, s)),
                r
        }
    },
    waterMark: function() {
        var t = $("#waterMark"),
            e = $("#query");
        if (t.length > 0) return ! 1;
        var o = $("input.js_water_mark"),
            n = {},
            a = o.offset();
        n.x = a.left,
            n.y = a.top,
            n.outerWidth = o.outerWidth(),
            n.outerHeight = o.outerHeight(),
            o.attr("placeholder", ""),
            $("<label style='color: red;font-size: 14px;' id='waterMark'>������ؼ���!</label>").css({
                position: "absolute",
                paddingLeft: "3px",
                left: n.x,
                top: n.y,
                height: n.outerHeight,
                width: n.outerWidth,
                lineHeight: n.outerHeight + "px"
            }).appendTo("body"),
            t.click(function() {
                $(this).remove(),
                    e.attr("placeholder", "����").removeClass("search-error"),
                    e.focus()
            })
    },
    url: {
        address: window.location.href,
        pathname: window.location.pathname,
        getOriginUrl: function() {
            var t = this.address,
                e = t.split("?")[0],
                o = e.lastIndexOf("#");
            return - 1 !== o && (e = e.substring(0, o)),
                e
        },
        getCurrentUrl: function() {
            return window.location.href
        },
        getRequestMethod: function() {
            var t = this.pathname,
                e = t.match(/\/\w+\/?/);
            return e ? e[0] : "/"
        }
    },
    page: {
        pagesData: [],
        typeid: null,
        options: {
            url: null,
            container: null,
            pageTmplId: "",
            dataTmplId: "",
            dataId: "",
            postData: {
                currentPage: 1,
                showPageNum: 10
            }
        },
        init: function(t, e) {
            var t = $.extend(!0, comm.page.options, t);
            this.getPageData(t.url, t.postData,
                function(o) {
                    comm.page.showPageData(comm.page.options.dataId, comm.page.options.dataTmplId, o.data),
                        comm.page.showPage(t, o.pages, comm.page.options.pageTmplId),
                    e && e()
                },
                function(t) {
                    t && comm.layer.alert(t)
                })
        },
        showPage: function(t, e, o) {
            comm.tmpl.render(o, {
                    pages: e
                },
                t.container),
                comm.page.bindPageClick(t.container, t.postData.showPageNum)
        },
        showPageData: function(t, e, o) {
            comm.tmpl.render(e, {
                    data: o
                },
                t)
        },
        bindPageClick: function(t) {
            $("#" + t).off("click").on("click", ".page",
                function(t) {
                    e($(this))
                });
            var e = function(t) {
                var e = comm.page.options.postData.currentPage,
                    o = parseInt(t.data("pagenum"));
                if (e === o) return ! 1;
                comm.page.options.postData.currentPage = o,
                    comm.page.getPageData(comm.page.options.url, comm.page.options.postData,
                        function(t) {
                            comm.page.showPageData(comm.page.options.dataId, comm.page.options.dataTmplId, t.data),
                                comm.page.showPage(comm.page.options, t.pages, comm.page.options.pageTmplId)
                        },
                        function(t) {
                            t && comm.layer.alert(t)
                        })
            }
        },
        getPageData: function(t, e, o, n) {
            $.when(comm.ajax.commAjax({
                url: t,
                type: "post",
                data: e
            })).then(o, n)
        }
    },
    exp: {
        trimAllSpace: function(t) {
            return t.replace(/\s/g, "")
        }
    },
    ary: {
        deleteByValue: function(t, e, o) {
            for (var n = 0,
                     a = t.length; n < a && (e !== t[n] || (t.splice(n, 1), o)); n++);
            return t
        },
        cloneAry: function(t) {
            return t.concat()
        },
        removeDuplicated: function(t) {
            for (var e = [], o = 0, n = t.length; o < n; o++) - 1 === e.indexOf(t[o]) && e.push(t[o]);
            return e
        }
    },
    tmpl: {
        render: function(t, e, o) {
            var n = $("#" + t).html(),
                a = "";
            ejs.delimiter = "$",
                a = ejs.render(n, e),
                "string" === comm.type(o) ? $("#" + o).html("").append(a) : o instanceof $ && o.html("").append(a)
        }
    },
    effect: {
        countDown: function(t, e, o) {
            var n = document.getElementById(t),
                a = e,
                r = 0;
            n.innerHTML = e,
                r = setInterval(function() {
                        n.innerHTML = --a,
                        1 === a && (clearInterval(r), o && o())
                    },
                    1e3)
        }
    },
    upload: {
        previewImg: function() {
            var t = $("#file").get(0).files[0];
            return $("#preview").prop("src", window.URL.createObjectURL(t)),
                t
        },
        h5AjaxUpload: function() {
            var t = $("#file").get(0).files[0],
                e = new FormData,
                o = this;
            e.append("file", t),
                comm.ajax.commAjax({
                    url: "/upload",
                    type: "post",
                    data: e,
                    processData: !1,
                    contentType: !1,
                    xhr: function() {
                        var t = $.ajaxSettings.xhr();
                        if (t.upload) return t.upload.addEventListener("progress", o.onprogress, !1),
                            t
                    },
                    successFn: function(t) {
                        t.status && $("#imgSrc").val(t.pic)
                    }
                })
        },
        onprogress: function(t) {
            var e = t.loaded,
                o = t.total,
                n = $("#progress"),
                a = $("#progressbar"),
                r = Math.round(100 * e / o);
            a.is(":hidden") && a.show(),
                n.html(r + "%").css("width", r + "%"),
            r >= 1 && setTimeout(function() {
                    n.html("0%").css("width", 0),
                        a.hide()
                },
                2e3)
        }
    },
    nav: function() {
        var t = $("#nav").find("li>a"),
            e = comm.url.getRequestMethod();
        t.each(function(t, o) {
            var n = $(o);
            if (n.attr("href") === e) return n.parent("li").addClass("actived"),
                !1
        })
    },
    declareComment: function(t, e) {}
}; !
    function(t) {
        t.ajax.ajaxComplete(function(e, o, n) {
            var a = JSON.parse(o.responseText);
            a.status && "nologin" === a.status && t.layer.confirm("����δ��¼���Ƿ���ת����¼���棿", null,
                function(e) {
                    t.layer.close(e),
                        setTimeout(function() {
                                var e = t.url.getCurrentUrl();
                                window.location.href = "/login?show=1&returnurl=" + e
                            },
                            1e3)
                })
        }),
            t.ajax.ajaxStart(function() {}),
            t.ajax.ajaxError(function(t, e, o, n) {})
    } (comm),
    $.fn.toolTip = function(t) {
        function e(t) {
            this.myTitle = this.title,
                this.title = "",
            $("#tooltip").length > 0 && $("#tooltip").remove(),
                o = $('<p class="hidden" id="tooltip">' + this.myTitle + "</p>"),
                o.appendTo("body"),
                o.css({
                    top: t.pageY + a.x + "px",
                    left: t.pageX + a.y + "px"
                }).fadeIn()
        }
        var o, n = this,
            a = {
                x: 10,
                y: 10
            };
        $.extend(a, t),
            n.on("mouseover.tooltip",
                function(t) {
                    e.call(this, t)
                }).on("mousemove.tooltip",
                function(t) {
                    n.off("mouseover.tooltip"),
                        o.css({
                            top: t.pageY + a.x + "px",
                            left: t.pageX + a.y + "px"
                        })
                }).on("mouseout.tooltip",
                function() {
                    n.on("mouseover.tooltip",
                        function(t) {
                            e.call(this, t)
                        }),
                        this.title = this.myTitle,
                        o.remove()
                })
    },
    $.fn.plusOne = function() {
        var t = this,
            e = t.offset(),
            o = e.left,
            n = e.top,
            a = $('<div class="plusone hidden">+1</div>');
        a.css({
            position: "absolute",
            left: o + t.outerWidth() / 2 + "px",
            top: n - a.height() - t.outerHeight() + "px",
            color: "#F7AF57"
        }).appendTo("body").fadeIn().animate({
                top: n - a.height() - 30 + "px",
                left: o + 50 + "px",
                opacity: 0,
                fontSize: "24px"
            },
            600,
            function() {
                a.remove(),
                    a = null
            })
    };