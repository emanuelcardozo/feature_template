import {{cookiecutter.resource_name_singular}} from '../models/{{cookiecutter.resource_name_singular}}.js'

const {{cookiecutter.resource_name_singular|lower}}FromAPI = (data) => {
  return {{cookiecutter.resource_name_singular}}.fromAPI(data)
}

const edition{{cookiecutter.resource_name_singular}}FromAPI = (data) => {
  return data
}

const {{cookiecutter.resource_name_singular|lower}}ToAPI = (data) => {
  return data
}

const {{cookiecutter.resource_name_singular|lower}}FiltersToAPI = (data) => {
  return data
}

const {{cookiecutter.resource_name_singular|lower}}EditedToAPI = (data) => {
  return data
}

export { 
  {{cookiecutter.resource_name_singular|lower}}FromAPI,
  edition{{cookiecutter.resource_name_singular}}FromAPI,
  {{cookiecutter.resource_name_singular|lower}}ToAPI,
  {{cookiecutter.resource_name_singular|lower}}FiltersToAPI,
  {{cookiecutter.resource_name_singular|lower}}EditedToAPI
}
