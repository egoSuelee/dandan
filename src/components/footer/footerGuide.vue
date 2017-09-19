<template>
	<section id='foot_guide'>
            <ul class="guide_list">
                <li v-for = '(item, index) in items' class="guide_item" :class="{'selected-item':index==getCurrentIndex()}" @touchstart="itemDidClicked(item, index)">
                    <span v-show="isShowBage(index)" class="shopCart-goodsCount ellipsis">{{goodsCount}}</span> 

                    <span class="icon_style"><i :class="item.icon"></i></span>
                    <span class="icon_title">{{item.title}}</span>

                </li>
            </ul>
    </section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
    export default {
    	data(){
            return{
                items: [
                    {
                        title: "首页",
                        icon:"dandan-home",
                        path: '/'
                    },
                    {
                        title: "分类",
                        icon: "dandan-category",
                        path: '/category'
                    },
                    {
                        title: "购物车",
                        icon: "dandan-cart",
                        path: '/shopCart'
                    },
                    {
                        title: "我的",
                        icon: "dandan-mine",
                        path: '/profile'
                    }
                ]
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            ...mapState([
                'cartList'
            ]),
            goodsCount: function() {
                let tmpGoodsCount = 0;
                let cart = Object.assign({},this.cartList);
                if(typeof cart == 'object') {
                    let keys = Object.keys(cart);
                    // console.log(keys);
                    keys.forEach((key, index) => {
                        let goodsNum = cart[key].goodsCount;
                        if (goodsNum) { 
                            tmpGoodsCount += goodsNum;
                        }
                       
                    });
                    return tmpGoodsCount;
                } else {
                    console.log('Opps!~~~~');
                    return 0;
                }
            }
        },
        methods: {
            ...mapMutations([
                'MODIFY_HOMEINDEX'
            ]),
            getCurrentIndex() {
                return this.$store.getters.getSelectedIndex;
            },
            itemDidClicked(item, index) {
                this.MODIFY_HOMEINDEX({selectedIndex:index});
                this.$router.push(item.path);
            },
            isShowBage(index) {
                if (index == 2 && this.goodsCount != 0) {
                    return true;
                } 
            }
        },
	}
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, $footerGuideH);
        display: flex;
        box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_list {
        display: flex;
        width: 100%;
        height: 100%;
        .guide_item{
        	flex: 1;
        	display: flex;
        	text-align: center;
        	flex-direction: column;
            align-items: center;
            position: relative;
            .shopCart-goodsCount {
                position: absolute;
                top: 0;
                right: 0;
                display: block;
                width: 1.2rem;
                height: .8rem;
                background-color: red;
                color: white;
                line-height: .9rem;
                transform: translate(-0.6rem, 0.1rem);
                font-size: .6rem;
                @include borderRadius(.4rem);
            }
    		.icon_style{
    			margin-top: .1rem;
    			fill: #ccc;
                i {
                    color:rgba(7, 17, 27, .6);
                    font-size: 1rem;
                }
    		}
    		.icon_title{
    			@include sc(.45rem, #666);
    		}
        }
        .selected-item {
            .icon_style {
                i {
                    color: $appMainColor;
                    text-fill-color:#f00;
                }
                
            } 
            span {
                color: $appMainColor;
            }
        }
    }
   
</style>















