export default {
    methods: {
        toDetailPage(courseId) {
            if (courseId) {
              this.$router.push({ name: "LibraryDetail", params: { courseId } });
            }
        },
        //收藏
        fav(item) {
            var { courseId, isFavorite } = item;
            if (isFavorite === "Y") {
                this.$store.dispatch("yxkck_elnCourseFavoriteCancel", courseId);
                return;
            }
            if (isFavorite === "N") {
                this.$store.dispatch("yxkck_elnCourseFavorite", courseId);
                return;
            }
        },
        //点赞
        zan(item) {
            var { courseId, isThumb } = item;
            if (isThumb === "Y") {
                this.$store.dispatch("yxkck_zan_cancel", courseId);
                return;
            }
            if (isThumb === "N") {
                this.$store.dispatch("yxkck_zan", courseId);
                return;
            }
        }
    }
}