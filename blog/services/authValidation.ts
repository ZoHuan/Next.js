export class AuthValidationService {
  static validateEmail(email: string): string | null {
    if (!email) return '请输入邮箱';
    if (!/\S+@\S+\.\S+/.test(email)) return '请输入有效的邮箱地址';
    return null;
  }

  static validateUsername(username: string): string | null {
    if (!username) return '请输入用户名';
    if (username.length < 2) return '用户名至少需要3个字符';
    // 支持中文、英文字母、数字和下划线
    if (!/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/.test(username)) return '用户名只能包含中文、字母、数字和下划线';
    return null;
  }

  static validatePassword(password: string): string | null {
    if (!password) return '请输入密码';
    if (password.length < 8) return '密码至少需要8个字符';
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) return '密码必须包含字母和数字';
    return null;
  }

  static validateConfirmPassword(password: string, confirmPassword: string): string | null {
    if (!confirmPassword) return '请确认密码';
    if (password !== confirmPassword) return '两次输入的密码不一致';
    return null;
  }
}