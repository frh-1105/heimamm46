export const checkPhone = (rule, value, callback) => {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("手机号码格式错误，请检查"));
    }
  };
export const checkEmail = (rule, value, callback) => {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("邮箱格式错误，请检查"));
    }
  };