import sunev from 'sunev'; // 全局公共方法库
import cancelTokenMixin from "@/utils/cancelTokenMixin"; // axios取消请求

export default {
    props: {
        loginType: {
            type: String,
            default: 'code'
        }
    },
    mixins: [cancelTokenMixin],
    data() {
        return {
            qrcId: '', // 二维码标识
            qrcBase64: '', // 二维码base64图片
            macAddr: '', // mac地址
            loading: false,
            isStop: false,
            codeStatus: '0',
            qrStatusList: [
                {
                    status: '-1',
                    icon: 'error',
                    color: '#ed7b2f',
                    svgClass: 'icon-error-small',
                    text: '二维码生成失败\n请刷新重试',
                    refresh: true
                },
                { status: '0', icon: '', text: '', refresh: false },
                {
                    status: '1',
                    icon: 'scan',
                    color: '#2986ff',
                    svgClass: 'icon-scan-small',
                    text: '扫描成功\n请在移动端确认',
                    refresh: false
                },
                {
                    status: '2',
                    icon: 'confirm',
                    color: '#2986ff',
                    svgClass: 'icon-confirm-small',
                    text: '移动端确认登录',
                    refresh: false
                },
                {
                    status: '3',
                    icon: 'cancel',
                    text: '移动端已取消',
                    refresh: false
                },
                {
                    status: '4',
                    icon: 'error',
                    color: '#ed7b2f',
                    svgClass: 'icon-error-small',
                    text: '二维码已失效\n请刷新重试',
                    refresh: true
                },
                {
                    status: '5',
                    icon: 'success',
                    color: '#2986ff',
                    svgClass: 'icon-success-small',
                    text: '登录成功',
                    refresh: false
                },
                {
                    status: '6',
                    icon: 'error',
                    color: '#ed7b2f',
                    svgClass: 'icon-error-small',
                    text: '登录失败\n请刷新重试',
                    refresh: true
                }
            ],
            errMsg: ''
        }
    },
    async created() {
        try {
            await this.getQrCode();
            this.beginPolling();
        } catch (err) {
            console.log(err);
        }
    },
    computed: {
        // 当前状态
        curQrStatus() {
            const statusObj = this.qrStatusList.find(item => item.status === this.codeStatus);
            if (this.errMsg) {
                statusObj.text = this.errMsg;
            }
            return statusObj;
        }
    },
    methods: {
        // 开启轮询
        async beginPolling() {
            if (this.isStop) return;
            try {
                const status = await this.getQrCodeStatus();
                if (!status) return;
                this.codeStatus = status;
                switch (this.codeStatus) {
                    case '2':
                        this.stopPolling();
                        // 确认登录后，需前端修改状态
                        this.codeStatus = '5';
                        this.loading = true;
                        // 走登录逻辑
                        this.$emit('login', {
                            qrcId: this.qrcId,
                            encryptCSIIStr: this.macAddr
                        })
                        break;
                    case '3':
                        // 取消登录
                        this.stopPolling();
                        await this.getQrCode();
                        break;
                    case '4':
                        // 二维码失效
                        this.stopPolling();
                        break;
                    default:
                        break;
                }
                this.timer = setTimeout(this.beginPolling);
            } catch (err) {
                console.log(err);
                this.stopPolling();
            }
        },
        // 暂停轮询
        stopPolling() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
                // 标记终止轮询(仅clearTimeout无法阻止)
                this.isStop = true;
            }
        },
        // 获取二维码base64
        async getQrCode() {
            this.reset();
            this.loading = true;
            try {
                const params = {
                    encryptCSIIStr: this.macAddr
                }
                const res = await sunev.$https.post(
                    'sunev/LoginQRCGen',
                    { isLoading: false, cancelToken: this.cancelToken },
                    params
                )
                if (res.qrcId) {
                    this.qrcId = res.qrcId;
                    this.qrcBase64 = res.qrcBase64;
                } else {
                    this.stopPolling();
                }
            } catch (err) {
                this.errMsg = err.message;
                this.stopPolling();
            }
        },
        // 获取二维码状态
        async getQrCodeStatus() {
            try {
                const params = {
                    encryptCSIIStr: this.macAddr
                }
                const res = await sunev.$https.post(
                    'sunev/LoginQRCQry',
                    { isLoading: false, cancelToken: this.cancelToken },
                    params
                )
                return res.status;
            } catch (err) {
                this.stopPolling();
            }
        },
        // 刷新二维码
        async refresh() {
            await this.getQrCode();
            this.beginPolling();
        },
        // 切换登录类型
        toggle() {
            this.$emit('toggleLoginType');
        },
        // 重置
        reset() {
            this.isStop = false;
            this.codeStatus = '0';
            this.errMsg = '';
        },
        beforeDestroy() {
            this.stopPolling();
        }
    }
}
