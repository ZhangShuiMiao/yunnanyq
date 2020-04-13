(function () {
  var Bee = Bee || {}
  // 区域
  Bee.areas = window.BEE_AREAS || {}
  // PhoneUtils命名空间
  Bee.PhoneUtils = {
    phoneRegexs: {
      // 中国电信号码段
      CHINA_TELECOM_PATTERN: /^(?:\+86)?1(?:33|53|7[37]|8[019])\d{8}$|^(?:\+86)?1700\d{7}$/,
      // 中国联通号码段
      CHINA_UNICOM_PATTERN: /^(?:\+86)?1(?:3[0-2]|4[5]|5[56]|7[56]|8[56])\d{8}$|^(?:\+86)?170[7-9]\d{7}$/,
      // 中国移动号码段
      CHINA_MOBILE_PATTERN: /^(?:\+86)?1(?:3[4-9]|4[7]|5[0-27-9]|7[8]|8[2-478])\d{8}$|^(?:\+86)?1705\d{7}$/,
      // 电话座机号码段
      PHONE_CALL_PATTERN: /^(?:\(\d{3,4}\)|\d{3,4}-)?\d{7,8}(?:-\d{1,4})?$/,
      // 手机号码
      PHONE_PATTERN: /^(?:\+86)?(?:13\d|14[57]|15[0-35-9]|17[35-8]|18\d)\d{8}$|^(?:\+86)?170[057-9]\d{7}$/,
      // 手机号简单校验，不根据运营商分类
      PHONE_SIMPLE_PATTERN: /^(?:\+86)?1\d{10}$/
    },
    // 电话号码
    isPhoneCallNum: function (input) {
      return this.phoneRegexs.PHONE_CALL_PATTERN.test(input)
    },
    // 电信手机号码
    isChinaTelecomPhoneNum: function (input) {
      return this.phoneRegexs.CHINA_TELECOM_PATTERN.test(input)
    },
    // 中国联通
    isChinaUnicomPhoneNum: function (input) {
      return this.phoneRegexs.CHINA_UNICOM_PATTERN.test(input)
    },
    // 中国移动
    isChinaMobilePhoneNum: function (input) {
      return this.phoneRegexs.CHINA_MOBILE_PATTERN.test(input)
    },
    // 手机号码
    isPhoneNum: function (input) {
      return this.phoneRegexs.PHONE_PATTERN.test(input)
    },
    // 手机号码简单校验，只校验长度
    isPhoneNumBySize: function (input) {
      return this.phoneRegexs.PHONE_SIMPLE_PATTERN.test(input)
    }
  }
  // EmailUtils命名空间
  Bee.EmailUtils = {
    emailRegexs: {
      EMAIL_PATTERN: /^[-\w\+]+(?:\.[-\w]+)*@[-a-z0-9]+(?:\.[a-z0-9]+)*(?:\.[a-z]{2,})$/i
    },
    // 邮箱格式校验
    isEmail: function (input) {
      return this.EMAIL_PATTERN.test(input)
    }
  }
  // StringUtils命名空间
  Bee.StringUtils = {
    /**
     * 判断非空
     * @param input
     * @returns {Boolean}
     */
    isEmpty: function (input) {
      if (input == null) { return true }
      if (input == undefined || input == 'undefined') { return true }
      if (input == '') { return true }
      if (input.length == 0) { return true }
      if (!/[^(^\s*)|(\s*$)]/.test(input)) { return true }
      return false
    },
    /**
     *   判断一个非空
     *   @param {Object} input
     */
    isNotEmpty: function (input) {
      return !isEmpty(input)
    },
    isBlank: function (input) {
      return input == null || /^\s*$/.test(input)
    },
    isNotBlank: function (input) {
      return !this.isBlank(input)
    },
    trim: function (input) {
      return input.replace(/^\s+|\s+$/, '')
    },
    trimToEmpty: function (input) {
      return input == null ? '' : this.trim(input)
    },
    startsWith: function (input, prefix) {
      return input.indexOf(prefix) === 0
    },
    endsWith: function (input, suffix) {
      var regex = new RegExp(this.escapeMetacharacterOfStr(suffix) + '$')
      return regex.test(input)
    },
    contains: function (input, searchSeq) {
      return input.indexOf(searchSeq) >= 0
    },
    equals: function (input1, input2) {
      return input1 == input2
    },
    equalsIgnoreCase: function (input1, input2) {
      return input1.toLocaleLowerCase() == input2.toLocaleLowerCase()
    },
    containsWhitespace: function (input) {
      return this.contains(input, ' ')
    },
    // 生成指定个数的字符
    repeat: function (ch, repeatTimes) {
      var result = ''
      for (var i = 0; i < repeatTimes; i++) {
        result += ch
      }
      return result
    },
    deleteWhitespace: function (input) {
      return input.replace(/\s+/g, '')
    },
    rightPad: function (input, size, padStr) {
      return input + this.repeat(padStr, size)
    },
    leftPad: function (input, size, padStr) {
      return this.repeat(padStr, size) + input
    },
    // 首小写字母转大写
    capitalize: function (input) {
      var strLen = 0
      if (input === null || (strLen = input.length) === 0) {
        return input
      }
      return input.replace(/^[a-z]/, function (matchStr) {
        return matchStr.toLocaleUpperCase()
      })
    },
    // 首大写字母转小写
    uncapitalize: function (input) {
      var strLen = 0
      if (input == null || (strLen = input.length) == 0) {
        return input
      }
      return input.replace(/^[A-Z]/, function (matchStr) {
        return matchStr.toLocaleLowerCase()
      })
    },
    // 大写转小写，小写转大写
    swapCase: function (input) {
      return input.replace(/[a-z]/ig, function (matchStr) {
        if (matchStr >= 'A' && matchStr <= 'Z') {
          return matchStr.toLocaleLowerCase()
        } else if (matchStr >= 'a' && matchStr <= 'z') {
          return matchStr.toLocaleUpperCase()
        }
      })
    },
    // 统计含有的子字符串的个数
    countMatches: function (input, sub) {
      if (this.isEmpty(input) || this.isEmpty(sub)) {
        return 0
      }
      var count = 0
      var index = 0
      while ((index = input.indexOf(sub, index)) != -1) {
        index += sub.length
        count++
      }
      return count
    },
    // 只包含字母
    isAlpha: function (input) {
      return /^[a-z]+$/i.test(input)
    },
    // 只包含字母、空格
    isAlphaSpace: function (input) {
      return /^[a-z\s]*$/i.test(input)
    },
    // 只包含字母、数字
    isAlphanumeric: function (input) {
      return /^[a-z0-9]+$/i.test(input)
    },
    // 只包含字母、数字和空格
    isAlphanumericSpace: function (input) {
      return /^[a-z0-9\s]*$/i.test(input)
    },
    // 数字
    isNumeric: function (input) {
      return /^(?:[1-9]\d*|0)(?:\.\d+)?$/.test(input)
    },
    // 小数
    isDecimal: function (input) {
      return /^[-+]?(?:0|[1-9]\d*)\.\d+$/.test(input)
    },
    // 负小数
    isNegativeDecimal: function (input) {
      return /^\-(?:0|[1-9]\d*)\.\d+$/.test(input)
    },
    // 正小数
    isPositiveDecimal: function (input) {
      return /^\+?(?:0|[1-9]\d*)\.\d+$/.test(input)
    },
    // 整数
    isInteger: function (input) {
      return /^[-+]?(?:0|[1-9]\d*)$/.test(input)
    },
    // 正整数
    isPositiveInteger: function (input) {
      return /^\+?(?:0|[1-9]\d*)$/.test(input)
    },
    // 负整数
    isNegativeInteger: function (input) {
      return /^\-(?:0|[1-9]\d*)$/.test(input)
    },
    // 只包含数字和空格
    isNumericSpace: function (input) {
      return /^[\d\s]*$/.test(input)
    },
    isWhitespace: function (input) {
      return /^\s*$/.test(input)
    },
    isAllLowerCase: function (input) {
      return /^[a-z]+$/.test(input)
    },
    isAllUpperCase: function (input) {
      return /^[A-Z]+$/.test(input)
    },
    defaultString: function (input, defaultStr) {
      return input == null ? defaultStr : input
    },
    defaultIfBlank: function (input, defaultStr) {
      return this.isBlank(input) ? defaultStr : input
    },
    defaultIfEmpty: function (input, defaultStr) {
      return this.isEmpty(input) ? defaultStr : input
    },
    // 字符串反转
    reverse: function (input) {
      if (this.isBlank(input)) {
        input
      }
      return input.split('').reverse().join('')
    },
    /**
     * 数字千分位风格符号
     * @param num 数字字符串
     * @param fixed 保留几位小数
     * */
    splitThousands: function (num, fixed) {
      if (typeof num !== 'number') {
        num = parseFloat(num)
      }
      var reg = /\B(?=(\d{3})+$)/g
      num = num.toString().split('.')
      fixed = fixed === undefined ? 2 : fixed

      num[0] = num[0].replace(reg, ',')
      num[1] = num[1] ? num[1].substr(0, fixed) : '00000000000000000'.substr(0, fixed)

      return fixed ? num.join('.') : num[0]
    },
    // 删掉特殊字符(英文状态下)
    removeSpecialCharacter: function (input) {
      return input.replace(/[!-/:-@\[-`{-~]/g, '')
    },
    // 只包含特殊字符、数字和字母（不包括空格，若想包括空格，改为[ -~]）
    isSpecialCharacterAlphanumeric: function (input) {
      return /^[!-~]+$/.test(input)
    },
    /**
		 * @param {String} message
		 * @param {Array} arr
		 * 消息格式化
		 */
    format: function (message, arr) {
      return message.replace(/{(\d+)}/g, function (matchStr, group1) {
        return arr[group1]
      })
    },
    /**
		 * 把连续出现多次的字母字符串进行压缩。如输入:aaabbbbcccccd  输出:3a4b5cd
		 * @param {String} input
		 * @param {Boolean} ignoreCase : true or false
		 */
    compressRepeatedStr: function (input, ignoreCase) {
      var pattern = new RegExp('([a-z])\\1+', ignoreCase ? 'ig' : 'g')
      return result = input.replace(pattern, function (matchStr, group1) {
        return matchStr.length + group1
      })
    },
    // 中文校验
    isChinese: function (input) {
      return /^[\u4E00-\u9FA5]+$/.test(input)
    },
    // 去掉中文字符
    removeChinese: function (input) {
      return input.replace(/[\u4E00-\u9FA5]+/gm, '')
    },
    // 转义元字符
    escapeMetacharacter: function (input) {
      var metacharacter = '^$()*+.[]|\\-?{}'
      if (metacharacter.indexOf(input) >= 0) {
        input = '\\' + input
      }
      return input
    },
    // 转义字符串中的元字符
    escapeMetacharacterOfStr: function (input) {
      return input.replace(/[-$^()*+.\[\]|\\?{}]/gm, '\\$&')
    },
    // 中文转为unicode编码
    chineseToUnicode: function (input) {
      return input.replace(/[\u4E00-\u9FA5]/g, function (matchStr) {
        return '\\u' + matchStr.charCodeAt(0).toString(16)
      })
    },
    /**
		 * 自定义嵌套符号rule={'(':')','[':']','{':'}','<':'>'};
		 * @param {Object} rule
		 * @param {String} str
		 */
    isNest: function (rule, str) {
      if (!(rule && str)) {
        return false
      }
      var keys = []
      var values = []
      for (var key in rule) {
        if (rule.hasOwnProperty(key)) {
          keys.push(key)
          values.push(rule[key])
        }
      }
      var chs = str.split('')
      var len = chs.length
      var stack = []
      for (var i = 0; i < len; i++) {
        if (Bee.ArrayUtils.inArray(keys, chs[i])) {
          stack.push(rule[chs[i]])
        } else {
          if (chs[i] === stack[stack.length - 1]) {
            stack.pop()
          } else if (Bee.ArrayUtils.inArray(values, chs[i])) {
            return false
          }
        }
      }
      return stack.length === 0
    }

  }
  // ObjectUtils命名空间
  Bee.ObjectUtils = {
    isEmpty: function (obj) {
      // 本身为空直接返回true
      if (obj == null) return true
      // 然后可以根据长度判断，在低版本的ie浏览器中无法这样判断。
      if (obj.length > 0) return false
      if (obj.length === 0) return true
      if (typeof obj === 'undefined') return true
      // 最后通过属性长度判断。
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false
      }
      return false
    }
  }
  // IdCardUtils命名空间
  Bee.IdCardUtils = {
    idCardRegex: {
      // 18位身份证简单校验
      IDCARD_18_SIMPLE_PATTERN: /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}(?:1[89]|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}(?:\d|[xX])$/,
      // 15位身份证简单校验
      IDCARD_15_SIMPLE_PATTERN: /^(?:1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5])\d{4}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}$/
    },
    // 18位身份证简单校验
    isSimpleIdCard18: function (idCard) {
      return this.idCardRegex.IDCARD_18_SIMPLE_PATTERN.test(idCard)
    },
    // 15位身份证简单校验
    isSimpleIdCard15: function (idCard) {
      return this.idCardRegex.IDCARD_18_SIMPLE_PATTERN.test(idCard)
    },
    // 18位身份证校验码校验
    checkCode: function (idCard) {
      var multiplier = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var idDatas = idCard.split('')
      var len = 17
      var sum = 0
      for (var i = 0; i < len; i++) {
        sum += idDatas[i] * multiplier[i]
      }
      var remainder = sum % 11
      var checkCodeArr = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var checkCode = checkCodeArr[remainder]
      return checkCode === idCard[17]
    },
    // 18位身份证严格校验
    isIdCard18: function (idCard) {
      // 先校验格式
      if (this.isSimpleIdCard18(idCard)) {
        // 校验日期时间是否合法
        var dateStr = idCard.substr(6, 8)
        var dateStrNew = dateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')
        var dateObj = new Date(dateStrNew)
        var month = dateObj.getMonth() + 1
        if (parseInt(dateStr.substr(4, 2)) === month) {
          return this.checkCode(idCard)
        }
      }
      return false
    },
    // 根据18身份证号码获取人员信息
    getPersonInfo18: function (idCard) {
      var age = 0
      var birthday = ''
      var address = ''
      var sex = ''
      address = Bee.areas[idCard.substr(0, 2) + '0000'] + ' ' + Bee.areas[idCard.substr(0, 4) + '00'] + ' ' + Bee.areas[idCard.substr(0, 6)]
      sex = (idCard.substr(16, 1) % 2 === 0) ? '女' : '男'
      birthday = idCard.substr(6, 8).replace(/(\d{4})(\d{2})(\d{2})/, '$1年$2月$3日')
      age = new Date().getFullYear() - idCard.substr(6, 4) + 1
      var person = {
        'address': address,
        'sex': sex,
        'birthday': birthday,
        'age': age
      }
      return person
    }
  }
  // ArrayUtils命名空间
  Bee.ArrayUtils = {
    // 获取最大值
    getMaxValue: function (arr) {
      return Math.max.apply(Math, arr)
    },
    // 获取最小值
    getMinValue: function (arr) {
      return Math.min.apply(Math, arr)
    },
    // 判断某个值是否在数组
    inArray: function (arr, ele) {
      var len = arr.length
      for (var i = 0; i < len; i++) {
        if (ele === arr[i]) {
          return true
        }
      }
      return false
    }
  }
  // DateUtils命名空间
  Bee.DateUtils = {
    patterns: {
      PATTERN_ERA: 'G', // Era 标志符 Era strings. For example: "AD" and "BC"
      PATTERN_YEAR: 'y', // 年
      PATTERN_MONTH: 'M', // 月份
      PATTERN_DAY_OF_MONTH: 'd', // 月份的天数
      PATTERN_HOUR_OF_DAY1: 'k', // 一天中的小时数（1-24）
      PATTERN_HOUR_OF_DAY0: 'H', // 24小时制，一天中的小时数（0-23）
      PATTERN_MINUTE: 'm', // 小时中的分钟数
      PATTERN_SECOND: 's', // 秒
      PATTERN_MILLISECOND: 'S', // 毫秒
      PATTERN_DAY_OF_WEEK: 'E', // 一周中对应的星期，如星期一，周一
      PATTERN_DAY_OF_YEAR: 'D', // 一年中的第几天
      PATTERN_DAY_OF_WEEK_IN_MONTH: 'F', // 一月中的第几个星期(会把这个月总共过的天数除以7,不够准确，推荐用W)
      PATTERN_WEEK_OF_YEAR: 'w', // 一年中的第几个星期
      PATTERN_WEEK_OF_MONTH: 'W', // 一月中的第几星期(会根据实际情况来算)
      PATTERN_AM_PM: 'a', // 上下午标识
      PATTERN_HOUR1: 'h', // 12小时制 ，am/pm 中的小时数（1-12）
      PATTERN_HOUR0: 'K', // 和h类型
      PATTERN_ZONE_NAME: 'z', // 时区名
      PATTERN_ZONE_VALUE: 'Z', // 时区值
      PATTERN_WEEK_YEAR: 'Y', // 和y类型
      PATTERN_ISO_DAY_OF_WEEK: 'u',
      PATTERN_ISO_ZONE: 'X'
    },
    week: {
      'ch': {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
      },
      'en': {
        '0': 'Sunday',
        '1': 'Monday',
        '2': 'Tuesday',
        '3': 'Wednesday',
        '4': 'Thursday',
        '5': 'Friday',
        '6': 'Saturday'
      }
    },
    // 获取当前时间
    getCurrentTime: function () {
      var today = new Date()
      var year = today.getFullYear()
      var month = today.getMonth() + 1
      var day = today.getDate()
      var hours = today.getHours()
      var minutes = today.getMinutes()
      var seconds = today.getSeconds()
      var timeString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
      return timeString
    },
    /*
     * 比较时间大小
		 * time1>time2 return 1
		 * time1<time2 return -1
		 * time1==time2 return 0
		 */
    compareTime: function (time1, time2) {
      var d1 = time1
      var d2 = time2
      if ((typeof d1) === 'string') {
        d1 = new Date(Date.parse(d1.replace(/-/g, '/')))
      }
      if ((typeof d2) === 'string') {
        d2 = new Date(Date.parse(d2.replace(/-/g, '/')))
      }
      var t1 = d1.getTime()
      var t2 = d2.getTime()
      if (t1 === t2) {
        return 0
      } else if (t1 > t2) {
        return 1
      }
      return -1
    },
    // 是否闰年
    isLeapYear: function (year) {
      return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    },
    // 获取某个月的天数，从0开始
    getDaysOfMonth: function (year, month) {
      return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
    },
    getDaysOfMonth2: function (year, month) {
      // 将天置为0，会获取其上个月的最后一天
      month = parseInt(month) + 1
      var date = new Date(year, month, 0)
      return date.getDate()
    },
    /* 距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期
       * 如-1表示昨天的日期，0表示今天，2表示后天
       * addZeroFlag 月份 天数 小于10 是否补零 为ture补零
       * separator 分隔符
    */
    fromToday: function (days, addZeroFlag, separator) {
      var today = new Date()
      today.setDate(today.getDate() + days)
      var year = today.getFullYear()
      var month = today.getMonth() + 1
      var day = today.getDate()
      if (addZeroFlag) {
        month = Number(month) > 9 ? month : '0' + month
        day = Number(day) > 9 ? day : '0' + day
      }
      if (Bee.StringUtils.isEmpty(separator)) {
        separator = ''
      }
      var date = year + separator + month + separator + day
      return date
    },
    /**
     * 从一个给定日期date 加几天得到一个时间
     * @param date
     * @param days
     * @param addZeroFlag
     * @param separator
     * @returns {*}
     */
    addDaysFromTheDate (date, days, addZeroFlag, separator) {
      let tempDate = new Date(date)
      tempDate.setDate(tempDate.getDate() + days)
      var year = tempDate.getFullYear()
      var month = tempDate.getMonth() + 1
      var day = tempDate.getDate()
      if (addZeroFlag) {
        month = Number(month) > 9 ? month : '0' + month
        day = Number(day) > 9 ? day : '0' + day
      }
      if (Bee.StringUtils.isEmpty(separator)) {
        separator = ''
      }
      var dateStr = month + separator + day
      return dateStr
    },
    /**
     * 将"2018-05-19T08:04:52.000+0000"这种格式的时间转化为正常格式
     * @param time
     */
    timeFormat: function(time) {
      var d = new Date(time)

      var year = d.getFullYear() // 年
      var month = d.getMonth() + 1 // 月
      var day = d.getDate() // 日

      var hh = d.getHours() // 时
      var mm = d.getMinutes() // 分
      var ss = d.getSeconds() // 秒

      var clock = year + '-'

      if (month < 10) { clock += '0' }

      clock += month + '-'

      if (day < 10) { clock += '0' }

      clock += day + ' '

      if (hh < 10) { clock += '0' }

      clock += hh + ':'
      if (mm < 10) clock += '0'
      clock += mm + ':'

      if (ss < 10) clock += '0'
      clock += ss
      return (clock)
    },
    /**
		 * 日期时间格式化
		 * @param {Object} dateTime 需要格式化的日期时间
		 * @param {String} pattern  格式化的模式，如yyyy-MM-dd hh(HH):mm:ss.S a k K E D F w W z Z
		 */
    formt: function (dateTime, pattern) {
      var date = new Date(dateTime)
      if (Bee.StringUtils.isBlank(pattern)) {
        return date.toLocaleString()
      }
      return pattern.replace(/([a-z])\1*/ig, function (matchStr, group1) {
        var replacement = ''
        switch (group1) {
        case Bee.DateUtils.patterns.PATTERN_ERA: // G
          break
        case Bee.DateUtils.patterns.PATTERN_WEEK_YEAR: // Y
        case Bee.DateUtils.patterns.PATTERN_YEAR: // y
          replacement = date.getFullYear()
          break
        case Bee.DateUtils.patterns.PATTERN_MONTH: // M
          var month = date.getMonth() + 1
          replacement = (month < 10 && matchStr.length >= 2) ? '0' + month : month
          break
        case Bee.DateUtils.patterns.PATTERN_DAY_OF_MONTH: // d
          var days = date.getDate()
          replacement = (days < 10 && matchStr.length >= 2) ? '0' + days : days
          break
        case Bee.DateUtils.patterns.PATTERN_HOUR_OF_DAY1: // k(1~24)
          var hours24 = date.getHours()
          replacement = hours24
          break
        case Bee.DateUtils.patterns.PATTERN_HOUR_OF_DAY0: // H(0~23)
          var hours24 = date.getHours()
          replacement = (hours24 < 10 && matchStr.length >= 2) ? '0' + hours24 : hours24
          break
        case Bee.DateUtils.patterns.PATTERN_MINUTE: // m
          var minutes = date.getMinutes()
          replacement = (minutes < 10 && matchStr.length >= 2) ? '0' + minutes : minutes
          break
        case Bee.DateUtils.patterns.PATTERN_SECOND: // s
          var seconds = date.getSeconds()
          replacement = (seconds < 10 && matchStr.length >= 2) ? '0' + seconds : seconds
          break
        case Bee.DateUtils.patterns.PATTERN_MILLISECOND: // S
          var milliSeconds = date.getMilliseconds()
          replacement = milliSeconds
          break
        case Bee.DateUtils.patterns.PATTERN_DAY_OF_WEEK: // E
          var day = date.getDay()
          replacement = Bee.DateUtils.week['ch'][day]
          break
        case Bee.DateUtils.patterns.PATTERN_DAY_OF_YEAR: // D
          replacement = Bee.DateUtils.dayOfTheYear(date)
          break
        case Bee.DateUtils.patterns.PATTERN_DAY_OF_WEEK_IN_MONTH: // F
          var days = date.getDate()
          replacement = Math.floor(days / 7)
          break
        case Bee.DateUtils.patterns.PATTERN_WEEK_OF_YEAR: // w
          var days = Bee.DateUtils.dayOfTheYear(date)
          replacement = Math.ceil(days / 7)
          break
        case Bee.DateUtils.patterns.PATTERN_WEEK_OF_MONTH: // W
          var days = date.getDate()
          replacement = Math.ceil(days / 7)
          break
        case Bee.DateUtils.patterns.PATTERN_AM_PM: // a
          var hours24 = date.getHours()
          replacement = hours24 < 12 ? '\u4e0a\u5348' : '\u4e0b\u5348'
          break
        case Bee.DateUtils.patterns.PATTERN_HOUR1: // h(1~12)
          var hours12 = date.getHours() % 12 || 12 // 0转为12
          replacement = (hours12 < 10 && matchStr.length >= 2) ? '0' + hours12 : hours12
          break
        case Bee.DateUtils.patterns.PATTERN_HOUR0: // K(0~11)
          var hours12 = date.getHours() % 12
          replacement = hours12
          break
        case Bee.DateUtils.patterns.PATTERN_ZONE_NAME: // z
          replacement = Bee.DateUtils.getZoneNameValue(date)['name']
          break
        case Bee.DateUtils.patterns.PATTERN_ZONE_VALUE: // Z
          replacement = Bee.DateUtils.getZoneNameValue(date)['value']
          break
        case Bee.DateUtils.patterns.PATTERN_ISO_DAY_OF_WEEK: // u
          break
        case Bee.DateUtils.patterns.PATTERN_ISO_ZONE: // X
          break
        default:
          break
        }
        return replacement
      })
    },
    /**
		 * 计算一个日期是当年的第几天
		 * @param {Object} date
		 */
    dayOfTheYear: function (date) {
      var obj = new Date(date)
      var year = obj.getFullYear()
      var month = obj.getMonth() // 从0开始
      var days = obj.getDate()
      var daysArr = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      for (var i = 0; i < month; i++) {
        days += daysArr[i]
      }
      return days
    },
    // 获得时区名和值
    getZoneNameValue: function (dateObj) {
      var date = new Date(dateObj)
      date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      var arr = date.toString().match(/([A-Z]+)([-+]\d+:?\d+)/)
      var obj = {
        'name': arr[1],
        'value': arr[2]
      }
      return obj
    }
  }
  // 简单四则运算
  Bee.ElementaryArithmeticUtils = {
    // 运算符优先级
    operatorPrecedence: {
      '+': 0,
      '-': 0,
      '*': 1,
      '×': 1,
      '÷': 1,
      '\/': 1
    },
    // 运算符
    operator: {
      '+': '+',
      '-': '-',
      '*': '*',
      '×': '*',
      '÷': '/',
      '\/': '/'
    },
    // 加法
    add: function (operandLeft, operandRight) {
      var operand1 = operandLeft.toString()
      var operand2 = operandRight.toString()
      var decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0
      var decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0
      var multiple = Math.pow(10, Math.max(decimalPlace1, decimalPlace2))
      return (operandLeft * multiple + operandRight * multiple) / multiple
    },
    // 减法
    subtract: function (operandLeft, operandRight) {
      var operand1 = operandLeft.toString()
      var operand2 = operandRight.toString()
      var decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0
      var decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0
      var multiple = Math.pow(10, Math.max(decimalPlace1, decimalPlace2))
      // toFixed避免多出来小数位，如 11.3-10.12000=1.1800000000000015
      var decimalPlace = (decimalPlace1 >= decimalPlace2) ? decimalPlace1 : decimalPlace2
      return ((operandLeft * multiple - operandRight * multiple) / multiple).toFixed(decimalPlace)
    },
    // 乘法
    multiply: function (operandLeft, operandRight) {
      var operand1 = operandLeft.toString()
      var operand2 = operandRight.toString()
      var decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0
      var decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0
      var multiple1 = Math.pow(10, decimalPlace1)
      var multiple2 = Math.pow(10, decimalPlace2)
      return ((operandLeft * multiple1) * (operandRight * multiple2)) / Math.pow(10, decimalPlace1 + decimalPlace2)
    },
    // 除法
    divide: function (operandLeft, operandRight) {
      var operand1 = operandLeft.toString()
      var operand2 = operandRight.toString()
      var decimalPlace1 = operand1.indexOf('.') >= 0 ? operand1.split('.')[1].length : 0
      var decimalPlace2 = operand2.indexOf('.') >= 0 ? operand2.split('.')[1].length : 0
      var multiple1 = Math.pow(10, decimalPlace1)
      var multiple2 = Math.pow(10, decimalPlace2)
      return ((operandLeft * multiple1) / (operandRight * multiple2)) * Math.pow(10, decimalPlace2 - decimalPlace1)
    },
    // 校验表达式的合法性
    isArithmeticExpression: function (expression) {
      try {
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*')
        var regex = /^(?=.*\d)(?!.*(\[\s*\]|\(\s*\)|{\s*}))[-+*\/()[\]\d{}]+$/
        if (regex.test(expression)) {
          var result = eval(expression)
        } else {
          return false
        }
      } catch (e) {
        return false
      }
      return true
    },
    // 计算
    calculate: function (expression) {
      var value = NaN
      if (this.isArithmeticExpression(expression)) {
				 value = eval(expression)
      }
      return value
    },
    // 中缀表达式转后缀表达式
    infixToPostfixExpression: function (expression) {
      expression = Bee.StringUtils.deleteWhitespace(expression)
      expression = this.eliminatePositiveOrNegativeSign(expression)
      var operatorStack = []
      var resultStack = []
      var elementArr = expression.match(/[-+\/÷*×()]|(?:[1-9]\d*|0)(?:\.\d+)?/g)
      var size = elementArr.length
      for (var i = 0; i < size; i++) {
        if (Bee.StringUtils.isNumeric(elementArr[i])) {
          // 如果是数值
          resultStack.push(elementArr[i])
        } else {
          // 操作符栈顶元素
          var operatorStackTopElement = operatorStack.length === 0 ? '' : operatorStack[operatorStack.length - 1]
          // 运算符
          if (operatorStack.length === 0 || elementArr[i] === '(' || operatorStackTopElement === '(' || this.operatorPrecedence[elementArr[i]] > this.operatorPrecedence[operatorStackTopElement]) {
            // 操作符栈为空或栈顶元素为右括号')'，或操作符的优先级比栈顶运算符高或相等，直接入栈
            operatorStack.push(elementArr[i])
          } else {
            // 如果是右括号")"，则依次弹出操作符栈顶的运算符，并压入结果栈，直到遇到左括号'('为止，左右括号不压入结果栈；
            if (elementArr[i] === ')') {
              for (var index = operatorStack.length - 1; index >= 0; index--) {
                if (operatorStack[index] === '(') {
                  operatorStack.pop()
                  break
                } else {
                  resultStack.push(operatorStack.pop())
                }
              }
            } else {
              // 将符号栈顶的运算符弹出并压入到结果栈中，再次与符号栈中新的栈顶运算符相比较
              resultStack.push(operatorStack.pop())
              i--
              continue
            }
          }
        }
      }
      // 处理操作符栈剩余的符号
      if (operatorStack.length > 0) {
        for (var j = operatorStack.length - 1; j >= 0; j--) {
          resultStack.push(operatorStack.pop())
        }
      }
      // 结果返回
      return resultStack.join(' ')
    },
    // 中缀表达式转前缀表达式(结果以空格隔开)
    infixToPrefixExpression: function (expression) {
      expression = Bee.StringUtils.deleteWhitespace(expression)
      expression = this.eliminatePositiveOrNegativeSign(expression)
      var operatorStack = []
      var resultStack = []
      var elementArr = expression.match(/[-+\/÷*×()]|(?:[1-9]\d*|0)(?:\.\d+)?/g)
      var size = elementArr.length
      for (var i = size - 1; i >= 0; i--) {
        if (Bee.StringUtils.isNumeric(elementArr[i])) {
          // 如果是数值
          resultStack.push(elementArr[i])
        } else {
          // 操作符栈顶元素
          var operatorStackTopElement = operatorStack.length === 0 ? '' : operatorStack[operatorStack.length - 1]
          // 运算符
          if (operatorStack.length === 0 || elementArr[i] === ')' || operatorStackTopElement === ')' || this.operatorPrecedence[elementArr[i]] >= this.operatorPrecedence[operatorStackTopElement]) {
            // 操作符栈为空或栈顶元素为右括号')'，或操作符的优先级比栈顶运算符高或相等，直接入栈
            operatorStack.push(elementArr[i])
          } else {
            // 如果是左括号"("，则依次弹出操作符栈顶的运算符，并压入结果栈，直到遇到右括号')'为止，左右括号不压入结果栈；
            if (elementArr[i] === '(') {
              for (var index = operatorStack.length - 1; index >= 0; index--) {
                if (operatorStack[index] === ')') {
                  operatorStack.pop()
                  break
                } else {
                  resultStack.push(operatorStack.pop())
                }
              }
            } else {
              // 将符号栈顶的运算符弹出并压入到结果栈中，再次与符号栈中新的栈顶运算符相比较
              resultStack.push(operatorStack.pop())
              i++
              continue
            }
          }
        }
      }
      // 处理操作符栈剩余的符号
      if (operatorStack.length > 0) {
        for (var j = operatorStack.length - 1; j >= 0; j--) {
          resultStack.push(operatorStack.pop())
        }
      }
      // 结果返回
      return resultStack.reverse().join(' ')
    },
    // 解决正负号问题-1转为0-1;+1转为0+1
    eliminatePositiveOrNegativeSign: function (expression) {
      return expression.replace(/(\(|^)([-+])/g, '$10$2')
    },
    // 把中缀表达式转为前缀表达式，再计算
    calculateByPrefixExpression: function (expression) {
      var elementArr = this.infixToPrefixExpression(expression).split(' ')
      var size = elementArr.length
      var resultStack = []
      for (var i = size - 1; i >= 0; i--) {
        if (Bee.StringUtils.isNumeric(elementArr[i])) {
          // 如果是数值
          resultStack.push(elementArr[i])
        } else {
          var operand1 = resultStack.pop()
          var operand2 = resultStack.pop()
          var result
          switch (elementArr[i]) {
          case '+':
            result = Bee.ElementaryArithmeticUtils.add(operand1, operand2)
            break
          case '-':
            result = Bee.ElementaryArithmeticUtils.subtract(operand1, operand2)
            break
          case '×':
          case '*':
            result = Bee.ElementaryArithmeticUtils.multiply(operand1, operand2)
            break
          case '\/':
          case '÷':
            result = Bee.ElementaryArithmeticUtils.divide(operand1, operand2)
            break
          default:
            result = ''
            alert('The operator 【' + elementArr[i] + '】 is not legal')
            break
          }
          resultStack.push(result)
        }
      }
      return resultStack
    },
    // 把中缀表达式转为后缀表达式，再计算
    calculateByPostfixExpression: function (expression) {
      var elementArr = this.infixToPostfixExpression(expression).split(' ')
      var size = elementArr.length
      var resultStack = []
      for (var i = 0; i < size; i++) {
        if (Bee.StringUtils.isNumeric(elementArr[i])) {
          // 如果是数值
          resultStack.push(elementArr[i])
        } else {
          var operand1 = resultStack.pop()
          var operand2 = resultStack.pop()
          var result
          switch (elementArr[i]) {
          case '+':
            result = Bee.ElementaryArithmeticUtils.add(operand2, operand1)
            break
          case '-':
            result = Bee.ElementaryArithmeticUtils.subtract(operand2, operand1)
            break
          case '×':
          case '*':
            result = Bee.ElementaryArithmeticUtils.multiply(operand2, operand1)
            break
          case '\/':
          case '÷':
            result = Bee.ElementaryArithmeticUtils.divide(operand2, operand1)
            break
          default:
            result = ''
            alert('The operator 【' + elementArr[i] + '】 is not legal')
            break
          }
          resultStack.push(result)
        }
      }
      return resultStack
    },
    // 横式计算
    horizontalCalculation: function (expression) {
      expression = Bee.StringUtils.deleteWhitespace(expression)
      expression = this.eliminatePositiveOrNegativeSign(expression)
      var result = expression
      while (expression.indexOf('(') >= 0) {
        expression = expression.replace(/\([^()]+\)/g, function (matchStr) {
          return eval(matchStr)
        })
        result += '=' + expression
      }
      while (expression.indexOf('[') >= 0) {
        expression = expression.replace(/\[[^\[\]]+\]/g, function (matchStr) {
          return eval(matchStr)
        })
        result += '=' + expression
      }
      while (expression.indexOf('{') >= 0) {
        expression = expression.replace(/\{[^{}]+\}/g, function (matchStr) {
          return eval(matchStr)
        })
        result += '=' + expression
      }
      var pattern = /(?:[1-9]\d*|0)(?:\.\d+)?[*/](?:[1-9]\d*|0)(?:\.\d+)?/
      while (expression.indexOf('*') >= 0 || expression.indexOf('/') >= 0) {
        expression = expression.replace(pattern, function (matchStr, index) {
          return eval(matchStr)
        })
        result += '=' + expression
      }
      if (/[-+*/]/.test(expression)) {
        result += '=' + eval(expression)
      }
      return result
    },
    // 竖式计算
    verticalCalculation: function (expression) {
      var result = this.horizontalCalculation(expression)
      return result.replace(/=/g, '\n$&')
    }
  }
  // 自动生成正则表达式
  Bee.RegexUtils = {
    // 生成正整数范围的表达式
    positiveIntegerRange: function (minimum, maximum) {},
    /**
		 * 排除某些字符串，即不能包含某些字符串.返回值为RegExp对象
		 * @param {Object} conditions:里面有多个属性，如下：
		 *
		 * @param {String} matcherFlag 匹配标识
		 * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
		 * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
		 * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
		 * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
		 * 100：所有字符;
		 * @param {Array} targetStrArr 排除的字符串，数组格式
		 * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
		 * @param {Boolean} ignoreCase 是否忽略大小写
		 *
		 * conditions={matcherFlag:"0",targetStrArr:[],length:"",ignoreCase:true}
		 */
    createRegexObjMustExclude: function (input, conditions) {
      // 参数
      var matcherFlag = conditions.matcherFlag
      var targetStrArr = conditions.targetStrArr
      var length = conditions.length
      var ignoreCase = conditions.ignoreCase
      // 拼正则
      var size = targetStrArr.length
      var regex = (size == 0) ? '^' : '^(?!.*(?:{0}))'
      var subPattern = ''
      for (var i = 0; i < size; i++) {
        targetStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(targetStrArr[i])
        subPattern += targetStrArr[i]
        if (i != size - 1) {
          subPattern += '|'
        }
      }
      regex = Bee.StringUtils.format(regex, [subPattern])
      switch (matcherFlag) {
      case '0':
        regex += '\\d'
        break
      case '1':
        regex += '[a-zA-Z]'
        break
      case '2':
        regex += '[a-z]'
        break
      case '3':
        regex += '[A-Z]'
        break
      case '4':
        regex += '[!-/:-@\[-`{-~]'
        break
      case '5':
        regex += '[\u4E00-\u9FA5]'
        break
      case '6':
        regex += '[a-zA-Z0-9]'
        break
      case '7':
        regex += '[a-z0-9]'
        break
      case '8':
        regex += '[A-Z0-9]'
        break
      case '9':
        regex += '[!-~]'
        break
      case '10':
        regex += '[0-9\u4E00-\u9FA5]'
        break
      case '11':
        regex += '[a-z!-/:-@\[-`{-~]'
        break
      case '12':
        regex += '[A-Z!-/:-@\[-`{-~]'
        break
      case '13':
        regex += '[a-zA-Z!-/:-@\[-`{-~]'
        break
      case '14':
        regex += '[a-z\u4E00-\u9FA5]'
        break
      case '15':
        regex += '[A-Z\u4E00-\u9FA5]'
        break
      case '16':
        regex += '[a-zA-Z\u4E00-\u9FA5]'
        break
      case '17':
        regex += '[\u4E00-\u9FA5!-/:-@\[-`{-~]'
        break
      case '18':
        regex += '[\u4E00-\u9FA5!-~]'
        break
      case '19':
        regex += '[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]'
        break
      case '20':
        regex += '[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]'
        break
      case '100':
        regex += '[\s\S]'
        break
      default:
        alert(matcherFlag + ':This type is not supported!')
      }
      regex += Bee.StringUtils.isNotBlank(length) ? '{' + length + '}' : '+'
      regex += '$'
      var pattern = new RegExp(regex, ignoreCase ? 'i' : '')
      return pattern
    },

    /**
		 * 校验时排除某些字符串，即不能包含某些字符串
		 * @param {Object} conditions:里面有多个属性，如下：
		 *
		 * @param {String} matcherFlag 匹配标识
		 * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
		 * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
		 * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
		 * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
		 * 100：所有字符;
		 * @param {Array} targetStrArr 排除的字符串，数组格式
		 * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
		 * @param {Boolean} ignoreCase 是否忽略大小写
		 * conditions={matcherFlag:"0",targetStrArr:[],length:"",ignoreCase:true}
		 */
    isPatternMustExclude: function (input, conditions) {
      var pattern = this.createRegexObjMustExclude(input, conditions)
      return pattern.test(input)
    },
    /**
		 * 必须同时包含某些字符串,返回值为RegExp对象
		 * @param {String} input
		 * @param {Object} conditions:里面有多个属性，如下：
		 *
		 * @param {String} matcherFlag 匹配标识
		 * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
		 * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
		 * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
		 * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
		 * 100：所有字符;
		 * @param {Array} targetStrArr 排除的字符串，数组格式
		 * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
		 * @param {Boolean} ignoreCase 是否忽略大小写
		 * conditions={matcherFlag:"0",targetStrArr:[],length:"",ignoreCase:true}
		 *
		 */
    createRegexObjMustContain: function () {
      // 参数
      var matcherFlag = conditions.matcherFlag
      var targetStrArr = conditions.targetStrArr
      var length = conditions.length
      var ignoreCase = conditions.ignoreCase
      // 创建正则
      var size = targetStrArr.length
      var regex = '^'
      var subPattern = ''
      for (var i = 0; i < size; i++) {
        targetStrArr[i] = Bee.StringUtils.escapeMetacharacterOfStr(targetStrArr[i])
        subPattern += '(?=.*' + targetStrArr[i] + ')'
      }
      regex += subPattern
      switch (matcherFlag) {
      case '0':
        regex += '\\d'
        break
      case '1':
        regex += '[a-zA-Z]'
        break
      case '2':
        regex += '[a-z]'
        break
      case '3':
        regex += '[A-Z]'
        break
      case '4':
        regex += '[!-/:-@\[-`{-~]'
        break
      case '5':
        regex += '[\u4E00-\u9FA5]'
        break
      case '6':
        regex += '[a-zA-Z0-9]'
        break
      case '7':
        regex += '[a-z0-9]'
        break
      case '8':
        regex += '[A-Z0-9]'
        break
      case '9':
        regex += '[!-~]'
        break
      case '10':
        regex += '[0-9\u4E00-\u9FA5]'
        break
      case '11':
        regex += '[a-z!-/:-@\[-`{-~]'
        break
      case '12':
        regex += '[A-Z!-/:-@\[-`{-~]'
        break
      case '13':
        regex += '[a-zA-Z!-/:-@\[-`{-~]'
        break
      case '14':
        regex += '[a-z\u4E00-\u9FA5]'
        break
      case '15':
        regex += '[A-Z\u4E00-\u9FA5]'
        break
      case '16':
        regex += '[a-zA-Z\u4E00-\u9FA5]'
        break
      case '17':
        regex += '[\u4E00-\u9FA5!-/:-@\[-`{-~]'
        break
      case '18':
        regex += '[\u4E00-\u9FA5!-~]'
        break
      case '19':
        regex += '[a-z\u4E00-\u9FA5!-/:-@\[-`{-~]'
        break
      case '20':
        regex += '[A-Z\u4E00-\u9FA5!-/:-@\[-`{-~]'
        break
      case '100':
        regex += '[\s\S]'
        break
      default:
        alert(matcherFlag + ':This type is not supported!')
      }
      regex += Bee.StringUtils.isNotBlank(length) ? '{' + length + '}' : '+'
      regex += '$'
      var pattern = new RegExp(regex, ignoreCase ? 'i' : '')
      return pattern
    },
    /**
		 * 校验必须同时包含某些字符串
		 * @param {String} input
		 * @param {Object} conditions:里面有多个属性，如下：
		 *
		 * @param {String} matcherFlag 匹配标识
		 * 0:数字；1：字母；2：小写字母；3:大写字母；4：特殊字符,指英文状态下的标点符号及括号等；5:中文;
		 * 6:数字和字母；7：数字和小写字母；8：数字和大写字母；9：数字、字母和特殊字符；10：数字和中文；
		 * 11：小写字母和特殊字符；12：大写字母和特殊字符；13：字母和特殊字符；14：小写字母和中文；15：大写字母和中文；
		 * 16：字母和中文；17：特殊字符、和中文；18：特殊字符、字母和中文；19：特殊字符、小写字母和中文；20：特殊字符、大写字母和中文；
		 * 100：所有字符;
		 * @param {Array} targetStrArr 排除的字符串，数组格式
		 * @param {String} length 长度，可为空。1,2表示长度1到2之间；10，表示10个以上字符；5表示长度为5
		 * @param {Boolean} ignoreCase 是否忽略大小写
		 * conditions={matcherFlag:"0",targetStrArr:[],length:"",ignoreCase:true}
		 *
		 */
    isPatternMustContain: function (input, conditions) {
      var pattern = this.createRegexObjMustContain(input, conditions)
      return pattern.test(input)
    }
  }
  Bee.UrlUtils = {
    // 获取浏览器url中的参数值
    getURLParam: function (name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', 'ig').exec(location.search) || [, ''])[1].replace(/\+/g, '%20')) || null
    },
    // url参数转obj
    urlToObj: function (url) {
      var regex = /(\w+)=([^&#]*)/igm
      var matchStr = null
      var obj = {}
      while ((matchStr = regex.exec(url)) != null) {
        obj[matchStr[1]] = matchStr[2]
      }
      return obj
    },
    // obj转为url参数
    objToUrl: function (baseUrl, obj) {
      var parameters = ''
      var url = ''
      for (var key in obj) {
        parameters += key + '=' + obj[key] + '&'
      }
      parameters = parameters.replace(/&$/, '')
      if (/\?$/.test(baseUrl)) {
        url = baseUrl + parameters
      } else {
        url = baseUrl.replace(/\/?$/, '?') + parameters
      }
      return url
    },
    // url参数转obj,若一个字段有多个值的话,返回数组
    parseQueryString: function (url) {
      var obj = {}
      if (url) {
        url = url.replace(/#[^#]*$/, '')
        var index = url.indexOf('?')
        if (index != -1) {
          var queryStr = url.substr(index + 1)
          var marchResult = null
          var regex = /(\w+)(=([^&#]+)?)?/g
          while ((marchResult = regex.exec(queryStr)) != null) {
            if (marchResult[1] in obj) {
              var values = obj[marchResult[1]]
              if (values instanceof Array) {
                values.push(marchResult[2] ? (marchResult[3] ? marchResult[3] : '') : null)
                obj[marchResult[1]] = values
              } else {
                var arr = []
                arr.push(values)
                arr.push(marchResult[2] ? (marchResult[3] ? marchResult[3] : '') : null)
                obj[marchResult[1]] = arr
              }
            } else {
              obj[marchResult[1]] = marchResult[2] ? (marchResult[3] ? marchResult[3] : '') : null
            }
          }
        }
      }
      return obj
    }
  }
  Bee.tmFile = {
	    /**
		 * 文件大小转换为MB GB KB格式
		 * @param {Object} size
		 */
    tm_countFileSize: function (size) {
      var fsize = parseFloat(size, 2)
      var fileSizeString
      if (fsize < 1024) {
        fileSizeString = fsize.toFixed(2) + 'B'
      } else if (fsize < 1048576) {
        fileSizeString = (fsize / 1024).toFixed(2) + 'KB'
      } else if (fsize < 1073741824) {
        fileSizeString = (fsize / 1024 / 1024).toFixed(2) + 'MB'
      } else if (fsize < 1024 * 1024 * 1024) {
        fileSizeString = (fsize / 1024 / 1024 / 1024).toFixed(2) + 'GB'
      } else {
        fileSizeString = '0B'
      }
      return fileSizeString
    },

    /**
		 * 获取文件的后缀名
		 * @param {Object} fileName
		 */
    tm_getExt: function (fileName) {
      if (fileName.lastIndexOf('.') == -1) { return fileName }
      var pos = fileName.lastIndexOf('.') + 1
      return fileName.substring(pos, fileName.length).toLowerCase()
    },

    /**
		 * 获取文件名称
		 * @param {Object} fileName
		 */
    tm_getFileName: function (fileName) {
      var pos = fileName.lastIndexOf('.')
      if (pos == -1) {
        return fileName
      } else {
        return fileName.substring(pos, fileName.length)
      }
    },

    /**
		 * 过滤html代码(把<>转换)
		 * @param {Object} str
		 */
    filterTag: function (str) {
      str = str.replace(/&/ig, '&amp;')
      str = str.replace(/</ig, '&lt;')
      str = str.replace(/>/ig, '&gt;')
      str = str.replace(' ', '&nbsp;')
      return str
    },

    /**
		 * 过滤<script></script>转换
		 * @param {Object} str
		 */
    filterScript: function (str) {
      return str.replace(/(<script)/ig, '&lt;script').replace(/(<script>)/ig, '&lt;script&gt;').replace(/(<\/script>)/ig, '&lt;/script&gt;')
    },

    /* 验证是否为图片 */
    tmCheckImage: function (fileName) {
      return /(gif|jpg|jpeg|png|GIF|JPG|PNG)$/ig.test(fileName)
    },

    /* 验证是否为视频 */
    tmCheckVideo: function (fileName) {
      return /(mp4|avi|wma|rmvb|rm|asf|divx|mpg|mpeg|mpe|mkv|vob)$/ig.test(fileName)
    },

    /* 验证是否为音频 */
    tmCheckAudio: function (fileName) {
      return /(mp3|wav|silk|pcm|ape|flac|aac|ogg|midi|mod|aiff|au)$/ig.test(fileName)
    },

    /* 验证是否为文档 */
    tmCheckDocument: function (fileName) {
      return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx|rar|zip|html|jsp|sql|htm|shtml|xml)$/ig.test(fileName)
    },

    /* 验证是否为文档 */
    tmCheckOffice: function (fileName) {
      return /(doc|docx|xls|xlsx|pdf|txt|ppt|pptx)$/ig.test(fileName)
    }
  }

  Bee.common = {
    /**
		 * 获取十六进制随机颜色
		 * @returns {string}
		 */
		 // 判断浏览器类型
    getRandomColor: function () {
      return '#' + (function (h) {
        return new Array(7 - h.length).join('0') + h
      })((Math.random() * 0x1000000 << 0).toString(16))
    },
    // 判断是否用微信浏览器打开
	    is_weixn: function () {
      var ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    tmGetBrowse: function () {
      var sUA = navigator.userAgent
      // 检测IE浏览器
      if ((navigator.appName == 'Microsoft Internet Explorer')) {
        // 检测模拟IE浏览的OPERA。edit at 2006-11-08(ver 0.1.2)
        if (sUA.indexOf('Opera') != -1) {
          this.browseKernel = 'Presto'
          if (window.opera && document.childNodes) {
            return 'Opera 7+'
          } else {
            return 'Opera 6-'
          }
        }
        this.browseKernel = 'Trident'
        if (sUA.indexOf('Maxthon') != -1) {
          return 'Maxthon'
        }
        if (sUA.indexOf('TencentTraveler') != -1) { // ver 0.1.3
          return '腾迅TT'
        }
        if (document.getElementById) {
          return 'IE5+'
        } else {
          return 'IE4-'
        }
      }
      // 检测Gecko浏览器
      if (sUA.indexOf('Gecko') != -1) {
        this.browseKernel = 'Gecko'
        if (navigator.vendor == 'Mozilla') {
          return 'Mozilla'
        }
        if (navigator.vendor == 'Firebird') {
          return 'Firebird'
        }
        if (navigator.vendor.indexOf('Google') != -1 || sUA.indexOf('Google') != -1) {
          return 'Google'
        }
        if (sUA.indexOf('Firefox') != -1) {
          return 'Firefox'
        }
        return 'Gecko'
      }
      // Netscape浏览器
      if (sUA.indexOf('Netscape') != -1) {
        this.browseKernel = 'Gecko'
        if (document.getElementById) {
          return 'Netscape 6+'
        } else {
          return 'Netscape 5-'
        }
      }
      // 检测Safari浏览器
      if (sUA.indexOf('Safari') != -1) {
        this.browseKernel = 'KHTML'
        return 'Safari'
      }
      if (sUA.indexOf('konqueror') != -1) {
        this.browseKernel = 'KHTML'
        return 'Konqueror'
      }
      // 目前世界公认浏览网页速度最快的浏览器，但它占用的系统资源也很大。
      if (sUA.indexOf('Opera') != -1) {
        this.browseKernel = 'Presto'
        if (window.opera && document.childNodes) {
          return 'Opera 7+'
        } else {
          return 'Opera 6-'
        }
        return 'Opera'
      }
      if ((sUA.indexOf('hotjava') != -1) && typeof (navigator.accentColorName) === 'undefined') {
        return 'HotJava'
      }
      if (document.all && document.getElementById && navigator.savePreferences && (sUA.indexOf('netfront') < 0) && navigator.appName != 'Blazer') {
        return 'Escape 5'
      }
      // Konqueror / Safari / OmniWeb 4.5+
      if (navigator.vendor == 'KDE' || (document.childNodes && (!document.all || navigator.accentColorName) && !navigator.taintEnabled)) {
        this.browseKernel = 'KHTML'
        return 'KDE'
      }
      if (navigator.__ice_version) {
        return 'ICEbrowser'
      }
      if (window.ScriptEngine && ScriptEngine().indexOf('InScript') + 1) {
        if (document.createElement) {
          return 'iCab 3+'
        } else {
          return 'iCab 2-'
        }
      }
      if (document.layers && !document.classes) {
        return 'Omniweb 4.2-'
      }
      if (document.layers && !navigator.mimeTypes['*']) {
        return 'Escape 4'
      }
      if (navigator.appName.indexOf('WebTV') + 1) {
        return 'WebTV'
      }
      if (sUA.indexOf('netgem') != -1) {
        return 'Netgem NetBox'
      }
      if (sUA.indexOf('opentv') != -1) {
        return 'OpenTV'
      }
      if (sUA.indexOf('ipanel') != -1) {
        return 'iPanel MicroBrowser'
      }
      if (document.getElementById && !document.childNodes) {
        return 'Clue browser'
      }
      if (document.getElementById && ((sUA.indexOf('netfront') != -1) || navigator.appName == 'Blazer')) {
        return 'NetFront 3+'
      }
      if ((sUA.indexOf('msie') + 1) && window.ActiveXObject) {
        return 'Pocket Internet Explorer'
      }
      return 'Unknown'
    }

  }
  Bee.regRule = {
    email: function (email) {
      var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      return reg.test(email)
    },
    userName: function (str) {
      var reg = /^[a-z0-9_-]{3,16}$/ // 用户名
      return reg.test(str)
    },
    chineseName: function (str) {
      var reg = /^[\u4E00-\u9FA5]{2,4}$/ // 中文姓名
      return reg.test(str)
    },
    mobile: function (str) {
      var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/ // 手机
      return reg.test(str)
    },
    tel: function (str) {
      var reg = /^0[\d]{2,3}-[\d]{7,8}$/ // 固话
      return reg.test(str)
    },
    idCard: function (str) {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 身份证
      return reg.test(str)
    },
    amount: function (str) {
      var reg = /^([1-9][\d]{0,10}|0)(\.[\d]{1,2})?$/ // 金额(10位整数2位小数)
      return reg.test(str)
    },
    positiveInt: function (str) {
      var reg = /^[1-9]*[1-9][0-9]*$/ // 正整数
      return reg.test(str)
    },
    int: function (str) {
      var reg = /^-?\d+$/ // 整数(不限位数)
      return reg.test(str)
    },
    bankCard: function (str) {
      var reg = /^\d{16}|\d{19}$/ // 16位或19位银行卡或信用卡号(先把空格replace为空串)
      return reg.test(str)
    },
    chinese: function (str) {
      var reg = /[\u4e00-\u9fa5]/g // 判断是不是中文
      return reg.test(str)
    },
    noChinese: function (str) {
      var reg = /[^\u4e00-\u9fa5]/g // 判断不是中文
      return reg.test(str)
    },
    decimalNumber: function (str) {
      var reg = /^\d+(\.\d+)+$/ // 判断带小数的数字
      return reg.test(new Number(str))
    },
    ip: function (str) {
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/
      return reg.test(str)
    }
  }

  // 暴露给window
  window['Bee'] = Bee
})();

// 区域
(function () {
  var BEE_AREAS = {
    110000: '北京市',
    110100: '市辖区',
    110101: '东城区',
    110102: '西城区',
    110103: '崇文区',
    110104: '宣武区',
    110105: '朝阳区',
    110106: '丰台区',
    110107: '石景山区',
    110108: '海淀区',
    110109: '门头沟区',
    110111: '房山区',
    110112: '通州区',
    110113: '顺义区',
    110114: '昌平区',
    110115: '大兴区',
    110116: '怀柔区',
    110117: '平谷区',
    110200: '市辖县',
    110228: '密云县',
    110229: '延庆县',
    120000: '天津市',
    120100: '市辖区',
    120101: '和平区',
    120102: '河东区',
    120103: '河西区',
    120104: '南开区',
    120105: '河北区',
    120106: '红桥区',
    120107: '塘沽区',
    120108: '汉沽区',
    120109: '大港区',
    120110: '东丽区',
    120111: '西青区',
    120112: '津南区',
    120113: '北辰区',
    120114: '武清区',
    120115: '宝坻区',
    120200: '县',
    120221: '宁河县',
    120223: '静海县',
    120225: '蓟县',
    130000: '河北省',
    130100: '石家庄市',
    130101: '市辖区',
    130102: '长安区',
    130103: '桥东区',
    130104: '桥西区',
    130105: '新华区',
    130107: '井陉矿区',
    130108: '裕华区',
    130121: '井陉县',
    130123: '正定县',
    130124: '栾城县',
    130125: '行唐县',
    130126: '灵寿县',
    130127: '高邑县',
    130128: '深泽县',
    130129: '赞皇县',
    130130: '无极县',
    130131: '平山县',
    130132: '元氏县',
    130133: '赵县',
    130181: '辛集市',
    130182: '藁城市',
    130183: '晋州市',
    130184: '新乐市',
    130185: '鹿泉市',
    130200: '唐山市',
    130201: '市辖区',
    130202: '路南区',
    130203: '路北区',
    130204: '古冶区',
    130205: '开平区',
    130207: '丰南区',
    130208: '丰润区',
    130223: '滦县',
    130224: '滦南县',
    130225: '乐亭县',
    130227: '迁西县',
    130229: '玉田县',
    130230: '唐海县',
    130281: '遵化市',
    130283: '迁安市',
    130300: '秦皇岛市',
    130301: '市辖区',
    130302: '海港区',
    130303: '山海关区',
    130304: '北戴河区',
    130321: '青龙满族自治县',
    130322: '昌黎县',
    130323: '抚宁县',
    130324: '卢龙县',
    130400: '邯郸市',
    130401: '市辖区',
    130402: '邯山区',
    130403: '丛台区',
    130404: '复兴区',
    130406: '峰峰矿区',
    130421: '邯郸县',
    130423: '临漳县',
    130424: '成安县',
    130425: '大名县',
    130426: '涉县',
    130427: '磁县',
    130428: '肥乡县',
    130429: '永年县',
    130430: '邱县',
    130431: '鸡泽县',
    130432: '广平县',
    130433: '馆陶县',
    130434: '魏县',
    130435: '曲周县',
    130481: '武安市',
    130500: '邢台市',
    130501: '市辖区',
    130502: '桥东区',
    130503: '桥西区',
    130521: '邢台县',
    130522: '临城县',
    130523: '内丘县',
    130524: '柏乡县',
    130525: '隆尧县',
    130526: '任县',
    130527: '南和县',
    130528: '宁晋县',
    130529: '巨鹿县',
    130530: '新河县',
    130531: '广宗县',
    130532: '平乡县',
    130533: '威县',
    130534: '清河县',
    130535: '临西县',
    130581: '南宫市',
    130582: '沙河市',
    130600: '保定市',
    130601: '市辖区',
    130602: '新市区',
    130603: '北市区',
    130604: '南市区',
    130621: '满城县',
    130622: '清苑县',
    130623: '涞水县',
    130624: '阜平县',
    130625: '徐水县',
    130626: '定兴县',
    130627: '唐县',
    130628: '高阳县',
    130629: '容城县',
    130630: '涞源县',
    130631: '望都县',
    130632: '安新县',
    130634: '曲阳县',
    130635: '蠡县',
    130636: '顺平县',
    130637: '博野县',
    130638: '雄县',
    130681: '涿州市',
    130682: '定州市',
    130683: '安国市',
    130684: '高碑店市',
    130700: '张家口市',
    130701: '市辖区',
    130702: '桥东区',
    130703: '桥西区',
    130705: '宣化区',
    130706: '下花园区',
    130721: '宣化县',
    130722: '张北县',
    130723: '康保县',
    130724: '沽源县',
    130725: '尚义县',
    130726: '蔚县',
    130727: '阳原县',
    130728: '怀安县',
    130729: '万全县',
    130730: '怀来县',
    130731: '涿鹿县',
    130732: '赤城县',
    130733: '崇礼县',
    130800: '承德市',
    130801: '市辖区',
    130802: '双桥区',
    130803: '双滦区',
    130804: '鹰手营子矿区',
    130821: '承德县',
    130822: '兴隆县',
    130823: '平泉县',
    130824: '滦平县',
    130825: '隆化县',
    130826: '丰宁满族自治县',
    130827: '宽城满族自治县',
    130828: '围场满族蒙古族自治县',
    130900: '沧州市',
    130901: '市辖区',
    130902: '新华区',
    130903: '运河区',
    130921: '沧县',
    130922: '青县',
    130923: '东光县',
    130924: '海兴县',
    130925: '盐山县',
    130926: '肃宁县',
    130927: '南皮县',
    130928: '吴桥县',
    130929: '献县',
    130930: '孟村回族自治县',
    130981: '泊头市',
    130982: '任丘市',
    130983: '黄骅市',
    130984: '河间市',
    131000: '廊坊市',
    131001: '市辖区',
    131002: '安次区',
    131003: '广阳区',
    131022: '固安县',
    131023: '永清县',
    131024: '香河县',
    131025: '大城县',
    131026: '文安县',
    131028: '大厂回族自治县',
    131081: '霸州市',
    131082: '三河市',
    131100: '衡水市',
    131101: '市辖区',
    131102: '桃城区',
    131121: '枣强县',
    131122: '武邑县',
    131123: '武强县',
    131124: '饶阳县',
    131125: '安平县',
    131126: '故城县',
    131127: '景县',
    131128: '阜城县',
    131181: '冀州市',
    131182: '深州市',
    140000: '山西省',
    140100: '太原市',
    140101: '市辖区',
    140105: '小店区',
    140106: '迎泽区',
    140107: '杏花岭区',
    140108: '尖草坪区',
    140109: '万柏林区',
    140110: '晋源区',
    140121: '清徐县',
    140122: '阳曲县',
    140123: '娄烦县',
    140181: '古交市',
    140200: '大同市',
    140201: '市辖区',
    140202: '城区',
    140203: '矿区',
    140211: '南郊区',
    140212: '新荣区',
    140221: '阳高县',
    140222: '天镇县',
    140223: '广灵县',
    140224: '灵丘县',
    140225: '浑源县',
    140226: '左云县',
    140227: '大同县',
    140300: '阳泉市',
    140301: '市辖区',
    140302: '城区',
    140303: '矿区',
    140311: '郊区',
    140321: '平定县',
    140322: '盂县',
    140400: '长治市',
    140401: '市辖区',
    140402: '城区',
    140411: '郊区',
    140421: '长治县',
    140423: '襄垣县',
    140424: '屯留县',
    140425: '平顺县',
    140426: '黎城县',
    140427: '壶关县',
    140428: '长子县',
    140429: '武乡县',
    140430: '沁县',
    140431: '沁源县',
    140481: '潞城市',
    140500: '晋城市',
    140501: '市辖区',
    140502: '城区',
    140521: '沁水县',
    140522: '阳城县',
    140524: '陵川县',
    140525: '泽州县',
    140581: '高平市',
    140600: '朔州市',
    140601: '市辖区',
    140602: '朔城区',
    140603: '平鲁区',
    140621: '山阴县',
    140622: '应县',
    140623: '右玉县',
    140624: '怀仁县',
    140700: '晋中市',
    140701: '市辖区',
    140702: '榆次区',
    140721: '榆社县',
    140722: '左权县',
    140723: '和顺县',
    140724: '昔阳县',
    140725: '寿阳县',
    140726: '太谷县',
    140727: '祁县',
    140728: '平遥县',
    140729: '灵石县',
    140781: '介休市',
    140800: '运城市',
    140801: '市辖区',
    140802: '盐湖区',
    140821: '临猗县',
    140822: '万荣县',
    140823: '闻喜县',
    140824: '稷山县',
    140825: '新绛县',
    140826: '绛县',
    140827: '垣曲县',
    140828: '夏县',
    140829: '平陆县',
    140830: '芮城县',
    140881: '永济市',
    140882: '河津市',
    140900: '忻州市',
    140901: '市辖区',
    140902: '忻府区',
    140921: '定襄县',
    140922: '五台县',
    140923: '代县',
    140924: '繁峙县',
    140925: '宁武县',
    140926: '静乐县',
    140927: '神池县',
    140928: '五寨县',
    140929: '岢岚县',
    140930: '河曲县',
    140931: '保德县',
    140932: '偏关县',
    140981: '原平市',
    141000: '临汾市',
    141001: '市辖区',
    141002: '尧都区',
    141021: '曲沃县',
    141022: '翼城县',
    141023: '襄汾县',
    141024: '洪洞县',
    141025: '古县',
    141026: '安泽县',
    141027: '浮山县',
    141028: '吉县',
    141029: '乡宁县',
    141030: '大宁县',
    141031: '隰县',
    141032: '永和县',
    141033: '蒲县',
    141034: '汾西县',
    141081: '侯马市',
    141082: '霍州市',
    141100: '吕梁市',
    141101: '市辖区',
    141102: '离石区',
    141121: '文水县',
    141122: '交城县',
    141123: '兴县',
    141124: '临县',
    141125: '柳林县',
    141126: '石楼县',
    141127: '岚县',
    141128: '方山县',
    141129: '中阳县',
    141130: '交口县',
    141181: '孝义市',
    141182: '汾阳市',
    150000: '内蒙古自治区',
    150100: '呼和浩特市',
    150101: '市辖区',
    150102: '新城区',
    150103: '回民区',
    150104: '玉泉区',
    150105: '赛罕区',
    150121: '土默特左旗',
    150122: '托克托县',
    150123: '和林格尔县',
    150124: '清水河县',
    150125: '武川县',
    150200: '包头市',
    150201: '市辖区',
    150202: '东河区',
    150203: '昆都仑区',
    150204: '青山区',
    150205: '石拐区',
    150206: '白云矿区',
    150207: '九原区',
    150221: '土默特右旗合旗',
    150222: '固阳县',
    150223: '达尔罕茂明安联',
    150300: '乌海市',
    150301: '市辖区',
    150302: '海勃湾区',
    150303: '海南区',
    150304: '乌达区',
    150400: '赤峰市',
    150401: '市辖区',
    150402: '红山区',
    150403: '元宝山区',
    150404: '松山区',
    150421: '阿鲁科尔沁旗',
    150422: '巴林左旗',
    150423: '巴林右旗',
    150424: '林西县',
    150425: '克什克腾旗',
    150426: '翁牛特旗',
    150428: '喀喇沁旗',
    150429: '宁城县',
    150430: '敖汉旗',
    150500: '通辽市',
    150501: '市辖区',
    150502: '科尔沁区',
    150521: '科尔沁左翼中旗',
    150522: '科尔沁左翼后旗',
    150523: '开鲁县',
    150524: '库伦旗',
    150525: '奈曼旗',
    150526: '扎鲁特旗',
    150581: '霍林郭勒市',
    150600: '鄂尔多斯市',
    150602: '东胜区',
    150621: '达拉特旗',
    150622: '准格尔旗',
    150623: '鄂托克前旗',
    150624: '鄂托克旗',
    150625: '杭锦旗',
    150626: '乌审旗',
    150627: '伊金霍洛旗',
    150700: '呼伦贝尔市',
    150701: '市辖区',
    150702: '海拉尔区族自治旗',
    150721: '阿荣旗',
    150722: '莫力达瓦达斡尔',
    150723: '鄂伦春自治旗',
    150724: '鄂温克族自治旗',
    150725: '陈巴尔虎旗',
    150726: '新巴尔虎左旗',
    150727: '新巴尔虎右旗',
    150781: '满洲里市',
    150782: '牙克石市',
    150783: '扎兰屯市',
    150784: '额尔古纳市',
    150785: '根河市',
    150800: '巴彦淖尔市',
    150801: '市辖区',
    150802: '临河区',
    150821: '五原县',
    150822: '磴口县',
    150823: '乌拉特前旗',
    150824: '乌拉特中旗',
    150825: '乌拉特后旗',
    150826: '杭锦后旗',
    150900: '乌兰察布市',
    150901: '市辖区',
    150902: '集宁区',
    150921: '卓资县',
    150922: '化德县',
    150923: '商都县',
    150924: '兴和县',
    150925: '凉城县',
    150926: '察哈尔右翼前',
    150927: '察哈尔右翼中旗',
    150928: '察哈尔右翼后',
    150929: '四子王旗',
    150981: '丰镇市',
    152200: '兴安盟',
    152201: '乌兰浩特市',
    152202: '阿尔山市',
    152221: '科尔沁右翼前旗',
    152222: '科尔沁右翼中旗',
    152223: '扎赉特旗',
    152224: '突泉县',
    152500: '锡林郭勒盟',
    152501: '二连浩特市',
    152502: '锡林浩特市',
    152522: '阿巴嘎旗',
    152523: '苏尼特左旗',
    152524: '苏尼特右旗',
    152525: '东乌珠穆沁旗',
    152526: '西乌珠穆沁旗',
    152527: '太仆寺旗',
    152528: '镶黄旗',
    152529: '正镶白旗',
    152530: '正蓝旗',
    152531: '多伦县',
    152600: '乌兰察布盟',
    152900: '阿拉善盟',
    152921: '阿拉善左旗',
    152922: '阿拉善右旗',
    152923: '额济纳旗',
    210000: '辽宁省',
    210100: '沈阳市',
    210101: '市辖区',
    210102: '和平区',
    210103: '沈河区',
    210104: '大东区',
    210105: '皇姑区',
    210106: '铁西区',
    210111: '苏家屯区',
    210112: '东陵区',
    210113: '新城子区',
    210114: '于洪区',
    210122: '辽中县',
    210123: '康平县',
    210124: '法库县',
    210181: '新民市',
    210200: '大连市',
    210201: '市辖区',
    210202: '中山区',
    210203: '西岗区',
    210204: '沙河口区',
    210211: '甘井子区',
    210212: '旅顺口区',
    210213: '金州区',
    210224: '长海县',
    210281: '瓦房店市',
    210282: '普兰店市',
    210283: '庄河市',
    210300: '鞍山市',
    210301: '市辖区',
    210302: '铁东区',
    210303: '铁西区',
    210304: '立山区',
    210311: '千山区',
    210321: '台安县',
    210323: '岫岩满族自治县',
    210381: '海城市',
    210400: '抚顺市',
    210401: '市辖区',
    210402: '新抚区',
    210403: '东洲区',
    210404: '望花区',
    210411: '顺城区',
    210421: '抚顺县',
    210422: '新宾满族自治县',
    210423: '清原满族自治县',
    210500: '本溪市',
    210501: '市辖区',
    210502: '平山区',
    210503: '溪湖区',
    210504: '明山区',
    210505: '南芬区',
    210521: '本溪满族自治县',
    210522: '桓仁满族自治县',
    210600: '丹东市',
    210601: '市辖区',
    210602: '元宝区',
    210603: '振兴区',
    210604: '振安区',
    210624: '宽甸满族自治县',
    210681: '东港市',
    210682: '凤城市',
    210700: '锦州市',
    210701: '市辖区',
    210702: '古塔区',
    210703: '凌河区',
    210711: '太和区',
    210726: '黑山县',
    210727: '义县',
    210781: '凌海市',
    210782: '北宁市',
    210800: '营口市',
    210801: '市辖区',
    210802: '站前区',
    210803: '西市区',
    210804: '鲅鱼圈区',
    210811: '老边区',
    210881: '盖州市',
    210882: '大石桥市',
    210900: '阜新市',
    210901: '市辖区',
    210902: '海州区',
    210903: '新邱区',
    210904: '太平区',
    210905: '清河门区',
    210911: '细河区',
    210921: '阜新蒙古族自治县',
    210922: '彰武县',
    211000: '辽阳市',
    211001: '市辖区',
    211002: '白塔区',
    211003: '文圣区',
    211004: '宏伟区',
    211005: '弓长岭区',
    211011: '太子河区',
    211021: '辽阳县',
    211081: '灯塔市',
    211100: '盘锦市',
    211101: '市辖区',
    211102: '双台子区',
    211103: '兴隆台区',
    211121: '大洼县',
    211122: '盘山县',
    211200: '铁岭市',
    211201: '市辖区',
    211202: '银州区',
    211204: '清河区',
    211221: '铁岭县',
    211223: '西丰县',
    211224: '昌图县',
    211281: '调兵山市',
    211282: '开原市',
    211300: '朝阳市',
    211301: '市辖区',
    211302: '双塔区',
    211303: '龙城区',
    211321: '朝阳县',
    211322: '建平县',
    211324: '喀喇沁左翼蒙古族自治县',
    211381: '北票市',
    211382: '凌源市',
    211400: '葫芦岛市',
    211401: '市辖区',
    211402: '连山区',
    211403: '龙港区',
    211404: '南票区',
    211421: '绥中县',
    211422: '建昌县',
    211481: '兴城市',
    220000: '吉林省',
    220100: '长春市',
    220101: '市辖区',
    220102: '南关区',
    220103: '宽城区',
    220104: '朝阳区',
    220105: '二道区',
    220106: '绿园区',
    220112: '双阳区',
    220122: '农安县',
    220181: '九台市',
    220182: '榆树市',
    220183: '德惠市',
    220200: '吉林市',
    220201: '市辖区',
    220202: '昌邑区',
    220203: '龙潭区',
    220204: '船营区',
    220211: '丰满区',
    220221: '永吉县',
    220281: '蛟河市',
    220282: '桦甸市',
    220283: '舒兰市',
    220284: '磐石市',
    220300: '四平市',
    220301: '市辖区',
    220302: '铁西区',
    220303: '铁东区',
    220322: '梨树县',
    220323: '伊通满族自治县',
    220381: '公主岭市',
    220382: '双辽市',
    220400: '辽源市',
    220401: '市辖区',
    220402: '龙山区',
    220403: '西安区',
    220421: '东丰县',
    220422: '东辽县',
    220500: '通化市',
    220501: '市辖区',
    220502: '东昌区',
    220503: '二道江区',
    220521: '通化县',
    220523: '辉南县',
    220524: '柳河县',
    220581: '梅河口市',
    220582: '集安市',
    220600: '白山市',
    220601: '市辖区',
    220602: '八道江区',
    220621: '抚松县',
    220622: '靖宇县',
    220623: '长白朝鲜族自治县',
    220625: '江源县',
    220681: '临江市',
    220700: '松原市',
    220701: '市辖区',
    220702: '宁江区',
    220721: '前郭尔罗斯蒙古族自治县',
    220722: '长岭县',
    220723: '乾安县',
    220724: '扶余县',
    220800: '白城市',
    220801: '市辖区',
    220802: '洮北区',
    220821: '镇赉县',
    220822: '通榆县',
    220881: '洮南市',
    220882: '大安市',
    222400: '延边朝鲜族自治州',
    222401: '延吉市',
    222402: '图们市',
    222403: '敦化市',
    222404: '珲春市',
    222405: '龙井市',
    222406: '和龙市',
    222424: '汪清县',
    222426: '安图县',
    230000: '黑龙江省',
    230100: '哈尔滨市',
    230101: '市辖区',
    230102: '道里区',
    230103: '南岗区',
    230104: '道外区',
    230105: '太平区',
    230106: '香坊区',
    230107: '动力区',
    230108: '平房区',
    230121: '呼兰县',
    230123: '依兰县',
    230124: '方正县',
    230125: '宾县',
    230126: '巴彦县',
    230127: '木兰县',
    230128: '通河县',
    230129: '延寿县',
    230181: '阿城市',
    230182: '双城市',
    230183: '尚志市',
    230184: '五常市',
    230200: '齐齐哈尔市',
    230201: '市辖区',
    230202: '龙沙区',
    230203: '建华区',
    230204: '铁锋区',
    230205: '昂昂溪区',
    230206: '富拉尔基区',
    230207: '碾子山区',
    230208: '梅里斯达斡尔族区',
    230221: '龙江县',
    230223: '依安县',
    230224: '泰来县',
    230225: '甘南县',
    230227: '富裕县',
    230229: '克山县',
    230230: '克东县',
    230231: '拜泉县',
    230281: '讷河市',
    230300: '鸡西市',
    230301: '市辖区',
    230302: '鸡冠区',
    230303: '恒山区',
    230304: '滴道区',
    230305: '梨树区',
    230306: '城子河区',
    230307: '麻山区',
    230321: '鸡东县',
    230381: '虎林市',
    230382: '密山市',
    230400: '鹤岗市',
    230401: '市辖区',
    230402: '向阳区',
    230403: '工农区',
    230404: '南山区',
    230405: '兴安区',
    230406: '东山区',
    230407: '兴山区',
    230421: '萝北县',
    230422: '绥滨县',
    230500: '双鸭山市',
    230501: '市辖区',
    230502: '尖山区',
    230503: '岭东区',
    230505: '四方台区',
    230506: '宝山区',
    230521: '集贤县',
    230522: '友谊县',
    230523: '宝清县',
    230524: '饶河县',
    230600: '大庆市',
    230601: '市辖区',
    230602: '萨尔图区',
    230603: '龙凤区',
    230604: '让胡路区',
    230605: '红岗区',
    230606: '大同区',
    230621: '肇州县',
    230622: '肇源县',
    230623: '林甸县',
    230624: '杜尔伯特蒙古族自治县',
    230700: '伊春市',
    230701: '市辖区',
    230702: '伊春区',
    230703: '南岔区',
    230704: '友好区',
    230705: '西林区',
    230706: '翠峦区',
    230707: '新青区',
    230708: '美溪区',
    230709: '金山屯区',
    230710: '五营区',
    230711: '乌马河区',
    230712: '汤旺河区',
    230713: '带岭区',
    230714: '乌伊岭区',
    230715: '红星区',
    230716: '上甘岭区',
    230722: '嘉荫县',
    230781: '铁力市',
    230800: '佳木斯市',
    230801: '市辖区',
    230802: '永红区',
    230803: '向阳区',
    230804: '前进区',
    230805: '东风区',
    230811: '郊区',
    230822: '桦南县',
    230826: '桦川县',
    230828: '汤原县',
    230833: '抚远县',
    230881: '同江市',
    230882: '富锦市',
    230900: '七台河市',
    230901: '市辖区',
    230902: '新兴区',
    230903: '桃山区',
    230904: '茄子河区',
    230921: '勃利县',
    231000: '牡丹江市',
    231001: '市辖区',
    231002: '东安区',
    231003: '阳明区',
    231004: '爱民区',
    231005: '西安区',
    231024: '东宁县',
    231025: '林口县',
    231081: '绥芬河市',
    231083: '海林市',
    231084: '宁安市',
    231085: '穆棱市',
    231100: '黑河市',
    231101: '市辖区',
    231102: '爱辉区',
    231121: '嫩江县',
    231123: '逊克县',
    231124: '孙吴县',
    231181: '北安市',
    231182: '五大连池市',
    231200: '绥化市',
    231201: '市辖区',
    231202: '北林区',
    231221: '望奎县',
    231222: '兰西县',
    231223: '青冈县',
    231224: '庆安县',
    231225: '明水县',
    231226: '绥棱县',
    231281: '安达市',
    231282: '肇东市',
    231283: '海伦市',
    232700: '大兴安岭地区',
    232721: '呼玛县',
    232722: '塔河县',
    232723: '漠河县',
    310000: '上海市',
    310100: '市辖区',
    310101: '黄浦区',
    310103: '卢湾区',
    310104: '徐汇区',
    310105: '长宁区',
    310106: '静安区',
    310107: '普陀区',
    310108: '闸北区',
    310109: '虹口区',
    310110: '杨浦区',
    310112: '闵行区',
    310113: '宝山区',
    310114: '嘉定区',
    310115: '浦东新区',
    310116: '金山区',
    310117: '松江区',
    310118: '青浦区',
    310119: '南汇区',
    310120: '奉贤区',
    310200: '县',
    310230: '崇明县',
    320000: '江苏省',
    320100: '南京市',
    320101: '市辖区',
    320102: '玄武区',
    320103: '白下区',
    320104: '秦淮区',
    320105: '建邺区',
    320106: '鼓楼区',
    320107: '下关区',
    320111: '浦口区',
    320113: '栖霞区',
    320114: '雨花台区',
    320115: '江宁区',
    320116: '六合区',
    320124: '溧水县',
    320125: '高淳县',
    320200: '无锡市',
    320201: '市辖区',
    320202: '崇安区',
    320203: '南长区',
    320204: '北塘区',
    320205: '锡山区',
    320206: '惠山区',
    320211: '滨湖区',
    320281: '江阴市',
    320282: '宜兴市',
    320300: '徐州市',
    320301: '市辖区',
    320302: '鼓楼区',
    320303: '云龙区',
    320304: '九里区',
    320305: '贾汪区',
    320311: '泉山区',
    320321: '丰县',
    320322: '沛县',
    320323: '铜山县',
    320324: '睢宁县',
    320381: '新沂市',
    320382: '邳州市',
    320400: '常州市',
    320401: '市辖区',
    320402: '天宁区',
    320404: '钟楼区',
    320405: '戚墅堰区',
    320411: '新北区',
    320412: '武进区',
    320481: '溧阳市',
    320482: '金坛市',
    320500: '苏州市',
    320501: '市辖区',
    320502: '沧浪区',
    320503: '平江区',
    320504: '金阊区',
    320505: '虎丘区',
    320506: '吴中区',
    320507: '相城区',
    320581: '常熟市',
    320582: '张家港市',
    320583: '昆山市',
    320584: '吴江市',
    320585: '太仓市',
    320600: '南通市',
    320601: '市辖区',
    320602: '崇川区',
    320611: '港闸区',
    320621: '海安县',
    320623: '如东县',
    320681: '启东市',
    320682: '如皋市',
    320683: '通州市',
    320684: '海门市',
    320700: '连云港市',
    320701: '市辖区',
    320703: '连云区',
    320705: '新浦区',
    320706: '海州区',
    320721: '赣榆县',
    320722: '东海县',
    320723: '灌云县',
    320724: '灌南县',
    320800: '淮安市',
    320801: '市辖区',
    320802: '清河区',
    320803: '楚州区',
    320804: '淮阴区',
    320811: '清浦区',
    320826: '涟水县',
    320829: '洪泽县',
    320830: '盱眙县',
    320831: '金湖县',
    320900: '盐城市',
    320901: '市辖区',
    320902: '亭湖区',
    320903: '盐都区',
    320921: '响水县',
    320922: '滨海县',
    320923: '阜宁县',
    320924: '射阳县',
    320925: '建湖县',
    320981: '东台市',
    320982: '大丰市',
    321000: '扬州市',
    321001: '市辖区',
    321002: '广陵区',
    321003: '邗江区',
    321011: '郊区',
    321023: '宝应县',
    321081: '仪征市',
    321084: '高邮市',
    321088: '江都市',
    321100: '镇江市',
    321101: '市辖区',
    321102: '京口区',
    321111: '润州区',
    321112: '丹徒区',
    321181: '丹阳市',
    321182: '扬中市',
    321183: '句容市',
    321200: '泰州市',
    321201: '市辖区',
    321202: '海陵区',
    321203: '高港区',
    321281: '兴化市',
    321282: '靖江市',
    321283: '泰兴市',
    321284: '姜堰市',
    321300: '宿迁市',
    321301: '市辖区',
    321302: '宿城区',
    321321: '宿豫县',
    321322: '沭阳县',
    321323: '泗阳县',
    321324: '泗洪县',
    330000: '浙江省',
    330100: '杭州市',
    330101: '市辖区',
    330102: '上城区',
    330103: '下城区',
    330104: '江干区',
    330105: '拱墅区',
    330106: '西湖区',
    330108: '滨江区',
    330109: '萧山区',
    330110: '余杭区',
    330122: '桐庐县',
    330127: '淳安县',
    330182: '建德市',
    330183: '富阳市',
    330185: '临安市',
    330200: '宁波市',
    330201: '市辖区',
    330203: '海曙区',
    330204: '江东区',
    330205: '江北区',
    330206: '北仑区',
    330211: '镇海区',
    330212: '鄞州区',
    330225: '象山县',
    330226: '宁海县',
    330281: '余姚市',
    330282: '慈溪市',
    330283: '奉化市',
    330300: '温州市',
    330301: '市辖区',
    330302: '鹿城区',
    330303: '龙湾区',
    330304: '瓯海区',
    330322: '洞头县',
    330324: '永嘉县',
    330326: '平阳县',
    330327: '苍南县',
    330328: '文成县',
    330329: '泰顺县',
    330381: '瑞安市',
    330382: '乐清市',
    330400: '嘉兴市',
    330401: '市辖区',
    330402: '秀城区',
    330411: '秀洲区',
    330421: '嘉善县',
    330424: '海盐县',
    330481: '海宁市',
    330482: '平湖市',
    330483: '桐乡市',
    330500: '湖州市',
    330501: '市辖区',
    330502: '吴兴区',
    330503: '南浔区',
    330521: '德清县',
    330522: '长兴县',
    330523: '安吉县',
    330600: '绍兴市',
    330601: '市辖区',
    330602: '越城区',
    330621: '绍兴县',
    330624: '新昌县',
    330681: '诸暨市',
    330682: '上虞市',
    330683: '嵊州市',
    330700: '金华市',
    330701: '市辖区',
    330702: '婺城区',
    330703: '金东区',
    330723: '武义县',
    330726: '浦江县',
    330727: '磐安县',
    330781: '兰溪市',
    330782: '义乌市',
    330783: '东阳市',
    330784: '永康市',
    330800: '衢州市',
    330801: '市辖区',
    330802: '柯城区',
    330803: '衢江区',
    330822: '常山县',
    330824: '开化县',
    330825: '龙游县',
    330881: '江山市',
    330900: '舟山市',
    330901: '市辖区',
    330902: '定海区',
    330903: '普陀区',
    330921: '岱山县',
    330922: '嵊泗县',
    331000: '台州市',
    331001: '市辖区',
    331002: '椒江区',
    331003: '黄岩区',
    331004: '路桥区',
    331021: '玉环县',
    331022: '三门县',
    331023: '天台县',
    331024: '仙居县',
    331081: '温岭市',
    331082: '临海市',
    331100: '丽水市',
    331101: '市辖区',
    331102: '莲都区',
    331121: '青田县',
    331122: '缙云县',
    331123: '遂昌县',
    331124: '松阳县',
    331125: '云和县',
    331126: '庆元县',
    331127: '景宁畲族自治县',
    331181: '龙泉市',
    340000: '安徽省',
    340100: '合肥市',
    340101: '市辖区',
    340102: '瑶海区',
    340103: '庐阳区',
    340104: '蜀山区',
    340111: '包河区',
    340121: '长丰县',
    340122: '肥东县',
    340123: '肥西县',
    340200: '芜湖市',
    340201: '市辖区',
    340202: '镜湖区',
    340203: '马塘区',
    340204: '新芜区',
    340207: '鸠江区',
    340221: '芜湖县',
    340222: '繁昌县',
    340223: '南陵县',
    340300: '蚌埠市',
    340301: '市辖区',
    340302: '东市区',
    340303: '中市区',
    340304: '西市区',
    340311: '郊区',
    340321: '怀远县',
    340322: '五河县',
    340323: '固镇县',
    340400: '淮南市',
    340401: '市辖区',
    340402: '大通区',
    340403: '田家庵区',
    340404: '谢家集区',
    340405: '八公山区',
    340406: '潘集区',
    340421: '凤台县',
    340500: '马鞍山市',
    340501: '市辖区',
    340502: '金家庄区',
    340503: '花山区',
    340504: '雨山区',
    340521: '当涂县',
    340600: '淮北市',
    340601: '市辖区',
    340602: '杜集区',
    340603: '相山区',
    340604: '烈山区',
    340621: '濉溪县',
    340700: '铜陵市',
    340701: '市辖区',
    340702: '铜官山区',
    340703: '狮子山区',
    340711: '郊区',
    340721: '铜陵县',
    340800: '安庆市',
    340801: '市辖区',
    340802: '迎江区',
    340803: '大观区',
    340811: '郊区',
    340822: '怀宁县',
    340823: '枞阳县',
    340824: '潜山县',
    340825: '太湖县',
    340826: '宿松县',
    340827: '望江县',
    340828: '岳西县',
    340881: '桐城市',
    341000: '黄山市',
    341001: '市辖区',
    341002: '屯溪区',
    341003: '黄山区',
    341004: '徽州区',
    341021: '歙县',
    341022: '休宁县',
    341023: '黟县',
    341024: '祁门县',
    341100: '滁州市',
    341101: '市辖区',
    341102: '琅琊区',
    341103: '南谯区',
    341122: '来安县',
    341124: '全椒县',
    341125: '定远县',
    341126: '凤阳县',
    341181: '天长市',
    341182: '明光市',
    341200: '阜阳市',
    341201: '市辖区',
    341202: '颍州区',
    341203: '颍东区',
    341204: '颍泉区',
    341221: '临泉县',
    341222: '太和县',
    341225: '阜南县',
    341226: '颍上县',
    341282: '界首市',
    341300: '宿州市',
    341301: '市辖区',
    341302: '墉桥区',
    341321: '砀山县',
    341322: '萧县',
    341323: '灵璧县',
    341324: '泗县',
    341400: '巢湖市',
    341401: '市辖区',
    341402: '居巢区',
    341421: '庐江县',
    341422: '无为县',
    341423: '含山县',
    341424: '和县',
    341500: '六安市',
    341501: '市辖区',
    341502: '金安区',
    341503: '裕安区',
    341521: '寿县',
    341522: '霍邱县',
    341523: '舒城县',
    341524: '金寨县',
    341525: '霍山县',
    341600: '亳州市',
    341601: '市辖区',
    341602: '谯城区',
    341621: '涡阳县',
    341622: '蒙城县',
    341623: '利辛县',
    341700: '池州市',
    341701: '市辖区',
    341702: '贵池区',
    341721: '东至县',
    341722: '石台县',
    341723: '青阳县',
    341800: '宣城市',
    341801: '市辖区',
    341802: '宣州区',
    341821: '郎溪县',
    341822: '广德县',
    341823: '泾县',
    341824: '绩溪县',
    341825: '旌德县',
    341881: '宁国市',
    350000: '福建省',
    350100: '福州市',
    350101: '市辖区',
    350102: '鼓楼区',
    350103: '台江区',
    350104: '仓山区',
    350105: '马尾区',
    350111: '晋安区',
    350121: '闽侯县',
    350122: '连江县',
    350123: '罗源县',
    350124: '闽清县',
    350125: '永泰县',
    350128: '平潭县',
    350181: '福清市',
    350182: '长乐市',
    350200: '厦门市',
    350201: '市辖区',
    350203: '思明区',
    350205: '海沧区',
    350206: '湖里区',
    350211: '集美区',
    350212: '同安区',
    350213: '翔安区',
    350300: '莆田市',
    350301: '市辖区',
    350302: '城厢区',
    350303: '涵江区',
    350304: '荔城区',
    350305: '秀屿区',
    350322: '仙游县',
    350400: '三明市',
    350401: '市辖区',
    350402: '梅列区',
    350403: '三元区',
    350421: '明溪县',
    350423: '清流县',
    350424: '宁化县',
    350425: '大田县',
    350426: '尤溪县',
    350427: '沙县',
    350428: '将乐县',
    350429: '泰宁县',
    350430: '建宁县',
    350481: '永安市',
    350500: '泉州市',
    350501: '市辖区',
    350502: '鲤城区',
    350503: '丰泽区',
    350504: '洛江区',
    350505: '泉港区',
    350521: '惠安县',
    350524: '安溪县',
    350525: '永春县',
    350526: '德化县',
    350527: '金门县',
    350581: '石狮市',
    350582: '晋江市',
    350583: '南安市',
    350600: '漳州市',
    350601: '市辖区',
    350602: '芗城区',
    350603: '龙文区',
    350622: '云霄县',
    350623: '漳浦县',
    350624: '诏安县',
    350625: '长泰县',
    350626: '东山县',
    350627: '南靖县',
    350628: '平和县',
    350629: '华安县',
    350681: '龙海市',
    350700: '南平市',
    350701: '市辖区',
    350702: '延平区',
    350721: '顺昌县',
    350722: '浦城县',
    350723: '光泽县',
    350724: '松溪县',
    350725: '政和县',
    350781: '邵武市',
    350782: '武夷山市',
    350783: '建瓯市',
    350784: '建阳市',
    350800: '龙岩市',
    350801: '市辖区',
    350802: '新罗区',
    350821: '长汀县',
    350822: '永定县',
    350823: '上杭县',
    350824: '武平县',
    350825: '连城县',
    350881: '漳平市',
    350900: '宁德市',
    350901: '市辖区',
    350902: '蕉城区',
    350921: '霞浦县',
    350922: '古田县',
    350923: '屏南县',
    350924: '寿宁县',
    350925: '周宁县',
    350926: '柘荣县',
    350981: '福安市',
    350982: '福鼎市',
    360000: '江西省',
    360100: '南昌市',
    360101: '市辖区',
    360102: '东湖区',
    360103: '西湖区',
    360104: '青云谱区',
    360105: '湾里区',
    360111: '青山湖区',
    360121: '南昌县',
    360122: '新建县',
    360123: '安义县',
    360124: '进贤县',
    360200: '景德镇市',
    360201: '市辖区',
    360202: '昌江区',
    360203: '珠山区',
    360222: '浮梁县',
    360281: '乐平市',
    360300: '萍乡市',
    360301: '市辖区',
    360302: '安源区',
    360313: '湘东区',
    360321: '莲花县',
    360322: '上栗县',
    360323: '芦溪县',
    360400: '九江市',
    360401: '市辖区',
    360402: '庐山区',
    360403: '浔阳区',
    360421: '九江县',
    360423: '武宁县',
    360424: '修水县',
    360425: '永修县',
    360426: '德安县',
    360427: '星子县',
    360428: '都昌县',
    360429: '湖口县',
    360430: '彭泽县',
    360481: '瑞昌市',
    360500: '新余市',
    360501: '市辖区',
    360502: '渝水区',
    360521: '分宜县',
    360600: '鹰潭市',
    360601: '市辖区',
    360602: '月湖区',
    360622: '余江县',
    360681: '贵溪市',
    360700: '赣州市',
    360701: '市辖区',
    360702: '章贡区',
    360721: '赣县',
    360722: '信丰县',
    360723: '大余县',
    360724: '上犹县',
    360725: '崇义县',
    360726: '安远县',
    360727: '龙南县',
    360728: '定南县',
    360729: '全南县',
    360730: '宁都县',
    360731: '于都县',
    360732: '兴国县',
    360733: '会昌县',
    360734: '寻乌县',
    360735: '石城县',
    360781: '瑞金市',
    360782: '南康市',
    360800: '吉安市',
    360801: '市辖区',
    360802: '吉州区',
    360803: '青原区',
    360821: '吉安县',
    360822: '吉水县',
    360823: '峡江县',
    360824: '新干县',
    360825: '永丰县',
    360826: '泰和县',
    360827: '遂川县',
    360828: '万安县',
    360829: '安福县',
    360830: '永新县',
    360881: '井冈山市',
    360900: '宜春市',
    360901: '市辖区',
    360902: '袁州区',
    360921: '奉新县',
    360922: '万载县',
    360923: '上高县',
    360924: '宜丰县',
    360925: '靖安县',
    360926: '铜鼓县',
    360981: '丰城市',
    360982: '樟树市',
    360983: '高安市',
    361000: '抚州市',
    361001: '市辖区',
    361002: '临川区',
    361021: '南城县',
    361022: '黎川县',
    361023: '南丰县',
    361024: '崇仁县',
    361025: '乐安县',
    361026: '宜黄县',
    361027: '金溪县',
    361028: '资溪县',
    361029: '东乡县',
    361030: '广昌县',
    361100: '上饶市',
    361101: '市辖区',
    361102: '信州区',
    361121: '上饶县',
    361122: '广丰县',
    361123: '玉山县',
    361124: '铅山县',
    361125: '横峰县',
    361126: '弋阳县',
    361127: '余干县',
    361128: '鄱阳县',
    361129: '万年县',
    361130: '婺源县',
    361181: '德兴市',
    370000: '山东省',
    370100: '济南市',
    370101: '市辖区',
    370102: '历下区',
    370103: '市中区',
    370104: '槐荫区',
    370105: '天桥区',
    370112: '历城区',
    370113: '长清区',
    370124: '平阴县',
    370125: '济阳县',
    370126: '商河县',
    370181: '章丘市',
    370200: '青岛市',
    370201: '市辖区',
    370202: '市南区',
    370203: '市北区',
    370205: '四方区',
    370211: '黄岛区',
    370212: '崂山区',
    370213: '李沧区',
    370214: '城阳区',
    370281: '胶州市',
    370282: '即墨市',
    370283: '平度市',
    370284: '胶南市',
    370285: '莱西市',
    370300: '淄博市',
    370301: '市辖区',
    370302: '淄川区',
    370303: '张店区',
    370304: '博山区',
    370305: '临淄区',
    370306: '周村区',
    370321: '桓台县',
    370322: '高青县',
    370323: '沂源县',
    370400: '枣庄市',
    370401: '市辖区',
    370402: '市中区',
    370403: '薛城区',
    370404: '峄城区',
    370405: '台儿庄区',
    370406: '山亭区',
    370481: '滕州市',
    370500: '东营市',
    370501: '市辖区',
    370502: '东营区',
    370503: '河口区',
    370521: '垦利县',
    370522: '利津县',
    370523: '广饶县',
    370600: '烟台市',
    370601: '市辖区',
    370602: '芝罘区',
    370611: '福山区',
    370612: '牟平区',
    370613: '莱山区',
    370634: '长岛县',
    370681: '龙口市',
    370682: '莱阳市',
    370683: '莱州市',
    370684: '蓬莱市',
    370685: '招远市',
    370686: '栖霞市',
    370687: '海阳市',
    370700: '潍坊市',
    370701: '市辖区',
    370702: '潍城区',
    370703: '寒亭区',
    370704: '坊子区',
    370705: '奎文区',
    370724: '临朐县',
    370725: '昌乐县',
    370781: '青州市',
    370782: '诸城市',
    370783: '寿光市',
    370784: '安丘市',
    370785: '高密市',
    370786: '昌邑市',
    370800: '济宁市',
    370801: '市辖区',
    370802: '市中区',
    370811: '任城区',
    370826: '微山县',
    370827: '鱼台县',
    370828: '金乡县',
    370829: '嘉祥县',
    370830: '汶上县',
    370831: '泗水县',
    370832: '梁山县',
    370881: '曲阜市',
    370882: '兖州市',
    370883: '邹城市',
    370900: '泰安市',
    370901: '市辖区',
    370902: '泰山区',
    370903: '岱岳区',
    370921: '宁阳县',
    370923: '东平县',
    370982: '新泰市',
    370983: '肥城市',
    371000: '威海市',
    371001: '市辖区',
    371002: '环翠区',
    371081: '文登市',
    371082: '荣成市',
    371083: '乳山市',
    371100: '日照市',
    371101: '市辖区',
    371102: '东港区',
    371121: '五莲县',
    371122: '莒县',
    371200: '莱芜市',
    371201: '市辖区',
    371202: '莱城区',
    371203: '钢城区',
    371300: '临沂市',
    371301: '市辖区',
    371302: '兰山区',
    371311: '罗庄区',
    371312: '河东区',
    371321: '沂南县',
    371322: '郯城县',
    371323: '沂水县',
    371324: '苍山县',
    371325: '费县',
    371326: '平邑县',
    371327: '莒南县',
    371328: '蒙阴县',
    371329: '临沭县',
    371400: '德州市',
    371401: '市辖区',
    371402: '德城区',
    371421: '陵县',
    371422: '宁津县',
    371423: '庆云县',
    371424: '临邑县',
    371425: '齐河县',
    371426: '平原县',
    371427: '夏津县',
    371428: '武城县',
    371481: '乐陵市',
    371482: '禹城市',
    371500: '聊城市',
    371501: '市辖区',
    371502: '东昌府区',
    371521: '阳谷县',
    371522: '莘县',
    371523: '茌平县',
    371524: '东阿县',
    371525: '冠县',
    371526: '高唐县',
    371581: '临清市',
    371600: '滨州市',
    371601: '市辖区',
    371602: '滨城区',
    371621: '惠民县',
    371622: '阳信县',
    371623: '无棣县',
    371624: '沾化县',
    371625: '博兴县',
    371626: '邹平县',
    371700: '荷泽市',
    371701: '市辖区',
    371702: '牡丹区',
    371721: '曹县',
    371722: '单县',
    371723: '成武县',
    371724: '巨野县',
    371725: '郓城县',
    371726: '鄄城县',
    371727: '定陶县',
    371728: '东明县',
    410000: '河南省',
    410100: '郑州市',
    410101: '市辖区',
    410102: '中原区',
    410103: '二七区',
    410104: '管城回族区',
    410105: '金水区',
    410106: '上街区',
    410108: '邙山区',
    410122: '中牟县',
    410181: '巩义市',
    410182: '荥阳市',
    410183: '新密市',
    410184: '新郑市',
    410185: '登封市',
    410200: '开封市',
    410201: '市辖区',
    410202: '龙亭区',
    410203: '顺河回族区',
    410204: '鼓楼区',
    410205: '南关区',
    410211: '郊区',
    410221: '杞县',
    410222: '通许县',
    410223: '尉氏县',
    410224: '开封县',
    410225: '兰考县',
    410300: '洛阳市',
    410301: '市辖区',
    410302: '老城区',
    410303: '西工区',
    410304: '廛河回族区',
    410305: '涧西区',
    410306: '吉利区',
    410307: '洛龙区',
    410322: '孟津县',
    410323: '新安县',
    410324: '栾川县',
    410325: '嵩县',
    410326: '汝阳县',
    410327: '宜阳县',
    410328: '洛宁县',
    410329: '伊川县',
    410381: '偃师市',
    410400: '平顶山市',
    410401: '市辖区',
    410402: '新华区',
    410403: '卫东区',
    410404: '石龙区',
    410411: '湛河区',
    410421: '宝丰县',
    410422: '叶县',
    410423: '鲁山县',
    410425: '郏县',
    410481: '舞钢市',
    410482: '汝州市',
    410500: '安阳市',
    410501: '市辖区',
    410502: '文峰区',
    410503: '北关区',
    410505: '殷都区',
    410506: '龙安区',
    410522: '安阳县',
    410523: '汤阴县',
    410526: '滑县',
    410527: '内黄县',
    410581: '林州市',
    410600: '鹤壁市',
    410601: '市辖区',
    410602: '鹤山区',
    410603: '山城区',
    410611: '淇滨区',
    410621: '浚县',
    410622: '淇县',
    410700: '新乡市',
    410701: '市辖区',
    410702: '红旗区',
    410703: '卫滨区',
    410704: '凤泉区',
    410711: '牧野区',
    410721: '新乡县',
    410724: '获嘉县',
    410725: '原阳县',
    410726: '延津县',
    410727: '封丘县',
    410728: '长垣县',
    410781: '卫辉市',
    410782: '辉县市',
    410800: '焦作市',
    410801: '市辖区',
    410802: '解放区',
    410803: '中站区',
    410804: '马村区',
    410811: '山阳区',
    410821: '修武县',
    410822: '博爱县',
    410823: '武陟县',
    410825: '温县',
    410881: '济源市',
    410882: '沁阳市',
    410883: '孟州市',
    410900: '濮阳市',
    410901: '市辖区',
    410902: '华龙区',
    410922: '清丰县',
    410923: '南乐县',
    410926: '范县',
    410927: '台前县',
    410928: '濮阳县',
    411000: '许昌市',
    411001: '市辖区',
    411002: '魏都区',
    411023: '许昌县',
    411024: '鄢陵县',
    411025: '襄城县',
    411081: '禹州市',
    411082: '长葛市',
    411100: '漯河市',
    411101: '市辖区',
    411102: '源汇区',
    411121: '舞阳县',
    411122: '临颍县',
    411123: '郾城县',
    411200: '三门峡市',
    411201: '市辖区',
    411202: '湖滨区',
    411221: '渑池县',
    411222: '陕县',
    411224: '卢氏县',
    411281: '义马市',
    411282: '灵宝市',
    411300: '南阳市',
    411301: '市辖区',
    411302: '宛城区',
    411303: '卧龙区',
    411321: '南召县',
    411322: '方城县',
    411323: '西峡县',
    411324: '镇平县',
    411325: '内乡县',
    411326: '淅川县',
    411327: '社旗县',
    411328: '唐河县',
    411329: '新野县',
    411330: '桐柏县',
    411381: '邓州市',
    411400: '商丘市',
    411401: '市辖区',
    411402: '梁园区',
    411403: '睢阳区',
    411421: '民权县',
    411422: '睢县',
    411423: '宁陵县',
    411424: '柘城县',
    411425: '虞城县',
    411426: '夏邑县',
    411481: '永城市',
    411500: '信阳市',
    411501: '市辖区',
    411502: '师河区',
    411503: '平桥区',
    411521: '罗山县',
    411522: '光山县',
    411523: '新县',
    411524: '商城县',
    411525: '固始县',
    411526: '潢川县',
    411527: '淮滨县',
    411528: '息县',
    411600: '周口市',
    411601: '市辖区',
    411602: '川汇区',
    411621: '扶沟县',
    411622: '西华县',
    411623: '商水县',
    411624: '沈丘县',
    411625: '郸城县',
    411626: '淮阳县',
    411627: '太康县',
    411628: '鹿邑县',
    411681: '项城市',
    411700: '驻马店市',
    411701: '市辖区',
    411702: '驿城区',
    411721: '西平县',
    411722: '上蔡县',
    411723: '平舆县',
    411724: '正阳县',
    411725: '确山县',
    411726: '泌阳县',
    411727: '汝南县',
    411728: '遂平县',
    411729: '新蔡县',
    420000: '湖北省',
    420100: '武汉市',
    420101: '市辖区',
    420102: '江岸区',
    420103: '江汉区',
    420104: '乔口区',
    420105: '汉阳区',
    420106: '武昌区',
    420107: '青山区',
    420111: '洪山区',
    420112: '东西湖区',
    420113: '汉南区',
    420114: '蔡甸区',
    420115: '江夏区',
    420116: '黄陂区',
    420117: '新洲区',
    420200: '黄石市',
    420201: '市辖区',
    420202: '黄石港区',
    420203: '西塞山区',
    420204: '下陆区',
    420205: '铁山区',
    420222: '阳新县',
    420281: '大冶市',
    420300: '十堰市',
    420301: '市辖区',
    420302: '茅箭区',
    420303: '张湾区',
    420321: '郧县',
    420322: '郧西县',
    420323: '竹山县',
    420324: '竹溪县',
    420325: '房县',
    420381: '丹江口市',
    420500: '宜昌市',
    420501: '市辖区',
    420502: '西陵区',
    420503: '伍家岗区',
    420504: '点军区',
    420505: '虎亭区',
    420506: '夷陵区',
    420525: '远安县',
    420526: '兴山县',
    420527: '秭归县',
    420528: '长阳土家族自治县',
    420529: '五峰土家族自治县',
    420581: '宜都市',
    420582: '当阳市',
    420583: '枝江市',
    420600: '襄樊市',
    420601: '市辖区',
    420602: '襄城区',
    420606: '樊城区',
    420607: '襄阳区',
    420624: '南漳县',
    420625: '谷城县',
    420626: '保康县',
    420682: '老河口市',
    420683: '枣阳市',
    420684: '宜城市',
    420700: '鄂州市',
    420701: '市辖区',
    420702: '梁子湖区',
    420703: '华容区',
    420704: '鄂城区',
    420800: '荆门市',
    420801: '市辖区',
    420802: '东宝区',
    420804: '掇刀区',
    420821: '京山县',
    420822: '沙洋县',
    420881: '钟祥市',
    420900: '孝感市',
    420901: '市辖区',
    420902: '孝南区',
    420921: '孝昌县',
    420922: '大悟县',
    420923: '云梦县',
    420981: '应城市',
    420982: '安陆市',
    420984: '汉川市',
    421000: '荆州市',
    421001: '市辖区',
    421002: '沙市区',
    421003: '荆州区',
    421022: '公安县',
    421023: '监利县',
    421024: '江陵县',
    421081: '石首市',
    421083: '洪湖市',
    421087: '松滋市',
    421100: '黄冈市',
    421101: '市辖区',
    421102: '黄州区',
    421121: '团风县',
    421122: '红安县',
    421123: '罗田县',
    421124: '英山县',
    421125: '浠水县',
    421126: '蕲春县',
    421127: '黄梅县',
    421181: '麻城市',
    421182: '武穴市',
    421200: '咸宁市',
    421201: '市辖区',
    421202: '咸安区',
    421221: '嘉鱼县',
    421222: '通城县',
    421223: '崇阳县',
    421224: '通山县',
    421281: '赤壁市',
    421300: '随州市',
    421301: '市辖区',
    421302: '曾都区',
    421381: '广水市',
    422800: '恩施土家族苗族自治州',
    422801: '恩施市',
    422802: '利川市',
    422822: '建始县',
    422823: '巴东县',
    422825: '宣恩县',
    422826: '咸丰县',
    422827: '来凤县',
    422828: '鹤峰县',
    429000: '省直辖行政单位',
    429004: '仙桃市',
    429005: '潜江市',
    429006: '天门市',
    429021: '神农架林区',
    430000: '湖南省',
    430100: '长沙市',
    430101: '市辖区',
    430102: '芙蓉区',
    430103: '天心区',
    430104: '岳麓区',
    430105: '开福区',
    430111: '雨花区',
    430121: '长沙县',
    430122: '望城县',
    430124: '宁乡县',
    430181: '浏阳市',
    430200: '株洲市',
    430201: '市辖区',
    430202: '荷塘区',
    430203: '芦淞区',
    430204: '石峰区',
    430211: '天元区',
    430221: '株洲县',
    430223: '攸县',
    430224: '茶陵县',
    430225: '炎陵县',
    430281: '醴陵市',
    430300: '湘潭市',
    430301: '市辖区',
    430302: '雨湖区',
    430304: '岳塘区',
    430321: '湘潭县',
    430381: '湘乡市',
    430382: '韶山市',
    430400: '衡阳市',
    430401: '市辖区',
    430405: '珠晖区',
    430406: '雁峰区',
    430407: '石鼓区',
    430408: '蒸湘区',
    430412: '南岳区',
    430421: '衡阳县',
    430422: '衡南县',
    430423: '衡山县',
    430424: '衡东县',
    430426: '祁东县',
    430481: '耒阳市',
    430482: '常宁市',
    430500: '邵阳市',
    430501: '市辖区',
    430502: '双清区',
    430503: '大祥区',
    430511: '北塔区',
    430521: '邵东县',
    430522: '新邵县',
    430523: '邵阳县',
    430524: '隆回县',
    430525: '洞口县',
    430527: '绥宁县',
    430528: '新宁县',
    430529: '城步苗族自治县',
    430581: '武冈市',
    430600: '岳阳市',
    430601: '市辖区',
    430602: '岳阳楼区',
    430603: '云溪区',
    430611: '君山区',
    430621: '岳阳县',
    430623: '华容县',
    430624: '湘阴县',
    430626: '平江县',
    430681: '汨罗市',
    430682: '临湘市',
    430700: '常德市',
    430701: '市辖区',
    430702: '武陵区',
    430703: '鼎城区',
    430721: '安乡县',
    430722: '汉寿县',
    430723: '澧县',
    430724: '临澧县',
    430725: '桃源县',
    430726: '石门县',
    430781: '津市市',
    430800: '张家界市',
    430801: '市辖区',
    430802: '永定区',
    430811: '武陵源区',
    430821: '慈利县',
    430822: '桑植县',
    430900: '益阳市',
    430901: '市辖区',
    430902: '资阳区',
    430903: '赫山区',
    430921: '南县',
    430922: '桃江县',
    430923: '安化县',
    430981: '沅江市',
    431000: '郴州市',
    431001: '市辖区',
    431002: '北湖区',
    431003: '苏仙区',
    431021: '桂阳县',
    431022: '宜章县',
    431023: '永兴县',
    431024: '嘉禾县',
    431025: '临武县',
    431026: '汝城县',
    431027: '桂东县',
    431028: '安仁县',
    431081: '资兴市',
    431100: '永州市',
    431101: '市辖区',
    431102: '芝山区',
    431103: '冷水滩区',
    431121: '祁阳县',
    431122: '东安县',
    431123: '双牌县',
    431124: '道县',
    431125: '江永县',
    431126: '宁远县',
    431127: '蓝山县',
    431128: '新田县',
    431129: '江华瑶族自治县',
    431200: '怀化市',
    431201: '市辖区',
    431202: '鹤城区',
    431221: '中方县',
    431222: '沅陵县',
    431223: '辰溪县',
    431224: '溆浦县',
    431225: '会同县',
    431226: '麻阳苗族自治县',
    431227: '新晃侗族自治县',
    431228: '芷江侗族自治县',
    431229: '靖州苗族侗族自治县',
    431230: '通道侗族自治县',
    431281: '洪江市',
    431300: '娄底市',
    431301: '市辖区',
    431302: '娄星区',
    431321: '双峰县',
    431322: '新化县',
    431381: '冷水江市',
    431382: '涟源市',
    433100: '湘西土家族苗族自治州',
    433101: '吉首市',
    433122: '泸溪县',
    433123: '凤凰县',
    433124: '花垣县',
    433125: '保靖县',
    433126: '古丈县',
    433127: '永顺县',
    433130: '龙山县',
    440000: '广东省',
    440100: '广州市',
    440101: '市辖区',
    440102: '东山区',
    440103: '荔湾区',
    440104: '越秀区',
    440105: '海珠区',
    440106: '天河区',
    440107: '芳村区',
    440111: '白云区',
    440112: '黄埔区',
    440113: '番禺区',
    440114: '花都区',
    440183: '增城市',
    440184: '从化市',
    440200: '韶关市',
    440201: '市辖区',
    440202: '北江区',
    440203: '武江区',
    440204: '浈江区',
    440221: '曲江县',
    440222: '始兴县',
    440224: '仁化县',
    440229: '翁源县',
    440232: '乳源瑶族自治县',
    440233: '新丰县',
    440281: '乐昌市',
    440282: '南雄市',
    440300: '深圳市',
    440301: '市辖区',
    440303: '罗湖区',
    440304: '福田区',
    440305: '南山区',
    440306: '宝安区',
    440307: '龙岗区',
    440308: '盐田区',
    440400: '珠海市',
    440401: '市辖区',
    440402: '香洲区',
    440403: '斗门区',
    440404: '金湾区',
    440500: '汕头市',
    440501: '市辖区',
    440507: '龙湖区',
    440511: '金平区',
    440512: '濠江区',
    440513: '潮阳区',
    440514: '潮南区',
    440515: '澄海区',
    440523: '南澳县',
    440600: '佛山市',
    440601: '市辖区',
    440604: '禅城区',
    440605: '南海区',
    440606: '顺德区',
    440607: '三水区',
    440608: '高明区',
    440700: '江门市',
    440701: '市辖区',
    440703: '蓬江区',
    440704: '江海区',
    440705: '新会区',
    440781: '台山市',
    440783: '开平市',
    440784: '鹤山市',
    440785: '恩平市',
    440800: '湛江市',
    440801: '市辖区',
    440802: '赤坎区',
    440803: '霞山区',
    440804: '坡头区',
    440811: '麻章区',
    440823: '遂溪县',
    440825: '徐闻县',
    440881: '廉江市',
    440882: '雷州市',
    440883: '吴川市',
    440900: '茂名市',
    440901: '市辖区',
    440902: '茂南区',
    440903: '茂港区',
    440923: '电白县',
    440981: '高州市',
    440982: '化州市',
    440983: '信宜市',
    441200: '肇庆市',
    441201: '市辖区',
    441202: '端州区',
    441203: '鼎湖区',
    441223: '广宁县',
    441224: '怀集县',
    441225: '封开县',
    441226: '德庆县',
    441283: '高要市',
    441284: '四会市',
    441300: '惠州市',
    441301: '市辖区',
    441302: '惠城区',
    441303: '惠阳区',
    441322: '博罗县',
    441323: '惠东县',
    441324: '龙门县',
    441400: '梅州市',
    441401: '市辖区',
    441402: '梅江区',
    441421: '梅县',
    441422: '大埔县',
    441423: '丰顺县',
    441424: '五华县',
    441426: '平远县',
    441427: '蕉岭县',
    441481: '兴宁市',
    441500: '汕尾市',
    441501: '市辖区',
    441502: '城区',
    441521: '海丰县',
    441523: '陆河县',
    441581: '陆丰市',
    441600: '河源市',
    441601: '市辖区',
    441602: '源城区',
    441621: '紫金县',
    441622: '龙川县',
    441623: '连平县',
    441624: '和平县',
    441625: '东源县',
    441700: '阳江市',
    441701: '市辖区',
    441702: '江城区',
    441721: '阳西县',
    441723: '阳东县',
    441781: '阳春市',
    441800: '清远市',
    441801: '市辖区',
    441802: '清城区',
    441821: '佛冈县',
    441823: '阳山县',
    441825: '连山壮族瑶族自治县',
    441826: '连南瑶族自治县',
    441827: '清新县',
    441881: '英德市',
    441882: '连州市',
    441900: '东莞市',
    442000: '中山市',
    445100: '潮州市',
    445101: '市辖区',
    445102: '湘桥区',
    445121: '潮安县',
    445122: '饶平县',
    445200: '揭阳市',
    445201: '市辖区',
    445202: '榕城区',
    445221: '揭东县',
    445222: '揭西县',
    445224: '惠来县',
    445281: '普宁市',
    445300: '云浮市',
    445301: '市辖区',
    445302: '云城区',
    445321: '新兴县',
    445322: '郁南县',
    445323: '云安县',
    445381: '罗定市',
    450000: '广西壮族自治区',
    450100: '南宁市',
    450101: '市辖区',
    450102: '兴宁区',
    450103: '新城区',
    450104: '城北区',
    450105: '江南区',
    450106: '永新区',
    450121: '邕宁县',
    450122: '武鸣县',
    450123: '隆安县',
    450124: '马山县',
    450125: '上林县',
    450126: '宾阳县',
    450127: '横县',
    450200: '柳州市',
    450201: '市辖区',
    450202: '城中区',
    450203: '鱼峰区',
    450204: '柳南区',
    450205: '柳北区',
    450221: '柳江县',
    450222: '柳城县',
    450223: '鹿寨县',
    450224: '融安县',
    450225: '融水苗族自治县',
    450226: '三江侗族自治县',
    451300: '来宾市',
    451301: '市辖区',
    451302: '兴宾区',
    451321: '忻城县',
    451322: '象州县',
    451323: '武宣县',
    451324: '金秀瑶族自治县',
    451381: '合山市',
    451400: '崇左市',
    451401: '市辖区',
    451402: '江洲区',
    451421: '扶绥县',
    451422: '宁明县',
    451423: '龙州县',
    451424: '大新县',
    451425: '天等县',
    451481: '凭祥市',
    450300: '桂林市',
    450301: '市辖区',
    450302: '秀峰区',
    450303: '叠彩区',
    450304: '象山区',
    450305: '七星区',
    450311: '雁山区',
    450321: '阳朔县',
    450322: '临桂县',
    450323: '灵川县',
    450324: '全州县',
    450325: '兴安县',
    450326: '永福县',
    450327: '灌阳县',
    450328: '龙胜各族自治县',
    450329: '资源县',
    450330: '平乐县',
    450331: '荔蒲县',
    450332: '恭城瑶族自治县',
    450400: '梧州市',
    450401: '市辖区',
    450403: '万秀区',
    450404: '蝶山区',
    450405: '长洲区',
    450421: '苍梧县',
    450422: '藤县',
    450423: '蒙山县',
    450481: '岑溪市',
    450500: '北海市',
    450501: '市辖区',
    450502: '海城区',
    450503: '银海区',
    450512: '铁山港区',
    450521: '合浦县',
    450600: '防城港市',
    450601: '市辖区',
    450602: '港口区',
    450603: '防城区',
    450621: '上思县',
    450681: '东兴市',
    450700: '钦州市',
    450701: '市辖区',
    450702: '钦南区',
    450703: '钦北区',
    450721: '灵山县',
    450722: '浦北县',
    450800: '贵港市',
    450801: '市辖区',
    450802: '港北区',
    450803: '港南区',
    450804: '覃塘区',
    450821: '平南县',
    450881: '桂平市',
    450900: '玉林市',
    450901: '市辖区',
    450902: '玉州区',
    450921: '容县',
    450922: '陆川县',
    450923: '博白县',
    450924: '兴业县',
    450981: '北流市',
    451000: '百色市',
    451001: '市辖区',
    451002: '右江区',
    451021: '田阳县',
    451022: '田东县',
    451023: '平果县',
    451024: '德保县',
    451025: '靖西县',
    451026: '那坡县',
    451027: '凌云县',
    451028: '乐业县',
    451029: '田林县',
    451030: '西林县',
    451031: '隆林各族自治县',
    451100: '贺州市',
    451101: '市辖区',
    451102: '八步区',
    451121: '昭平县',
    451122: '钟山县',
    451123: '富川瑶族自治县',
    451200: '河池市',
    451221: '南丹县',
    451222: '天峨县',
    451223: '凤山县',
    451224: '东兰县',
    451225: '罗城仫佬族自治县',
    451226: '环江毛南族自治县',
    451227: '巴马瑶族自治县',
    451228: '都安瑶族自治县',
    451229: '大化瑶族自治县',
    451281: '宜州市',
    451201: '市辖区',
    451202: '金城江区',
    460000: '海南省',
    460100: '海口市',
    460101: '市辖区',
    460105: '秀英区',
    460106: '龙华区',
    460107: '琼山区',
    460108: '美兰区',
    460200: '三亚市',
    460201: '市辖区',
    469000: '省直辖县级行政单位',
    469001: '五指山市',
    469002: '琼海市',
    469003: '儋州市',
    469005: '文昌市',
    469006: '万宁市',
    469007: '东方市',
    469025: '定安县',
    469026: '屯昌县',
    469027: '澄迈县',
    469028: '临高县',
    469030: '白沙黎族自治县',
    469031: '昌江黎族自治县',
    469033: '乐东黎族自治县',
    469034: '陵水黎族自治县',
    469035: '保亭黎族苗族自治县',
    469036: '琼中黎族苗族自治县',
    469037: '西沙群岛',
    469038: '南沙群岛',
    469039: '中沙群岛的岛礁及其海域',
    500000: '重庆市',
    500100: '市辖区',
    500101: '万州区',
    500102: '涪陵区',
    500103: '渝中区',
    500104: '大渡口区',
    500105: '江北区',
    500106: '沙坪坝区',
    500107: '九龙坡区',
    500108: '南岸区',
    500109: '北碚区',
    500110: '万盛区',
    500111: '双桥区',
    500112: '渝北区',
    500113: '巴南区',
    500114: '黔江区',
    500115: '长寿区',
    500200: '县',
    500222: '綦江县',
    500223: '潼南县',
    500224: '铜梁县',
    500225: '大足县',
    500226: '荣昌县',
    500227: '璧山县',
    500228: '梁平县',
    500229: '城口县',
    500230: '丰都县',
    500231: '垫江县',
    500232: '武隆县',
    500233: '忠县',
    500234: '开县',
    500235: '云阳县',
    500236: '奉节县',
    500237: '巫山县',
    500238: '巫溪县',
    500240: '石柱土家族自治县',
    500241: '秀山土家族苗族自治县',
    500242: '酉阳土家族苗族自治县',
    500243: '彭水苗族土家族自治县',
    500300: '市',
    500381: '江津市',
    500382: '合川市',
    500383: '永川市',
    500384: '南川市',
    510000: '四川省',
    510100: '成都市',
    510101: '市辖区',
    510104: '锦江区',
    510105: '青羊区',
    510106: '金牛区',
    510107: '武侯区',
    510108: '成华区',
    510112: '龙泉驿区',
    510113: '青白江区',
    510114: '新都区',
    510115: '温江区',
    510121: '金堂县',
    510122: '双流县',
    510124: '郫县',
    510129: '大邑县',
    510131: '蒲江县',
    510132: '新津县',
    510181: '都江堰市',
    510182: '彭州市',
    510183: '邛崃市',
    510184: '崇州市',
    510300: '自贡市',
    510301: '市辖区',
    510302: '自流井区',
    510303: '贡井区',
    510304: '大安区',
    510311: '沿滩区',
    510321: '荣县',
    510322: '富顺县',
    510400: '攀枝花市',
    510401: '市辖区',
    510402: '东区',
    510403: '西区',
    510411: '仁和区',
    510421: '米易县',
    510422: '盐边县',
    510500: '泸州市',
    510501: '市辖区',
    510502: '江阳区',
    510503: '纳溪区',
    510504: '龙马潭区',
    510521: '泸县',
    510522: '合江县',
    510524: '叙永县',
    510525: '古蔺县',
    510600: '德阳市',
    510601: '市辖区',
    510603: '旌阳区',
    510623: '中江县',
    510626: '罗江县',
    510681: '广汉市',
    510682: '什邡市',
    510683: '绵竹市',
    510700: '绵阳市',
    510701: '市辖区',
    510703: '涪城区',
    510704: '游仙区',
    510722: '三台县',
    510723: '盐亭县',
    510724: '安县',
    510725: '梓潼县',
    510726: '北川羌族自治县',
    510727: '平武县',
    510781: '江油市',
    510800: '广元市',
    510801: '市辖区',
    510802: '市中区',
    510811: '元坝区',
    510812: '朝天区',
    510821: '旺苍县',
    510822: '青川县',
    510823: '剑阁县',
    510824: '苍溪县',
    510900: '遂宁市',
    510901: '市辖区',
    510903: '船山区',
    510904: '安居区',
    510921: '蓬溪县',
    510922: '射洪县',
    510923: '大英县',
    511000: '内江市',
    511001: '市辖区',
    511002: '市中区',
    511011: '东兴区',
    511024: '威远县',
    511025: '资中县',
    511028: '隆昌县',
    511100: '乐山市',
    511101: '市辖区',
    511102: '市中区',
    511111: '沙湾区',
    511112: '五通桥区',
    511113: '金口河区',
    511123: '犍为县',
    511124: '井研县',
    511126: '夹江县',
    511129: '沐川县',
    511132: '峨边彝族自治县',
    511133: '马边彝族自治县',
    511181: '峨眉山市',
    511300: '南充市',
    511301: '市辖区',
    511302: '顺庆区',
    511303: '高坪区',
    511304: '嘉陵区',
    511321: '南部县',
    511322: '营山县',
    511323: '蓬安县',
    511324: '仪陇县',
    511325: '西充县',
    511381: '阆中市',
    511400: '眉山市',
    511401: '市辖区',
    511402: '东坡区',
    511421: '仁寿县',
    511422: '彭山县',
    511423: '洪雅县',
    511424: '丹棱县',
    511425: '青神县',
    511500: '宜宾市',
    511501: '市辖区',
    511502: '翠屏区',
    511521: '宜宾县',
    511522: '南溪县',
    511523: '江安县',
    511524: '长宁县',
    511525: '高县',
    511526: '珙县',
    511527: '筠连县',
    511528: '兴文县',
    511529: '屏山县',
    511600: '广安市',
    511601: '市辖区',
    511602: '广安区',
    511621: '岳池县',
    511622: '武胜县',
    511623: '邻水县',
    511681: '华莹市',
    511700: '达州市',
    511701: '市辖区',
    511702: '通川区',
    511721: '达县',
    511722: '宣汉县',
    511723: '开江县',
    511724: '大竹县',
    511725: '渠县',
    511781: '万源市',
    511800: '雅安市',
    511801: '市辖区',
    511802: '雨城区',
    511821: '名山县',
    511822: '荥经县',
    511823: '汉源县',
    511824: '石棉县',
    511825: '天全县',
    511826: '芦山县',
    511827: '宝兴县',
    511900: '巴中市',
    511901: '市辖区',
    511902: '巴州区',
    511921: '通江县',
    511922: '南江县',
    511923: '平昌县',
    512000: '资阳市',
    512001: '市辖区',
    512002: '雁江区',
    512021: '安岳县',
    512022: '乐至县',
    512081: '简阳市',
    513200: '阿坝藏族羌族自治州',
    513221: '汶川县',
    513222: '理县',
    513223: '茂县',
    513224: '松潘县',
    513225: '九寨沟县',
    513226: '金川县',
    513227: '小金县',
    513228: '黑水县',
    513229: '马尔康县',
    513230: '壤塘县',
    513231: '阿坝县',
    513232: '若尔盖县',
    513233: '红原县',
    513300: '甘孜藏族自治州',
    513321: '康定县',
    513322: '泸定县',
    513323: '丹巴县',
    513324: '九龙县',
    513325: '雅江县',
    513326: '道孚县',
    513327: '炉霍县',
    513328: '甘孜县',
    513329: '新龙县',
    513330: '德格县',
    513331: '白玉县',
    513332: '石渠县',
    513333: '色达县',
    513334: '理塘县',
    513335: '巴塘县',
    513336: '乡城县',
    513337: '稻城县',
    513338: '得荣县',
    513400: '凉山彝族自治州',
    513401: '西昌市',
    513422: '木里藏族自治县',
    513423: '盐源县',
    513424: '德昌县',
    513425: '会理县',
    513426: '会东县',
    513427: '宁南县',
    513428: '普格县',
    513429: '布拖县',
    513430: '金阳县',
    513431: '昭觉县',
    513432: '喜德县',
    513433: '冕宁县',
    513434: '越西县',
    513435: '甘洛县',
    513436: '美姑县',
    513437: '雷波县',
    630000: '青海省',
    630100: '西宁市',
    630101: '市辖区',
    630102: '城东区',
    630103: '城中区',
    630104: '城西区',
    630105: '城北区',
    630121: '大通回族土族自治县',
    630122: '湟中县',
    630123: '湟源县',
    632100: '海东地区',
    632121: '平安县',
    632122: '民和回族土族自治县',
    632123: '乐都县',
    632126: '互助土族自治县',
    632127: '化隆回族自治县',
    632128: '循化撒拉族自治县',
    632200: '海北藏族自治州',
    632221: '门源回族自治县',
    632222: '祁连县',
    632223: '海晏县',
    632224: '刚察县',
    632300: '黄南藏族自治州',
    632321: '同仁县',
    632322: '尖扎县',
    632323: '泽库县',
    632324: '河南蒙古族自治县',
    632500: '海南藏族自治州',
    632521: '共和县',
    632522: '同德县',
    632523: '贵德县',
    632524: '兴海县',
    632525: '贵南县',
    632600: '果洛藏族自治州',
    632621: '玛沁县',
    632622: '班玛县',
    632623: '甘德县',
    632624: '达日县',
    632625: '久治县',
    632626: '玛多县',
    632700: '玉树藏族自治州',
    632721: '玉树县',
    632722: '杂多县',
    632723: '称多县',
    632724: '治多县',
    632725: '囊谦县',
    632726: '曲麻莱县',
    632800: '海西蒙古族藏族自治州',
    632801: '格尔木市',
    632802: '德令哈市',
    632821: '乌兰县',
    632822: '都兰县',
    632823: '天峻县',
    640000: '宁夏回族自治区',
    640100: '银川市',
    640101: '市辖区',
    640104: '兴庆区',
    640105: '西夏区',
    640106: '金凤区',
    640122: '贺兰县',
    640181: '灵武市',
    640200: '石嘴山市',
    640201: '市辖区',
    640202: '大武口区',
    640205: '惠农区',
    640221: '平罗县',
    640300: '吴忠市',
    640301: '市辖区',
    640302: '利通区',
    640323: '盐池县',
    640324: '同心县',
    640381: '青铜峡市',
    640400: '固原市',
    640401: '市辖区',
    640402: '原州区',
    640422: '西吉县',
    640423: '隆德县',
    640424: '泾源县',
    640425: '彭阳县',
    640500: '中卫市',
    640501: '市辖区',
    640502: '沙坡头区',
    640521: '中宁县',
    640522: '海原县',
    520000: '贵州省',
    520100: '贵阳市',
    520101: '市辖区',
    520102: '南明区',
    520103: '云岩区',
    520111: '花溪区',
    520112: '乌当区',
    520113: '白云区',
    520114: '小河区',
    520121: '开阳县',
    520122: '息烽县',
    520123: '修文县',
    520181: '清镇市',
    520200: '六盘水市',
    520201: '钟山区',
    520203: '六枝特区',
    520221: '水城县',
    520222: '盘县',
    520300: '遵义市',
    520301: '市辖区',
    520302: '红花岗区',
    520303: '汇川区',
    520321: '遵义县',
    520322: '桐梓县',
    520323: '绥阳县',
    520324: '正安县',
    520325: '道真仡佬族苗族自治县',
    520326: '务川仡佬族苗族自治县',
    520327: '凤冈县',
    520328: '湄潭县',
    520329: '余庆县',
    520330: '习水县',
    520381: '赤水市',
    520382: '仁怀市',
    520400: '安顺市',
    520401: '市辖区',
    520402: '西秀区',
    520421: '平坝县',
    520422: '普定县',
    520423: '镇宁布依族苗族自治县',
    520424: '关岭布依族苗族自治县',
    520425: '紫云苗族布依族自治县',
    522200: '铜仁地区',
    522201: '铜仁市',
    522222: '江口县',
    522223: '玉屏侗族自治县',
    522224: '石阡县',
    522225: '思南县',
    522226: '印江土家族苗族自治县',
    522227: '德江县',
    522228: '沿河土家族自治县',
    522229: '松桃苗族自治县',
    522230: '万山特区',
    522300: '黔西南布依族苗族自治州',
    522301: '兴义市',
    522322: '兴仁县',
    522323: '普安县',
    522324: '晴隆县',
    522325: '贞丰县',
    522326: '望谟县',
    522327: '册亨县',
    522328: '安龙县',
    522400: '毕节地区',
    522401: '毕节市',
    522422: '大方县',
    522423: '黔西县',
    522424: '金沙县',
    522425: '织金县',
    522426: '纳雍县',
    522427: '威宁彝族回族苗族自治县',
    522428: '赫章县',
    522600: '黔东南苗族侗族自治州',
    522601: '凯里市',
    522622: '黄平县',
    522623: '施秉县',
    522624: '三穗县',
    522625: '镇远县',
    522626: '岑巩县',
    522627: '天柱县',
    522628: '锦屏县',
    522629: '剑河县',
    522630: '台江县',
    522631: '黎平县',
    522632: '榕江县',
    522633: '从江县',
    522634: '雷山县',
    522635: '麻江县',
    522636: '丹寨县',
    522700: '黔南布依族苗族自治州',
    522701: '都匀市',
    522702: '福泉市',
    522722: '荔波县',
    522723: '贵定县',
    522725: '瓮安县',
    522726: '独山县',
    522727: '平塘县',
    522728: '罗甸县',
    522729: '长顺县',
    522730: '龙里县',
    522731: '惠水县',
    522732: '三都水族自治县',
    530000: '云南省',
    530100: '昆明市',
    530101: '市辖区',
    530102: '五华区',
    530103: '盘龙区',
    530111: '官渡区',
    530112: '西山区',
    530113: '东川区',
    530121: '呈贡县',
    530122: '晋宁县',
    530124: '富民县',
    530125: '宜良县',
    530126: '石林彝族自治县',
    530127: '嵩明县',
    530128: '禄劝彝族苗族自治县',
    530129: '寻甸回族彝族自治县',
    530181: '安宁市',
    530300: '曲靖市',
    530301: '市辖区',
    530302: '麒麟区',
    530321: '马龙县',
    530322: '陆良县',
    530323: '师宗县',
    530324: '罗平县',
    530325: '富源县',
    530326: '会泽县',
    530328: '沾益县',
    530381: '宣威市',
    530400: '玉溪市',
    530401: '市辖区',
    530402: '红塔区',
    530421: '江川县',
    530422: '澄江县',
    530423: '通海县',
    530424: '华宁县',
    530425: '易门县',
    530426: '峨山彝族自治县',
    530427: '新平彝族傣族自治县',
    530428: '元江哈尼族彝族傣族自治县',
    530500: '保山市',
    530501: '市辖区',
    530502: '隆阳区',
    530521: '施甸县',
    530522: '腾冲县',
    530523: '龙陵县',
    530524: '昌宁县',
    530600: '昭通市',
    530601: '市辖区',
    530602: '昭阳区',
    530621: '鲁甸县',
    530622: '巧家县',
    530623: '盐津县',
    530624: '大关县',
    530625: '永善县',
    530626: '绥江县',
    530627: '镇雄县',
    530628: '彝良县',
    530629: '威信县',
    530630: '水富县',
    530700: '丽江市',
    530701: '市辖区',
    530702: '古城区',
    530721: '玉龙纳西族自治县',
    530722: '永胜县',
    530723: '华坪县',
    530724: '宁蒗彝族自治县',
    530800: '思茅市',
    530801: '市辖区',
    530802: '翠云区',
    530821: '普洱哈尼族彝族自治县',
    530822: '墨江哈尼族自治县',
    530823: '景东彝族自治县',
    530824: '景谷傣族彝族自治县',
    530825: '镇沅彝族哈尼族拉祜族自治县',
    530826: '江城哈尼族彝族自治县',
    530827: '孟连傣族拉祜族佤族自治县',
    530828: '澜沧拉祜族自治县',
    530829: '西盟佤族自治县',
    530900: '临沧市',
    530901: '市辖区',
    530902: '临翔区',
    530921: '凤庆县',
    530922: '云县',
    530923: '永德县',
    530924: '镇康县',
    530925: '双江拉祜族佤族布朗族傣族自治县',
    530926: '耿马傣族佤族自治县',
    530927: '沧源佤族自治县',
    532300: '楚雄彝族自治州',
    532301: '楚雄市',
    532322: '双柏县',
    532323: '牟定县',
    532324: '南华县',
    532325: '姚安县',
    532326: '大姚县',
    532327: '永仁县',
    532328: '元谋县',
    532329: '武定县',
    532331: '禄丰县',
    532500: '红河哈尼族彝族自治州',
    532501: '个旧市',
    532502: '开远市',
    532522: '蒙自县',
    532523: '屏边苗族自治县',
    532524: '建水县',
    532525: '石屏县',
    532526: '弥勒县',
    532527: '泸西县',
    532528: '元阳县',
    532529: '红河县',
    532530: '金平苗族瑶族傣族自治县',
    532531: '绿春县',
    532532: '河口瑶族自治县',
    532600: '文山壮族苗族自治州',
    532621: '文山县',
    532622: '砚山县',
    532623: '西畴县',
    532624: '麻栗坡县',
    532625: '马关县',
    532626: '丘北县',
    532627: '广南县',
    532628: '富宁县',
    532800: '西双版纳傣族自治州',
    532801: '景洪市',
    532822: '勐海县',
    532823: '勐腊县',
    532900: '大理白族自治州',
    532901: '大理市',
    532922: '漾濞彝族自治县',
    532923: '祥云县',
    532924: '宾川县',
    532925: '弥渡县',
    532926: '南涧彝族自治县',
    532927: '巍山彝族回族自治县',
    532928: '永平县',
    532929: '云龙县',
    532930: '洱源县',
    532931: '剑川县',
    532932: '鹤庆县',
    533100: '德宏傣族景颇族自治州',
    533102: '瑞丽市',
    533103: '潞西市',
    533122: '梁河县',
    533123: '盈江县',
    533124: '陇川县',
    533300: '怒江傈僳族自治州',
    533321: '泸水县',
    533323: '福贡县',
    533324: '贡山独龙族怒族自治县',
    533325: '兰坪白族普米族自治县',
    533400: '迪庆藏族自治州',
    533421: '香格里拉县',
    533422: '德钦县',
    533423: '维西傈僳族自治县',
    540000: '西藏自治区',
    540100: '拉萨市',
    540101: '市辖区',
    540102: '城关区',
    540121: '林周县',
    540122: '当雄县',
    540123: '尼木县',
    540124: '曲水县',
    540125: '堆龙德庆县',
    540126: '达孜县',
    540127: '墨竹工卡县',
    542100: '昌都地区',
    542121: '昌都县',
    542122: '江达县',
    542123: '贡觉县',
    542124: '类乌齐县',
    542125: '丁青县',
    542126: '察雅县',
    542127: '八宿县',
    542128: '左贡县',
    542129: '芒康县',
    542132: '洛隆县',
    542133: '边坝县',
    542200: '山南地区',
    542221: '乃东县',
    542222: '扎囊县',
    542223: '贡嘎县',
    542224: '桑日县',
    542225: '琼结县',
    542226: '曲松县',
    542227: '措美县',
    542228: '洛扎县',
    542229: '加查县',
    542231: '隆子县',
    542232: '错那县',
    542233: '浪卡子县',
    542300: '日喀则地区',
    542301: '日喀则市',
    542322: '南木林县',
    542323: '江孜县',
    542324: '定日县',
    542325: '萨迦县',
    542326: '拉孜县',
    542327: '昂仁县',
    542328: '谢通门县',
    542329: '白朗县',
    542330: '仁布县',
    542331: '康马县',
    542332: '定结县',
    542333: '仲巴县',
    542334: '亚东县',
    542335: '吉隆县',
    542336: '聂拉木县',
    542337: '萨嘎县',
    542338: '岗巴县',
    542400: '那曲地区',
    542421: '那曲县',
    542422: '嘉黎县',
    542423: '比如县',
    542424: '聂荣县',
    542425: '安多县',
    542426: '申扎县',
    542427: '索县',
    542428: '班戈县',
    542429: '巴青县',
    542430: '尼玛县',
    542500: '阿里地区',
    542521: '普兰县',
    542522: '札达县',
    542523: '噶尔县',
    542524: '日土县',
    542525: '革吉县',
    542526: '改则县',
    542527: '措勤县',
    542600: '林芝地区',
    542621: '林芝县',
    542622: '工布江达县',
    542623: '米林县',
    542624: '墨脱县',
    542625: '波密县',
    542626: '察隅县',
    542627: '朗县',
    610000: '陕西省',
    610100: '西安市',
    610101: '市辖区',
    610102: '新城区',
    610103: '碑林区',
    610104: '莲湖区',
    610111: '灞桥区',
    610112: '未央区',
    610113: '雁塔区',
    610114: '阎良区',
    610115: '临潼区',
    610116: '长安区',
    610122: '蓝田县',
    610124: '周至县',
    610125: '户县',
    610126: '高陵县',
    610200: '铜川市',
    610201: '市辖区',
    610202: '王益区',
    610203: '印台区',
    610204: '耀州区',
    610222: '宜君县',
    610300: '宝鸡市',
    610301: '市辖区',
    610302: '渭滨区',
    610303: '金台区',
    610304: '陈仓区',
    610322: '凤翔县',
    610323: '岐山县',
    610324: '扶风县',
    610326: '眉县',
    610327: '陇县',
    610328: '千阳县',
    610329: '麟游县',
    610330: '凤县',
    610331: '太白县',
    610400: '咸阳市',
    610401: '市辖区',
    610402: '秦都区',
    610403: '杨凌区',
    610404: '渭城区',
    610422: '三原县',
    610423: '泾阳县',
    610424: '乾县',
    610425: '礼泉县',
    610426: '永寿县',
    610427: '彬县',
    610428: '长武县',
    610429: '旬邑县',
    610430: '淳化县',
    610431: '武功县',
    610481: '兴平市',
    610500: '渭南市',
    610501: '市辖区',
    610502: '临渭区',
    610521: '华县',
    610522: '潼关县',
    610523: '大荔县',
    610524: '合阳县',
    610525: '澄城县',
    610526: '蒲城县',
    610527: '白水县',
    610528: '富平县',
    610581: '韩城市',
    610582: '华阴市',
    610600: '延安市',
    610601: '市辖区',
    610602: '宝塔区',
    610621: '延长县',
    610622: '延川县',
    610623: '子长县',
    610625: '志丹县',
    610626: '吴旗县',
    610627: '甘泉县',
    610628: '富县',
    610629: '洛川县',
    610630: '宜川县',
    610631: '黄龙县',
    610632: '黄陵县',
    610700: '汉中市',
    610701: '市辖区',
    610702: '汉台区',
    610721: '南郑县',
    610722: '城固县',
    610723: '洋县',
    610724: '西乡县',
    610725: '勉县',
    610726: '宁强县',
    610727: '略阳县',
    610728: '镇巴县',
    610729: '留坝县',
    610730: '佛坪县',
    610800: '榆林市',
    610801: '市辖区',
    610802: '榆阳区',
    610821: '神木县',
    610822: '府谷县',
    610823: '横山县',
    610824: '靖边县',
    610825: '定边县',
    610826: '绥德县',
    610827: '米脂县',
    610828: '佳县',
    610829: '吴堡县',
    610830: '清涧县',
    610831: '子洲县',
    610900: '安康市',
    610901: '市辖区',
    610902: '汉滨区',
    610921: '汉阴县',
    610922: '石泉县',
    610923: '宁陕县',
    610924: '紫阳县',
    610925: '岚皋县',
    610926: '平利县',
    610927: '镇坪县',
    610928: '旬阳县',
    610929: '白河县',
    611000: '商洛市',
    611001: '市辖区',
    611002: '商州区',
    611021: '洛南县',
    611022: '丹凤县',
    611023: '商南县',
    611024: '山阳县',
    611025: '镇安县',
    611026: '柞水县',
    620000: '甘肃省',
    623000: '甘南藏族自治州',
    623001: '合作市',
    623021: '临潭县',
    623022: '卓尼县',
    623023: '舟曲县',
    623024: '迭部县',
    623025: '玛曲县',
    623026: '碌曲县',
    623027: '夏河县',
    620100: '兰州市',
    620101: '市辖区',
    620102: '城关区',
    620103: '七里河区',
    620104: '西固区',
    620105: '安宁区',
    620111: '红古区',
    620121: '永登县',
    620122: '皋兰县',
    620123: '榆中县',
    620200: '嘉峪关市',
    620201: '市辖区',
    620300: '金昌市',
    620301: '市辖区',
    620302: '金川区',
    620321: '永昌县',
    620400: '白银市',
    620401: '市辖区',
    620402: '白银区',
    620403: '平川区',
    620421: '靖远县',
    620422: '会宁县',
    620423: '景泰县',
    620500: '天水市',
    620501: '市辖区',
    620502: '秦城区',
    620503: '北道区',
    620521: '清水县',
    620522: '秦安县',
    620523: '甘谷县',
    620524: '武山县',
    620525: '张家川回族自治县',
    620600: '武威市',
    620601: '市辖区',
    620602: '凉州区',
    620621: '民勤县',
    620622: '古浪县',
    620623: '天祝藏族自治县',
    620700: '张掖市',
    620701: '市辖区',
    620702: '甘州区',
    620721: '肃南裕固族自治县',
    620722: '民乐县',
    620723: '临泽县',
    620724: '高台县',
    620725: '山丹县',
    620800: '平凉市',
    620801: '市辖区',
    620802: '崆峒区',
    620821: '泾川县',
    620822: '灵台县',
    620823: '崇信县',
    620824: '华亭县',
    620825: '庄浪县',
    620826: '静宁县',
    620900: '酒泉市',
    620901: '市辖区',
    620902: '肃州区',
    620921: '金塔县',
    620922: '安西县',
    620923: '肃北蒙古族自治县',
    620924: '阿克塞哈萨克族自治县',
    620981: '玉门市',
    620982: '敦煌市',
    621000: '庆阳市',
    621001: '市辖区',
    621002: '西峰区',
    621021: '庆城县',
    621022: '环县',
    621023: '华池县',
    621024: '合水县',
    621025: '正宁县',
    621026: '宁县',
    621027: '镇原县',
    621100: '定西市',
    621101: '市辖区',
    621102: '安定区',
    621121: '通渭县',
    621122: '陇西县',
    621123: '渭源县',
    621124: '临洮县',
    621125: '漳县',
    621126: '岷县',
    622600: '陇南地区',
    622621: '武都县',
    622623: '宕昌县',
    622624: '成县',
    622625: '康县',
    622626: '文县',
    622627: '西和县',
    622628: '礼县',
    622629: '两当县',
    622630: '徽县',
    622900: '临夏回族自治州',
    622922: '康乐县',
    622923: '永靖县',
    622924: '广河县',
    622925: '和政县',
    622926: '东乡族自治县',
    622927: '积石山保安族东乡族撒拉族自治县',
    622901: '临夏市',
    622921: '临夏县',
    650000: '新疆维吾尔自治区',
    650100: '乌鲁木齐市',
    650101: '市辖区',
    650102: '天山区',
    650103: '沙依巴克区',
    650104: '新市区',
    650105: '水磨沟区',
    650106: '头屯河区',
    650107: '达坂城区',
    650108: '东山区',
    650121: '乌鲁木齐县',
    650200: '克拉玛依市',
    650201: '市辖区',
    650202: '独山子区',
    650203: '克拉玛依区',
    650204: '白碱滩区',
    650205: '乌尔禾区',
    652100: '吐鲁番地区',
    652101: '吐鲁番市',
    652122: '鄯善县',
    652123: '托克逊县',
    652200: '哈密地区',
    652201: '哈密市',
    652222: '巴里坤哈萨克自治县',
    652223: '伊吾县',
    652300: '昌吉回族自治州',
    652301: '昌吉市',
    652302: '阜康市',
    652303: '米泉市',
    652323: '呼图壁县',
    652324: '玛纳斯县',
    652325: '奇台县',
    652327: '吉木萨尔县',
    652328: '木垒哈萨克自治县',
    652700: '博尔塔拉蒙古自治州',
    652701: '博乐市',
    652722: '精河县',
    652723: '温泉县',
    652800: '巴音郭楞蒙古自治州',
    652801: '库尔勒市',
    652822: '轮台县',
    652823: '尉犁县',
    652824: '若羌县',
    652825: '且末县',
    652826: '焉耆回族自治县',
    652827: '和静县',
    652828: '和硕县',
    652829: '博湖县',
    652900: '阿克苏地区',
    652901: '阿克苏市',
    652922: '温宿县',
    652923: '库车县',
    652924: '沙雅县',
    652925: '新和县',
    652926: '拜城县',
    652927: '乌什县',
    652928: '阿瓦提县',
    652929: '柯坪县',
    653000: '克孜勒苏柯尔克孜自治州',
    653001: '阿图什市',
    653022: '阿克陶县',
    653023: '阿合奇县',
    653024: '乌恰县',
    653100: '喀什地区',
    653101: '喀什市',
    653121: '疏附县',
    653122: '疏勒县',
    653123: '英吉沙县',
    653124: '泽普县',
    653125: '莎车县',
    653126: '叶城县',
    653127: '麦盖提县',
    653128: '岳普湖县',
    653129: '伽师县',
    653130: '巴楚县',
    653131: '塔什库尔干塔吉克自治县',
    653200: '和田地区',
    653201: '和田市',
    653221: '和田县',
    653222: '墨玉县',
    653223: '皮山县',
    653224: '洛浦县',
    653225: '策勒县',
    653226: '于田县',
    653227: '民丰县',
    654000: '伊犁哈萨克自治州',
    654002: '伊宁市',
    654003: '奎屯市',
    654021: '伊宁县',
    654022: '察布查尔锡伯自治县',
    654023: '霍城县',
    654024: '巩留县',
    654025: '新源县',
    654026: '昭苏县',
    654027: '特克斯县',
    654028: '尼勒克县',
    654200: '塔城地区',
    654201: '塔城市',
    654202: '乌苏市',
    654221: '额敏县',
    654223: '沙湾县',
    654224: '托里县',
    654225: '裕民县',
    654226: '和布克赛尔蒙古自治县',
    654300: '阿勒泰地区',
    654301: '阿勒泰市',
    654321: '布尔津县',
    654322: '富蕴县',
    654323: '福海县',
    654324: '哈巴河县',
    654325: '青河县',
    654326: '吉木乃县',
    659000: '省直辖行政单位',
    659001: '石河子市',
    659002: '阿拉尔市',
    659003: '图木舒克市',
    659004: '五家渠市'
  }
  window['BEE_AREAS'] = BEE_AREAS
})()
