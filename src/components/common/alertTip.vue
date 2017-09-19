 <template>
    <div class="alert_container">
        <div class="mask_layer">
    	    <section class="tip_text_container">
                <!-- <div class="tip_icon">
                    <span></span>
                    <span></span>
                </div> -->
                <p class="tip_text">{{alertText}}</p>
                <div class="btnWrapper">
                    <div class="login alt-item" @click="login" v-if='isShowLoginBtn'>去登录</div>
                    <div class="cancel alt-item" @click="cancel" v-if='isShowCancel'>取消</div>
                    <div class="confrim alt-item" @click="closeTip">确认</div>
                    <div class="alt alt-item" @click="altAction" v-if="isShowAlt">{{altText}}</div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
    	data(){
            return{
                positionY: 0,
                timer: null,
            }
        },
        mounted(){
      
        },
        props: ['alertText', 'isShowLoginBtn', 'isShowCancel', 'isModifyConfirm', 'isShowAlt', 'altText'],
        methods: {
            closeTip(){
                if (this.isModifyConfirm) {
                    this.$emit('confirm');
                } else {
                    this.$emit('closeTip')
                }
            },
            login() {
                this.$emit('login')
            },
            cancel() {
                this.$emit('cancel')
            },
            altAction() {
                this.$emit('altAction');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alert_container{
    	position: fixed;
    	top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .mask_layer {
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, .6);
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6rem;
        margin-left: -6rem;
        width: 12rem;
        animation: tipMove .4s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        padding-top: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_icon{
            @include wh(3rem, 3rem);
            border: 0.15rem solid #f8cb86;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            span:nth-of-type(1){
                @include wh(.12rem, 1.5rem);
                background-color: #f8cb86;
            }
            span:nth-of-type(2){
                @include wh(.2rem, .2rem);
                border: 1px;
                border-radius: 50%;
                margin-top: .2rem;
                background-color: #f8cb86;
            }
        }
        .tip_text{
            @include sc(.7rem, #333);
            line-height: .9rem;
            text-align: center;
            margin-top: .8rem;
            padding: 0 .4rem;
        }
        .btnWrapper {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            height: 1.8rem;
            margin-top: .8rem;
            .alt-item {
                flex: 1;
                @include sc(.8rem, $appMainColor);
                font-weight: bold;
                // width: 100%;
                text-align: center;
                line-height: 1.8rem;
                vertical-align: top;
            } 

            /* .login {
                flex: 1;
                @include sc(.8rem, $appMainColor);
                font-weight: bold;
                // margin-top: .8rem;
                // background-color: #4cd964;
                // background-color: $appMainColor;
                // width: 100%;
                text-align: center;
                line-height: 1.8rem;
                vertical-align: top;
                // border: 1px solid #298ae8;
                //border-bottom-left-radius: 0.25rem;
                //border-bottom-right-radius: 0.25rem;
            }
            .cancel {
                flex: 1;
                @include sc(.8rem, $appMainColor);
                font-weight: bold;
                // width: 100%;
                text-align: center;
                line-height: 1.8rem;
                vertical-align: top;
            }*/
            .confrim{
                flex: 1;
                @include sc(.8rem, #fff);
                font-weight: bold;
                //margin-top: .8rem;
                // background-color: #4cd964;
                background-color: $appMainColor;
                // width: 100%;
                text-align: center;
                line-height: 1.8rem;
                border: 1px;
                //border-bottom-left-radius: 0.25rem;
                //border-bottom-right-radius: 0.25rem;
            } 
        }
    }
    
</style>
