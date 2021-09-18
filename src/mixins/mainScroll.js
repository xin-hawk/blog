export default function (refValue) {
    return {
        mounted() {
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMianScroll);
        },
        beforeDestroy() {
            this.$bus.$emit("mainScroll");
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].removeEventListener("scroll", this.handleMianScroll);
        },
        methods:{
            handleSetMainScroll(scrollTop){
                this.$refs[refValue].scrollTop = scrollTop;
            },
            handleMianScroll(){
                this.$bus.$emit("mainScroll",this.$refs[refValue]);
            }
        }
    };
}