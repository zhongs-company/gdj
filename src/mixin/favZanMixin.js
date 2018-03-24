export default {
    data() {
        return {
            isFav: true,
            isZan: true
        };
    },
    methods: {
        toDetailPage(courseId) {
            if (courseId) {
                this.$router.push({ name: "LibraryDetail", params: { courseId } });
            }
        },
        //收藏
        fav(item) {
            var { courseId, isFavorite } = item;
            if (isFavorite === "Y" && this.isFav) {
                this.isFav = false;
                this.$store.dispatch("yxkck_elnCourseFavoriteCancel", {
                    courseId,
                    cb: () => {
                        this.isFav = true;
                    }
                });
                return;
            }
            if (isFavorite === "N" && this.isFav) {
                this.isFav = false;
                this.$store.dispatch("yxkck_elnCourseFavorite", {
                    courseId,
                    cb: () => {
                        this.isFav = true;
                    }
                });
                return;
            }
        },
        //点赞
        zan(item) {
            var { courseId, isThumb } = item;
            if (isThumb === "Y" && this.isZan) {
                this.isZan = false;
                this.$store.dispatch("yxkck_zan_cancel", {
                    courseId,
                    cb: () => {
                        this.isZan = true;
                    }
                });
                return;
            }
            if (isThumb === "N" && this.isZan) {
                this.isZan = false;
                this.$store.dispatch("yxkck_zan", {
                    courseId,
                    cb: () => {
                        this.isZan = true;
                    }
                });
                return;
            }
        }
    }
}
