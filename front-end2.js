!function () {
    var e, t, n;
    !function (i) {
        function r(e, t) {
            return y.call(e, t)
        }

        function o(e, t) {
            var n, i, r, o, l, s, c, a, h, f, u, d = t && t.split("/"), g = v.map, m = g && g["*"] || {};
            if (e && "." === e.charAt(0)) if (t) {
                for (e = e.split("/"), l = e.length - 1, v.nodeIdCompat && x.test(e[l]) && (e[l] = e[l].replace(x, "")), e = d.slice(0, d.length - 1).concat(e), h = 0; h < e.length; h += 1) if ("." === (u = e[h])) e.splice(h, 1), h -= 1; else if (".." === u) {
                    if (1 === h && (".." === e[2] || ".." === e[0])) break;
                    h > 0 && (e.splice(h - 1, 2), h -= 2)
                }
                e = e.join("/")
            } else 0 === e.indexOf("./") && (e = e.substring(2));
            if ((d || m) && g) {
                for (n = e.split("/"), h = n.length; h > 0; h -= 1) {
                    if (i = n.slice(0, h).join("/"), d) for (f = d.length; f > 0; f -= 1) if ((r = g[d.slice(0, f).join("/")]) && (r = r[i])) {
                        o = r, s = h;
                        break
                    }
                    if (o) break;
                    !c && m && m[i] && (c = m[i], a = h)
                }
                !o && c && (o = c, s = a), o && (n.splice(0, s, o), e = n.join("/"))
            }
            return e
        }

        function l(e, t) {
            return function () {
                var n = P.call(arguments, 0);
                return "string" != typeof n[0] && 1 === n.length && n.push(null), d.apply(i, n.concat([e, t]))
            }
        }

        function s(e) {
            return function (t) {
                return o(t, e)
            }
        }

        function c(e) {
            return function (t) {
                p[e] = t
            }
        }

        function a(e) {
            if (r(b, e)) {
                var t = b[e];
                delete b[e], w[e] = !0, u.apply(i, t)
            }
            if (!r(p, e) && !r(w, e)) throw new Error("No " + e);
            return p[e]
        }

        function h(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function f(e) {
            return function () {
                return v && v.config && v.config[e] || {}
            }
        }

        var u, d, g, m, p = {}, b = {}, v = {}, w = {}, y = Object.prototype.hasOwnProperty, P = [].slice, x = /\.js$/;
        g = function (e, t) {
            var n, i = h(e), r = i[0];
            return e = i[1], r && (r = o(r, t), n = a(r)), r ? e = n && n.normalize ? n.normalize(e, s(t)) : o(e, t) : (e = o(e, t), i = h(e), r = i[0], e = i[1], r && (n = a(r))), {
                f: r ? r + "!" + e : e,
                n: e,
                pr: r,
                p: n
            }
        }, m = {
            require: function (e) {
                return l(e)
            }, exports: function (e) {
                var t = p[e];
                return void 0 !== t ? t : p[e] = {}
            }, module: function (e) {
                return {id: e, uri: "", exports: p[e], config: f(e)}
            }
        }, u = function (e, t, n, o) {
            var s, h, f, u, d, v, y = [], P = typeof n;
            if (o = o || e, "undefined" === P || "function" === P) {
                for (t = !t.length && n.length ? ["require", "exports", "module"] : t, d = 0; d < t.length; d += 1) if (u = g(t[d], o), "require" === (h = u.f)) y[d] = m.require(e); else if ("exports" === h) y[d] = m.exports(e), v = !0; else if ("module" === h) s = y[d] = m.module(e); else if (r(p, h) || r(b, h) || r(w, h)) y[d] = a(h); else {
                    if (!u.p) throw new Error(e + " missing " + h);
                    u.p.load(u.n, l(o, !0), c(h), {}), y[d] = p[h]
                }
                f = n ? n.apply(p[e], y) : void 0, e && (s && s.exports !== i && s.exports !== p[e] ? p[e] = s.exports : f === i && v || (p[e] = f))
            } else e && (p[e] = n)
        }, e = t = d = function (e, t, n, r, o) {
            if ("string" == typeof e) return m[e] ? m[e](t) : a(g(e, t).f);
            if (!e.splice) {
                if (v = e, v.deps && d(v.deps, v.callback), !t) return;
                t.splice ? (e = t, t = n, n = null) : e = i
            }
            return t = t || function () {
            }, "function" == typeof n && (n = r, r = o), r ? u(i, e, t, n) : setTimeout(function () {
                u(i, e, t, n)
            }, 4), d
        }, d.config = function (e) {
            return d(e)
        }, e._defined = p, n = function (e, t, n) {
            if ("string" != typeof e) throw new Error("See almond README: incorrect module build, no module name");
            t.splice || (n = t, t = []), r(p, e) || r(b, e) || (b[e] = [e, t, n])
        }, n.amd = {jQuery: !0}
    }(), n("../lib/almond", function () {
    }), n("views/header", [], function () {
        return Marionette.ItemView.extend({
            template: "#tmpl-nf-mp-header",
            fullProgressBar: !1,
            initialize: function (e) {
                this.listenTo(this.collection, "change:part", this.reRender), this.listenTo(this.collection, "change:errors", this.reRender), this.listenTo(i.channel("forms"), "before:submit", this.fillProgressBar)
            },
            reRender: function () {
                this.model = this.collection.getElement(), this.render()
            },
            templateHelpers: function () {
                var e = this;
                return {
                    renderPartTitle: function () {
                        if (void 0 === e.collection.formModel.get("settings").mp_display_titles || 0 == e.collection.formModel.get("settings").mp_display_titles) return "";
                        var t = Backbone.Radio.channel("app").request("get:template", "#tmpl-nf-mp-part-title");
                        return 1 < _.invoke(e.collection.getVisibleParts(), "pick", ["title", "errors", "visible"]).length ? t({title: this.title}) : ""
                    }, renderBreadcrumbs: function () {
                        if (void 0 === e.collection.formModel.get("settings").mp_breadcrumb || 0 == e.collection.formModel.get("settings").mp_breadcrumb) return "";
                        var t = Backbone.Radio.channel("app").request("get:template", "#tmpl-nf-mp-breadcrumbs"),
                            n = _.invoke(e.collection.getVisibleParts(), "pick", ["title", "errors", "visible"]);
                        return 1 < n.length ? t({
                            parts: n,
                            currentIndex: e.collection.getVisibleParts().indexOf(e.model)
                        }) : ""
                    }, renderProgressBar: function () {
                        if (void 0 === e.collection.formModel.get("settings").mp_progress_bar || 0 == e.collection.formModel.get("settings").mp_progress_bar) return "";
                        var t = Backbone.Radio.channel("app").request("get:template", "#tmpl-nf-mp-progress-bar"),
                            n = e.collection.getVisibleParts().indexOf(e.model),
                            i = e.fullProgressBar ? 100 : n / e.collection.getVisibleParts().length * 100;
                        return 1 < e.collection.getVisibleParts().length ? t({percent: i}) : ""
                    }
                }
            },
            events: {"click .nf-breadcrumb": "clickBreadcrumb"},
            clickBreadcrumb: function (e) {
                e.preventDefault(), this.collection.setElement(this.collection.getVisibleParts()[jQuery(e.target).data("index")])
            },
            fillProgressBar: function (e) {
                this.fullProgressBar = !0, this.render(), this.fullProgressBar = !1
            }
        })
    }), n("views/footer", [], function () {
        return Marionette.ItemView.extend({
            template: "#tmpl-nf-mp-footer", initialize: function (e) {
                this.listenTo(this.collection, "change:part", this.reRender)
            }, reRender: function () {
                this.model = this.collection.getElement(), this.render()
            }, templateHelpers: function () {
                var e = this;
                return {
                    renderNextPrevious: function () {
                        var t = Backbone.Radio.channel("app").request("get:template", "#tmpl-nf-mp-next-previous"),
                            n = !1, i = !1, r = e.collection.where({visible: !0});
                        return r.indexOf(e.model) != r.length - 1 && (n = !0), 0 != r.indexOf(e.model) && (i = !0), n || i ? t({
                            showNext: n,
                            showPrevious: i,
                            prevLabel: e.collection.formModel.get("mp_prev_label") || nfMPSettings.prevLabel,
                            nextLabel: e.collection.formModel.get("mp_next_label") || nfMPSettings.nextLabel
                        }) : ""
                    }
                }
            }
        })
    }), n("views/formContent", ["views/header", "views/footer"], function (e, t) {
        return Marionette.LayoutView.extend({
            template: "#tmpl-nf-mp-form-content",
            regions: {header: ".nf-mp-header", body: ".nf-mp-body", footer: ".nf-mp-footer"},
            initialize: function (e) {
                this.formModel = e.formModel, this.collection = e.data, this.listenTo(this.collection, "change:part", this.changePart), this.listenTo(this.collection, "change:visible", this.renderHeaderFooter)
            },
            onRender: function () {
                this.header.show(new e({collection: this.collection, model: this.collection.getElement()}));
                var n = i.channel("formContent").request("get:viewFilters"), r = _.without(n, void 0), o = r[1];
                this.formContentView = o(), this.body.show(new this.formContentView({collection: this.collection.getElement().get("formContentData")})), this.footer.show(new t({
                    collection: this.collection,
                    model: this.collection.getElement()
                }))
            },
            renderHeaderFooter: function () {
                this.header.show(new e({
                    collection: this.collection,
                    model: this.collection.getElement()
                })), this.footer.show(new t({collection: this.collection, model: this.collection.getElement()}))
            },
            changePart: function () {
                this.body.show(new this.formContentView({collection: this.collection.getElement().get("formContentData")}));
                var e = jQuery(this.body.el).closest(".nf-form-cont").offset().top;
                jQuery(window).scrollTop() > e - 50 && jQuery(window).scrollTop(e - 50)
            },
            events: {"click .nf-next": "clickNext", "click .nf-previous": "clickPrevious"},
            clickNext: function (e) {
                e.preventDefault(), this.collection.next()
            },
            clickPrevious: function (e) {
                e.preventDefault(), this.collection.previous()
            }
        })
    }), n("models/partModel", [], function () {
        return Backbone.Model.extend({
            fieldErrors: {},
            defaults: {errors: !1, visible: !0, title: ""},
            initialize: function () {
                this.filterFormContentData(), this.listenTo(this.get("formContentData"), "change:errors", this.maybeChangeActivePart), this.fieldErrors[this.cid] = [], this.on("change:visible", this.changeVisible, this), this.set("order", Number(this.get("order")))
            },
            filterFormContentData: function () {
                if (this.get("formContentData")) {
                    var e = this.get("formContentData"), t = i.channel("formContent").request("get:loadFilters"),
                        n = _.without(t, void 0), r = n[1], o = 0 == e.length;
                    if (void 0 === t[4] && _.isArray(e) && 0 != e.length && void 0 !== e[0].cells) {
                        var l = [], s = _.pluck(e, "cells");
                        _.each(s, function (e) {
                            var t = _.flatten(_.pluck(e, "fields"));
                            l = _.union(l, t)
                        }), e = l, this.set("formContentData", e)
                    }
                    this.set("formContentData", r(e, this.collection.formModel, o, e))
                }
            },
            maybeChangeActivePart: function (e) {
                0 < e.get("errors").length ? (this.set("errors", !0), this.fieldErrors[this.cid].push(e.get("key")), this.collection.getElement() != this && this.collection.indexOf(this.collection.getElement()) > this.collection.indexOf(this) && this.collection.setElement(this)) : (this.fieldErrors[this.cid] = _.without(this.fieldErrors[this.cid], e.get("key")), 0 == this.fieldErrors[this.cid].length && this.set("errors", !1))
            },
            validateFields: function () {
                this.get("formContentData").validateFields()
            },
            changeVisible: function () {
                this.get("visible") ? this.get("formContentData").showFields() : this.get("formContentData").hideFields()
            }
        })
    }), n("models/partCollection", ["models/partModel"], function (e) {
        return Backbone.Collection.extend({
            model: e, currentElement: !1, initialize: function (e, t) {
                this.formModel = t.formModel
            }, getElement: function () {
                return this.currentElement || this.setElement(this.at(0), !0), this.currentElement
            }, setElement: function (e, t) {
                !(t = t || !1) && this.partErrors() || (this.currentElement = e, t || (this.trigger("change:part", this), i.channel("nfMP").trigger("change:part", this)))
            }, setNextElement: function (e, t) {
                !(t = t || !1) && this.partErrors() || (this.currentElement = e, t || (this.trigger("change:part", this), i.channel("nfMP").trigger("change:part", this)))
            }, setPreviousElement: function (e, t) {
                t = t || !1, this.currentElement = e, t || (this.trigger("change:part", this), i.channel("nfMP").trigger("change:part", this))
            }, next: function () {
                return this.getVisibleParts().length - 1 != this.getVisibleParts().indexOf(this.getElement()) && this.setNextElement(this.getVisibleParts()[this.getVisibleParts().indexOf(this.getElement()) + 1]), this
            }, previous: function () {
                return 0 != this.getVisibleParts().indexOf(this.getElement()) && this.setPreviousElement(this.getVisibleParts()[this.getVisibleParts().indexOf(this.getElement()) - 1]), this
            }, partErrors: function () {
                return void 0 !== this.formModel.get("settings").mp_validate && 0 != this.formModel.get("settings").mp_validate && (this.currentElement.validateFields(), this.currentElement.get("errors"))
            }, validateFields: function () {
                _.each(this.getVisibleParts(), function (e) {
                    e.validateFields()
                })
            }, getVisibleParts: function () {
                return this.where({visible: !0})
            }
        })
    }), n("controllers/loadFilters", ["views/formContent", "models/partCollection"], function (e, t) {
        return Marionette.Object.extend({
            initialize: function () {
                i.channel("formContent").request("add:viewFilter", this.getformContentView, 1), i.channel("formContent").request("add:loadFilter", this.formContentLoad, 1)
            }, getformContentView: function (t) {
                return e
            }, formContentLoad: function (e, n) {
                if (!0 == e instanceof t) return e;
                if (_.isArray(e) && 0 != _.isArray(e).length && void 0 !== _.first(e) && "part" == _.first(e).type) var i = new t(e, {formModel: n}); else var i = new t({formContentData: e}, {formModel: n});
                return i
            }
        })
    }), n("controllers/conditionalLogic", [], function () {
        return Marionette.Object.extend({
            initialize: function () {
                i.channel("condition:trigger").reply("show_part", this.showPart, this), i.channel("condition:trigger").reply("hide_part", this.hidePart, this)
            }, showPart: function (e, t) {
                e.set("alreadyTriggered", !0), this.changePartVisibility(e, t, !0), e.set("alreadyTriggered", !1)
            }, hidePart: function (e, t) {
                e.set("alreadyTriggered", !0), this.changePartVisibility(e, t, !1), e.set("alreadyTriggered", !1)
            }, changePartVisibility: function (e, t, n) {
                var i = Date.now();
                e.collection.mpResetFlag || (e.collection.mpResetFlag = i), e.collection.formModel.get("formContentData").findWhere({key: t.key}).set("visible", n), e.collection.each(function (t) {
                    t != e && (t.get("alreadyTriggered") || (t.checkWhen(), t.set("alreadyTriggered", !0)))
                }), i == e.collection.mpResetFlag && (e.collection.invoke("set", {alreadyTriggered: !1}), e.collection.mpResetFlag = !1)
            }
        })
    }), n("controllers/renderRecaptcha", [], function () {
        return Marionette.Object.extend({
            initialize: function () {
                this.listenTo(i.channel("nfMP"), "change:part", this.changePart, this)
            }, changePart: function (e, t) {
                jQuery(".g-recaptcha").each(function () {
                    var e = jQuery(this).data("callback"), t = jQuery(this).data("fieldid");
                    "function" != typeof window[e] && (window[e] = function (e) {
                        i.channel("recaptcha").request("update:response", e, t)
                    });
                    var n = {theme: jQuery(this).data("theme"), sitekey: jQuery(this).data("sitekey"), callback: e};
                    grecaptcha.render(jQuery(this)[0], n)
                })
            }
        })
    }), n("controllers/renderHelpText", [], function () {
        return Marionette.Object.extend({
            initialize: function () {
                this.listenTo(i.channel("nfMP"), "change:part", this.changePart, this)
            }, changePart: function (e, t) {
                jQuery(".nf-help").each(function () {
                    jQuery(this).jBox("Tooltip", {theme: "TooltipBorder", content: jQuery(this).data("text")})
                })
            }
        })
    }), n("controllers/loadControllers", ["controllers/conditionalLogic", "controllers/renderRecaptcha", "controllers/renderHelpText"], function (e, t, n) {
        return Marionette.Object.extend({
            initialize: function () {
                new e, new t, new n
            }
        })
    });
    var i = Backbone.Radio;
    t(["controllers/loadFilters", "controllers/loadControllers"], function (e, t) {
        (new (Marionette.Application.extend({
            initialize: function (e) {
                this.listenTo(i.channel("form"), "before:filterData", this.loadFilters), this.listenTo(i.channel("form"), "loaded", this.loadControllers)
            }, loadFilters: function (t) {
                new e
            }, loadControllers: function (e) {
                new t
            }, onStart: function () {
            }
        }))).start()
    }), n("main", function () {
    })
}();
//# sourceMappingURL=almond.build.js.map
//# sourceMappingURL=front-end.js.map