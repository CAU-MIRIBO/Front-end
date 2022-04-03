var lpPages = "general-settings security-settings version developer report-a-bug faqs".split(" "),
    lpCurrentPage, lpWindow = $(window),
    lpBody = $("body"),
    lpMainContent = $("#lp-main-content"),
    //lpNavLink = $("#lp-logo, #lp-main-menu li a, #lp-footer-menu li a"),
    //lpNavLinkDefault = $('#lp-main-menu li a[href="#general-settings"]'),
    lpNotification, lpNotificationTimer;

function validatePage() {
    var a = showLoadingScreen(); - 1 == $.inArray(lpCurrentPage, lpPages) ? lpNavLinkDefault.get(0).click() : setActiveMenu(function() {
        loadPageContent()
    });
    setTimeout(function() {
        hideLoadingScreen(a)
    }, 300)
}

/*
액티브바
function setActiveMenu(a) {
    $("#lp-main-menu li a.active, #lp-footer-menu li a.active").removeClass("active");
    lpNavLink.each(function() {
        $(this).attr("href").replace("#", "") == lpCurrentPage && $(this).attr("aria-current", "page").addClass("active")
    });
    a()
}
*/

//로딩중일때
function showLoadingScreen() {
    lpBody.prepend('<div id="lp-loading-screen"><div id="lp-loading-screen-icon"></div><div id="lp-loading-screen-message">Loading... Please Wait.</div></div>');

    var a = $("#lp-loading-screen"),
        b = $("#lp-loading-screen-icon"),
        d = $("#lp-loading-screen-message");

    a.css({
        "align-items": "center",
        background: "#fff",
        display: "flex",
        "flex-direction": "column",
        height: "100%",
        "justify-content": "center",
        position: "fixed",
        width: "100%",
        "z-index": "100"
    });

    b.css({
        animation: "spin 0.3s linear infinite",
        "border-radius": "50%",
        "border-top": "3px solid #010451",
        height: "50px",
        margin: "0 auto",
        width: "50px"
    });

    d.css({
        color: "#010451",
        "margin-top": "16px"
    });

    lpWindow.scrollTop(0);
    return a
}

function hideLoadingScreen(a) {
    a.remove()
}

/*
보안관련인듯?
function showConfirmation(a, b, d, e, f) {
    lpBody.prepend('<div id="lp-confirmation"><div>' + a + '</div><br><div><button id="lp-confirmation-true-button">' + b + '</button><button id="lp-confirmation-false-button">' + e + "</button></div></div>");
    a = $("#lp-confirmation");
    b = $("#lp-confirmation button");
    e = $("#lp-confirmation-true-button");
    var k = $("#lp-confirmation-false-button");
    a.css({
        "align-items": "center",
        background: "#fff",
        color: "#010451",
        display: "flex",
        "flex-direction": "column",
        height: "100%",
        "justify-content": "center",
        position: "fixed",
        "text-align": "center",
        width: "100%",
        "z-index": "100"
    });
    b.css({
        background: "#fff",
        border: "1px solid #333",
        "border-radius": "5px",
        color: "#333",
        cursor: "pointer",
        display: "inline-block",
        margin: "0 5px",
        padding: "5px 10px 8px 10px",
        "text-align": "center"
    });
    e.on("click", function() {
        d()
    });
    k.on("click", function() {
        f()
    });
    return a
}
*/

function showNotification(a, b) {
    b = void 0 === b ? "" : b;
    lpBody.prepend('<div id="lp-notification">' + a + "</div>");
    void 0 != lpNotification && lpNotification && (lpNotification.stop().remove(), clearTimeout(lpNotificationTimer));
    lpNotification = $("#lp-notification");
    lpNotification.css({
        background: "success" == b ? "#d4edda" : "error" == b ? "#f8d7da" : "#e2e3e5",
        "border-color": "success" == b ? "#c3e6cb" : "error" == b ? "#f5c6cb" : "#d6d8db",
        "border-radius": "0.25rem",
        bottom: "1rem",
        "box-shadow": "0px 0px 5px 1px rgba(0, 0, 0, 0.25)",
        "-webkit-box-shadow": "0px 0px 5px 1px rgba(0, 0, 0, 0.25)",
        "-moz-box-shadow": "0px 0px 5px 1px rgba(0, 0, 0, 0.25)",
        color: "success" == b ? "#155724" : "error" == b ? "#721c24" : "#383d41",
        "font-size": "0.9rem",
        height: "auto",
        left: "0",
        margin: "0 auto 0 auto",
        padding: "0.8rem",
        opacity: "1",
        position: "fixed",
        right: "0",
        "text-align": "center",
        width: "50%",
        "z-index": "1000000"
    });
    lpNotificationTimer = setTimeout(function() {
        lpNotification.animate({
            opacity: "0"
        }, 1500, function() {
            lpNotification.remove();
            clearTimeout(lpNotificationTimer)
        })
    }, 1500)
}

function loadPageContent() {
    $.ajax({
        url: "/resources/pages/" + lpCurrentPage + ".html",
        type: "GET"
    }).done(function(a) {
        lpMainContent.html(a);
        switch (lpCurrentPage) {
            case "general-settings":
                var b = $("#lp-enable-previewer-box"),
                    d = $("#lp-trigger-mode"),
                    e = $("#lp-buffer-time"),
                    f = $("#lp-pin-on-preview"),
                    k = $("#lp-disable-scroll-on-preview"),
                    q = $("#lp-screenshot-on-preview"),
                    r = $("#lp-box-size"),
                    t = $("#lp-border-style"),
                    u = $("#lp-show-link-url"),
                    B = $("#lp-enable-previewer-box, #lp-trigger-mode, #lp-buffer-time, #lp-pin-on-preview, #lp-disable-scroll-on-preview, #lp-screenshot-on-preview, #lp-box-size, #lp-border-style, #lp-show-link-url");
                chrome.storage.sync.get(function(a) {
                    var l = a.lpTriggerModeData,
                        m = a.lpBufferTimeData,
                        n = a.lpPinOnPreviewData,
                        g = a.lpDisableScrollOnPreviewData,
                        D = a.lpScreenshotOnPreviewData,
                        h = a.lpBoxSizeData,
                        c = a.lpBorderStyleData,
                        p = a.lpShowLinkURLData;
                    b.attr("checked", a.lpEnablePreviewerBoxData);
                    d.val(l);
                    e.val(m);
                    f.attr("checked", n);
                    k.attr("checked", g);
                    q.attr("checked", D);
                    r.val(h);
                    t.val(c);
                    u.attr("checked", p);
                    B.on("change", function() {
                        var a = b.is(":checked"),
                            h = d.val(),
                            c = e.val(),
                            l = f.is(":checked"),
                            p = k.is(":checked"),
                            C = q.is(":checked"),
                            m = r.val(),
                            n = t.val(),
                            g = u.is(":checked");

                        chrome.storage.sync.set({
                            lpEnablePreviewerBoxData: a,
                            lpTriggerModeData: h,
                            lpBufferTimeData: c,
                            lpPinOnPreviewData: l,
                            lpDisableScrollOnPreviewData: p,
                            lpScreenshotOnPreviewData: C,
                            lpBoxSizeData: m,
                            lpBorderStyleData: n,
                            lpShowLinkURLData: g
                        });
                        showNotification("Changes Sucessfully Saved", "success")
                    })
                });
                break;
				/*
            case "security-settings":
                var v = $("#lp-active-blocklist"),
                    w = $("#lp-blocklist"),
                    E = $("#lp-blocklist-add-button"),
                    x = $("#lp-allow-payment-requests"),
                    y = $("#lp-allow-forms"),
                    z = $("#lp-allow-popups"),
                    A = $("#lp-allow-scripts"),
                    F = $("#lp-allow-payment-requests, #lp-allow-forms, #lp-allow-popups, #lp-allow-scripts");
                chrome.storage.sync.get(function(a) {
                    function b(a) {
                        0 < a.length ? (v.html(a.map(function(a) {
                            return '<li class="lp-active-blocklist-item">' + a + "</li>"
                        }).join("")).css({
                            "list-style-image": "url(" + chrome.runtime.getURL("/img/icons/Delete.png") + ")"
                        }), $(".lp-active-blocklist-item").each(function() {
                            $(this).on("click", function() {
                                var a = this;
                                chrome.storage.sync.get(function(h) {
                                    var c =
                                        h.lpBlocklistData,
                                        d = showConfirmation("Are you sure you want unblock this website?<div><strong>" + $(a).text() + "</strong></div>", "Yes", function() {
                                            c.splice(c.indexOf($(this).text()));
                                            chrome.storage.sync.set({
                                                lpBlocklistData: c
                                            });
                                            b(c);
                                            d.remove();
                                            showNotification("Website Unblocked", "success")
                                        }, "No", function() {
                                            d.remove();
                                            showNotification("Unblocking Cancelled", "error")
                                        })
                                })
                            })
                        })) : v.html("<li>No Website Blocked</li>").css({
                            "list-style-image": "none"
                        })
                    }
                    var d = a.lpAllowPaymentRequestsData,
                        e = a.lpAllowFormsData,
                        g = a.lpAllowPopupsData,
                        f = a.lpAllowScriptsData;
                    b(a.lpBlocklistData);
                    x.attr("checked", d);
                    y.attr("checked", e);
                    z.attr("checked", g);
                    A.attr("checked", f);
                    E.on("click", function() {
                        var a;
                        try {
                            a = new URL(w.val().replace(/ /g, ""))
                        } catch (c) {
                            showNotification("Please Enter a Valid Website URL", "error");
                            return
                        }
                        void 0 == a || null == a || "" == a ? showNotification("Please Enter a Valid Website URL", "error") : (a = a.hostname, chrome.storage.sync.get(function(c) {
                            c = c.lpBlocklistData; - 1 != $.inArray(a, c) ? showNotification("Website Already Blocked",
                                "error") : (c.push(a), chrome.storage.sync.set({
                                lpBlocklistData: c
                            }), w.val("").focus(), b(c), showNotification("Website Successfully Blocked", "success"))
                        }))
                    });
                    F.on("change", function() {
                        var a = x.is(":checked"),
                            b = y.is(":checked"),
                            d = z.is(":checked"),
                            e = A.is(":checked");
                        chrome.storage.sync.set({
                            lpAllowPaymentRequestsData: a,
                            lpAllowFormsData: b,
                            lpAllowPopupsData: d,
                            lpAllowScriptsData: e
                        });
                        showNotification("Changes Sucessfully Saved", "success")
                    })
                })
				*/
        }
    })
};