import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { useFormik } from 'formik'
import {{cookiecutter.resource_name_singular}}FilterSchema from 'features/{{cookiecutter.resource_name_plural}}/schema/{{cookiecutter.resource_name_singular}}FilterSchema'
import Filters from 'components/Filters/index.js'
{% if cookiecutter.__fields|selectattr("type", "equalto", "string")|list|length %}
import TextField from '@mui/material/TextField'
{% endif %}
{% if cookiecutter.__fields|selectattr("type", "equalto", "date")|list|length %}
import DatePicker from 'components/DatePicker'
{% endif %}
{% if cookiecutter.__fields|selectattr("type", "equalto", "time")|list|length %}
import TimePicker from 'components/TimePicker'
{% endif %}
{% if cookiecutter.__fields|selectattr("type", "equalto", "datetime")|list|length %}
import DateTimePicker from 'components/DateTimePicker'
{% endif %}
{% if cookiecutter.__fields|selectattr("type", "equalto", "array")|list|length %}
import Autocomplete from 'components/Autocomplete'
{% endif %}
{% if cookiecutter.__fields|selectattr("type", "equalto", "bool")|list|length %}
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
{% endif %}

const EMPTY_{{cookiecutter.resource_name_singular|upper}}_FILTERS = {
  {% for field in cookiecutter.__fields %}
    {% if field.type == "string" %}
      {{field.name}}: '',
    {% elif field.type == "object" %}
      {{field.name}}: {},
    {% elif field.type == "array" %}
      {{field.name}}: [],
    {% else %}
      {{field.name}}: null,
    {% endif %}
  {% endfor %}
}


const {{cookiecutter.resource_name_singular}}Filters = ({ open, onCancel, onApply, initialFilters }) => {
  const { t } = useTranslation('features', { keyPrefix: '{{cookiecutter.resource_name_plural}}.filters' })

  const { handleChange, values, setValues, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFilters,
    validationSchema: {{cookiecutter.resource_name_singular}}FilterSchema,
    onSubmit: (data) => onApply(data),
  })

  const handleClear = useCallback(() => setValues(initialFilters), [initialFilters, setValues])

  const getFieldProps = useCallback(
    (name) => ({
      name,
      value: values[name],
      onChange: handleChange,
      onClear: () => setFieldValue(name, initialFilters[name]),
    }),
    [handleChange, values]
  )

  return (
    <Filters open={open} onCancel={onCancel} onApply={handleSubmit} onClear={handleClear}>
      {% for field in cookiecutter.__fields %}
        {% if field.type == "date" %}
          <DatePicker
            label={t('{{field.name}}')}
            slotProps={ { textField: { fullWidth: true } } }
            {...getFieldProps('{{field.name}}')}
            onChange={(date) => setFieldValue('{{field.name}}', date)}
          />
        {% elif field.type == "datetime" %}
          <DateTimePicker
            label={t('{{field.name}}')}
            slotProps={ { textField: { fullWidth: true } } }
            {...getFieldProps('{{field.name}}')}
            onChange={(date) => setFieldValue('{{field.name}}', date)}
          />
        {% elif field.type == "time" %}
          <TimePicker
            label={t('{{field.name}}')}
            slotProps={ { textField: { fullWidth: true } } }
            {...getFieldProps('{{field.name}}')}
            onChange={(date) => setFieldValue('{{field.name}}', date)}
          />
        {% elif field.type == "array" %}
          <Autocomplete
            label={t('{{field.name}}')}
            resourceName="{{field.name}}"
            {...getFieldProps('{{field.name}}')}
            onChange={(e, value) => {
              setFieldValue('{{field.name}}', value)
            }}
            multiple
            limitTags={2}
          />
        {% elif field.type == "bool" %}
          <FormControlLabel
            control={
              <Switch
                onChange={(e, checked) => setFieldValue('{{field.name}}', checked)}
                color="primary"
                checked={values.{{field.name}}}
              />
            }
            label={t('{{field.name}}')}
          />
        {% elif field.type == "number" %}
          <TextField fullWidth type="number" label={t('{{field.name}}')} {...getFieldProps('{{field.name}}')} />
        {% else %}
          <TextField fullWidth label={t('{{field.name}}')} {...getFieldProps('{{field.name}}')} />
        {% endif %}
      {% endfor %}
    </Filters>
  )
}

{{cookiecutter.resource_name_singular}}Filters.defaultProps = {
  initialFilters: EMPTY_{{cookiecutter.resource_name_singular|upper}}_FILTERS,
}

{{cookiecutter.resource_name_singular}}Filters.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  initialFilters: PropTypes.object.isRequired,
}

export default {{cookiecutter.resource_name_singular}}Filters
