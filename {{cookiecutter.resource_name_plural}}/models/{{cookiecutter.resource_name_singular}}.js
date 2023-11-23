class {{cookiecutter.resource_name_singular}} {
  constructor(
    {% for field in cookiecutter.__fields %}
    {{field.name}},
    {% endfor %}
  ) {
    {% for field in cookiecutter.__fields %}
    this.{{field.name}} = {{field.name}}
    {% endfor %}
  }

  static fromAPI(data = {}) {
    const {
      {% for field in cookiecutter.__fields %}
      {{field.name}},
      {% endfor %}
    } = data

    return new {{cookiecutter.resource_name_singular}}(
      {% for field in cookiecutter.__fields %}
      {{field.name}},
      {% endfor %}
    )
  }
}

export default {{cookiecutter.resource_name_singular}}
