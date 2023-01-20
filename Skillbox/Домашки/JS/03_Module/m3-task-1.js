let password = '_-3';
let n = password.length

if(n >= 4 && (password.includes('-') || password.includes('_'))){
    console.log('Пароль надежный')
} else (console.log('Пароль недостаточно надёжный'))

