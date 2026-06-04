import keyBy from 'lodash/keyBy.js';
import * as yup from 'yup';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

export default () => {
  const container = document.querySelector('[data-container="sign-up"]');
  const form = container.querySelector('form');
  const submitBtn = form.querySelector('[type="submit"]');
  
  const fields = {
    name: form.querySelector('[name="name"]'),
    email: form.querySelector('[name="email"]'),
    password: form.querySelector('[name="password"]'),
    passwordConfirmation: form.querySelector('[name="passwordConfirmation"]')
  };
  
  const touched = {
    name: false,
    email: false,
    password: false,
    passwordConfirmation: false
  };
  
  const showErrors = (errors) => {
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const error = errors[fieldName];
      
      if (touched[fieldName] && error) {
        field.classList.add('is-invalid');
        let errorDiv = field.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
          errorDiv = document.createElement('div');
          errorDiv.className = 'invalid-feedback';
          field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
        errorDiv.textContent = error.message;
      } else if (!error) {
        field.classList.remove('is-invalid');
        const errorDiv = field.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
          errorDiv.remove();
        }
      }
    });
  };
  
  const validateForm = () => {
    const values = {
      name: fields.name.value,
      email: fields.email.value,
      password: fields.password.value,
      passwordConfirmation: fields.passwordConfirmation.value
    };
    
    const errors = validate(values);
    showErrors(errors);
    
    const isValid = Object.keys(errors).length === 0;
    submitBtn.disabled = !isValid;
    return isValid;
  };
  
  Object.keys(fields).forEach(fieldName => {
    const field = fields[fieldName];
    field.addEventListener('focus', () => {
      touched[fieldName] = true;
    });
    field.addEventListener('input', () => {
      touched[fieldName] = true;
      validateForm();
    });
    field.addEventListener('blur', () => {
      if (field.value) touched[fieldName] = true;
      validateForm();
    });
  });
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    Object.keys(touched).forEach(key => touched[key] = true);
    
    if (validateForm()) {
      submitBtn.disabled = true;
      
      try {
        await axios.post(routes.usersPath(), {
          name: fields.name.value,
          email: fields.email.value,
          password: fields.password.value
        });
        container.innerHTML = 'User Created!';
      } catch (error) {
        submitBtn.disabled = false;
        console.error('Network error:', error);
      }
    }
  });
  
  submitBtn.disabled = true;
};