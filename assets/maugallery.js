!(function (e) {
    (e.fn.mauGallery = function (a) {
        var a = e.extend(e.fn.mauGallery.defaults, a),
            t = [];
        return this.each(function () {
            e.fn.mauGallery.methods.createRowWrapper(e(this)),
                a.lightBox && e.fn.mauGallery.methods.createLightBox(e(this), a.lightboxId, a.navigation),
                e.fn.mauGallery.listeners(a),
                e(this)
                    .children(".gallery-item")
                    .each(function (l) {
                        e.fn.mauGallery.methods.responsiveImageItem(e(this)), e.fn.mauGallery.methods.moveItemInRowWrapper(e(this)), e.fn.mauGallery.methods.wrapItemInColumn(e(this), a.columns);
                        var i = e(this).data("gallery-tag");
                        a.showTags && void 0 !== i && -1 === t.indexOf(i) && t.push(i);
                    }),
                a.showTags && e.fn.mauGallery.methods.showItemTags(e(this), a.tagsPosition, t),
                e(this).fadeIn(500);
        });
    }),
        (e.fn.mauGallery.defaults = { columns: 3, lightBox: !0, lightboxId: null, showTags: !0, tagsPosition: "bottom", navigation: !0 }),
        (e.fn.mauGallery.listeners = function (a) {
            e(".gallery-item").on("click", function () {
                a.lightBox && "IMG" === e(this).prop("tagName") && e.fn.mauGallery.methods.openLightBox(e(this), a.lightboxId);
            }),
                e(".gallery").on("click", ".nav-link", e.fn.mauGallery.methods.filterByTag),
                e(".gallery").on("click", ".mg-prev", () => e.fn.mauGallery.methods.prevImage(a.lightboxId)),
                e(".gallery").on("click", ".mg-next", () => e.fn.mauGallery.methods.nextImage(a.lightboxId));
        }),
        (e.fn.mauGallery.methods = {
            createRowWrapper(e) {
                e.children().first().hasClass("row") || e.append('<div class="gallery-items-row row"></div>');
            },
            wrapItemInColumn(e, a) {
                if (a.constructor === Number) e.wrap(`<div class='item-column mb-4 col-${Math.ceil(12 / a)}'></div>`);
                else if (a.constructor === Object) {
                    var t = "";
                    a.xs && (t += ` col-${Math.ceil(12 / a.xs)}`),
                        a.sm && (t += ` col-sm-${Math.ceil(12 / a.sm)}`),
                        a.md && (t += ` col-md-${Math.ceil(12 / a.md)}`),
                        a.lg && (t += ` col-lg-${Math.ceil(12 / a.lg)}`),
                        a.xl && (t += ` col-xl-${Math.ceil(12 / a.xl)}`),
                        e.wrap(`<div class='item-column mb-4${t}'></div>`);
                } else console.error(`Columns should be defined as numbers or objects. ${typeof a} is not supported.`);
            },
            moveItemInRowWrapper(e) {
                e.appendTo(".gallery-items-row");
            },
            responsiveImageItem(e) {
                "IMG" === e.prop("tagName") && e.addClass("img-fluid");
            },
            openLightBox(a, t) {
                e(`#${t}`).find(".lightboxImage").attr("src", a.attr("src")), e(`#${t}`).modal("toggle");
            },
            prevImage(a) {
                let t = e(".gallery-item:visible"),
                    l = e("#" + a)
                        .find(".lightboxImage")
                        .attr("src"),
                    i =
                        t.index(
                            t.filter(function () {
                                return e(this).attr("src") === l;
                            })
                        ) - 1;
                if (i >= 0) {
                    let s = t.eq(i).attr("src");
                    e("#" + a)
                        .find(".lightboxImage")
                        .attr("src", s);
                }
            },
            nextImage(a) {
                let t = e(".gallery-item:visible"),
                    l = e("#" + a)
                        .find(".lightboxImage")
                        .attr("src"),
                    i =
                        t.index(
                            t.filter(function () {
                                return e(this).attr("src") === l;
                            })
                        ) + 1;
                if (i < t.length) {
                    let s = t.eq(i).attr("src");
                    e("#" + a)
                        .find(".lightboxImage")
                        .attr("src", s);
                }
            },
            createLightBox(e, a, t) {
                e.append(`<div class="modal fade" id="${a || "galleryLightbox"}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${t ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>' : '<span style="display:none;" />'}
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affich\xe9e dans la modale au clique"/>
                            ${t ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>' : '<span style="display:none;" />'}
                        </div>
                    </div>
                </div>
            </div>`);
            },
            showItemTags(a, t, l) {
                var i = '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
                e.each(l, function (e, a) {
                    i += `<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${a}">${a}</span></li>`;
                });
                var s = `<ul class="my-4 tags-bar nav nav-pills">${i}</ul>`;
                "bottom" === t ? a.append(s) : "top" === t ? a.prepend(s) : console.error(`Unknown tags position: ${t}`);
            },
            filterByTag() {
                e(".nav-link.active").removeClass("active active-tag"), e(this).addClass("active active-tag");
                var a = e(this).data("images-toggle");
                e(".gallery-item").each(function () {
                    e(this).parents(".item-column").hide(), "all" === a ? e(this).parents(".item-column").show(300) : e(this).data("gallery-tag") === a && e(this).parents(".item-column").show(300);
                });
            },
        });
})(jQuery);
