<template>
  <div class="login">
    <div class="banner">
      <div class="backgeound-img" :style="{backgroundImage:'url(' + bannerUrl +')'}">
        <div style="width:1200px;margin:0 auto;">
          <div class="logo-title">
            <img src="@/assets/logo-title.png" alt="">
          </div>
          <div class="title-right">
            <el-tooltip content="" placement="bottom" effect="light">
              <span class="down">app下载</span>
              <div slot="content"><img src="@/assets/app-download.png" alt="" style="width:200px;height:200px;"></div>
            </el-tooltip>
            <el-tooltip content="" placement="bottom" effect="light" style="border-left: solid 1px #E2E2E2;">
              <span class="wx">微信公众号</span>
              <div slot="content"><img src="@/assets/wechat-official-account.png" alt="" style="width:200px;height:200px"></div>
            </el-tooltip>
            <span class="service-hotline" style="color:#fff">客服热线：4001-009-880</span>
            <div class="user-account">
              <el-avatar v-if="userInfo && userInfo.weChatHeadImgUrl" :src="userInfo.weChatHeadImgUrl"></el-avatar>
              <img v-else class="el-avatar el-avatar--circle" src="@/assets/default-avatar.png" alt="">
              <el-button type="text" class="comment-login" size="medium" v-if="!userInfo">登录</el-button>
              <div class="login-success" v-else>
                <p>{{ userInfo.userName}} </p>
                <el-dropdown class="user-account-dropdown">
                  <p class="user-account-role" style="width: 100px">{{userInfo.loginRoleName}}</p>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in roleInfo" :key="item.id" style="padding: 0 8px;">
                      <div class="user-account-dropdown-info" @click="selectRole(item.id)">
                        <el-image class="icon" :src="require('@/assets/person-role-selected-icon.png')" v-if="userInfo.role == item.id" />
                        <el-image class="icon" :src="require('@/assets/person-role-icon.png')" v-else />
                        <div :style="{'color': userInfo.role == item.id? '#3064C7' : '#666666'}">{{item.roleName}}</div>
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>

          <div class="slogan">
            <p>圆您一辆好车梦</p>
          </div>
          <div class="sloga-about">
            <p>“易靓好车”致力于推动汽车产业数字化进程，通过链接产业上下游、提供用车前后服务，全力打造数字化汽车交易及流通生态，携手产业各方为消费者提供更简捷、更高效、更人性化的租车、买车、卖车、用车服务。</p>
          </div>
          <!-- <div v-if="!noRegister && !isLogined">
            <div class="login-box" v-show="!(roleInfo.length>0)">
              <ul class="login-type-box">
                <li>
                  <el-button type="text" size="medium" :class="scanCode?'selected':'scan-code' " @click="onClickScanCode">扫码登录</el-button>
                </li>
                <li>
                  <el-button type="text" size="medium" :class="mobileLogin?'selected':'mobile-login'" @click="onClickMobilelogin">手机登录</el-button>
                </li>
              </ul>
              <div id="weixinQrCode" v-show="scanCode"></div>
              <div class="mobile-login-box" v-if="mobileLogin">
                <el-input v-model="phoneNumber" placeholder="手机号" class="phone-number"></el-input>
                <el-input v-model="verificationCode" placeholder="验证码" class="verification-code">
                  <template slot="suffix">
                    <el-button size="small" type="text" class="get-verification-code" @click="onClickGetMessageCode" v-if="remainSecond == 60 || remainSecond == 0">获取验证码</el-button>
                    <el-button size="small" type="text" class="get-verification-code" v-else>{{ remainSecond }}s后重新获取</el-button>
                  </template>
                </el-input>
                <el-button size="small" class="login-button" @click="onClickNumLogin" :type="verificationCode?'primary':'info'" :disabled="verificationCode&&phoneNumber?false:true"> 登录</el-button>
              </div>
            </div>
          </div> -->
          <!-- <div class="login-box bind-box" v-if="noRegister && !isLogined">
            <p class="register-title">绑定/注册</p>
            <div class="mobile-login-box">
              <el-input v-model="phoneNumber" placeholder="登录手机号" class="phone-number"></el-input>
              <el-input v-model="verificationCode" placeholder="验证码" class="verification-code">
                <template slot="suffix">
                  <el-button size="small" type="text" class="get-verification-code" @click="onClickRegisterGetMessageCode" v-if="remainSecond == 60 || remainSecond == 0">获取验证码</el-button>
                  <el-button size="small" type="text" class="get-verification-code" v-else>{{ remainSecond }}s后重新获取</el-button>
                </template>
              </el-input>
              <el-button size="small" class="login-button" @click="onClickRegister" :type="verificationCode?'primary':'info'" :disabled="verificationCode&&phoneNumber?false:true"> 注册/登录</el-button>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 关于我们 -->
    <div class="about-us">
      <div class="about-us-title">
        <p class="chinese-title">关于我们</p>
        <p class="english-title">ABOUT US</p>
      </div>
      <div class="about-us-content">
        <div class="about-us-left">
          <h5 class="about-us-left-title"></h5>
          <p class="about-us-left-content"> 
            “易靓好车”致力于成为全国汽车行业内最大的在线新零售销售平台。公司响应国务院“汽车从所有权管理转为使用权管理”的民生赋能号召，面向百姓群体，通过经纪人模式及线上新媒体的运营，打通汽车交易场景的线上化，从而完成高效获客。通过创新的用车产品及基于人工智能、大数据和区块链等关键技术的实践应用，为客户提供高效、有质量的全生命周期车辆管理服务。截止目前，公司已设有60+零售服务中心，10000+活跃经纪人，业务辐射17个省及直辖市。
          </p>
        </div>
        <div class="about-us-right">
          <img src="@/assets/about-us.png" alt="" style="width:425px;height:337px;margin-left:58px;margin-top:62px">
        </div>
      </div>
    </div>
    <!-- 用车流程 -->
    <div class="vehicle-use-process">
      <div class="vehicle-use-process-title">
        <p class="chinese-title">用车流程</p>
        <p class="english-title">VEHICLE USE PROCESS</p>
      </div>
      <div class="vehicle-use-process-content">
        <div class="common">
          <img src="@/assets/online-consultation.png" alt="" class="vehicle-image">
          <p class="vehicle-use-process-content-title">在线咨询</p>
          <span>选好爱车后预留联系电话，客户经理将与您联系，提供1对1用车服务</span>
        </div>
        <div class="common">
          <img src="@/assets/pay-fees.png" alt="" class="vehicle-image">
          <p class="vehicle-use-process-content-title">支付费用</p>
          <span>用车方案，支付相关款项</span>
        </div>
        <div class="common">
          <img src="@/assets/sign-agreement.png" alt="" class="vehicle-image">
          <p class="vehicle-use-process-content-title">签订协议</p>
          <span>选择好用车方案，通过信用审核后，签订用车协议</span>
        </div>
        <div class="common">
          <img src="@/assets/pick-car.png" alt="" class="vehicle-image">
          <p class="vehicle-use-process-content-title">坐等提车</p>
          <span>上牌完成后，客户经理将联系您到附近门店提车</span>
        </div>
      </div>
    </div>
    <!-- 品牌优势 -->
    <div class="brand-advantage">
      <div class="brand-advantage-title">
        <p class="chinese-title">品牌优势</p>
        <p class="english-title">BRAND ADVANTAGE</p>
      </div>
      <div class="brand-advantage-content">
        <el-card shadow="hover" class="common">
          <img src="@/assets/online-operation.png" alt="" class="vehicle-image">
          <p>纯线上操作审批快</p>
          <span class="brand-text">降低征信审批难度，大大降低用车门槛纯线上操作，最快30分钟可完成审核</span>
        </el-card>
        <el-card shadow="hover" class="common">
          <img src="@/assets/accessory-project.png" alt="" class="vehicle-image">
          <p>配套方案</p>
          <span class="brand-text">超低成本，灵活付款，可根据自身条件,选择不同用车方案</span>
        </el-card>
        <el-card shadow="hover" class="common">
          <img src="@/assets/one-stop-car-service.png" alt="" class="vehicle-image">
          <p>一站式汽车服务</p>
          <span class="brand-text">检车、验车、上牌、缴税全部为您搞定三全服务:用车全周期、用车全寿命、用车全方位</span>
        </el-card>
        <el-card shadow="hover" class="common">
          <img src="@/assets/vehicle-source.png" alt="" class="vehicle-image">
          <p>厂家直供车源</p>
          <span class="brand-text">主流品牌车型全覆盖，与各大汽车品牌厂商合作车源厂家直供，最快当天提车，常规交车期1-15天</span>
        </el-card>
      </div>
    </div>
    <!--加入我们  -->
    <div class="join-us">
      <div class="join-us-title">
        <p class="chinese-title">加入我们</p>
        <p class="english-title">JOIN US</p>
      </div>
      <div class="join-us-content">
        <div class="join-us-left">
          <img src="@/assets/join-us.png" alt="" style="width:425px;height:337px;margin-top:36px">
        </div>
        <div class="join-us-right">
          <h6>公司团队</h6>
          <p>公司拥有一支高素质的核心管理团队和专业化、年轻化的员工队伍，创始人团队平均在汽车、金融及互联网行业有10年以上行业经验。作为过去十年中国汽车产业发展的参与者与见证者，易靓好车团队不仅对汽车产业有深刻理解，也洞悉了汽车行业发展趋势。随着当下产业互联网的发展，汽车产业的未来必然是数字化、全链条、全场景的模式。</p>
          <h6>招募精英</h6>
          <p><span style="font-size: 14px;color: #101A2B ;">员工招募</span> ：对汽车服务有极大热情，具备丰富的汽车行业经验，并对未来汽车产业发展充满信心的有志之士。<br />
            <span style="font-size: 14px;color: #101A2B ;">合作商招募</span> ：拥有丰富的汽车行业资源，对汽车行业有独到见解，并愿意在汽车服务领域与我们并肩作战，开疆扩土的同道中人。<br />
            <span style="font-size: 14px;color: #101A2B ;">联系邮箱</span> ：ybkjhr@apecar.cn
          </p>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>版权所有◎{{new Date().getFullYear()}}杭州易靓云科技有限公司 <a class="foot-info" href="http://beian.miit.gov.cn" target="_blank">浙ICP备19019729号</a></p>
    </div>
  </div>
</template>
<script>
import userAPI from '@/api/user'
// import { getMessageCode, login, userRegister, getCurrentFrontPageBanner } from "@/api/loginMgmt"
// import { getUserInfo, logout, getUserAuthList, changeUserRole, isLogin } from "@/api/userInfo";
import bannerBackground from '@/assets/banner-background.jpg'

export default {
  name: "login",
  data() {
    return {
      // scanCode: true,
      // mobileLogin: false,
      // phoneNumber: '',
      // verificationCode: '',
      // remainSecond: "",
      // roleInfo: [],
      // userInfo: {},
      // selectedRoleName: '',
      // loginRoleId: '',
      // noRegister: false,
      // code: '',
      // state: '',
      // url: '',
      // isLogined: false,
      bannerUrl: bannerBackground,
      // tongkangUrl: '',
      // bannerUrl :'D:\yb_space\yuanbao\yuanbao\yb-web\src\main\webapp\vue\ybSystemMgmt\src\image\banner-background.jpg'
    }
  },
  created () {
    this.getBanner()
    this.$store.dispatch('getUserInfo')
    this.$store.dispatch('getAuthList')
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userDto
    },
    roleInfo () {
      return this.$store.state.user.roleDTO
    },
  },
  // mounted() {
  //   this.adjustToMobile();
  //   this.initWxQrcode();
  //   const url = new URL(window.location);
  //   if (url.search) {
  //     let bannerUrl = decodeURIComponent(url.searchParams.get("bannerUrl"));
  //     this.code = url.searchParams.get("code");
  //     this.state = url.searchParams.get("state");
  //     if (!this.code || this.code == null) {
  //     } else {
  //       this.onClickCodeLogin();
  //     }
  //     if (bannerUrl && bannerUrl != "") {
  //       this.bannerUrl = bannerUrl;
  //     }
  //   } else {
  //   }
  //   this.getBanner();
  //   this.isLogin();
  // },
  methods: {
    getBanner() {
      userAPI.getCurrentFrontPageBanner().then((res) => {
        if (res.mdata.code == 1) {
          this.bannerUrl = res.mdata.info.attachmentFile.url;
        }
      })
    },
    selectRole (id) {
      this.$store.dispatch('changeUserRole', { roleId: id })
    },
  }
  // methods: {

  //   adjustToMobile() {
  //     if (navigator.userAgent.indexOf("Android") != -1 || navigator.userAgent.indexOf("iPhone") != -1) {
  //       var viewPortMetaEl = document.getElementById("viewPortMeta");
  //       viewPortMetaEl.setAttribute("content", "width=device-width,initial-scale=0.2");
  //       //      移动端页面
  //       //  location.replace("/mobile/pcLogin");
  //     }
  //   },
  //   // 退出登录
  //   quitSystem() {
  //     logout().then((res) => {
  //       if (res.result == 1) {
  //         window.open("/client/login", "_self");
  //       }
  //     });
  //   },
  //   isLogin() {
  //     isLogin().then((res) => {
  //       if (res.result == 1 && res.mdata.code == 1) {
  //         this.isLogined = true;
  //         this.getUser();
  //       }
  //     })
  //   },
  //   getUser() {
  //     getUserInfo().then((res) => {
  //       if (res.result == 1) {
  //         this.userInfo = res.mdata.userDto;
  //         this.selectedRoleName = res.mdata.userDto.loginRoleName;
  //         this.loginRoleId = res.mdata.userDto.role;
  //         this.roleInfo = res.mdata.roleDTO;
  //         this.weChatHeadImgUrl = this.userInfo.weChatHeadImgUrl;
  //         // localStorage.setItem("userRole", this.loginRoleId);
  //       }
  //     })
  //   },
  //   // 切换角色
  //   selectRole(id) {
  //     let data = {
  //       //  角色id
  //       roleId: id,
  //     };
  //     changeUserRole(data).then((res) => {
  //       if (res.result == 1) {
  //         this.$message({
  //           message: "切换成功",
  //           type: "success",
  //         });

  //         this.loginedHandler();
  //       }
  //     })

  //   },
  //   onClickScanCode() {
  //     this.scanCode = true;
  //     this.mobileLogin = false;
  //     this.phoneNumber = '';
  //     this.verificationCode = '';
  //   },
  //   onClickMobilelogin() {
  //     this.scanCode = false;
  //     this.mobileLogin = true;
  //   },
  //   // 扫码登录二维码
  //   initWxQrcode() {
  //     var obj = new WxLogin({
  //       self_redirect: false,
  //       id: "weixinQrCode",
  //       appid: "wxf65f76d3d5253db8",
  //       scope: "snsapi_login",
  //       redirect_uri: encodeURI("https://platform.apecar.cn/client/login"),
  //       state: this.stateStr,
  //       style: "white",
  //       href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9DQouaW1wb3dlckJveCAuc3RhdHVzLnN0YXR1c19icm93c2VyIHsNCiAgdGV4dC1hbGlnbjogY2VudGVyOw0KICBkaXNwbGF5OiBub25lOw0KfQ0KLmltcG93ZXJCb3ggLnFyY29kZSB7DQogIHdpZHRoOiAyODBweDsNCiAgbWFyZ2luLXRvcDogMzhweDsNCiAgYm9yZGVyOiBub25lOw0KfQ0KLmltcG93ZXJCb3ggLnFyY29kZSB7DQogIGJvcmRlcjogbm9uZTsNCn0="
  //     });
  //   },
  //   onClickRegisterGetMessageCode() {
  //     let params = {
  //       phone: this.phoneNumber,
  //       messageType: 1,
  //       registered: 1
  //     };
  //     if (this.phoneNumber) {
  //       getMessageCode(params).then((res) => {
  //         if (res.result == 1) {
  //           this.$message({
  //             message: res.message,
  //             type: "info",
  //           });
  //           this.startTimer();
  //         }
  //       })
  //     } else {
  //       this.$message({
  //         message: '手机号不能为空',
  //         type: "info",
  //       });
  //     }
  //   },
  //   // 获取验证码
  //   onClickGetMessageCode() {
  //     let params = {
  //       phone: this.phoneNumber,
  //       messageType: 1,
  //     };
  //     if (this.phoneNumber) {
  //       getMessageCode(params).then((res) => {
  //         if (res.result == 1) {
  //           this.$message({
  //             message: res.message,
  //             type: "info",
  //           });
  //           this.startTimer();
  //         }
  //       })
  //     } else {
  //       this.$message({
  //         message: '手机号不能为空',
  //         type: "info",
  //       });
  //     }
  //   },
  //   startTimer() {
  //     this.stopTimer();
  //     var self = this;
  //     this.timer = setInterval(function () {
  //       self.remainSecond--;
  //       if (self.remainSecond <= 0) {
  //         self.stopTimer();
  //         return;
  //       }
  //     }, 1000);
  //   },
  //   stopTimer() {
  //     this.timer && clearInterval(this.timer);
  //     this.timer = null;
  //     this.remainSecond = 60;
  //   },
  //   // 手机验证码登录
  //   onClickNumLogin() {
  //     let data = {
  //       loginPhone: this.phoneNumber,
  //       loginType: 1,
  //     }

  //     data.encryptedData = MD5(this.verificationCode);
  //     login(data).then((res) => {
  //       if (res.result == 1) {
  //         if (res.mdata.errorCode == 0) {
  //           this.$message({
  //             message: '登录成功',
  //             type: "success",
  //           });
  //           this.loginedHandler();
  //         } else {
  //           this.$message({
  //             message: res.message,
  //             type: "info",
  //           });
  //         }
  //       } else {
  //         this.$message({
  //           message: res.message,
  //           type: "info",
  //         });
  //       }
  //     });
  //   },
  //   // 扫码登录
  //   onClickCodeLogin() {
  //     var params = {
  //       js_code: this.code,
  //       appId: 3,
  //       loginType: 2
  //     }
  //     login(params).then((res) => {
  //       if (res.result == 1) {
  //         if (res.mdata.errorCode == 10003) {
  //           this.noRegister = true;
  //         } else if (res.mdata.errorCode == 0) {
  //           this.$message({
  //             message: '登录成功',
  //             type: "success",
  //           });
  //           this.loginedHandler();
  //         } else {
  //           this.$message({
  //             message: res.message,
  //             type: "info",
  //           });
  //         }
  //       } else {
  //         this.$message({
  //           message: res.message,
  //           type: "info",
  //         });
  //       }
  //     });
  //   },
  //   // 登录成功跳转
  //   getPcAuthList() {
  //     return getUserAuthList().then((res) => {
  //       if (res.result == 1) {
  //         const url = res.mdata.pc.pcMenuList[0]
  //         if (url) {
  //           if (url.indexOf('/client/tongKang') === 0) {
  //             this.tongkangUrl = ''
  //             let datas = this.$store.state.treeData.fundProviderMgmt
  //             this.setName(datas, res.mdata.pc.urlList)
  //             this.getFirstRoute(datas)
  //             this.url = this.tongkangUrl
  //           } else {
  //             this.url = url
  //           }
  //         }
  //       }
  //     })
  //   },
  //   setName(datas, authList) {
  //     //遍历树  添加是否显示表示
  //     datas.forEach(ele => {
  //       if (authList.indexOf(ele.authPath) != -1) {
  //         ele.isShow = true
  //       } else {
  //         ele.isShow = false
  //       }
  //       if (ele.children && ele.children.length > 0) {
  //         this.setName(ele.children, authList)
  //       }
  //     });
  //   },
  //   getFirstRoute(arr) {
  //     for (let i = 0; i < arr.length; i++) {
  //       if (this.tongkangUrl) {
  //         return false
  //       }
  //       if (arr[i] && arr[i].isShow) {
  //         if (arr[i].children && arr[i].children.length > 0) {
  //           this.getFirstRoute(arr[i].children)
  //         } else {
  //           this.tongkangUrl = arr[i].path
  //           return false
  //         }
  //       }
  //     }
  //   },
  //   // 注册
  //   onClickRegister() {
  //     let params = {
  //       appId: 3,
  //       phone: this.phoneNumber,

  //     };
  //     params.verificationCode = MD5(this.verificationCode);
  //     userRegister(params).then((res) => {
  //       if (res.result == 1) {
  //         this.$message({
  //           message: '登录成功',
  //           type: "success",
  //         });


  //         this.loginedHandler();
  //       }
  //     })
  //   },
  //   loginedHandler() {
  //     this.getPcAuthList().then(() => {
  //       if (this.url && this.url != "") {
  //         window.open(this.url, "_self");
  //       } else {
  //         window.location.replace(window.location.origin + window.location.pathname)
  //       }
  //     });
  //   }
  // },
}
</script>

<style lang="scss">
.login{
  .banner {
    width: 100%;
    height: 800px;
    .backgeound-img {
      display: flex;
      height: 100%; //大小设置为100%
      width: 100%; //大小设置为100%
      background-size: auto 100%;
      background-position: center;
      .logo-title {
        width: 150px;
        height: 53px;
        margin-top: 28px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .slogan {
        font-size: 47px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 66px;
        color: #ffffff;
        margin-top: 187px;
      }
      .sloga-about {
        margin-top: 46px;
        display: inline-block;
        width: 645px;
        height: 76px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 28px;
        color: #ffffff;
        opacity: 1;
      }
      .title-right {
        font-size: 18px;
        display: inline-block;
        float: right;
        margin-top: 40px;
        line-height: 40px;
        .down {
          color: #ffffff;
          opacity: 0.6;
          padding: 0 10px;
        }
        .wx {
          color: #ffffff;
          opacity: 0.6;
          padding: 0 10px;
        }
        .down :hover {
          color: #ffffff;
          opacity: 1;
          cursor: pointer;
        }
        .wx :hover {
          color: #ffffff;
          opacity: 1;
          cursor: pointer;
        }
      }
      .service-hotline {
        font-size: 18px;
        color: #ffffff;
        opacity: 1;
        margin-right: 32px;
      }
      .user-account {
        display: inline-block;
        line-height: normal;
        .el-avatar {
          vertical-align: middle;
        }
        .comment-login {
          display: inline-block;
          // line-height: 29px;
          width: 24px;
          margin-right: 10px;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.99;
          vertical-align: middle;
        }
        // .comment {
        //   display: inline-block;
        //   width: 24px;
        //   font-size: 12px;
        //   font-family: PingFang SC;
        //   font-weight: 400;
        //   color: #ffffff;
        //   opacity: 0.99;
        // }
        .login-success {
          display: inline-block;
          vertical-align: middle;
          p {
            height: 17px;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 17px;
            color: #ffffff;
          }
          .user-account-dropdown {
            line-height: normal;
            .user-account-role {
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 17px;
              color: #ffffff;
              opacity: 0.6;
              padding: 0;
            }
          }
        }
      }
    //   .login-box {
    //     display: inline-block;
    //     float: right;
    //     margin-top: -225px;
    //     width: 340px;
    //     height: 440px;
    //     // background: rgba(255, 255, 255, 0.39);
    //     background: #ffff;
    //     opacity: 1;
    //     border-radius: 16px;
    //     margin-right: 80px;
    //     text-align: center;
    //     ul {
    //       margin-top: 40px;
    //       position: relative;
    //       li:first-child {
    //         border-right: 1px solid rgba(226, 226, 226, 1);
    //       }
    //       li {
    //         width: 120px;
    //         height: 28px;
    //         line-height: 28px;
    //         font-size: 20px;
    //         font-family: PingFang SC;
    //         font-weight: 400;
    //         line-height: 28px;
    //         text-align: center;
    //         opacity: 1;
    //         display: inline-block;
    //         .scan-code {
    //           color: #333333;
    //         }
    //         .selected {
    //           color: #3064c7;
    //         }
    //         .mobile-login {
    //           color: #333333;
    //         }
    //       }
    //     }

    //     // .code {
    //     //   width: 228px;
    //     //   height: 222px;
    //     //   background: rgba(0, 0, 0, 0);
    //     //   opacity: 1;
    //     //   // margin-top: 36px;
    //     //   // margin-left: 56px;
    //     // }
    //     .mobile-login-box {
    //       .phone-number,
    //       .verification-code {
    //         width: 240px;
    //         height: 44px;
    //         border-radius: 4px;
    //       }
    //       .phone-number {
    //         margin-top: 61px;
    //       }
    //       .verification-code {
    //         margin-top: 19px;
    //         .get-verification-code {
    //           color: #3064c7;
    //           border-radius: 4px;
    //           line-height: 22px;
    //         }
    //       }
    //       .login-button {
    //         margin-top: 67px;
    //         width: 240px;
    //         height: 44px;
    //         // background: rgba(165, 166, 166, 0.39);
    //         // opacity: 1;
    //         border-radius: 4px;
    //       }
    //     }
    //     .register-title {
    //       margin: 0 auto;
    //       margin-top: 40px;
    //       width: 90px;
    //       height: 28px;
    //       font-size: 20px;
    //       font-family: PingFang SC;
    //       font-weight: 400;
    //       // line-height: 28px;
    //       color: #333333;
    //       opacity: 1;
    //     }
    //     .wxnickname {
    //       margin: 0 auto;
    //       width: 130px;
    //       height: 22px;
    //       font-size: 16px;
    //       font-family: PingFang SC;
    //       font-weight: 400;
    //       // line-height: 22px;
    //       color: #333333;
    //       opacity: 1;
    //     }
    //   }
    //   .bind-box {
    //     margin-top: -101px;
    //   }
    }
  }
  .about-us {
    width: 100%;
    height: 496px;
    background: #ffffff;
    margin: 0 auto;
    padding: 60px 0px;

    .about-us-title {
      height: 40px;
      background: url("@/assets/title-bg.png") no-repeat center;
      text-align: center;
      padding-top: 23px;
      background-position: center;
      background-size: 200px auto;
      .chinese-title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        opacity: 1;
        // margin-top: 40px;
      }
      .english-title {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        opacity: 0.5;
        margin-top: 10px;
      }
    }

    .about-us-content {
      width: 1200px;
      margin: 0 auto;
      // background: #3064c7;
      display: flex;
      justify-content: space-between;
      .about-us-left {
        .about-us-left-title {
          width: 360px;
          height: 33px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 500;
          line-height: 33px;
          color: #666666;
          opacity: 1;
          margin-top: 62px;
        }
        .about-us-left-content {
          width: 717px;
          height: 172px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 34px;
          color: #999999;
          opacity: 1;
          margin-top: -33px;
        }
      }
    }
  }
  .vehicle-use-process {
    width: 100%;
    height: 484px;
    background: #fafafa;
    opacity: 1;
    margin: 0 auto;
    padding: 60px 0px;
    .vehicle-use-process-title {
      height: 40px;
      background: url("@/assets/title-bg.png") no-repeat center;
      text-align: center;
      padding-top: 23px;
      background-position: center;
      background-size: 200px auto;
      .chinese-title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        opacity: 1;
      }
      .english-title {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        opacity: 0.5;
        margin-top: 10px;
      }
    }
    .vehicle-use-process-content {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      margin-top: 55px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      .common {
        // background: #3064c7;
        p {
          // width: 64px;
          // height: 22px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          // line-height: 22px;
          color: #333333;
          opacity: 1;
          margin-top: 39px;
        }
        span {
          display: inline-block;
          width: 190px;
          height: 34px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 26px;
          color: #999999;
          opacity: 1;
          margin-top: 19px;
        }
      }
    }
  }
  .brand-advantage {
    width: 100%;
    height: 500px;
    background: #fff;
    // background: chartreuse;
    opacity: 1;
    padding: 60px 0px;
    .brand-advantage-title {
      height: 40px;
      background: url("@/assets/title-bg.png") no-repeat center;
      text-align: center;
      padding-top: 23px;
      background-position: center;
      background-size: 200px auto;
      .chinese-title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        opacity: 1;
      }
      .english-title {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        opacity: 0.5;
        margin-top: 10px;
      }
    }
    .brand-advantage-content {
      width: 1200px;
      // height: auto;
      // background: #999999;
      margin: 0 auto;
      margin-top: 55px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      .common:hover {
        width: 309px;
        height: 349px;
        // background: chartreuse;
      }
      .common {
        width: 255px;
        height: 335px;
        p {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          opacity: 1;
          margin-top: 39px;
        }
        span {
          display: inline-block;
          // width: 190px;
          // height: 34px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 26px;
          color: #999999;
          opacity: 1;
          margin-top: 19px;
        }
      }
    }
  }
  .join-us {
    width: 100%;
    height: 480px;
    background: #fafafa;
    opacity: 1;
    margin: 0 auto;
    padding: 60px 0px;
    .join-us-title {
      height: 40px;
      background: url("@/assets/title-bg.png") no-repeat center;
      text-align: center;
      padding-top: 23px;
      background-position: center;
      background-size: 200px auto;
      .chinese-title {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        opacity: 1;
      }
      .english-title {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        opacity: 0.5;
        margin-top: 10px;
      }
    }
    .join-us-content {
      margin: 0 auto;
      width: 1200px;
      height: auto;
      display: flex;
      justify-content: space-between;
      .join-us-right {
        width: 726px;
        h6 {
          width: 64px;
          height: 22px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          line-height: 22px;
          color: #333333;
          opacity: 1;
          margin-top: 45px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        p {
          width: 726px;
          height: 76px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 28px;
          color: #999999;
          opacity: 1;

          span {
            margin: 5px 0px;
            display: inline-block;
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 100px;
    background: #101a2b;
    opacity: 1;
    line-height: 100px;
    text-align: center;
    p {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.8;
      a {
        color: #ffffff;
      }
      a:hover {
        opacity: 0.6;
      }
    }
  }
  .vehicle-image{
    width: 140px;
    height: 140px;
  }
  .brand-text{
    display: inline-block;
    width:210px;
  }
}
</style>