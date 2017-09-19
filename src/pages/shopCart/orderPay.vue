<template>
	<div class="orderPayWrapper">
		<headerGuide :title = "headerTitle" :isShowBack = 'false'>
            <span slot='search' class="searchWrapper" @click="cancelPay()">
                <span class="search">
                    <i class="dandan-uniE913"></i>
                </span>
            </span>      
        </headerGuide>
        <div class="orderContentWrapper">
            <div class="headTitle">
                <section class="headerTitle-section">
                    <span class="title">应付金额:&nbsp;</span>
                    <span class="money-text">¥&nbsp;{{deservedPay}}</span>
                </section>
            </div>
            <div class="payWayWrapper">
                <div class="titleWrapper">
                    <span class="title-text">支付方式</span>
                </div>
                <div class="account-balanceWrapper">
                    <div class="icon">
                        <span class="icon-text"><i class="dandan-uniE917"></i></span>
                    </div>
                    <div class="title">
                        <span class="title-text">账户余额支付</span>
                    </div>
                    <div class="account-balance">
                        <span class="account-balance-text">{{accountBalance}}</span>
                    </div>
                </div>
            </div>
            <div class="chargeWrapper">
                <div class="titleWrapper">
                    <span class="title-text">余额充值</span>
                </div>
                <ul class="chargeWay-list">
                    <li class="chargeWay-item">
                        <span class="icon"><i class="dandan-alipay" style="color:rgb(53, 142, 234);"></i></span>
                        <span class="title">支付宝</span>
                    </li>
                    <li class="chargeWay-item">
                        <span class="icon"><i class="dandan-wechat" style="color:rgb(86, 176, 16);"></i></span>
                        <span class="title">微信</span>
                    </li>
                    <li class="chargeWay-item">
                        <span class="icon"><i class="dandan-uniE922" style="color:rgb(240, 113, 78);"></i></span>
                        <span class="title last-title">储值卡</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="confirmWrapper" @touchstart="orderWalletPay()">
            <span class="confirm">
                确认支付
            </span>
        </div>
        <alertTip v-if="showAlert" :alertText = "alertText" @confirm="confirmCancel()" @altAction = "goOn()" :isModifyConfirm = "isModifyConfirm" :altText = "altText"></alertTip>
	</div>
</template>

<script>
import headerGuide from '../../components/header/headerGuide'
import {mapState, mapMutations} from 'vuex'
import alertTip from '../../components/common/alertTip'
import md5 from 'js-md5'
import cryptico from 'cryptico'
/*
*
*   
let private_key_string = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALgv/syFH337KzC29KvR0p6cP+glRqjDYAQno5ifafXZjgf1EhBjZblKv+HiLAzNBOlYU1PnLuOOkZj6pg1A5HUZLpsbYa5Mwr1bUHALjXLaB3THCpZX51/b5L14erGo52Jv/j/63YljEtMm8ALmkY8S+3fPxFeY7ya+2VXMEtplAgMBAAECgYAguvauZWGpQ37zUy+7cLfa061PlYAu8TkYw+qAbqOnupdQtq4VF3S2LqBWhZiKVcxvovB70nM0oNsisjfb1xJBpyfDBFug7d+y2f8yr6aTOezoY5DBYEF3Svg9Kp9ra+vvAYX/7fh+tHCU0HOvp0z8ikZiRSWZaQ+3A2GiCIJrwQJBAPKVji89hGAMEWLJJFZaPiLBqZUwR2W/rp7Ely5ddKfjcosHhggHfOb71BnrMOm0h4S85Gx6a87n9R2To0c51q0CQQDCX6yYdt/9JGORyNSXfzMfSZyVOrMpIo77R0YwKa3UOwwLA56l2Lc4AYO10/lyAyZCKse2/5D9ZZUB7xoYEmGZAkB8MEJVPuoY/bSc3RqENrjetERsAwZaObJcx4oaC3AgTxmhwV1FmQfBfKTODBDDZE+Ijedm/ZlZmHhtBtstKJgVAkBKma/DgHRtUscIT90QHBjB3F3FhJb4pbPcyzksCQMXXmY73/LG0ktXqnUjlyy4zm6jnIm0OZgrOQ6chGkubfeZAkBMCGF2tPfEJh8XODOvlw5ADnUiq+Qe/abcpKowkiT9zP+rYT9XJAx7QxChjdwTZb6ahnJY1+ny1emEHUOs2fm8"

let public_key_string = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4L/7MhR99+yswtvSr0dKenD/oJUaow2AEJ6OYn2n12Y4H9RIQY2W5Sr/h4iwMzQTpWFNT5y7jjpGY+qYNQOR1GS6bG2GuTMK9W1BwC41y2gd0xwqWV+df2+S9eHqxqOdib/4/+t2JYxLTJvAC5pGPEvt3z8RXmO8mvtlVzBLaZQIDAQAB"

*/
	export default {
		data() {
			return {
				headerTitle: null,
				deservedPay: null,
				accountBalance: "0.00",
                pulickKey: null,
                orderSheetNo: null,
                showAlert:false,
                alertText:null,
                isModifyConfirm: true,
                altText:null
			}
		},
		mounted(){
            this.headerTitle = '订单支付';
        },
        created() {
        	this.set_totalMoney();
            this.get_accountBalance();
            this.get_pulickey();
        },
        computed: {
        	...mapState([
        		'orderTotalMoney'
        		])
        },
        watch: {
            orderSheetNo: function() {
                console.log('获取订单单号:' + this.orderSheetNo);
            }
        },
        components: {
        	headerGuide,
            alertTip
        },
        beforeRouteEnter(to, from, next) {
            console.log(""+to.params.orderSheetNo);
            next((vm) => {
                vm.orderSheetNo = to.params.orderSheetNo;
            })
        },
        methods: {
        	set_totalMoney() {
        		this.deservedPay = this.orderTotalMoney;
        	},
            /*获取账户的余额*/
            get_accountBalance() {
                let params_string = "{'id': '13125022222'}"
               this.$api.post('/Simple_online/LastMoneyquery', {'name': params_string}, result => {
                    if (result.resultStatus) {
                        this.accountBalance = result.resultStatus;
                    }
               });
            },
            cancelPay() {
                this.showAlert = true;
                this.altText = "继续支付"
                this.alertText = "是否确定取消支付"
            },
            goOn() {
                this.showAlert = false;
            },
            confirmCancel() {
                this.$router.push('/shopCart');
            },
            /*获取钱包支付的公钥*/
            get_pulickey() {
                let params = {};
                this.$api.post('/Simple_online/KEY', null, result => {
                    if (result) {
                       let newResult = result.replace(/\r\n/g, '');
                       let json = JSON.parse(newResult);
                       if (json) {
                            this.pulickKey = json.resultStatus;
                       }
                    }
                });
            },
            /*支付环节*/
            orderWalletPay() {
                if (this.pulickKey) {
                    console.log(this.pulickKey);
                    console.log("订单单号: " + this.orderSheetNo);
                    let psw = '123456';
                    let str = "{\"Paypass\":\"" + md5(psw) +"\",\"WServerID_cStore\":\"1\",\"WServerID_buyer\":\"1\",\"cStoreNo\":\""+ "000" +"\",\"notify_url\":\"http://192.168.3.153:5080/WalletNotify\",\"fLastMoney\":\""+ this.orderTotalMoney +"\",\"Buyer_id\":\""+ "13125022222" +"\",\"cardno\":\"\",\"cSaleSheetNo\":\""+ this.orderSheetNo +"\"}"
                    console.log(str);
                    /*将str用公钥进行加密*/
                    /*
                    let public_key_string = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4L/7MhR99+yswtvSr0dKenD/oJUaow2AEJ6OYn2n12Y4H9RIQY2W5Sr/h4iwMzQTpWFNT5y7jjpGY+qYNQOR1GS6bG2GuTMK9W1BwC41y2gd0xwqWV+df2+S9eHqxqOdib/4/+t2JYxLTJvAC5pGPEvt3z8RXmO8mvtlVzBLaZQIDAQAB"
                    */
                    console.log("str____"+str);
                    console.log("PublicKey_____"+this.pulickKey);
                    let sign = cryptico.encrypt(str, this.pulickKey);
                    let realSign = null;
                    console.log(sign);
                    if (sign.status == 'success') {
                        realSign = sign.cipher;
                    }
                    // {\"device\":\"iOS\",\"PublicKey\":\"" +public_key_string +"\",\"sign\":\""+ sign +"\",\"signgg\":\""+md5(sign)+"\"}
                    let params = {"name":"{\"device\":\"iOS\",\"PublicKey\":\"" +public_key_string +"\",\"sign\":\""+ realSign +"\",\"signgg\":\""+null+"\"}"};
                    let real = Object.values(params);
                    console.log('参数: '+ real);
                    this.$api.post('/Simple_online/WallPay', params, result => {
                        console.log(result);
                    });

                }
            }
        }
	}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
$headerTitleH: 3rem;
$margin-bottom: .5rem;
$chargeWayWrapperH: 1.5rem; 
    .orderPayWrapper {
        padding-top: 1.95rem;
        .searchWrapper {
            .search {
                i {
                    display: block;
                    margin-left: .4rem;
                    height: $headerGuideH;
                    line-height: $headerGuideH;
                    font-size: 1.2rem;
                    color: white;
                }
            }
        }
        .orderContentWrapper {
            .headTitle {
                width: 100%;
                height: $headerTitleH;
                margin-bottom: $margin-bottom;
                background-color: white;
                position: relative;
                .headerTitle-section {
                    width: 100%;
                    @include center;
                    text-align: center;
                    font-size: 1.2rem;
                    .title {

                    }
                    .money-text {
                        color: rgba(224, 128, 49, 1);
                    }
                }
            }
            .payWayWrapper {
                width: 100%;
                background-color: white;
                margin-bottom: $margin-bottom;
                .titleWrapper {
                    height: 1.5rem;
                    @include border1px(rgba(7, 17, 27, 0.1));
                    .title-text {
                        display: inline-block;
                        height: 1.5rem;
                        vertical-align: top;
                        line-height: 1.5rem;
                        margin-left: .5rem;
                        font-size: .8rem;
                    }
                }
                .account-balanceWrapper {
                    display: flex;
                    height: 2rem;
                    font-size: .9rem;
                    .icon {
                        flex: 2;
                        text-align: center;
                        .icon-text {
                            display: inline-block;
                            height: 2rem;
                            line-height: 2rem;
                            i {
                                display: inline-block;
                                height: 2rem;
                                line-height: 2rem;
                                font-size: 1.2rem;
                                color: #DC143C;
                            }
                        }
                    }
                    .title {
                        flex: 4;
                        .title-text {
                            display: inline-block;
                            height: 2rem;
                            line-height: 2rem;
                        }
                    }
                    .account-balance {
                        flex: 3;
                        text-align: right;
                        .account-balance-text {
                            display: inline-block;
                            padding-right: .8rem;
                            height: 2rem;
                            line-height: 2rem;
                            color: rgba(7, 17, 27, 0.5);
                        }
                    }
                }
            }
            .chargeWrapper {
                background-color: white;
                .titleWrapper {
                    height: 1.5rem;
                    @include border1px(rgba(7, 17, 27, 0.1));
                    .title-text {
                        display: inline-block;
                        height: 1.5rem;
                        vertical-align: top;
                        line-height: 1.5rem;
                        margin-left: .5rem;
                        font-size: .8rem;
                    }
                }
                .chargeWay-list {
                    padding-bottom: .3rem;
                    .chargeWay-item {
                        padding: .5rem .3rem;
                        height: 2.5rem;
                        display: flex;
                        @include border1px(rgba(7, 17, 27, 0.1));
                        .icon {
                            display: inline-block;
                            width: $chargeWayWrapperH;
                            height: $chargeWayWrapperH;
                            line-height: $chargeWayWrapperH;
                            i {
                                display: inline-block;
                                position: relative;
                                font-size: 1.2rem;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                            }
                        }
                        .title {
                            display: inline-block;
                            flex: 1;
                            height:$chargeWayWrapperH;
                            line-height: $chargeWayWrapperH;
                            font-size: .9rem;
                            padding-left: .6rem;
                           
                        }
                        .last-title {
                           
                        }
                    }
                }
            }
        }
        .confirmWrapper {
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 1.95rem;
            background-color: rgba(224, 128, 49, 1);
            text-align: center;
            .confirm {
                color: white;
                height: 1.95rem;
                line-height: 1.95rem;
            }
        }
    }

</style>