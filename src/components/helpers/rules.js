import isEmpty from './isEmpty';

export default {
    required: value => isEmpty(value) ? 'Это обязательное поле' : true,
    email: value => !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.exec(value) ? 'Адрес электронной почты заполнен некорректно' : true,
    minLength: length => value => !value || value.length < length ? 'Пароль должен состоять минимум из ' + length + ' символов' : true,
    passwordConfirm: password => value => !value || password !== value ? 'Пароли не совпадают' : true,
}
