import { extend } from 'vee-validate'

import { required, max, min, email, size, confirmed, numeric } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_} لا يمكن ان تكون فارغة'
})

extend('max', {
  ...max,
  message: '{_field_} لا يمكن ان يكون اكبر من {length} حرف'
})

extend('min', {
  ...min,
  message: '{_field_} لا يمكن ان يكون اصغر من {length} حرف'
})

extend('email', {
  ...email,
  message: 'تأكد من صحة البريد الإلكتروني'
})

extend('size', {
  ...size,
  message: 'حجم الصورة يجب ان يكون اقل من {size}'
})

extend('confirmed', {
  ...confirmed,
  message: 'تاكد من صحة كلمة المرور'
})

extend('numeric', {
  ...numeric,
  message: 'يجب أن يكون {_field_} رقما'
})
