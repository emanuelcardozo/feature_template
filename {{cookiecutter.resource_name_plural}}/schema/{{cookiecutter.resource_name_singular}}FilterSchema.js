import * as Yup from 'yup'

const {{cookiecutter.resource_name_singular}}FilterSchema = Yup.object({
  {% for field in cookiecutter.__fields %}
    {% if field.type == "time" or field.type == "datetime" %}
      {{field.name}}: Yup.date().nullable(),
    {% else %}
      {{field.name}}: Yup.{{field.type}}().nullable(),
    {% endif %}
  {% endfor %}
})

export default {{cookiecutter.resource_name_singular}}FilterSchema
