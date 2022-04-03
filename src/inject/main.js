var $jscomp = {
    scope: {},
    findInternal: function(a, d, c) {
        a instanceof String && (a = String(a));
        for (var g = a.length, f = 0; f < g; f++) {
            var l = a[f];
            if (d.call(c, l, f, a)) return {
                i: f,
                v: l
            }
        }
        return {
            i: -1,
            v: void 0
        }
    }
};

$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, d, c) {
    if (c.get || c.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[d] = c.value)
};

$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};

$jscomp.global = $jscomp.getGlobal(this);

$jscomp.polyfill = function(a, d, c, g) {
    if (d) {
        c = $jscomp.global;
        a = a.split(".");
        for (g = 0; g < a.length - 1; g++) {
            var f = a[g];
            f in c || (c[f] = {});
            c = c[f]
        }
        a = a[a.length - 1];
        g = c[a];
        d = d(g);
        d != g && null != d && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: d
        })
    }
};

$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, c) {
        return $jscomp.findInternal(this, a, c).v
    }
}, "es6-impl", "es3");

$(function() {
    function a(a) {
        a.prepend('<div id="lp-loading-screen"><div id="lp-loading-screen-icon"></div><div id="lp-loading-screen-message">Loading... Please Wait.</div></div>');
        a = $("#lp-loading-screen");
        var c = $("#lp-loading-screen-icon"),
            b = $("#lp-loading-screen-message");
        a.css({
            "align-items": "center",
            background: "#fff",
            display: "flex",
            "flex-direction": "column",
            height: "100%",
            "justify-content": "center",
            position: "absolute",
            width: "100%",
            "z-index": "100"
        });
        c.css({
            animation: "spin 0.3s linear infinite",
            "border-radius": "50%",
            "border-top": "3px solid #010451",
            height: "50px",
            margin: "0 auto",
            width: "50px"
        });
        b.css({
            color: "#010451",
            "margin-top": "16px"
        });
        return a
    }

    function d(a, c) {
        a.prepend('<div id="lp-action-screen">' + c + "</div>");
        var b = $("#lp-action-screen");
        b.css({
            "align-items": "center",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            display: "flex",
            "flex-direction": "column",
            "font-size": "19px",
            height: "100%",
            "justify-content": "center",
            position: "absolute",
            width: "100%",
            "z-index": "1000001"
        });
        return b
    }

    function c(a, c, b) {
        b = void 0 === b ? "" :
            b;
        a.prepend('<div id="lp-box-content-notification">' + c + "</div>");
        void 0 != h && h && (h.stop().remove(), clearTimeout(z));
        h = $("#lp-box-content-notification");
        h.css({
            background: "success" == b ? "#d4edda" : "error" == b ? "#f8d7da" : "#e2e3e5",
            "border-color": "success" == b ? "#c3e6cb" : "error" == b ? "#f5c6cb" : "#d6d8db",
            "border-radius": "5px",
            bottom: "26px",
            "box-shadow": "0px 0px 5px 1px rgba(0, 0, 0, 0.25)",
            "-webkit-box-shadow": "0px 0px 5px 1px rgba(0, 0, 0, 0.25)",
            "-moz-box-shadow": "0px 0px 5px 1px rgba(0, 0, 0, 0.25)",
            color: "success" ==
                b ? "#155724" : "error" == b ? "#721c24" : "#383d41",
            "font-size": "15px",
            height: "auto",
            left: "0",
            margin: "0 auto 0 auto",
            padding: "10px",
            opacity: "1",
            position: "absolute",
            right: "0",
            "text-align": "center",
            width: "40%",
            "z-index": "1000000"
        });
        z = setTimeout(function() {
            h.animate({
                opacity: "0"
            }, 1500, function() {
                h.remove();
                clearTimeout(z)
            })
        }, 1500)
    }

    function g(a, c) {
        a.prepend('<div id="lp-box-content-animation"></div>');
        var b = $("#lp-box-content-animation");
        switch (c) {
            case "screenshot":
                b.css({
                    background: "#fff",
                    height: "100%",
                    opacity: "1",
                    position: "absolute",
                    width: "100%"
                }).animate({
                    opacity: "0"
                }, 700, function() {
                    b.remove()
                })
        }
    }

    function f() {
        void 0 != w && w && clearTimeout(w);
        void 0 != y && y && clearTimeout(y);
        void 0 != n && n && n.remove();
        void 0 != p && p && (p = !1);
        void 0 != q && q && (q = !1);
        void 0 != k && k && (k = !1);
        void 0 != A && 1 <= A && (A = 0);
        void 0 != r && r && r.hasClass("lp-no-scroll") && r.removeClass("lp-no-scroll");
        void 0 != x && x && x.css("cursor", "pointer")
    }

    function l() {
        void 0 != k && k || (w = setTimeout(function() {
            f()
        }, 1E3 * B / 2))
    }

    function C(h) {
        void 0 != k && k || void 0 != q && q || void 0 != p &&
            p || chrome.storage.sync.get(function(v) {
                var b = v.lpBufferTimeData,
                    l = v.lpDisableScrollOnPreviewData;
                v.lpEnablePreviewerBoxData && (n = $(".lp-box"), f(), x = $(h), B = b, x.css("cursor", "progress"), y = setTimeout(function() {
                    $.get(chrome.runtime.getURL("/resources/utilities/link-previewer-box.html"), function(b) {
                        l && r.addClass("lp-no-scroll");
                        r.append(b);
                        n = $("#lp-box");
                        chrome.storage.sync.get(function(b) {
                            function v() {
                                u = 0 === m.indexOf("https://") ? "secured" : 0 === m.indexOf("http://") ? "unsecured" : 0 === F.indexOf("https://") ?
                                    "secured" : 0 === F.indexOf("http://") ? "unsecured" : "unknown";
                                O.addClass("secured" == u ? "bg-success" : "unsecured" == u ? "bg-danger" : "bg-secondary").attr("title", "This website is running in a " + u + " connection.");
                                P.text(B ? m : "secured" == u ? "Secured Connection" : "unsecured" == u ? "Unsecured Connection" : "Unknown Connection");
                                try {
                                    var b = "allow-same-origin";
                                    L && (b += " allow-forms");
                                    K && (b += " allow-popups");
                                    Q && (b += " allow-scripts");
                                    var t = a(e),
                                        d = "secured" == u ? m : "unsecured" == u ? chrome.runtime.getURL("/resources/messages/error-connection-message.html") :
                                        chrome.runtime.getURL("/resources/messages/unknown-connection-message.html");
                                    G.attr({
                                        allowpaymentrequest: C,
                                        sandbox: b,
                                        src: d
                                    }).on("load", function() {
                                        1 > A && (R.attr("src", chrome.runtime.getURL("/img/icons/Close.png")), S.attr("src", chrome.runtime.getURL("/img/icons/Search.png")), T.attr("src", chrome.runtime.getURL("/img/icons/Refresh.png")), U.attr("src", chrome.runtime.getURL("/img/icons/Copy-URL.png")), V.attr("src", chrome.runtime.getURL("/img/icons/Copy-Content.png")), H.attr("src", chrome.runtime.getURL("/img/icons/Pin.png")),
                                            W.attr("src", chrome.runtime.getURL("/img/icons/Camera.png")), X.css({
                                                display: "block"
                                            }).animate({
                                                right: "22px"
                                            }, 100, function() {
                                                Y.on("click", function() {
                                                    f()
                                                });
                                                Z.on("click", function() {
                                                    e.prepend('<div id="lp-search-screen"><input placeholder="Search Another Website" type="text"><div><button name="search">Search</button><button name="cancel">Cancel</button></div></div>');
                                                    var b = $("#lp-search-screen"),
                                                        d = $("#lp-search-screen input"),
                                                        f = $("#lp-search-screen button");
                                                    b.css({
                                                        "align-items": "center",
                                                        background: "rgba(0, 0, 0, 0.8)",
                                                        display: "flex",
                                                        "flex-direction": "column",
                                                        height: "100%",
                                                        "justify-content": "center",
                                                        position: "absolute",
                                                        width: "100%",
                                                        "z-index": "100000"
                                                    });
                                                    d.css({
                                                        background: "#fff",
                                                        border: "none",
                                                        "border-radius": "5px",
                                                        color: "#333",
                                                        "margin-bottom": "10px",
                                                        padding: "10px 10px 8px 10px",
                                                        "text-align": "center"
                                                    }).focus();
                                                    f.css({
                                                        background: "#fff",
                                                        border: "none",
                                                        "border-radius": "5px",
                                                        color: "#333",
                                                        cursor: "pointer",
                                                        display: "inline-block",
                                                        margin: "0 5px",
                                                        padding: "10px 10px 8px 10px",
                                                        "text-align": "center"
                                                    }).each(function() {
                                                        $(this).on("click",
                                                            function() {
                                                                "search" == $(this).attr("name") ? "" == d.val().replace(/ /g, "") ? (d.focus(), c(e, "Please Enter Website URL", "error")) : (b.remove(), m = d.val(), void 0 != t && t && t.remove(), t = a(e), v(), c(e, "Website Searched", "success")) : "cancel" == $(this).attr("name") && (b.remove(), c(e, "Website Search Cancelled", "error"))
                                                            })
                                                    })
                                                });
                                                aa.on("click", function() {
                                                    void 0 != t && t && t.remove();
                                                    t = a(e);
                                                    v();
                                                    c(e, "Website Refreshed", "success")
                                                });
                                                ba.on("click", function() {
                                                    navigator.clipboard.writeText(0 === m.indexOf("https://") || 0 === m.indexOf("http://") ?
                                                        m : F + m);
                                                    c(e, "Website URL Copied", "success")
                                                });
                                                ca.on("click", function() {
                                                    var a = "";
                                                    G.contents().find("body").find(":not(script)").find(":not(style)").each(function(b, c) {
                                                        a += "\n" + $(c).text().trim().replace(/\t/g, "")
                                                    });
                                                    0 === a.length ? c(e, "Security Restriction: Unable to copy the website's content. The website you're trying to preview prohibits this action", "error") : (navigator.clipboard.writeText(a), c(e, "Website Content Copied (Text)", "success"))
                                                });
                                                I.on("click", function() {
                                                    l()
                                                });
                                                da.on("click", function() {
                                                    r()
                                                })
                                            }),
                                            A = 1);
                                        t.remove();
                                        w && l();
                                        y && r()
                                    })
                                } catch (ea) {}
                            }

                            function l() {
                                J ? (k = J = !1, I.attr("title", "Pin Box"), H.attr("src", chrome.runtime.getURL("/img/icons/Pin.png")), c(e, "Box Unpinned", "success")) : (k = J = !0, I.attr("title", "Unpin Box"), H.attr("src", chrome.runtime.getURL("/img/icons/Unpin.png")), c(e, "Box Pinned", "success"))
                            }

                            function r() {
                                html2canvas(G.contents().find("body")[0], {
                                    allowTaint: !0,
                                    useCORS: !0
                                }).then(function(a) {
                                    var b = document.createElement("a");
                                    b.setAttribute("crossorigin", "anonymous");
                                    b.setAttribute("download",
                                        m + ".jpg");
                                    a.toBlob(function(a) {
                                        b.setAttribute("href", URL.createObjectURL(a));
                                        b.click()
                                    });
                                    g(e, "screenshot");
                                    c(e, "Screenshot Completed", "success")
                                })["catch"](function(a) {
                                    c(e, "Security Restriction: Unable to take a screenshot. The website you're trying to preview prohibits this action", "error")
                                })
                            }
                            var w = b.lpPinOnPreviewData,
                                y = b.lpScreenshotOnPreviewData,
                                N = b.lpBoxSizeData,
                                z = b.lpBorderStyleData,
                                B = b.lpShowLinkURLData,
                                C = b.lpAllowPaymentRequestsData,
                                L = b.lpAllowFormsData,
                                K = b.lpAllowPopupsData,
                                Q = b.lpAllowScriptsData,
                                F = String(window.location),
                                m = x.attr("href"),
                                u = "",
                                O = $("#lp-box-info"),
                                D = $("#lp-box-info-message"),
                                P = $("#lp-box-info-url"),
                                e = $("#lp-box-content"),
                                G = $("#lp-box-content iframe"),
                                X = $("#lp-box-content-toolbar"),
                                Y = $("#lp-box-content-toolbar-close-button"),
                                R = $("#lp-box-content-toolbar-close-button img"),
                                Z = $("#lp-box-content-toolbar-search-button"),
                                S = $("#lp-box-content-toolbar-search-button img"),
                                aa = $("#lp-box-content-toolbar-refresh-button"),
                                T = $("#lp-box-content-toolbar-refresh-button img"),
                                ba = $("#lp-box-content-toolbar-copy-url-button"),
                                U = $("#lp-box-content-toolbar-copy-url-button img"),
                                ca = $("#lp-box-content-toolbar-copy-content-button"),
                                V = $("#lp-box-content-toolbar-copy-content-button img"),
                                J = !1,
                                I = $("#lp-box-content-toolbar-pin-button"),
                                H = $("#lp-box-content-toolbar-pin-button img"),
                                da = $("#lp-box-content-toolbar-screenshot-button"),
                                W = $("#lp-box-content-toolbar-screenshot-button img"),
                                E;
                            v();
                            n.draggable({
                                cursor: "move",
                                start: function() {
                                    q = !0;
                                    E = d(e, "Dragging...");
                                    D.text("Dragging...")
                                },
                                stop: function() {
                                    q = !1;
                                    D.text("Drag this box by clicking and holding the left button of the mouse.");
                                    E.remove()
                                }
                            }).resizable({
                                start: function() {
                                    p = !0;
                                    E = d(e, "Resizing...");
                                    D.text("Resizing...")
                                },
                                stop: function() {
                                    p = !1;
                                    D.text("Drag this box by clicking and holding the left button of the mouse.");
                                    E.remove()
                                }
                            });
                            n.css({
                                top: h.getBoundingClientRect().bottom,
                                left: h.getBoundingClientRect().left
                            }).addClass("lp-show lp-box-size-" + N + " lp-border-style-" + z);
                            M.on("keydown", function(a) {
                                27 == a.keyCode && ($(this).off("keydown"), f())
                            })
                        })
                    })
                }, 1E3 * B))
            })
    }

    function K() {
        void 0 != k && k || void 0 != q && q || void 0 != p && p || void 0 == x || void 0 ==
            n || (l(), n.on("mouseenter", function() {
                clearTimeout(w)
            }).on("mouseleave", function() {
                l()
            }))
    }
    var M = $(window),
        r = $("body"),
        x, n, B, y, w, A = 0,
        h, z, k = !1,
        q = !1,
        p = !1;
    $("a[href]").on("mouseenter", function() {
        var a = this;
        chrome.storage.sync.get(function(c) {
            var b = c.lpBlocklistData;
            c = c.lpTriggerModeData;
            try {
                if (-1 != $.inArray(String(window.location.hostname), b) || -1 != $.inArray(String((new URL($(a).attr("href"))).hostname), b)) return
            } catch (L) {}
            if ("automatic" == c) C(a);
            else if ("manual" == c) M.on("keydown", function(b) {
                16 == b.keyCode &&
                    ($(this).off("keydown"), C(a))
            })
        })
    }).on("mouseleave", function() {
        K()
    })
});