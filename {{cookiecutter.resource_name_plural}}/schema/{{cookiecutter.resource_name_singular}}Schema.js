import * as Yup from 'yup'

const {{cookiecutter.resource_name_singular}}Schema = Yup.object({
  {% for field in cookiecutter.__fields %}
    {% if field.type == "time" or field.type == "datetime" %}
      {{field.name}}: Yup.date().nullable().required('validations:required'),
    {% else %}
      {{field.name}}: Yup.{{field.type}}().nullable().required('validations:required'),
    {% endif %}
  {% endfor %}
})

export default {{cookiecutter.resource_name_singular}}Schema
