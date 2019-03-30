CHARITABLE = window.CHARITABLE || {},
    function (t) {
        t.Sessions = function () {
            function e() {
                var e, t, n, a, i, o = document.querySelectorAll(".charitable-session-content"),
                    s = "action=charitable_get_session_content";
                if (o.length) {
                    for (i = 0; i < o.length; i++) for (a in t = (e = o[i]).getAttribute("data-template"),
                        n = JSON.parse(e.getAttribute("data-args")), s += "&templates[" + i + "][template]=" + t, n) s += "&templates[" + i + "][" + a + "]=" + n[a];
                    var S = new XMLHttpRequest;
                    S.open("POST", CHARITABLE_SESSION.ajaxurl, !0), S.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                        S.onreadystatechange = function () {
                            if (4 === this.readyState && 200 <= this.status && this.status < 400) {
                                var e = JSON.parse(this.response);
                                if (!e.success) return;
                                for (i = 0; i < e.data.length; i += 1) e.data[i].length && (o[i].innerHTML = e.data[i], o[i].style.display = "block")
                            }
                        }, S.send(s)
                        , S = null
                }
            }

            this.session_id = Cookies.get(CHARITABLE_SESSION.cookie_name),
            this.session_id || (Cookies.set(CHARITABLE_SESSION.cookie_name, CHARITABLE_SESSION.generated_id + "||" + CHARITABLE_SESSION.expiration + "||" + CHARITABLE_SESSION.expiration_variant,
                {
                    expires: new Date((new Date).getTime() + 1e3 * parseInt(CHARITABLE_SESSION.expiration)),
                    path: CHARITABLE_SESSION.cookie_path, domain: CHARITABLE_SESSION.cookie_domain,
                    secure: CHARITABLE_SESSION.secure
                }), CHARITABLE_SESSION.generated_id, CHARITABLE_SESSION.expiration
                , CHARITABLE_SESSION.expiration_variant), this.session_id && this.session_id === CHARITABLE_SESSION.id || (t.content_loading = !0, "loading" != document.readyState ? (e(), t.content_loading = !1) : document.addEventListener ? (document.addEventListener("DOMContentLoaded", e), t.content_loading = !1) : document.attachEvent("onreadystatechange", function () {
                "loading" != document.readyState && e(), t.content_loading = !1
            }))
        }()
    }(CHARITABLE);