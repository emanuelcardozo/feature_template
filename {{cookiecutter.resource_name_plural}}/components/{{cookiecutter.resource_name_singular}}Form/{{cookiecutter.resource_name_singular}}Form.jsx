import { useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import CardFormBlock from 'components/CardFormBlock/CardFormBlock'
import { useFormik } from 'formik'
import { Stack, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
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
import {{cookiecutter.resource_name_singular}}Schema from 'features/{{cookiecutter.resource_name_plural}}/schema/{{cookiecutter.resource_name_singular}}Schema'

const EMPTY_{{cookiecutter.resource_name_singular|upper}} = {
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

function {{cookiecutter.resource_name_singular}}Form({ onCancel, onSubmit, initialValues, mode, isLoading, isSubmitting }) {
  const { t, i18n } = useTranslation(['features'], { keyPrefix: '{{cookiecutter.resource_name_plural|capitalize}}.form' })

  const { handleChange, handleSubmit, handleBlur, setValues, setFieldValue, validateForm, touched, errors, values, isValid } =
    useFormik({
      initialValues,
      validateOnChange: false,
      validationSchema: {{cookiecutter.resource_name_singular|capitalize}}Schema,
      onSubmit,
    })

    useEffect(() => {
      setValues(initialValues)
      validateForm(initialValues)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialValues])

  const getFieldProps = useCallback(
    (name) => ({
      name,
      value: values[name],
      error: !!(touched[name] && errors[name]),
      helperText: touched[name] && i18n.t(errors[name]),
      onBlur: handleBlur,
      onChange: handleChange,
      onClear: () => setFieldValue(name, EMPTY_{{cookiecutter.resource_name_singular|upper}}[name]),
    }),
    [touched, errors, handleBlur, handleChange, values, i18n]
  )

  const canSave = useMemo(() => {
    if (mode === 'edit') return isValid

    return isValid && Object.keys(touched).length
  }, [isValid, touched, mode])

  const styles = { opacity: isLoading ? 0.5 : 1 }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack spacing={3} sx={styles}>
        <CardFormBlock title={t('details')}>
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
        </CardFormBlock>
        <Stack direction={ { xs: 'column-reverse', sm: 'row' } } spacing={3} justifyContent="flex-end">
          <Button size="large" variant="text" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <LoadingButton
            size="large"
            type="submit"
            onClick={() => {
              values.active = false
            }}
            variant="outlined"
            loading={values.active === false && isSubmitting}
            disabled={!canSave}
          >
            {t('saveAndNoActivate')}
          </LoadingButton>
          <LoadingButton
            size="large"
            type="submit"
            onClick={() => {
              values.active = true
            }}
            variant="contained"
            loading={values.active === true && isSubmitting}
            disabled={!canSave}
          >
            {t('saveAndActivate')}
          </LoadingButton>
        </Stack>
      </Stack>
    </form>
  )
}

{{cookiecutter.resource_name_singular}}Form.defaultProps = {
  initialValues: EMPTY_{{cookiecutter.resource_name_singular|upper}},
  mode: 'create',
  isLoading: false,
  isSubmitting: false,
}

{{cookiecutter.resource_name_singular}}Form.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  mode: PropTypes.string,
  isLoading: PropTypes.bool,
  isSubmitting: PropTypes.bool
}

export default {{cookiecutter.resource_name_singular}}Form
